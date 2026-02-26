import useUIStore from "../../lib/store/useUIStore";
import type { ICreateInputs } from "../types";
import { useForm, type SubmitHandler } from "react-hook-form";
import useUpdateMemberMutaion from "../hooks/useUpdateMemberMutaion";
import useCohorts from "../hooks/useCohorts";
import useDetailCohort from "../hooks/useDetailCohort";
import useMemberDetail from "../hooks/useMemberDetail";
import useMemberStore from "../../lib/store/useMemberStore";
import useDeleteMutation from "../hooks/useDeleteMutation";

export default function EditMemberInfoComponent() {
  const userId = useUIStore((state) => state.userId);
  const selectedUser = useUIStore((state) => state.selectedUser);
  const selectedCohortId = useMemberStore((state) => state.selectedCohortId);
  const { isLoading, data } = useMemberDetail({
    userId: userId || 0,
  });
  const isDelete = data?.status === "WITHDRAWN";
  const { data: cohortsData, isSuccess: isCohortsSuccess } = useCohorts();

  const { data: cohortData } = useDetailCohort({
    selectedCohortId: selectedCohortId || 0,
  });

  const updateMember = useUpdateMemberMutaion({
    userId: userId || 0,
    onSuccess() {
      selectedUser(null);
    },
  });
  const deleteMember = useDeleteMutation({
    userId: userId || 0,
    onSuccess() {
      selectedUser(null);
    },
  });

  const part = cohortData?.parts.find((el) => el.name === data?.partName);
  const team = cohortData?.teams.find((el) => el.name === data?.teamName);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Omit<ICreateInputs, "generation" | "partName" | "teamName">>({
    values: {
      cohortId: Number(data?.generation) || 1,
      contact: data?.phone ?? "",
      partId: part?.id || 1,
      teamId: team?.id || 1,
    },
  });

  const contactValue = watch("contact");
  const isEmail = contactValue?.includes("@");

  const onSubmit: SubmitHandler<
    Omit<ICreateInputs, "generation" | "partName" | "teamName">
  > = (formData) => {
    const contact = isEmail
      ? { email: formData.contact }
      : { phone: formData?.contact };
    const newFormData = {
      ...formData,
      ...contact,
      cohortId: Number(formData?.cohortId),
      partId: Number(formData?.partId),
      teamId: Number(formData?.teamId),
      password: "prography",
    };
    delete newFormData.contact;

    updateMember.mutate(newFormData);
  };

  if (isLoading)
    return (
      <section className="flex-4 p-5">
        <h3 className="text-[24px] p-5 mb-5">회원 상세</h3>
        <div> loading...</div>
      </section>
    );

  return (
    <section className="flex-4 p-5">
      <h3 className="text-[24px] p-5 mb-5">회원 상세</h3>
      <form
        className="flex flex-col px-10 max-w-200 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="name">이름</label>
        <input
          key={`name-${userId}`}
          id="name"
          className="h-10 rounded-xs border indent-2"
          type="text"
          {...register("name", {
            disabled: true,
            pattern: {
              value: /^\S.*\S$|^\S$/,
              message: "공백은 입력할 수 없습니다",
            },
          })}
          value={data?.name}
        />
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.name?.message}
        </span>

        <label htmlFor="loginId">아이디</label>
        <input
          key={`loginId-${userId}`}
          id="loginId"
          className="h-10 rounded-xs border indent-2"
          type="text"
          {...register("loginId", {
            disabled: true,
            pattern: {
              value: /^[a-zA-Z0-9.]+$/,
              message: "영어, 숫자, 마침표(.)만 입력 가능합니다",
            },
          })}
          value={data?.loginId}
        />
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.loginId?.message}
        </span>

        <label htmlFor="cohortId">기수</label>
        <select
          key={`cohortId-${userId}`}
          className="h-10 rounded-xs border indent-2"
          id="cohortId"
          {...register("cohortId", { required: true })}
          defaultValue={data?.generation || cohortsData?.at(-1)?.id}
        >
          {isCohortsSuccess &&
            cohortsData
              .slice()
              .reverse()
              .map((cohort) => (
                <option key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </option>
              ))}
        </select>
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.cohortId?.message}
        </span>

        {cohortData && cohortData.parts.length > 0 && (
          <>
            <label htmlFor="partId">파트</label>
            <select
              key={`partId-${userId}`}
              className="h-10 rounded-xs border indent-2"
              id="partId"
              {...register("partId", { required: true })}
              defaultValue={data?.partName}
            >
              {cohortData.parts.map((part) => (
                <option key={part.id} value={part.id}>
                  {part.name}
                </option>
              ))}
            </select>
            <span className="text-[14px] text-red-400 mb-4 p-1">
              {errors?.partId?.message}
            </span>
          </>
        )}

        <label htmlFor="contact">전화번호 | 이메일</label>
        <input
          key={`contact-${userId}`}
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
          defaultValue={data?.phone}
        />
        <span className="text-[14px] text-red-400 mb-4 p-1">
          {errors?.contact?.message}
        </span>

        {cohortData && cohortData.teams.length > 0 && (
          <>
            <label htmlFor="teamId">참여팀</label>
            <select
              key={`teamId-${userId}`}
              className="h-10 rounded-xs border indent-2 mb-4"
              id="teamId"
              {...register("teamId", { required: true })}
            >
              {cohortData.teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </>
        )}

        <div className="w-full flex justify-end gap-2 mt-5">
          <button
            className="w-[120px] rounded-xs border"
            type="button"
            onClick={() => selectedUser(null)}
          >
            취소
          </button>
          <button
            className="w-[120px] rounded-xs bg-gray-600 text-white disabled:bg-gray-300 disabled:text-gray-200"
            type="submit"
            disabled={isDelete}
          >
            저장
          </button>
          <button
            className="w-[120px] rounded-xs border border-red-400 text-red-500 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-200"
            type="button"
            onClick={() => deleteMember.mutate()}
            disabled={isDelete}
          >
            회원만료
          </button>
        </div>
      </form>
    </section>
  );
}
