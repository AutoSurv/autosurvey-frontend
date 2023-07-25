import { Survey, Data, Organization, Pagination } from "@/type/type";

export const initOrg: Organization = {
  orgId: "",
  orgName: "",
  surveys: []
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
  orgId: "",
  orgName: ""
}

export const initPagination: Pagination = {
  first: true, 
  last: false,
  numberOfElements: 1,
  pageSize: 100,
  surveys: [],
  totalPages: 1
}