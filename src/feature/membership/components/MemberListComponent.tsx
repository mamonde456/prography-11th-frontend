import { useEffect } from "react";
import useUIStore from "../../lib/store/useUIStore";
import PaginationComponent from "../../common/components/PaginationComponent";
import useMemberList from "../hooks/useMemberList";
import usePagination from "../../common/hooks/usePagination";
import useMemberStore from "../../lib/store/useMemberStore";

type Props = {
  queryParams: Record<string, string> | undefined;
};

export default function MemberListComponent({ queryParams }: Props) {
  const selectedUser = useUIStore((state) => state.selectedUser);
  const setSelectedCohortId = useMemberStore(
    (state) => state.setSelectedCohortId
  );

  const { pages, currentPage, updatePageCount, updateTotalPage } =
    usePagination({
      currnetTotalPage: 1,
    });
  const { isLoading, data } = useMemberList({
    currentPage,
    queryParams,
  });

  useEffect(() => {
    if (data?.totalPages) {
      updateTotalPage(data.totalPages);
    }
  }, [data]);
  if (isLoading) return <div> loading... </div>;
  return (
    <>
      {data && (
        <>
          <p className="pl-5 mb-10">전체 {data.totalElements}</p>

          <ul className="pl-5 flex flex-col gap-2">
            {data.content.map((item) => (
              <li
                className="border-b-1 border-gray-300 p-2 hover:bg-gray-300 flex"
                key={item.id}
                onClick={() => {
                  selectedUser(item.id);
                  setSelectedCohortId(+item.generation);
                }}
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

      <PaginationComponent
        pages={pages}
        currentPage={currentPage}
        updatePageCount={updatePageCount}
      />
    </>
  );
}
