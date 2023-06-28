import { Dispatch, SetStateAction } from "react";
import { AutoSurvey, AutoSurveyRequestDto, AutoSurveyUpdateDto, OrgRequestDto, Organization } from "../type/type";


//Organization section
const BASE_ORG_URL = `http://localhost:8080/api/organizations`;

export async function getOrganizations(setOrganizations: Dispatch<SetStateAction<Organization[]>>) {
  const apiResponse = await fetch(BASE_ORG_URL, { cache: 'no-store' });
  const data: Organization[] = await apiResponse.json();
  setOrganizations(data);
};

export async function getOrganization(orgid: string | string[], setOrganization: Dispatch<SetStateAction<Organization>>) {
  const organizationURL = BASE_ORG_URL + `/${orgid}`;
  const apiResponse = await fetch(organizationURL, { cache: 'no-store' });
  const data: Organization = await apiResponse.json();
  setOrganization(data);
  return data;
}

export async function addOrganization(event: React.FormEvent<HTMLFormElement>, setOrganizations: Dispatch<SetStateAction<Organization[]>>, setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {

  const reqBody: OrgRequestDto = {
    orgName: event.currentTarget.orgname.value
  };

  if (!reqBody.orgName) {
    setErrMessage('Please choose a name for your organization');
  }

  const response = await fetch(BASE_ORG_URL, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.ok) {
    await getOrganizations(setOrganizations);
    setOpen(false);
    setErrMessage("");
  } else {
    setErrMessage("Organization already taken.");
  }

};

export async function updateOrganizationName(id: string, event: React.FormEvent<HTMLFormElement>, setOrganizations: Dispatch<SetStateAction<Organization[]>>, setOrganization: Dispatch<SetStateAction<Organization>>, setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {

  const reqBody: OrgRequestDto = {
    orgName: event.currentTarget.orgname.value
  }

  if (!reqBody.orgName) {
    setErrMessage("Please edit name");
  }

  const reqOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody)
  };

  const response = await fetch(`${BASE_ORG_URL}/${id}`, reqOptions);
  await getOrganization(id, setOrganization);
  await getOrganizations(setOrganizations);
  setOpen(false);
  setErrMessage('');
};

export async function deleOrganization(id: string, setOrganizations: Dispatch<SetStateAction<Organization[]>>) {
  const autosurveysURL = BASE_ORG_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
  });
  await getOrganizations(setOrganizations);
};




//Survey section
const BASE_SURVEY_URL = `http://localhost:8080/api/autosurveys`;

export async function getSurveys(setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>) {
  const apiResponse = await fetch(BASE_SURVEY_URL, { cache: 'no-store' });
  const data: AutoSurvey[] = await apiResponse.json();
  setSurveys(data);
  return data;
};

export async function getSurvey(surveyId: string | string[] | undefined, setSurvey: Dispatch<SetStateAction<AutoSurvey>>) {
  console.log("surveyId: ", surveyId);

  const autosurveysURL = BASE_SURVEY_URL + `/${surveyId}`;
  const apiResponse = await fetch(autosurveysURL, { cache: 'no-store' });
  const data: AutoSurvey = await apiResponse.json();
  setSurvey(data);
}

export async function addSurvey(event: React.FormEvent<HTMLFormElement>,
  orgId: string, setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>, setOrganization: Dispatch<SetStateAction<Organization>>,
  setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {
  const reqBody: AutoSurveyRequestDto = {
    country: event.currentTarget.country.value,
    rent: event.currentTarget.rent.value,
    utilities: event.currentTarget.utilities.value,
    food: event.currentTarget.food.value,
    basicItems: event.currentTarget.basicItems.value,
    transportation: event.currentTarget.transportation.value,
    educationTotal: event.currentTarget.educationTotal.value,
    educationSupplies: event.currentTarget.educationSupplies.value,
    educationFee: event.currentTarget.educationFee.value,
    educationType: event.currentTarget.educationType.value,
    accommodationType: event.currentTarget.accommodationType.value,
    profession: event.currentTarget.profession.value,
    locationGiven: event.currentTarget.locationGiven.value,
    locationClustered: event.currentTarget.locationClustered.value,
    numResidents: event.currentTarget.numResidents.value,
    numIncomes: event.currentTarget.numIncomes.value,
    numFullIncomes: event.currentTarget.numFullIncomes.value,
    numChildren: event.currentTarget.numChildren.value,
    totalIncome: event.currentTarget.totalIncome.value,
    comments: event.currentTarget.comments.value,
    orgId: orgId,
  };

  if (!reqBody.country || !reqBody.orgId) {
    setErrMessage('Please fill the form.');
    return;
  }
  const reqOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reqBody)
  };
  const response = await fetch(BASE_SURVEY_URL, reqOptions);
  await getSurveys(setSurveys);
  await getOrganization(orgId, setOrganization)
  setOpen(false);
  setErrMessage('');
}

export async function updateSurvey(id: string | string[] | undefined, event: React.FormEvent<HTMLFormElement>,
  setSurvey: Dispatch<SetStateAction<AutoSurvey>>, setOpen: Dispatch<SetStateAction<boolean>>,
  setErrMessage: Dispatch<SetStateAction<string>>, orgid: string | string[] | undefined) {
  console.log("orgid: ", orgid)

  const reqBody: AutoSurveyUpdateDto = {
    country: event.currentTarget.country.value,
    rent: event.currentTarget.rent.value,
    utilities: event.currentTarget.utilities.value,
    food: event.currentTarget.food.value,
    basicItems: event.currentTarget.basicItems.value,
    transportation: event.currentTarget.transportation.value,
    educationTotal: event.currentTarget.educationTotal.value,
    educationSupplies: event.currentTarget.educationSupplies.value,
    educationFee: event.currentTarget.educationFee.value,
    educationType: event.currentTarget.educationType.value,
    accommodationType: event.currentTarget.accommodationType.value,
    profession: event.currentTarget.profession.value,
    locationGiven: event.currentTarget.locationGiven.value,
    locationClustered: event.currentTarget.locationClustered.value,
    numResidents: event.currentTarget.numResidents.value,
    numIncomes: event.currentTarget.numIncomes.value,
    numFullIncomes: event.currentTarget.numFullIncomes.value,
    numChildren: event.currentTarget.numChildren.value,
    totalIncome: event.currentTarget.totalIncome.value,
    comments: event.currentTarget.comments.value,
    orgId: orgid
  };
  const autosurveysURL = BASE_SURVEY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "PATCH",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
    },
  });
  await getSurvey(id, setSurvey);
  setOpen(false);
  setErrMessage('');
};

export async function deleteSurvey(id: string | string[] | undefined, setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>) {
  const autosurveysURL = BASE_SURVEY_URL + `/${id}`;
  const response = await fetch(autosurveysURL, {
    method: "DELETE",
  });
  await getSurveys(setSurveys);
};
