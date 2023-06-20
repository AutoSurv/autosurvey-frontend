export type AutoSurvey = {
  id: string;
  country: string;
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
  comments: string
}

export type AutoSurveyDto = {
  id: string;
  country: string;
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
  location_given: string,
  locationClustered: string,
  numResidents: number,
  numIncomes: number,
  numFullIncomes: number,
  numChildren: number,
  totalIncome: number,
  comments: string
}

export type Country = {
  countryId: string,
  country: string
}

export type Organization = {
  orgId: string,
  orgName: string
}

export type OrgRequestDto = {
  orgName: string
}

export type CountryRequestDto = {
  orgName: string
}