import { Dispatch, SetStateAction } from "react";
import { AutoSurvey, AutoSurveyRequestDto, AutoSurveyUpdateDto, FormDataSingUp, LoginUser, OrgRequestDto, Organization, User } from "../../type/type";
import router from "next/router";



let jwt: any = "";
if (typeof window !== "undefined") {
  jwt = localStorage.getItem("jwt");
}

//User section
const BASE_USER_URL = `${process.env.NEXT_PUBLIC_PORT}/users`;
export async function getUser(name: string, setUser: Dispatch<SetStateAction<User>> ) {
 const userURL = BASE_USER_URL + `/${name}`;
 const apiResponse = await fetch(userURL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    mode: "cors",
  });
  if (apiResponse.status === 200) {

    const data: User = await apiResponse.json();
    setUser(data);
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }
}

//Organization section
const BASE_ORG_URL = `${process.env.NEXT_PUBLIC_PORT}/api/organizations`;

export async function getOrganizations(setOrganizations: Dispatch<SetStateAction<Organization[]>>) {
  const apiResponse = await fetch(BASE_ORG_URL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    mode: "cors",
  });

  if (apiResponse.status === 200) {

    const data: Organization[] = await apiResponse.json();
    setOrganizations(data);
    return data;

  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }

};

export async function getOrganization(orgid: string | string[], setOrganization: Dispatch<SetStateAction<Organization>>) {
  const organizationURL = BASE_ORG_URL + `/${orgid}`;
  const apiResponse = await fetch(organizationURL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    mode: "cors",
  });
  if (apiResponse.status === 200) {

    const data: Organization = await apiResponse.json();
    setOrganization(data);
    return data;

  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }

}

export async function addOrganization(event: React.FormEvent<HTMLFormElement>, setOrganizations: Dispatch<SetStateAction<Organization[]>>, setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>, username: string) {

  const reqBody: OrgRequestDto = {
    orgName: event.currentTarget.orgname.value,
    creator: "admin"
  };

  if (!reqBody.orgName) {
    setErrMessage('Please choose a name for your organization');
  }

  const response = await fetch(BASE_ORG_URL, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
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
    orgName: event.currentTarget.orgname.value,
    creator: ""
  }

  if (!reqBody.orgName) {
    setErrMessage("Please edit name");
  }

  const reqOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    },
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
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
  });
  await getOrganizations(setOrganizations);
};




//Survey section
const BASE_SURVEY_URL = `${process.env.NEXT_PUBLIC_PORT}/api/autosurveys`;

export async function getSurveys(setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>) {
  const apiResponse = await fetch(BASE_SURVEY_URL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    mode: "cors",
  });

  if (apiResponse.status === 200) {
    const data: AutoSurvey[] = await apiResponse.json();
    setSurveys(data);
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }

};

export async function getSurvey(surveyId: string | string[] | undefined, setSurvey: Dispatch<SetStateAction<AutoSurvey>>) {

  const autosurveysURL = BASE_SURVEY_URL + `/${surveyId}`;
  const apiResponse = await fetch(autosurveysURL, {
    cache: 'no-store',
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    mode: "cors",
  });
  if (apiResponse.status === 200) {
    const data: AutoSurvey = await apiResponse.json();
    setSurvey(data);
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }
}

export async function addSurvey(event: React.FormEvent<HTMLFormElement>,
  orgId: string, setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>, setOrganization: Dispatch<SetStateAction<Organization>>,
  setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {
  const reqBody: AutoSurveyRequestDto = {
    country: event.currentTarget.country.value,
    year: event.currentTarget.year.value,
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
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    },
    body: JSON.stringify(reqBody)
  };
  const response = await fetch(BASE_SURVEY_URL, reqOptions);
  await getSurveys(setSurveys);
  await getOrganization(orgId, setOrganization)
  setOpen(false);
  setErrMessage('');
}

export async function addImportedSurvey(
  surveyArr: AutoSurvey[],
  orgId: string,
  setErrMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>,
  setOrganization: Dispatch<SetStateAction<Organization>>) {

  for (let i = 0; i < surveyArr.length; i++) {
    const reqBody: AutoSurveyRequestDto = {
      country: surveyArr[i].country,
      year: surveyArr[i].year,
      rent: surveyArr[i].rent,
      utilities: surveyArr[i].utilities,
      food: surveyArr[i].food,
      basicItems: surveyArr[i].basicItems,
      transportation: surveyArr[i].transportation,
      educationTotal: surveyArr[i].educationTotal,
      educationSupplies: surveyArr[i].educationSupplies,
      educationFee: surveyArr[i].educationFee,
      educationType: surveyArr[i].educationType,
      accommodationType: surveyArr[i].accommodationType,
      profession: surveyArr[i].profession,
      locationGiven: surveyArr[i].locationGiven,
      locationClustered: surveyArr[i].locationClustered,
      numResidents: surveyArr[i].numResidents,
      numIncomes: surveyArr[i].numIncomes,
      numFullIncomes: surveyArr[i].numFullIncomes,
      numChildren: surveyArr[i].numChildren,
      totalIncome: surveyArr[i].totalIncome,
      comments: surveyArr[i].comments,
      orgId: orgId,
    };

    if (!reqBody.country || !reqBody.orgId) {
      setErrMessage('Please fill the form.');
      return;
    }
    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify(reqBody)
    };
    const response = await fetch(BASE_SURVEY_URL, reqOptions);
    await getSurveys(setSurveys);
    await getOrganization(orgId, setOrganization)
    setOpen(false);
    setErrMessage('');
  }
}

export async function updateSurvey(id: string | string[] | undefined, event: React.FormEvent<HTMLFormElement>,
  setSurvey: Dispatch<SetStateAction<AutoSurvey>>, setOpen: Dispatch<SetStateAction<boolean>>,
  setErrMessage: Dispatch<SetStateAction<string>>, orgid: string | string[] | undefined) {

  const reqBody: AutoSurveyUpdateDto = {
    country: event.currentTarget.country.value,
    year: event.currentTarget.year.value,
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
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  });
  await getSurveys(setSurveys);
};

//userSection

const AUTH_URL = `${process.env.NEXT_PUBLIC_PORT}/authenticate`;
const NEW_USER_URL = `${process.env.NEXT_PUBLIC_PORT}/users/new`;


export async function signUpUser(data: FormDataSingUp) {

  if (
    !data.username &&
    !data.password &&
    !data.email
  ) {
    console.log("all empty fields");
    return null;
  }
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


export async function authenticateUser(user: LoginUser) {
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