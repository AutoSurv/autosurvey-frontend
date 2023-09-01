import { Survey, Organization, Pagination, MeadDataForChart, User, UserDto } from "@/type/type";

export const initOrg: Organization = {
  orgId: "",
  orgName: "",
  surveys: [],
  users: []
}

export const notAnOrg: Organization = {
  orgId: "0",
  orgName: "ORGANIZATION NOT AVAILABLE",
  surveys: [],
  users: []
}

export const initSurvey: Survey = {
  country: "",
  year: 0,
  rent: 0,
  utilities: 0,
  food: 0,
  basicItems: 0,
  transportation: 0,
  educationTotal: 0,
  educationSupplies: 0,
  educationFee: 0,
  educationType: "",
  accommodationType: "",
  profession: "",
  locationGiven: "",
  locationClustered: "",
  numResidents: 0,
  numIncomes: 0,
  numFullIncomes: 0,
  numChildren: 0,
  totalIncome: 0,
  comments: "",
  id: "",
  organization: initOrg
}

export const initPagination: Pagination = {
  first: true, 
  last: false,
  numberOfElements: 1,
  pageSize: 100,
  surveys: [],
  totalPages: 1
}

export const initMeanData: MeadDataForChart = {
  meanValues: [[0,1,2,3,4,5],[0,0,0,0,0,0]],
}

export const initUser: User = {
  userId: "",
  username: "",
  password: "",
  email: "",
  roles: "",
  status: ""
}

export const initUserDto: UserDto = {
  userId: "",
  username: "",
  email: "",
  roles: "",
  status: ""
}