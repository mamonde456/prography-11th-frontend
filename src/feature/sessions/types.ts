import type { IAttendance } from "../attendance/types";

export type ISessions = ISession[];
export interface ISession {
  id: number;
  cohortId: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: string;
  attendanceSummary: {
    present: number;
    absent: number;
    late: number;
    excused: number;
    total: number;
  };
  qrActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMemberSessions {
  memberId: number;
  memberName: string;
  generation: number;
  partName: string;
  teamName: string;
  deposit: number;
  excuseCount: number;
  attendances: IAttendance[];
}
