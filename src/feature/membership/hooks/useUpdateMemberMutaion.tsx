import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ICreateInputs, IMembers } from "../types";
import { ADMIN_MEMBER_LIST } from "../const/urls";

type Props = {
  userId: number;
  onSuccess?: (data: IMembers) => void;
  onError?: (state: Error) => void;
};

export default function useUpdateMemberMutaion({
  userId,
  onSuccess,
  onError,
}: Props) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateMemberInfo", userId],
    mutationFn: async (
      userInfo: Omit<ICreateInputs, "generation" | "partName" | "teamName">
    ) => {
      const res = await fetch(`${ADMIN_MEMBER_LIST}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
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
