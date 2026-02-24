import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useUIStore from "../lib/store/useUIStore";
import { useEffect } from "react";
import type { IContent, IInputs } from "./types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { queryClient } from "../lib/utils";

export default function EditMemberInfoComponent() {
  const user = useUIStore((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInputs>();
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    console.log(data);
    updateMember.mutate(data);
  };

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["memberInfo", user],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:8080/api/v1/admin/members/" + user
      );
      return await res.json();
    },
    select: (res: { data: IContent }) => res.data,
  });

  const updateMember = useMutation({
    mutationKey: ["updateMemberInfo", user],
    mutationFn: async (userInfo: IInputs) => {
      const res = await fetch(
        "http://localhost:8080/api/v1/admin/members/" + user,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        }
      );
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
      queryClient.setQueryData(["memberInfo", user], data);
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className="flex-4 p-5">
      <h3 className="text-[24px] p-5 mb-5">회원 상세</h3>
      <form
        className="flex flex-col p-5 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isSuccess && (
          <>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              key={data?.name}
              className="border indent-2 mb-4"
              type="text"
              defaultValue={data?.name}
              {...register("name", { required: true })}
            ></input>
            <label htmlFor="loginId">아이디</label>
            <input
              id="loginId"
              key={data?.loginId}
              className="border indent-2 mb-4"
              type="text"
              defaultValue={data?.loginId}
              {...register("loginId", { required: true })}
            ></input>
            <label htmlFor="generation">기수</label>
            <input
              id="generation"
              key={data?.generation}
              className="border indent-2 mb-4"
              type="select"
              defaultValue={data?.generation}
              {...register("generation", { required: true })}
            ></input>
            <label htmlFor="partName">파트</label>
            <input
              id="partName"
              key={data?.partName}
              className="border indent-2 mb-4"
              type="text"
              defaultValue={data?.partName}
              {...register("partName", { required: true })}
            ></input>
            <label htmlFor="phone">전화번호</label>
            <input
              id="phone"
              key={data?.phone}
              className="border indent-2 mb-4"
              type="text"
              defaultValue={data?.phone}
              {...register("phone", { required: true })}
            ></input>
            <label htmlFor="teamName">참여팀</label>
            <input
              id="teamName"
              key={data?.teamName}
              className="border indent-2 mb-4"
              type="text"
              defaultValue={data?.teamName}
              {...register("teamName", { required: true })}
            ></input>
            <label htmlFor="createdAt">등록일</label>
            <input
              id="createdAt"
              key={data?.createdAt}
              className="border indent-2 mb-4 text-gray-400"
              type="text"
              disabled
              value={data?.createdAt}
            ></input>
          </>
        )}
        <div className="w-full flex justify-end gap-2 mt-5">
          <button
            className="w-[120px] rounded-xs bg-gray-600 text-white"
            type="submit"
          >
            저장
          </button>
          <button className="w-[120px] rounded-xs border " type="button">
            회원 만료
          </button>
        </div>
      </form>
    </section>
  );
}
