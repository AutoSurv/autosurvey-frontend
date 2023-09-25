export type Survey = {
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
  orgName: string,
  userId: string
}

/* export type SurveyRequestDto = {
  id: string,
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
  organization: Organization,
  user: UserDto
} */

export type SurveyUpdateDto = {
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
  orgName: string,
  userId: string
}

export type ImportedSurvey = {
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

export type ExportedSurvey = {
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
}

export type Organization = {
  orgId: string,
  orgName: string,
  surveysIds: string[],
  usersIds: string[]
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
  roles: string,
  status: string,
  surveysIds: string[]
}

export type LoggedUser = {
  userId: string,
  username: string,
  email: string,
  role: string,
  status: string,
  token: string
}

export type User = {
  userId: string,
  username: string,
  password: string,
  email: string,
  roles: string,
  status: string
}

export type UserDto = {
  userId: string,
  username: string,
  email: string,
  roles: string,
  status: string
}

export type UserStatusDto = {
  status: string
}

export type UserID = {
  userId: string
}

export enum ROLE {
  user = "ROLE_USER",
  manager = "ROLE_MANAGER",
  admin = "ROLE_ADMIN"
}

export interface Pagination {
  first: boolean, 
  last: boolean,
  numberOfElements: number,
  pageSize: number,
  surveys: Survey[],
  totalPages: number
};

export type ReqOptions = {
  method: string,
  headers: {
    'Content-Type': 'application/json',
    Authorization: string
  },
  body: string
};

export type MeadDataForChart = {
  meanValues: number[][]
}

export type CountryGeo = {
  key: number,
  value: string,
  text: string
}

export type ClickedCountry = {
  country: string;
  clicked: boolean;
};