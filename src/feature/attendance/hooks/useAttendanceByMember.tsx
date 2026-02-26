import { useQuery } from "@tanstack/react-query";
import { ADMIN_ATTENDANCES_MEMBER_LIST } from "../const/urls";

type Props = {
  memberId: number | null;
};

export default function useAttendanceByMember({ memberId }: Props) {
  return useQuery({
    queryKey: ["attendances", memberId],
    queryFn: async () => {
      const res = await fetch(`${ADMIN_ATTENDANCES_MEMBER_LIST}/${memberId}`);
      return await res.json();
    },
    enabled: memberId !== null,
    select: (res) => res.data,
  });
}
