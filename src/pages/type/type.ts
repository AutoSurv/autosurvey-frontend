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

export type Country = {
  countryId: string,
  country: string,
  surveys: AutoSurvey[]
}

export type CountryRequestDto = {
  country: string
}

export type Organization = {
  orgId: string,
  orgName: string,
  countries: Country[]
}

export type OrgRequestDto = {
  orgName: string
}

