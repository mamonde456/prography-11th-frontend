import { useQuery } from "@tanstack/react-query";
import type { ICohorts } from "../../lib/store/types/member";
import { ADMIN_COHORTS } from "../const/urls";

export default function useCohorts() {
  return useQuery({
    queryKey: ["cohorts"],
    queryFn: async () => {
      const res = await fetch(ADMIN_COHORTS);
      return await res.json();
    },
    select: (res: ICohorts) => res.data,
  });
}
