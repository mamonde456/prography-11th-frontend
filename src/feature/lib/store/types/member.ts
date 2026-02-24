export interface ICohorts {
  data: ICohort[];
}

export interface ICohort {
  id: number;
  generation: number;
  name: string;
  createdAt: string;
}

export interface ICohortsInfo {
  data: ICohortInfo;
}
export interface ICohortInfo {
  id: number;
  generation: number;
  name: string;
  parts: PartsOrTeams[];
  teams: PartsOrTeams[];
  createdAt: string;
}

type PartsOrTeams = { id: number; name: string };
