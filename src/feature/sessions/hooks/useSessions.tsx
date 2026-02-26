import { useQuery } from "@tanstack/react-query";
import { ADMIN_SESSIONS } from "../const/urls";

export default function useSessions() {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch(ADMIN_SESSIONS);
      return await res.json();
    },
    select: (res) => res.data,
  });
}
