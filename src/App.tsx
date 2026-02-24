import MembershipManagementComponents from "./feature/membership/MembershipManagementComponent";
import MainMenu from "./feature/common/MainMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lable from "./feature/common/Label";
import useUIStore from "./feature/lib/store/useUIStore";

const queryClient = new QueryClient();

function App() {
  const user = useUIStore((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-lvh flex">
        <MainMenu />
        <div className="flex-4">
          <Lable />
          <MembershipManagementComponents />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
