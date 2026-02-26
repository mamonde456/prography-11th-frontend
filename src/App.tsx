import MembershipManagementComponents from "./feature/membership/components/MembershipManagementComponent";
import MainMenu from "./feature/common/components/MainMenu";
import { QueryClientProvider } from "@tanstack/react-query";
import Lable from "./feature/common/components/Label";
import useUIStore from "./feature/lib/store/useUIStore";
import AttendanceManagerComponent from "./feature/attendance/components/AttendanceManagerComponent";
import { queryClient } from "./feature/lib/utils";

const ComponentMap = {
  "회원 관리": <MembershipManagementComponents />,
  "출결 관리": <AttendanceManagerComponent />,
  "세션 관리": null,
};

function App() {
  const title = useUIStore((state) => state.title);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-lvh flex">
        <MainMenu />
        <div className="flex-4 relative">
          <Lable />
          {ComponentMap[title]}
        </div>
      </div>
    </QueryClientProvider>
  );
}
export default App;
