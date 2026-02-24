import { useForm, type SubmitHandler } from "react-hook-form";
import type { ICreateInputs, IInputs } from "./types";
import useUIStore from "../lib/store/useUIStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  ICohort,
  ICohorts,
  ICohortsInfo,
} from "../lib/store/types/member";
import { useEffect, useState } from "react";

export default function CreateMemberComponent() {
  const setIsCreateMemberView = useUIStore(
    (state) => state.setIsCreateMemberView
  );
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/api/v1/admin/cohorts");
      return await res.json();
    },
    select: (res: ICohorts) => res.data,
  });

  const [selectedCohortId, setSelectedCohortId] = useState<number | null>(null);

  const {
    isLoading: isCohortLoading,
    data: cohortData,
    isSuccess: isCohortSuccess,
  } = useQuery({
    queryKey: ["cohortsInfo", selectedCohortId],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:8080/api/v1/admin/cohorts/" + selectedCohortId
      );
      return await res.json();
    },
    enabled: selectedCohortId != null,
    select: (res: ICohortsInfo) => res.data,
  });

  useEffect(() => {
    console.log(cohortData);
  }, [cohortData]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Omit<ICreateInputs, "generation">>();
  const onSubmit: SubmitHandler<Omit<ICreateInputs, "generation">> = (data) => {
    console.log(data);

    // createMember.mutate(data);
    // setIsCreateMemberView(false);
  };

  useEffect(() => {
    console.log(watch("cohortId"));
    if (isSuccess) {
      const selectedId = watch("cohortId") || data.at(-1)?.name;
      const selected = data.find((el) => el.name === selectedId);
      console.log(data);
      console.log(selectedId);
      console.log(selected);
      if (selected) {
        setSelectedCohortId(selected.id);
      }
    }
  }, [watch("cohortId"), isSuccess]);

  const createMember = useMutation({
    mutationKey: ["updateMemberInfo"],
    mutationFn: async (userInfo: Omit<ICreateInputs, "generation">) => {
      const res = await fetch("http://localhost:8080/api/v1/admin/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      return await res.json();
    },
    onSuccess(data, variables, onMutateResult, context) {
      console.log(
        "data, variables, onMutateResult, context, ",
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });

  return (
    <section>
      <form
        className="flex flex-col px-10 max-w-200 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">이름</label>
        <input
          id="name"
          className="h-10 rounded-xs border indent-2 mb-4 "
          type="text"
          {...register("name", { required: true })}
        ></input>
        <label htmlFor="loginId">아이디</label>
        <input
          id="loginId"
          className="h-10 rounded-xs border indent-2 mb-4"
          type="text"
          {...register("loginId", { required: true })}
        ></input>
        <label htmlFor="cohortId">기수</label>
        <select
          className="h-10 rounded-xs border indent-2 mb-4"
          id="cohortId"
          {...register("cohortId", { required: true })}
        >
          {isSuccess && (
            <>
              {data.map((cohort, i) => (
                <option key={cohort.id} selected={data.length - 1 === i}>
                  {cohort.name}
                </option>
              ))}
            </>
          )}
        </select>

        <label htmlFor="partName">파트</label>
        <select
          className="h-10 rounded-xs border indent-2 mb-4"
          id="partName"
          {...register("partName", { required: true })}
        >
          {cohortData && (
            <>
              (
              {cohortData.parts.map((cohort, i) => (
                <option
                  key={cohort.id}
                  //   selected={cohortData.parts.length - 1 === i}
                >
                  {cohort.name}
                </option>
              ))}
              )
            </>
          )}
        </select>

        <label htmlFor="phone">전화번호</label>
        <input
          id="phone"
          className="h-10 rounded-xs border indent-2 mb-4"
          type="phone"
          {...register("phone", { required: true })}
        ></input>
        <label htmlFor="teamName">참여팀</label>
        <select
          className="h-10 rounded-xs border indent-2 mb-4"
          id="teamName"
          {...register("teamName", { required: true })}
        >
          {cohortData && (
            <>
              (
              {cohortData.teams.map((cohort, i) => (
                <option
                  key={cohort.id}
                  //   selected={cohortData.teams.length - 1 === i}
                >
                  {cohort.name}
                </option>
              ))}
              )
            </>
          )}
        </select>
        <div className="w-full flex justify-end gap-2 mt-5">
          <button
            className="w-[120px] rounded-xs bg-gray-600 text-white"
            type="submit"
          >
            저장
          </button>
          <button
            className="w-[120px] rounded-xs border "
            type="button"
            onClick={() => setIsCreateMemberView(false)}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
}
