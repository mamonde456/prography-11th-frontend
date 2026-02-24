import { useState } from "react";
import CreateMemberComponent from "./CreateMemberComponent";
import EditMemberInfoComponent from "./EditMemberInfoComponent";
import useUIStore from "../lib/store/useUIStore";
import { cn } from "../lib/utils";
import MemberListComponent from "./MemberListComponent";

export default function MembershipManagementComponents() {
  const [fullView, setFullView] = useState(false);
  const isCreateMemberView = useUIStore((state) => state.isCreateMemberView);
  const selectedUser = useUIStore((state) => state.selectedUser);
  const userId = useUIStore((state) => state.user);
  return (
    <div className="flex flex-col">
      <section className="p-5">
        {isCreateMemberView ? (
          <CreateMemberComponent />
        ) : (
          <MemberListComponent />
        )}
      </section>
      {userId && (
        <section
          className={cn(
            "flex absolute top-0 right-0 transition-all bg-white",
            fullView ? "w-full" : "min-w-[600px]"
          )}
        >
          <div className="flex flex-col justify-center">
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
