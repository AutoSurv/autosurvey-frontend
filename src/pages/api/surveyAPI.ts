import { checkIfLocalStorageDef } from "@/helper/methods";
import { FormDataSingUp, LoginUser, ReqOptions } from "../../type/type";

//Organization section
const BASE_ORG_URL = `${process.env.NEXT_PUBLIC_PORT}/api/organizations`;

export async function getOrganizationsApi() {
  const jwt: string = checkIfLocalStorageDef();
  const apiResponse = await fetch(BASE_ORG_URL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${jwt}` },
    mode: "cors",
  });

  return apiResponse;
};

export async function getOrganizationApi(orgid: string | string[]) {
  const jwt: string = checkIfLocalStorageDef();
  const organizationURL = BASE_ORG_URL + `/${orgid}`;
  const apiResponse = await fetch(organizationURL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${jwt}` },
    mode: "cors",
  });

  return apiResponse;
}

export async function addOrganizationApi(reqOptions: ReqOptions) {

  const response = await fetch(BASE_ORG_URL, reqOptions);
  return response;

};

export async function updateOrganizationNameApi(id: string, reqOptions: ReqOptions) {

  const response = await fetch(`${BASE_ORG_URL}/${id}`, reqOptions);
  return response;
};

export async function addUserToOrgApi(orgId: string, userId: string , reqOptions: ReqOptions) {

  const response = await fetch(`${BASE_ORG_URL}/${orgId}/manage`, reqOptions);
  return response;
};

export async function deleteOrganizationApi(id: string) {
  const jwt: string = checkIfLocalStorageDef();
  const autosurveysURL = BASE_ORG_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` }
  });
};

//Survey section
const BASE_SURVEY_URL = `${process.env.NEXT_PUBLIC_PORT}/api/autosurveys`;

export async function getSurveysApi() {
  const jwt: string = checkIfLocalStorageDef();
  const apiResponse = await fetch(BASE_SURVEY_URL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${jwt}` },
    mode: "cors",
  });

  return apiResponse;
};

export async function getSurveyApi(surveyId: string | string[] | undefined) {
  const jwt: string = checkIfLocalStorageDef();
  const autosurveysURL = BASE_SURVEY_URL + `/${surveyId}`;
  const apiResponse = await fetch(autosurveysURL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${jwt}` },
    mode: "cors",
  });
  
  return apiResponse;
}

export async function addSurveyApi(reqOptions: ReqOptions) {
  const response = await fetch(BASE_SURVEY_URL, reqOptions);
  return response;
}

export async function addImportedSurveyApi(reqOptions: ReqOptions) {

    const response = await fetch(BASE_SURVEY_URL, reqOptions);
    return response;

}

export async function updateSurveyApi(
  id: string | string[] | undefined, 
  reqOptions: ReqOptions) {
  const autosurveysURL = BASE_SURVEY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, reqOptions);
  return response;
};

export async function deleteSurveyApi(id: string) {
  const jwt: string = checkIfLocalStorageDef();
  const autosurveysURL = BASE_SURVEY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });

  await getSurveysApi();

};

//userSection
const BASE_USER_URL = `${process.env.NEXT_PUBLIC_PORT}/users`;
const AUTH_URL = `${process.env.NEXT_PUBLIC_PORT}/authenticate`;
const NEW_USER_URL = `${BASE_USER_URL}/new`;


export async function getUserApi(name: string) {
  const jwt: string = checkIfLocalStorageDef();
 const userURL = BASE_USER_URL + `/${name}`;
 const apiResponse = await fetch(userURL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${jwt}` },
    mode: "cors",
  });
 
  return apiResponse;
}

export async function getAllUsersApi() {
 const jwt: string = checkIfLocalStorageDef();
 const userURL = BASE_USER_URL;
 const apiResponse = await fetch(userURL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${jwt}` },
    mode: "cors",
  });
  return apiResponse;
}

export async function signUpUserApi(data: FormDataSingUp) {

  const response = await fetch(NEW_USER_URL, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  return response;
}


export async function authenticateUserApi(user: LoginUser) {
  const response = await fetch(AUTH_URL, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json",
    },
  })
  return response;
}