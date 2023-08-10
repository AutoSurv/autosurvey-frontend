import { Dispatch, SetStateAction } from "react";
import { Survey, SurveyRequestDto, SurveyUpdateDto, FormDataSingUp, LoginUser, OrgRequestDto, Organization, User, Pagination, ReqOptions } from "../type/type";
import router from "next/router";
import { addImportedSurveyApi, addOrganizationApi, addSurveyApi, authenticateUserApi, deleteOrganizationApi, deleteSurveyApi, getOrganizationApi, getOrganizationsApi, getSurveyApi, getSurveysApi, getUserApi, signUpUserApi, updateOrganizationNameApi, updateSurveyApi } from "@/pages/api/surveyAPI";


let jwt: string = "";
if (typeof window !== "undefined") {
  jwt = localStorage.getItem("jwt")!;
}

//Organization section

export async function getOrganizations(setOrganizations: Dispatch<SetStateAction<Organization[]>>) {
  const apiResponse = await getOrganizationsApi();

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
  
  const apiResponse = await getOrganizationApi(orgid);

  if (apiResponse.status !== 200) {
    localStorage.clear();
    router.push("/");
  }   

  const data: Organization = await apiResponse.json();
  setOrganization(data);
  return data;

}

export async function addOrganization(event: React.FormEvent<HTMLFormElement>, setOrganizations: Dispatch<SetStateAction<Organization[]>>, setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>, username: string) {
  const reqBody: OrgRequestDto = {
    orgName: event.currentTarget.orgname.value,
    creatorName: username
  };

  const reqOptions: ReqOptions = setRequestOptions("POST", reqBody);

  if (!reqBody.orgName) {
    setErrMessage('Please choose a name for your organization');
  }

  const response = await addOrganizationApi(reqOptions);

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
    creatorName: ""
  }

  if (!reqBody.orgName) {
    setErrMessage("Please edit name");
  }

  const reqOptions = setRequestOptions("PATCH", reqBody);

  updateOrganizationNameApi(id, reqOptions)
  await getOrganization(id, setOrganization);
  await getOrganizations(setOrganizations);
  setOpen(false);
  setErrMessage('');
};

export async function deleteOrganization(id: string, setOrganizations: Dispatch<SetStateAction<Organization[]>>) {
  await deleteOrganizationApi(id);
  await getOrganizations(setOrganizations);
};

//Survey section

export async function getSurveys(setPagination: Dispatch<SetStateAction<Pagination>>, setSurveys: Dispatch<SetStateAction<Survey[]>>) {
  const apiResponse = await getSurveysApi();

  if (apiResponse.status === 200) {
    const data: Pagination = await apiResponse.json();
    setPagination(data);
    setSurveys(data.surveys);
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }
};

export async function getSurvey(surveyId: string | string[] | undefined, setSurvey: Dispatch<SetStateAction<Survey>>) {

  const apiResponse = await getSurveyApi(surveyId);
  if (apiResponse.status === 200) {
    const data: Survey = await apiResponse.json();
    setSurvey(data);
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }
}

export async function addSurvey(event: React.FormEvent<HTMLFormElement>,
  orgId: string, setPagination: Dispatch<SetStateAction<Pagination>>, setSurveys: Dispatch<SetStateAction<Survey[]>>, setOrganization: Dispatch<SetStateAction<Organization>>,
  setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {
  const reqBody: SurveyRequestDto = {
    id: "",
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

  const reqOptions: ReqOptions = setRequestOptions("POST", reqBody);

  await addSurveyApi(reqOptions);
  await getSurveys(setPagination, setSurveys);
  await getOrganization(orgId, setOrganization)
  setOpen(false);
  setErrMessage('');
}

export async function addImportedSurvey(
  surveyArr: Survey[],
  orgId: string,
  setPagination: Dispatch<SetStateAction<Pagination>>,
  setErrMessage: Dispatch<SetStateAction<string>>,
  setSuccessMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setSurveys: Dispatch<SetStateAction<Survey[]>>,
  setOrganization: Dispatch<SetStateAction<Organization>>
  ) {

  let duplicateCounter: number = 0;

  for (let i = 0; i < surveyArr.length; i++) {
    const reqBody: SurveyRequestDto = {
      id: surveyArr[i].id,
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

    const allSurveyinDB = await getSurveyApi(reqBody.id);

    console.log("apiService.addImportedSurvey.allSurveyinDB.status: ", allSurveyinDB.status);
    if (allSurveyinDB.status === 200) {
      //setErrMessage("Survey already saved on database");
      duplicateCounter++;
      continue;
    } else if (allSurveyinDB.status !== 404) {
      setErrMessage("Cannot retrieve survey list from database");
      return;
    }

    const reqOptions: ReqOptions = setRequestOptions("POST", reqBody);
    await addImportedSurveyApi(reqOptions);
    await getSurveys(setPagination,setSurveys);
    await getOrganization(orgId, setOrganization)
    setOpen(false);
    setErrMessage('');
  }

  if (duplicateCounter > 0 ) {
    setSuccessMessage("Import success! Found " + duplicateCounter + "duplicates");
    return
  }

  setSuccessMessage("Import success!");

}

export async function updateSurvey(
  id: string | string[] | undefined, 
  event: React.FormEvent<HTMLFormElement>,
  setSurvey: Dispatch<SetStateAction<Survey>>, setOpen: Dispatch<SetStateAction<boolean>>,
  setErrMessage: Dispatch<SetStateAction<string>>, orgid: string | string[] | undefined) {

  const reqBody: SurveyUpdateDto = {
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

  const reqOptions: ReqOptions = setRequestOptions("PATCH", reqBody);
  await updateSurveyApi(id, reqOptions);
  await getSurvey(id, setSurvey);
  setOpen(false);
  setErrMessage('');
};

export async function deleteSurvey(
  id: string | string[] | undefined, 
  setPagination: Dispatch<SetStateAction<Pagination>>,
  setSurveys: Dispatch<SetStateAction<Survey[]>>) {

  await deleteSurveyApi(id);
  await getSurveys(setPagination, setSurveys);
};

//userSection
export async function getUser(name: string, setUser: Dispatch<SetStateAction<User>> ) {
 const apiResponse = await getUserApi(name);
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

export async function signUpUser(data: FormDataSingUp) {
  if (
    !data.username &&
    !data.password &&
    !data.email
  ) {
    return null;
  }

  const response = await signUpUserApi(data);
  return response;
}

export async function authenticateUser(user: LoginUser) {
  const response = await authenticateUserApi(user)
  return response;
}

export function setRequestOptions(typeOfRequest: string, reqBody: Object) {
  const reqOptions: ReqOptions = {
    method: typeOfRequest,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    },
    body: JSON.stringify(reqBody)
  };
  return reqOptions;
}

