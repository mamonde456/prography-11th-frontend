import { useEffect, useState } from "react";
import CreateMemberComponent from "./CreateMemberComponent";
import EditMemberInfoComponent from "./EditMemberInfoComponent";
import useUIStore from "../../lib/store/useUIStore";
import { cn } from "../../lib/utils";
import MemberListComponent from "./MemberListComponent";
import { useForm, type SubmitHandler } from "react-hook-form";
type Inputs = {
  category: string;
  keyword: string;
};
type Type = "사용자명" | "팀명" | "포지션명";

const searchType = {
  사용자명: "searchType",
  팀명: "teamName",
  포지션명: "partName",
};

export default function MembershipManagementComponents() {
  const [fullView, setFullView] = useState(false);
  const [params, setParams] = useState<Record<string, string>>({});
  const isCreateMemberView = useUIStore((state) => state.isCreateMemberView);
  const selectedUser = useUIStore((state) => state.selectedUser);
  const userId = useUIStore((state) => state.userId);
  const setIsCreateMemberView = useUIStore(
    (state) => state.setIsCreateMemberView
  );
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { category, keyword } = data;
    const queryType = searchType[category as Type];
    setParams({ [queryType]: keyword });
  };

  useEffect(() => {
    if (watch("keyword") === "") {
      setParams({});
    }
  }, [watch("keyword")]);

  return (
    <div className="flex flex-col">
      <section className="p-5 flex-1">
        {isCreateMemberView ? (
          <CreateMemberComponent />
        ) : (
          <>
            <section className="p-5 flex gap-3">
              <form className="flex gap-3" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="search">검색항목</label>
                <select
                  className="border-1 border-gray-300"
                  {...register("category", { required: true })}
                  defaultValue={"사용자명"}
                >
                  <option>사용자명</option>
                  <option>팀명</option>
                  <option>포지션명</option>
                </select>
                <input
                  className="border-1 border-gray-300"
                  type="search"
                  id="search"
                  {...register("keyword", { required: true })}
                ></input>
                <button
                  className="border bg-gray-100 text-gray-800 rounded-[5px] px-5"
                  type="submit"
                >
                  검색
                </button>
              </form>
              <button
                className="border bg-gray-700 text-gray-200 rounded-[5px] px-5"
                onClick={() => setIsCreateMemberView(true)}
              >
                회원 등록
              </button>
            </section>

            <MemberListComponent queryParams={params} />
          </>
        )}
      </section>
      {userId && (
        <section
          className={cn(
            "h-lvh flex absolute top-0 right-0 bg-white transition-all",
            fullView ? "w-full" : "w-[50vw]"
          )}
        >
          <div
            className={cn(
              "absolute flex justify-center transition-all",
              fullView ? "right-10 gap-5 " : "-left-20 flex-col gap-2"
            )}
          >
            <button onClick={() => selectedUser(null)}>닫기</button>
            <button onClick={() => setFullView((prev) => !prev)}>
              {fullView ? "줄여보기" : "전체보기"}
            </button>
          </div>

          <EditMemberInfoComponent />
        </section>
      )}
    </div>
  );
}
