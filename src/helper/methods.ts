import { authenticateUser, signUpUser } from '@/helper/apiService';
import { Survey, FormDataSingUp, ImportedSurvey, LoggedUser, LoginUser } from '@/type/type';
import router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import * as XLSX from 'xlsx';

export const downloadExcel = (data: any, filterYears: string[], filterCountries: string[], filterLocations: string[]) => {

  const surneyAsString: string = JSON.stringify(data[0]);
  const survey: Survey = JSON.parse(surneyAsString);

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  console.log("data: ", data)
  console.log("worksheet: ", worksheet)

  if (data.length == 1) {
    XLSX.writeFile(workbook, survey.orgName + "_" + survey.year + "_" + survey.country + "_" + survey.locationClustered + "_" + survey.id + ".xlsx");
  } else {
    if (filterYears.length == 1) {
      if (filterCountries.length == 1) {
        if (filterLocations.length == 1) {
          XLSX.writeFile(workbook, survey.orgName + "_" + survey.year + "_" + survey.country + "_" + survey.locationClustered +  "_" + survey.id + ".xlsx");
        } else {
          XLSX.writeFile(workbook, survey.orgName + "_" + survey.year + "_" + survey.country +  "_" + survey.id + ".xlsx");
        }  
      } else {
        XLSX.writeFile(workbook, survey.orgName + "_" + survey.year + "_" + survey.id + ".xlsx"); 
      }      
    } else {
      XLSX.writeFile(workbook, survey.orgName + ".xlsx");
    }
  }
};

export function SignOut(setSignUpStatus: Dispatch<SetStateAction<boolean>>): void {
  setSignUpStatus(false);
  localStorage.clear();
  router.push("/");

}

export async function signInJwtTokenHandler(event: React.FormEvent<HTMLFormElement>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
  setSignUpStatus: Dispatch<SetStateAction<boolean>>,
  setUserNameAuth: Dispatch<SetStateAction<string>>
): Promise<void> {

  const inputBody: LoginUser = {
    username: event.currentTarget.username.value,
    password: event.currentTarget.password.value
  }
  localStorage.clear();

  await authenticateUser(inputBody)
    .then((response) => {
      if (response.status === 200) {
        
        return response.text();
      }
      else if (response.status === 401 || response.status === 403) {
        setErrorMsg("Invalid username or password");
      } else {
        setErrorMsg(
          "Something went wrong, try again later or reach out to simonhong85@gmail.com"
        );
      }
    })
    .then((data: any) => {
      if (data) {
        const loggedUser: LoggedUser = JSON.parse(data);
        if (loggedUser) {
          localStorage.setItem("role", loggedUser.role);
          localStorage.setItem("jwt", loggedUser.token);
          localStorage.setItem("username", loggedUser.username);
          setUserNameAuth(loggedUser.username);
          setSignUpStatus(true);
          router.push("org");
        }
      }
    });
}

export async function signUpHandler(event: React.FormEvent<HTMLFormElement>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
  setSignupSuccessMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>
  ): Promise<void> {

  const inputSignUpBody: FormDataSingUp = {
    username: event.currentTarget.username.value,
    password: event.currentTarget.password.value,
    email: event.currentTarget.email.value,
    roles: "role_user"
  }
  localStorage.clear();

  if (!inputSignUpBody.username) {
    setErrorMsg('Please choose a name.');
    return;
  }
  if (!inputSignUpBody.password) {
    setErrorMsg('Please type your password.');
    return;
  }
  if (!inputSignUpBody.email) {
    setErrorMsg('Please type your email.');
    return;
  }

  await signUpUser(inputSignUpBody)
    .then((response) => {
      if (response?.status == 201) {
        setOpen(false);
        setSignupSuccessMessage("Successfully signed up");
        setErrorMsg(
          ""
        );
        return;
      } else if (response?.status == 409) {
        setErrorMsg('User aleady exists. Choose other name');
      } else {
        setErrorMsg('General error: ' + response?.status);
      }
    }  
  );
}

export function checkImportedSurveyFields(data: ImportedSurvey[]) {

  data.forEach((survey) => {
    if (survey.country === null) { survey.country = "";}  
    if (typeof survey.year !== 'number') { survey.year = 0;}  
    if (typeof survey.rent !== 'number') { survey.rent = 0;}  
    if (typeof survey.utilities !== 'number') { survey.utilities = 0;}  
    if (typeof survey.food !== 'number') { survey.food = 0;}  
    if (typeof survey.basicItems !== 'number') { survey.basicItems = 0;}  
    if (typeof survey.transportation !== 'number') { survey.transportation = 0;}  
    if (typeof survey.educationTotal !== 'number') { survey.educationTotal = 0;}  
    if (typeof survey.educationSupplies !== 'number') { survey.educationSupplies = 0;}   
    if (typeof survey.educationFee !== 'number') { survey.educationFee = 0;}  
    if (survey.educationType == null) { survey.educationType = "";}  
    if (survey.accommodationType === null) { survey.accommodationType = "";}  
    if (survey.profession === null) { survey.profession = "";}  
    if (survey.locationGiven === null) { survey.locationGiven = "";}  
    if (survey.locationClustered == null) { survey.locationClustered = "";}  
    if (typeof survey.numResidents !== 'number') { survey.numResidents = 0;}  
    if (typeof survey.numIncomes !== 'number') { survey.numIncomes = 0;}  
    if (typeof survey.numFullIncomes !== 'number') { survey.numFullIncomes = 0;}  
    if (typeof survey.numChildren !== 'number') { survey.numChildren = 0;}  
    if (typeof survey.totalIncome !== 'number') { survey.totalIncome = 0;}  
    if (survey.comments == null) { survey.comments = "";}  
  })

  return data;
}

//make it nicer with "key in"
const data = ["rent", "utilities", "food", "basicItems", "transportation", "educationTotal"] as const;
type Data = typeof data;
type DataKey = keyof Data;
// const dataKey: DataKey = ;
// console.log("Datakey: ", dataKey);

export function calculateMeanValues(country_arr: string[], filteredSurvey: Survey[]) {

  const fiveVar: string[] = ["rent", "utilities", "food", "basicItems", "transportation", "educationTotal"];
  let dataForGraph: number[][] = []; 

  for (let fiveVarIndex= 0; fiveVarIndex < fiveVar.length; fiveVarIndex++) {
    let data: number[] = []; 
    const prop = fiveVar[fiveVarIndex];

    for (let countryIndex = 0; countryIndex < country_arr.length; countryIndex++) {
      const lowerPart = filteredSurvey
      .filter((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop] && (country_arr[countryIndex] === s.locationClustered || country_arr[countryIndex] === s.country); }})
      .map((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop]; }})
      .length;

      const totalResult = filteredSurvey
      .filter((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop] && (country_arr[countryIndex] === s.locationClustered || country_arr[countryIndex] === s.country); }})
      .map((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop]; } else {return 0}})
      .reduce(function add(sum, rent) { return sum + rent; }, 0) / lowerPart;
      
      data.push(parseFloat(totalResult.toFixed(2)));
    }
    dataForGraph.push(data);
  }
  return dataForGraph;
}

function isSurveyKey <T>(
  prop: string,
  survey: Survey
): prop is keyof Omit<T, number | symbol> {
  return prop in survey;
}