import { AutoSurvey } from "../type/type";


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

export async function getOrganizations() {
   const apiResponse = await fetch(BASE_ORG_URL, { cache: 'no-store' });
   const data = await apiResponse.json();
  return data;
};

export async function getOrganization(id: string) {
  const autosurveysURL = BASE_ORG_URL + `/${id}`;
  const apiResponse = await fetch(autosurveysURL, { cache: 'no-store' });
  const data = await apiResponse.json();
 return data;
}

export async function addOrganization(autosurvey: AutoSurvey) {
  const response = await fetch(BASE_ORG_URL, {
    method: "POST",
    body: JSON.stringify(autosurvey),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await response.json()) as { addedSurvey: AutoSurvey };
  return json;
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

export async function getCountries() {
   const apiResponse = await fetch(BASE_COUNTRY_URL, { cache: 'no-store' });
   const data = await apiResponse.json();
  return data;
};

export async function getCountry(id: string) {
  const autosurveysURL = BASE_COUNTRY_URL + `/${id}`;
  const apiResponse = await fetch(autosurveysURL, { cache: 'no-store' });
  const data = await apiResponse.json();
 return data;
}

export async function addCountry(autosurvey: AutoSurvey) {
  const response = await fetch(BASE_COUNTRY_URL, {
    method: "POST",
    body: JSON.stringify(autosurvey),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await response.json()) as { addedSurvey: AutoSurvey };
  return json;
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