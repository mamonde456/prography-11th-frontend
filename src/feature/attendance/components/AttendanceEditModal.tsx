import type { IContent } from "../../membership/types";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import useUIStore from "../../lib/store/useUIStore";
import useAttendanceByMember from "../hooks/useAttendanceByMember";
import useCreateAttendance from "../hooks/useCreateAttendance";
import useUpdateAttendance from "../hooks/useUpdateAttendance";
import { useForm, type SubmitHandler } from "react-hook-form";
import useSessions from "../../sessions/hooks/useSessions";
import type { ISession } from "../../sessions/types";
import type { IAttendance } from "../types";

type Props = {
  selectedUser: IContent;
  selectedSessionId: number;
  setSelectedSessionId: Dispatch<SetStateAction<number>>;
  isEditModal: boolean;
  setIsEditModal: Dispatch<SetStateAction<boolean>>;
};

type AttendanceFormInputs = {
  status: string;
  lateMinutes: number;
  reason: string;
  sessionId?: number;
};

const attendanceType: { [index: string]: string } = {
  PRESENT: "출석",
  ABSENT: "결석",
  LATE: "지각",
  EXCUSED: "공결",
};

const attendanceTypeReverse: { [index: string]: string } = {
  출석: "PRESENT",
  결석: "ABSENT",
  지각: "LATE",
  공결: "EXCUSED",
  조퇴: "ABSENT",
  기타: "ABSENT",
};

export default function AttendanceEditModal({
  selectedUser,
  selectedSessionId,
  setSelectedSessionId,
  isEditModal,
  setIsEditModal,
}: Props) {
  const attendancesCategory = useUIStore((state) => state.attendancesCategory);
  const setAttendancesCategory = useUIStore(
    (state) => state.setAttendancesCategory
  );

  const [attendanceSession, setAttendanceSession] = useState<any>();
  const [session, setSession] = useState<ISession | undefined>();
  const { data: memberSessions } = useAttendanceByMember({
    memberId: selectedUser?.id ?? null,
  });
  const { data: sessionsData } = useSessions();

  const isNew = attendancesCategory === "new";

  const { register, handleSubmit, reset } = useForm<AttendanceFormInputs>();

  const createAttendance = useCreateAttendance({
    onSuccess: () => {
      setIsEditModal(false);
      setAttendancesCategory("");
    },
  });

  const updateAttendance = useUpdateAttendance({
    attendanceId: attendanceSession?.id,
    onSuccess: () => {
      setIsEditModal(false);
      setAttendancesCategory("");
    },
  });

  useEffect(() => {
    if (selectedSessionId) {
      const found = memberSessions?.attendances?.find(
        (el: IAttendance) => el.sessionId === selectedSessionId
      );
      setAttendanceSession(found);
      setSession(
        sessionsData?.find((el: ISession) => el.id === selectedSessionId)
      );

      if (found) {
        reset({
          status: attendanceType[found.status] ?? "출석",
          lateMinutes: found.lateMinutes ?? 0,
          reason: found.reason ?? "",
        });
      }
    }
  }, [memberSessions, sessionsData, selectedSessionId]);

  const onSubmit: SubmitHandler<AttendanceFormInputs> = (formData) => {
    const status = attendanceTypeReverse[formData.status] ?? formData.status;
    const lateMinutes = formData.lateMinutes
      ? Number(formData.lateMinutes)
      : null;

    if (isNew) {
      createAttendance.mutate({
        sessionId: Number(formData.sessionId),
        memberId: selectedUser.id,
        status,
        lateMinutes,
        reason: formData.reason,
      });
    } else {
      updateAttendance.mutate({
        status,
        lateMinutes,
        reason: formData.reason,
      });
    }
  };

  const handleClose = () => {
    setIsEditModal(false);
    setAttendancesCategory("");
  };

  if (!isEditModal) return null;

  return (
    <>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black opacity-[.5]"
        onClick={handleClose}
      />
      <section className="w-[400px] fixed left-[50%] ml-[-200px] top-[50%] mt-[-200px] flex flex-col gap-5 p-5 bg-white border-1 border-gray-400 rounded-2xl">
        <div className="flex justify-between items-center">
          <p className="text-[24px]">
            {isNew ? "출결 등록" : "출결 정보 수정"}
          </p>
          <button
            className="p-1 px-3 border border-gray-400 rounded-[5px]"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            {isNew ? (
              <>
                <label className="flex gap-5 mb-2">
                  <span>세션</span>
                  <select
                    className="border rounded-[5px] p-1"
                    {...register("sessionId", { required: true })}
                  >
                    {sessionsData?.map((s: ISession) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex gap-5 mb-2">
                  <span>날짜</span>
                  <input className="border rounded-[5px] p-1" type="date" />
                </label>
              </>
            ) : (
              <>
                <p className="flex gap-5">
                  <span>세션</span>
                  <span>{session?.title}</span>
                </p>
                <p className="flex gap-5">
                  <span>날짜</span>
                  <span>{session?.date}</span>
                </p>
              </>
            )}
          </div>

          <label>출결 현황</label>
          <div className="flex gap-5">
            <select
              className="p-1 px-3 border-1 rounded-[5px]"
              {...register("status")}
            >
              <option value="출석">출석</option>
              <option value="공결">공결</option>
              <option value="지각">지각</option>
              <option value="조퇴">조퇴</option>
              <option value="결석">결석</option>
              <option value="기타">기타</option>
            </select>
            <select
              className="p-1 px-3 border-1 rounded-[5px]"
              {...register("lateMinutes")}
            >
              {Array.from({ length: 61 }, (_, i) => (
                <option key={i} value={i}>
                  {i}분
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-5">
            <span>사유</span>
            <input
              className="p-1 border-1 rounded-[5px]"
              type="text"
              {...register("reason")}
            />
          </label>

          <div className="flex justify-end gap-2 mt-3">
            <button
              className="p-1 px-4 bg-gray-600 text-white rounded-[5px]"
              type="submit"
            >
              {isNew ? "등록" : "수정"}
            </button>
            <button
              className="p-1 px-4 border rounded-[5px]"
              type="button"
              onClick={handleClose}
            >
              취소
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
