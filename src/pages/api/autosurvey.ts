import { Dispatch, SetStateAction } from "react";
import { AutoSurvey, Country, CountryRequestDto, OrgRequestDto, Organization } from "../type/type";


//Survey section
const BASE_SURVEY_URL = `http://localhost:8080/api/autosurveys`;

export async function getSurveys() {
   const apiResponse = await fetch(BASE_SURVEY_URL, { cache: 'no-store' });
   const data = await apiResponse.json();
  return data;
};

export async function getSurvey(id: string) {
  const autosurveysURL = BASE_SURVEY_URL + `/${id}`;
  const apiResponse = await fetch(autosurveysURL, { cache: 'no-store' });
  const data = await apiResponse.json();
 return data;
}

export async function addSurvey(autosurvey: AutoSurvey) {
  const response = await fetch(BASE_SURVEY_URL, {
    method: "POST",
    body: JSON.stringify(autosurvey),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await response.json()) as { addedSurvey: AutoSurvey };
  return json;
};

export async function updateSurvey(autosurvey: AutoSurvey) {
  const id = autosurvey.id
  const autosurveysURL = BASE_SURVEY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "PATCH",
    body: JSON.stringify(autosurvey),
    headers: {
      "content-type": "application/json",
    },  });
  const json = (await response.json()) as { updatedSurvey: AutoSurvey };
  return json;
}; 

export async function deleteSurvey(id: string) {
  const autosurveysURL = BASE_SURVEY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
  });
}; 


//Organization section
const BASE_ORG_URL = `http://localhost:8080/api/organizations`;

export async function getOrganizations(setOranizations: Dispatch<SetStateAction<Organization[]>> ) {
   const apiResponse = await fetch(BASE_ORG_URL, { cache: 'no-store' });
   const data: Organization[] = await apiResponse.json();
   setOranizations(data);
};

export async function getOrganization(orgid: string | string[], setOrganization: Dispatch<SetStateAction<Organization>> ) {
  const organizationURL = BASE_ORG_URL + `/${orgid}`;
  const apiResponse = await fetch(organizationURL, { cache: 'no-store' });
  const data: Organization = await apiResponse.json();
  setOrganization(data);
}

export async function addOrganization(event: React.FormEvent<HTMLFormElement>, setOranizations: Dispatch<SetStateAction<Organization[]>>, setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {
   
  const reqBody: OrgRequestDto = {
    orgName: event.currentTarget.orgname.value
  };

  if(!reqBody.orgName) {
    setErrMessage('Please choose a name for your organization');
  }

  const response = await fetch(BASE_ORG_URL, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });

  if(response.ok) {
    await getOrganizations(setOranizations);
    setOpen(false);
    setErrMessage("");
  }
  //const json = (await response.json()) as { addedOrg: Organization };
  //return json;
};

export async function updateOrganizaion(autosurvey: AutoSurvey) {
  const id = autosurvey.id
  const autosurveysURL = BASE_ORG_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "PATCH",
    body: JSON.stringify(autosurvey),
    headers: {
      "content-type": "application/json",
    },  });
  const json = (await response.json()) as { updatedSurvey: AutoSurvey };
  return json;
}; 

export async function deleOrganizaion(id: string) {
  const autosurveysURL = BASE_ORG_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
  });
}; 




//Country section
const BASE_COUNTRY_URL = `http://localhost:8080/api/countrygroups`;

export async function getCountries(setCountries: Dispatch<SetStateAction<Country[]>>) {
   const apiResponse = await fetch(BASE_COUNTRY_URL, { cache: 'no-store' });
   const data : Country[] = await apiResponse.json();
   setCountries(data);
  return data;
};

export async function stuff() {
   const apiResponse = await fetch(BASE_COUNTRY_URL, { cache: 'no-store' });
   const data : Country[] = await apiResponse.json();
  return data;
};

export async function getCountry(id: string) {
  const autosurveysURL = BASE_COUNTRY_URL + `/${id}`;
  const apiResponse = await fetch(autosurveysURL, { cache: 'no-store' });
  const data = await apiResponse.json();
 return data;
};

export async function addCountry(orgid: string | string[] | undefined, event: React.FormEvent<HTMLFormElement>, setCountries: Dispatch<SetStateAction<Country[]>>, setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {
  
  const orgCountryURL = BASE_ORG_URL + `/${orgid}/countries` 
  const reqBody: CountryRequestDto = {
    country: event.currentTarget.country.value
  };

  console.log("reqBody", reqBody)

  if(!reqBody.country) {
    setErrMessage('Please choose a country');
  }

  const response = await fetch(orgCountryURL, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });

  if(response.ok) {
    await getCountries(setCountries);
    setOpen(false);
    setErrMessage("");
  }
};

export async function updateCountry(autosurvey: AutoSurvey) {
  const id = autosurvey.id
  const autosurveysURL = BASE_COUNTRY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "PATCH",
    body: JSON.stringify(autosurvey),
    headers: {
      "content-type": "application/json",
    },  });
  const json = (await response.json()) as { updatedSurvey: AutoSurvey };
  return json;
}; 

export async function deleCountry(id: string) {
  const autosurveysURL = BASE_COUNTRY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
  });
}; 