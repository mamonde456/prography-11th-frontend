import { useQuery } from "@tanstack/react-query";
import { ADMIN_MEMBER_LIST } from "../const/urls";
import type { IContent } from "../types";

type Props = {
  userId: number;
};

export default function useMemberDetail({ userId }: Props) {
  return useQuery({
    queryKey: ["memberInfo", userId],
    queryFn: async () => {
      const res = await fetch(`${ADMIN_MEMBER_LIST}/${userId}`);
      return await res.json();
    },
    select: (res: { data: IContent }) => res.data,
  });
}
