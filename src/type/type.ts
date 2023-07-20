export type AutoSurvey = {
  id: string;
  country: string;
  year: number;
  rent: number;
  utilities: number,
  food: number,
  basicItems: number,
  transportation: number,
  educationTotal: number,
  educationSupplies: number,
  educationFee: number,
  educationType: string,
  accommodationType: string,
  profession: string,
  locationGiven: string,
  locationClustered: string,
  numResidents: number,
  numIncomes: number,
  numFullIncomes: number,
  numChildren: number,
  totalIncome: number,
  comments: string,
  orgId: string,
  orgName: string
}

export type AutoSurveyRequestDto = {
  country: string;
  year: number;
  rent: number;
  utilities: number,
  food: number,
  basicItems: number,
  transportation: number,
  educationTotal: number,
  educationSupplies: number,
  educationFee: number,
  educationType: string,
  accommodationType: string,
  profession: string,
  locationGiven: string,
  locationClustered: string,
  numResidents: number,
  numIncomes: number,
  numFullIncomes: number,
  numChildren: number,
  totalIncome: number,
  comments: string,
  orgId: string
}

export type AutoSurveyUpdateDto = {
  country: string;
  year: number;
  rent: number;
  utilities: number,
  food: number,
  basicItems: number,
  transportation: number,
  educationTotal: number,
  educationSupplies: number,
  educationFee: number,
  educationType: string,
  accommodationType: string,
  profession: string,
  locationGiven: string,
  locationClustered: string,
  numResidents: number,
  numIncomes: number,
  numFullIncomes: number,
  numChildren: number,
  totalIncome: number,
  comments: string,
  orgId: string | string[] | undefined
}

export type ImportedAutosurvey = {
  country: string;
  year: number;
  rent: number | string;
  utilities: number | string,
  food: number | string,
  basicItems: number | string,
  transportation: number | string,
  educationTotal: number | string,
  educationSupplies: number | string,
  educationFee: number | string,
  educationType: string,
  accommodationType: string,
  profession: string,
  locationGiven: string,
  locationClustered: string,
  numResidents: number | string,
  numIncomes: number | string,
  numFullIncomes: number | string,
  numChildren: number | string,
  totalIncome: number | string,
  comments: string,
}

export type Organization = {
  orgId: string,
  orgName: string,
  surveys: AutoSurvey[]
}

export type OrgRequestDto = {
  orgName: string,
  creatorName: string
}

export type LoginUser = {
  username: string,
  password: string
}

export type AuthUser = {
  username: string,
  isAuthorizes: boolean
}

export type FormDataSingUp = {
  username: string,
  password: string,
  email: string,
  roles: string
}

export type LoggedUser = {
  username: string,
  role: string,
  token: string
  
}

export type User = {
  userId: string,
  username: string,
  password: string,
  email: string,
  roles: string,
}

export enum ROLE {
  user = "ROLE_USER",
  manager = "ROLE_MANAGER",
  admin = "ROLE_ADMIN"
}

export interface Data {
  rent: number[];
  utilities: number[];
  food: number[];
  basicItems: number[];
  transportation: number[];
  educationTotal: number[];
};