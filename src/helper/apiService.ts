import { Dispatch, SetStateAction } from "react";
import {
  Survey, SurveyUpdateDto, FormDataSingUp,
  LoginUser, OrgRequestDto, Organization, ReqOptions, UserStatusDto, UserDto
} from "../type/type";
import {
  addImportedSurveyApi, addOrganizationApi, addSurveyApi,
  editUserToOrgApi,
  authenticateUserApi, deleteOrganizationApi, deleteSurveyApi,
  getOrganizationApi, getOrganizationsApi, getSurveyApi,
  getUserApi, getUsersApi, signUpUserApi, updateOrganizationNameApi, updateSurveyApi, updateUserStatusApi, getSurveysApi
} from "@/pages/api/surveyAPI";
import router from "next/router";

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

export async function addOrganization(event: React.FormEvent<HTMLFormElement>, 
  setOrganizations: Dispatch<SetStateAction<Organization[]>>, setOpen: Dispatch<SetStateAction<boolean>>, 
  setErrMessage: Dispatch<SetStateAction<string>>, username: string) {
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

export async function updateOrganizationName(id: string, event: React.FormEvent<HTMLFormElement>, 
  setOrganizations: Dispatch<SetStateAction<Organization[]>>, setOrganization: Dispatch<SetStateAction<Organization>>, 
  setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {

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

export async function editUserToOrg(
  orgId: string, user: UserDto, 
    setUser: Dispatch<SetStateAction<UserDto>>, 
    setUsers: Dispatch<SetStateAction<UserDto[]>>
) {

  await updateUserStatus(user, setUsers, setUser).then(async (updatedUser) => {
    const reqBody: UserDto = {
      userId: updatedUser!.userId,
      username: updatedUser!.username,
      email: updatedUser!.email,
      roles: updatedUser!.roles,
      status: updatedUser!.status
    }
    const reqOptions = setRequestOptions("PATCH", reqBody);
    const apiResponse = await editUserToOrgApi(orgId, reqOptions);
    if (apiResponse.status === 202) {
      const data: Organization = await apiResponse.json();
      return data;
    }

  });

};

export async function deleteOrganization(id: string, setOrganizations: Dispatch<SetStateAction<Organization[]>>) {
  await deleteOrganizationApi(id);
  await getOrganizations(setOrganizations);
};

//Survey section

export async function getSurveys(setSurveys: Dispatch<SetStateAction<Survey[]>>, propOrgId: string) {

  const apiResponse = await getSurveysApi(propOrgId);

  if (apiResponse.status === 200) {
    const data: Survey[] = await apiResponse.json();
    setSurveys(data.filter(survey => {
      return survey.orgId === propOrgId;
    }));
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }
};

export async function getSurvey(orgId: string | string[] | undefined, surveyId: string | string[] | undefined, setSurvey: Dispatch<SetStateAction<Survey>>) {

  const apiResponse = await getSurveyApi(orgId, surveyId);
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
  org: Organization, userDto: UserDto, 
  setSurveys: Dispatch<SetStateAction<Survey[]>>, setOrganization: Dispatch<SetStateAction<Organization>>,
  setOpen: Dispatch<SetStateAction<boolean>>, setErrMessage: Dispatch<SetStateAction<string>>) {
  
    const reqBody: Survey = {
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
    orgId: org.orgId,
    orgName: org.orgName,
    userId: userDto.userId
  };

  if (!reqBody.country || !reqBody.orgId) {
    setErrMessage('Please fill the form.');
    return;
  }

  const reqOptions: ReqOptions = setRequestOptions("POST", reqBody);

  await addSurveyApi(reqOptions);
  await getSurveys(setSurveys, org.orgId);
  await getOrganization(reqBody.orgId, setOrganization)
  setOpen(false);
  setErrMessage('');
}

export async function addImportedSurvey(
  surveyArr: Survey[],
  organization: Organization,
  setErrMessage: Dispatch<SetStateAction<string>>,
  setSuccessMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setSurveys: Dispatch<SetStateAction<Survey[]>>,
  setOrganization: Dispatch<SetStateAction<Organization>>,
  setProgressCounter: Dispatch<SetStateAction<number>>,
  user: UserDto
) {

  let importCounter: number = 0;
  let updateCounter: number = 0;
  let errorCounter: number = 0;
  for (let i = 0; i < surveyArr.length; i++) {
    const reqBody: Survey = {
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
      orgId: organization.orgId,
      orgName: organization.orgName,
      userId: user.userId
    };

    if (!reqBody.orgId) {
      setErrMessage('Organiztion information is missing on survey: ' + reqBody.id + ". Import skipped");
      continue;
    }

    if (reqBody.id !== undefined && reqBody.id !== '') {
      const listOfSurveys: String[] = organization.surveysIds;
      const surveyFound = listOfSurveys.find(survey => survey === reqBody.id);

      if (surveyFound != undefined) {
        const reqOptions: ReqOptions = setRequestOptions("PATCH", reqBody);
        const response = await updateSurveyApi(reqBody.id, reqOptions);
        if (response.status === 202) {
          updateCounter++;
          setProgressCounter(updateCounter);
        } else {
          setErrMessage("Survey " + reqBody.id + " not updated due to error: " + response.status);
          errorCounter++;
        }
        continue;
      }

      const reqOptions: ReqOptions = setRequestOptions("POST", reqBody);
      const response = await addImportedSurveyApi(reqOptions);
      if (response.status === 201) {
        importCounter++;
        setProgressCounter(updateCounter + importCounter);
      } else {
        setErrMessage("Survey " + reqBody.id + " not imported due to error: " + response.status);
        errorCounter++;
      }

    } else {
      const reqOptions: ReqOptions = setRequestOptions("POST", reqBody);

      const response = await addImportedSurveyApi(reqOptions);
      if (response.status === 201) {
        importCounter++;
        setProgressCounter(updateCounter + importCounter);
      } else {
        setErrMessage("Survey " + reqBody.id + " not imported due to error: " + response.status);
        errorCounter++;
      }
    }

    await getSurveys(setSurveys, organization.orgId);
    await getOrganization(organization.orgId, setOrganization);
    setOpen(false);
    setErrMessage('');
  }

  if (errorCounter == 0) {
    setSuccessMessage("Success! " + importCounter + " survey(s) imported and "
      + updateCounter + " survey(s) updated out of " + (importCounter + updateCounter) + " survey(s)");
    setProgressCounter(importCounter + updateCounter);
  }

}

export async function updateSurvey(
  id: string | string[] | undefined,
  event: React.FormEvent<HTMLFormElement>,
  setSurvey: Dispatch<SetStateAction<Survey>>, setOpen: Dispatch<SetStateAction<boolean>>,
  setErrMessage: Dispatch<SetStateAction<string>>, org: Organization,
  setOrganization: Dispatch<SetStateAction<Organization>>,
  setFilteredSurveys: Dispatch<SetStateAction<Survey[]>>,
  setSurveys: Dispatch<SetStateAction<Survey[]>>,
  userDto: UserDto
) {
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
    orgId: org.orgId,
    orgName: org.orgName,
    userId: userDto.userId
  };

  const reqOptions: ReqOptions = setRequestOptions("PATCH", reqBody);
  const response = await updateSurveyApi(id, reqOptions);
  if (response.status === 202) {
    const survey = await getSurvey( org.orgId,id, setSurvey) as Survey;
    if (survey) {
      await getSurveys(setSurveys, org.orgId).then(data =>  setFilteredSurveys((data as Survey[]).filter(s => s.orgId === org.orgId)));
      await getOrganization(org.orgId, setOrganization);
    }
    
    setOpen(false);
    setErrMessage('');
  } else {
    setErrMessage("Survey not imported due to error: " + response.status);
  }

};

export async function deleteSurvey(
  id: string,
  setSurveys: Dispatch<SetStateAction<Survey[]>>,
  organization: Organization) {
    
  await deleteSurveyApi(id, organization.orgId);
  await getSurveys(setSurveys, organization.orgId);

};

//userSection

export async function getUsers(setUsers: Dispatch<SetStateAction<UserDto[]>>) {
  const apiResponse = await getUsersApi();
  if (apiResponse.status === 200) {

    const data: UserDto[] = await apiResponse.json();
    setUsers(data);
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }
}

export async function getUser(name: string, setUser: Dispatch<SetStateAction<UserDto>>) {
  const apiResponse = await getUserApi(name);
  if (apiResponse.status === 200) {

    const data: UserDto = await apiResponse.json();
    setUser(data);
    return data;
  }

  if (apiResponse.status === 500) {
    localStorage.clear();
    router.push("/");
  }
}

export async function updateUserStatus(user: UserDto, setUsers: Dispatch<SetStateAction<UserDto[]>>, setUser: Dispatch<SetStateAction<UserDto>>) {

  const reqBody: UserStatusDto = {
    status: user.status === "disapproved" || user.status === "pending" ? "approved" : "disapproved"
  }

  const reqOptions = setRequestOptions("PATCH", reqBody);

  updateUserStatusApi(user.username, reqOptions);
  const updatedUser = await getUser(user.username, setUser);
  await getUsers(setUsers);
  return updatedUser;
};


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


//
export function setRequestOptions(typeOfRequest: string, reqBody: Object) {
  let jwt: string = "";
  if (typeof window !== "undefined") {
    if (localStorage)
      jwt = localStorage.getItem("jwt")!;
  }
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