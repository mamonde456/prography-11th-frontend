import { useQuery } from "@tanstack/react-query";
import type { ICohortsInfo } from "../../lib/store/types/member";
import { ADMIN_COHORTS } from "../const/urls";

type Props = {
  selectedCohortId: number | null;
};

export default function useDetailCohort({ selectedCohortId }: Props) {
  return useQuery({
    queryKey: ["cohortsInfo", selectedCohortId],
    queryFn: async () => {
      const res = await fetch(`${ADMIN_COHORTS}/${selectedCohortId}`);
      return await res.json();
    },
    enabled: selectedCohortId != null,
    select: (res: ICohortsInfo) => res.data,
  });
}
