import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useUIStore from "../lib/store/useUIStore";
import type { IMembers } from "./types";

const Total_Page = 5;

export default function MembershipManagementComponents() {
  const selectedUser = useUIStore((state) => state.selectedUser);
  const [page, setPage] = useState(0);
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8080/api/v1/admin/members");
      return await res.json();
    },
    select: (res: IMembers) => res.data,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col">
      <section className="p-5 flex gap-3">
        <span>검색항목</span>
        <select className="border-1 border-gray-300">
          <option>사용자명</option>
          <option>팀명</option>
          <option>포지션명</option>
        </select>
        <input className="border-1 border-gray-300" type="search"></input>
        <button className="border bg-gray-700 text-gray-200 rounded-xs px-5">
          회원 등록
        </button>
      </section>
      {isSuccess && (
        <>
          <p className="pl-5 mb-10">전체 {data.size}</p>

          <ul className="pl-5 flex flex-col gap-2">
            {data.content.map((item) => (
              <li
                className="border-b-1 border-gray-300 p-2 hover:bg-gray-300 flex"
                key={item.id}
                onClick={() => selectedUser(item.id)}
              >
                <span className="w-45 flex-2">{item.loginId}</span>
                <span className="w-20 flex-1">{item.name}</span>
                <span className="w-20 flex-1">{item.status}</span>
                <span className="w-20 flex-1">{item.teamName}</span>
                <span className="w-20 flex-1">{item.partName}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <nav className="w-full p-5 pb-2">
        <ul className="flex justify-center gap-2">
          {Array.from({ length: Total_Page }).map((_, i) => (
            <li key={i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
