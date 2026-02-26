import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ADMIN_ATTENDANCES } from "../const/urls";
import { queryClient } from "../../lib/utils";

type UpdateAttendanceBody = {
  status: string;
  lateMinutes: number | null;
  reason: string;
};

type Props = {
  attendanceId: number;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export default function useUpdateAttendance({
  attendanceId,
  onSuccess,
  onError,
}: Props) {
  return useMutation({
    mutationFn: async (body: UpdateAttendanceBody) => {
      const res = await fetch(`${ADMIN_ATTENDANCES}/${attendanceId}`, {
        method: "PUT",
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
