import { useForm, type SubmitHandler } from "react-hook-form";
import type { ICreateInputs, ICreateError } from "../types";
import useUIStore from "../../lib/store/useUIStore";
import { useEffect, useState } from "react";
import useCohorts from "../hooks/useCohorts";
import useDetailCohort from "../hooks/useDetailCohort";
import { queryClient } from "../../lib/utils";
import useCreateMutation from "../hooks/useCreateMutation";

export default function CreateMemberComponent() {
  const setIsCreateMemberView = useUIStore(
    (state) => state.setIsCreateMemberView
  );
  const { isLoading, data, isSuccess } = useCohorts();

  const [selectedCohortId, setSelectedCohortId] = useState<number | null>(null);

  const { data: cohortData } = useDetailCohort({ selectedCohortId });

  const createMember = useCreateMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      setIsCreateMemberView(false);
    },
    onError: (data: ICreateError) => {
      setError("loginId", { message: data.error.message });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<Omit<ICreateInputs, "generation" | "partName" | "temaName">>();
  const contactValue = watch("contact");
  const isEmail = contactValue?.includes("@");

  const onSubmit: SubmitHandler<
    Omit<ICreateInputs, "generation" | "partName" | "temaName">
  > = (data) => {
    const contact = isEmail
      ? { email: data.contact }
      : { phone: data?.contact };
    const newFormData = {
      ...data,
      ...contact,
      cohortId: Number(data?.cohortId),
      partId: Number(data?.partId),
      teamId: Number(data?.teamId),
      password: "prography",
    };
    delete newFormData.contact;

    createMember.mutate(newFormData);
  };
  const cohortIdValue = watch("cohortId");
  useEffect(() => {
    if (data) {
      const selectedId = Number(watch("cohortId")) || Number(data.at(-1)?.id);
      const selected = data.find((el) => el.id === selectedId);

      if (selected) {
        setSelectedCohortId(selected.id);
      }
    }
  }, [cohortIdValue, data]);

  return (
    <section>
      <form
        className="flex flex-col px-10 max-w-200 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">이름</label>
        <input
          id="name"
          className="h-10 rounded-xs border indent-2"
          type="text"
          {...register("name", {
            required: true,
            pattern: {
              value: /^\S.*\S$|^\S$/,
              message: "공백은 입력할 수 없습니다",
            },
          })}
        ></input>
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.name?.message}
        </span>

        <label htmlFor="loginId">아이디</label>
        <input
          id="loginId"
          className="h-10 rounded-xs border indent-2"
          type="text"
          {...register("loginId", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9.]+$/,
              message: "영어, 숫자, 마침표(.)만 입력 가능합니다",
            },
          })}
        ></input>
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.loginId?.message}
        </span>

        <label htmlFor="cohortId">기수</label>
        <select
          className="h-10 rounded-xs border indent-2"
          id="cohortId"
          defaultValue={data?.at(-1)?.id}
          {...register("cohortId", { required: true })}
        >
          {isSuccess && (
            <>
              {data
                .slice()
                .reverse()
                .map((cohort, i) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
            </>
          )}
        </select>
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.cohortId?.message}
        </span>
        {cohortData && cohortData.parts.length > 0 && (
          <>
            <label htmlFor="partId">파트</label>
            <select
              className="h-10 rounded-xs border indent-2"
              id="partId"
              {...register("partId", { required: true })}
            >
              {cohortData && (
                <>
                  (
                  {cohortData.parts.map((part, i) => (
                    <option key={part.id} value={part.id}>
                      {part.name}
                    </option>
                  ))}
                  )
                </>
              )}
            </select>
            <span className="text-[14px] text-red-400 mb-4 p-1">
              {errors?.partId?.message}
            </span>
          </>
        )}

        <label htmlFor="contact">전화번호 | 이메일</label>
        <input
          id="contact"
          className="h-10 rounded-xs border indent-2"
          type="text"
          {...register("contact", {
            required: true,
            validate: (value) => {
              if (!value) return "공백은 입력하실 수 없습니다.";
              if (value?.includes("@")) {
                return (
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  "이메일 형식이 올바르지 않습니다."
                );
              }
              return (
                /^010-\d{4}-\d{4}$/.test(value) ||
                "전화번호 형식이 올바르지 않습니다"
              );
            },
          })}
        ></input>
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.contact?.message}
        </span>

        {cohortData && cohortData.teams.length > 0 && (
          <>
            <label htmlFor="teamId">참여팀</label>
            <select
              className="h-10 rounded-xs border indent-2 mb-4"
              id="teamId"
              {...register("teamId", { required: true })}
            >
              {cohortData && (
                <>
                  (
                  {cohortData.teams.map((team, i) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                  )
                </>
              )}
            </select>
          </>
        )}
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
