import { useEffect, useMemo, useState } from "react";
import type { IContent } from "../../membership/types";
import { cn } from "../../lib/utils";
import AttendanceEditModal from "./AttendanceEditModal";
import usePagination from "../../common/hooks/usePagination";
import useMemberList from "../../membership/hooks/useMemberList";
import { useForm, type SubmitHandler } from "react-hook-form";
import useUIStore from "../../lib/store/useUIStore";
import useAttendanceByMember from "../hooks/useAttendanceByMember";
import useDeposits from "../hooks/useDeposits";
import MemberListItem from "./MemberListItem";
import AttendanceListItem from "./AttendanceListItem";
import PaginationComponent from "../../common/components/PaginationComponent";
import type { IDeposit } from "../types";

const today = new Date();
const oneYearAgo = new Date(
  today.getFullYear() - 1,
  today.getMonth(),
  today.getDay()
);

export default function AttendanceManagerComponent() {
  const [fullView, setFullView] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [startDate, setStartDate] = useState(
    oneYearAgo.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  const setAttendancesCategory = useUIStore(
    (state) => state.setAttendancesCategory
  );

  const [selectedUser, setSelectedUser] = useState<IContent | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState(0);

  const { pages, currentPage, updatePageCount, updateTotalPage } =
    usePagination({ currnetTotalPage: 1 });

  const { data: membersData } = useMemberList({ currentPage });

  const { data: attendancesData } = useAttendanceByMember({
    memberId: selectedId,
  });

  const { data: depositsData } = useDeposits({ memberId: selectedId });
  useEffect(() => {
    if (membersData) {
      updateTotalPage(membersData.totalPages);
    }
  }, [membersData]);

  const totalLateFee = useMemo(() => {
    if (depositsData) {
      return depositsData.reduce((acc: number, cur: IDeposit) => {
        if (cur.type === "PENALTY") {
          return Math.abs(cur.amount) + acc;
        } else if (cur.type === "REFUND") {
          return acc - cur.amount;
        }
        return acc;
      }, 0);
    }
  }, [depositsData]);

  const { register, handleSubmit } = useForm({});

  const onSubmit: SubmitHandler<any> = (formData) => {
    console.log(formData);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-5">
        <section className="p-5 flex gap-3">
          <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="search">날짜지정</label>
            <select
              className="border-gray-300 border rounded-[5px] p-1 text-gray-500"
              {...register("category")}
            >
              <option>등록일</option>
            </select>
            <label className="hidden">시작일</label>
            <input
              className="text-gray-500"
              type="date"
              {...register("startDate")}
              defaultValue={startDate}
            />
            <label className="hidden">종료일</label>
            <input
              className="text-gray-500"
              type="date"
              {...register("endDate")}
              defaultValue={endDate}
            />
            <label className="flex justify-center items-center">
              <input className="peer sr-only" type="radio" name="radio" />
              <span className="border-1 border-gray-300 p-1 min-w-12.5 text-center text-gray-500 rounded-[5px] peer-checked:border-blue-500 peer-checked:text-blue-500">
                오늘
              </span>
            </label>
            <input className="peer sr-only" type="radio" name="radio" />
            <span className="border-1 border-gray-300 p-1 min-w-12.5 text-center text-gray-500 rounded-[5px] peer-checked:border-blue-500 peer-checked:text-blue-500">
              30일
            </span>
            <label className="flex justify-center items-center">
              <input
                className="hidden peer sr-only"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="border-1 border-gray-300 p-1 min-w-12.5 text-center text-gray-500 rounded-[5px] peer-checked:border-blue-500 peer-checked:text-blue-500">
                1년
              </span>
            </label>
          </form>
          <button className="w-[90px] p-1 rounded-[5px] border-1 border-gray-900 bg-gray-600 text-gray-50">
            검색
          </button>
        </section>

        <section className="pl-5 mt-10">
          {membersData && (
            <>
              <p className="mb-5">전체</p>
              <MemberListItem
                members={membersData.content}
                onSelect={(item) => {
                  setSelectedId(item.id);
                  setSelectedUser(item);
                }}
              />
            </>
          )}
        </section>

        {selectedUser && (
          <section
            className={cn(
              "h-lvh flex absolute top-0 right-0 bg-white transition-all",
              fullView ? "w-full" : "w-[50vw]"
            )}
          >
            <div
              className={cn(
                "absolute flex justify-center transition-all",
                fullView ? "right-10 gap-5" : "-left-20 flex-col gap-2"
              )}
            >
              <button onClick={() => setSelectedUser(null)}>닫기</button>
              <button onClick={() => setFullView((prev) => !prev)}>
                {fullView ? "줄여보기" : "전체보기"}
              </button>
            </div>

            <section className="w-full pl-5 overflow-y-scroll">
              <div className="w-full flex flex-col">
                <p className="w-full mt-5 mb-1 text-[14px] text-gray-600">
                  회원 정보
                </p>
                <div className="p-5 grid grid-cols-2 gap-5 bg-gray-200 rounded-[5px]">
                  <p className="flex items-center gap-5">
                    <span className="w-[50px]">이름</span>
                    <span>{selectedUser?.name}</span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="w-[50px]">기수</span>
                    <span>{selectedUser?.generation}기</span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="w-[50px]">ID</span>
                    <span>{selectedUser?.id}</span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="w-[50px]">파트</span>
                    <span>{selectedUser?.partName}</span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="w-[50px]">번호</span>
                    <span>{selectedUser?.phone}</span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="w-[50px]">참여팀</span>
                    <span>{selectedUser?.teamName}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <p className="w-full mt-5 mb-1 text-[14px] text-gray-600">
                  벌금 현황
                </p>
                <div className="p-5 flex flex-col gap-5 bg-gray-200 rounded-[5px]">
                  <p className="flex items-center gap-5">
                    <span className="w-[100px]">이번주 지각비</span>
                    <span>{Math.abs(depositsData?.at(-1).amount)}</span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="w-[100px]">누적 지각비</span>
                    <span>{totalLateFee}</span>
                  </p>
                  <p className="flex items-center gap-5">
                    <span className="w-[100px]">잔여 보증금</span>
                    <span>{depositsData?.at(-1).balanceAfter}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="w-full mt-5 mb-1 text-[14px] text-gray-600">
                    출결 현황
                  </p>
                  <button
                    className="w-[100px] mr-2 text-[14px] text-gray-800 bg-amber-400 rounded-[5px]"
                    onClick={() => {
                      setIsEditModal(true);
                      setAttendancesCategory("new");
                    }}
                  >
                    출결 등록
                  </button>
                </div>

                {attendancesData && (
                  <AttendanceListItem
                    memberName={attendancesData.memberName}
                    teamName={attendancesData.teamName}
                    attendances={attendancesData.attendances}
                    onSelect={(sessionId) => {
                      setSelectedSessionId(sessionId);
                      setIsEditModal(true);
                      setAttendancesCategory("");
                    }}
                  />
                )}
              </div>
            </section>
          </section>
        )}
      </div>

      {selectedUser && (
        <AttendanceEditModal
          selectedUser={selectedUser}
          selectedSessionId={selectedSessionId}
          setSelectedSessionId={setSelectedSessionId}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
        />
      )}

      <PaginationComponent
        pages={pages}
        currentPage={currentPage}
        updatePageCount={updatePageCount}
      />
    </div>
  );
}
