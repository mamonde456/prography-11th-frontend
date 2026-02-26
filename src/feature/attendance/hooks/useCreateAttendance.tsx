import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ADMIN_ATTENDANCES } from "../const/urls";
import { queryClient } from "../../lib/utils";

type CreateAttendanceBody = {
  sessionId: number;
  memberId: number;
  status: string;
  lateMinutes: number | null;
  reason: string;
};

type Props = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export default function useCreateAttendance({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async (body: CreateAttendanceBody) => {
      const res = await fetch(ADMIN_ATTENDANCES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
      onSuccess?.();
    },
    onError: (error) => onError?.(error),
  });
}
