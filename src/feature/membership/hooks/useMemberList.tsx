import { useQuery } from "@tanstack/react-query";
import { ADMIN_MEMBER_LIST } from "../const/urls";
import type { IMembers } from "../types";

type Props = {
  currentPage?: number;
  queryParams?: Record<string, string>;
};

export default function useMemberList({ currentPage, queryParams }: Props) {
  return useQuery({
    queryKey: ["members", currentPage, queryParams],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage + "",
        ...queryParams,
      });
      const res = await fetch(`${ADMIN_MEMBER_LIST}?` + params.toString());
      return await res.json();
    },
    select: (res: IMembers) => res.data,
  });
}
