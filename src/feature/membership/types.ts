export interface IMembers {
  data: {
    content: IContent[];
    size: number;
    page: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface IContent {
  id: number;
  loginId: number;
  name: string;
  phone: string;
  status: string;
  role: string;
  generation: string;
  partName: string;
  teamName: string;
  deposit: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInputs {
  name?: string;
  loginId?: string;
  generation: string;
  partName: string;
  teamName: string;
  contact?: string;
  phone?: string;
  email?: string;
}
export interface ICreateInputs extends IInputs {
  cohortId: number;
  partId: number;
  teamId: number;
}

export interface ICreateError {
  success: boolean;
  error: {
    code: string;
    message: string;
  };
}
