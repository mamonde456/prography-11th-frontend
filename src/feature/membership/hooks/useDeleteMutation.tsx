import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IMembers } from "../types";
import { ADMIN_MEMBER_LIST } from "../const/urls";

type Props = {
  userId: number;
  onSuccess?: (data: IMembers) => void;
  onError?: (state: Error) => void;
};

export default function useDeleteMutation({
  userId,
  onSuccess,
  onError,
}: Props) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete", userId],
    mutationFn: async () => {
      const res = await fetch(`${ADMIN_MEMBER_LIST}/${userId}`, {
        method: "DELETE",
      });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      onSuccess?.(data);
    },
    onError: (error) => onError?.(error),
  });
}
