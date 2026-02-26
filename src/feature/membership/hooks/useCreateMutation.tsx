import { useMutation } from "@tanstack/react-query";
import type { ICreateInputs } from "../types";
import { ADMIN_MEMBER_LIST } from "../const/urls";

type Props<T> = {
  onSuccess: () => void;
  onError: (state: T) => void;
};

export default function useCreateMutation<T>({ onSuccess, onError }: Props<T>) {
  return useMutation({
    mutationKey: ["updateMemberInfo"],
    mutationFn: async (
      userInfo: Omit<ICreateInputs, "generation" | "partName" | "temaName"> & {
        password: string;
      }
    ) => {
      const res = await fetch(ADMIN_MEMBER_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    },
    onSuccess: () => onSuccess(),
    onError: (error) => onError(error as T),
  });
}
