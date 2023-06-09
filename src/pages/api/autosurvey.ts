import { AutoSurvey } from "../type/type";

const BASE_URL = `http://localhost:9000/api/autosurveys`;

export async function getSurveys() {
   const apiResponse = await fetch(BASE_URL, { cache: 'no-store' });
   const data = await apiResponse.json();
  return data;
};

export async function getSurvey(id: string) {
  const autosurveysURL = BASE_URL + `/${id}`;
  const apiResponse = await fetch(autosurveysURL, { cache: 'no-store' });
  const data = await apiResponse.json();
 return data;
}

export async function addSurvey(autosurvey: AutoSurvey) {
  const response = await fetch(BASE_URL, {
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
  const autosurveysURL = BASE_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "PATCH",
    body: JSON.stringify(autosurvey),
    headers: {
      "content-type": "application/json",
    },  });
  const json = (await response.json()) as { updatedSurvey: AutoSurvey };
  return json;
}; 

export async function deleSurvey(id: string) {
  const autosurveysURL = BASE_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
  });
  // const json = (await response.json()) as { deletedSurvey: AutoSurvey };
  // console.log("json: ", json);
  // return json;
}; 