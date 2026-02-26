export interface IAttendance {
  id: number;
  sessionId: number;
  memberId: number;
  status: string;
  lateMinutes: number | null;
  penaltyAmount: number;
  reason: string | null;
  checkedInAt: string;
  createdAt: string;
  updatedAt: string;
}

export type Deposits = IDeposit[];
export interface IDeposit {
  id: number;
  cohortMemberId: number;
  type: string;
  amount: number;
  balanceAfter: number;
  attendanceId: number | null;
  description: string;
  createdAt: string;
}
