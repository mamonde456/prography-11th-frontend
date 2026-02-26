import { useQuery } from "@tanstack/react-query";
import { ADMIN_COHORT_MEMBERS } from "../const/urls";

type Props = {
  memberId: number | null;
};

export default function useDeposits({ memberId }: Props) {
  return useQuery({
    queryKey: ["deposits", memberId],
    queryFn: async () => {
      const res = await fetch(`${ADMIN_COHORT_MEMBERS}/${memberId}/deposits`);
      return await res.json();
    },
    enabled: memberId !== null,
    select: (res) => res.data,
  });
}
