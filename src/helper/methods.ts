import { authenticateUser, signUpUser } from '@/helper/apiService';
import { Survey, FormDataSingUp, ImportedSurvey, LoggedUser, LoginUser, ExportedSurvey, Organization, UserDto, ClickedCountry, CountryGeo } from '@/type/type';
import router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import * as XLSX from "xlsx";
import countiesListJson from "@/../../public/countries.json"

export const downloadExcel = (data: any, organization: Organization, filterYears: string[], filterCountries: string[], filterLocations: string[], 
  setErrorMsg: Dispatch<SetStateAction<string>>) => {  

  const surveyAsString: string = JSON.stringify(data[0]);

  if (surveyAsString === undefined) {
    setErrorMsg("nothing to export");
    return;
  }

  const survey: ExportedSurvey = JSON.parse(surveyAsString);
  const myHeader = [ "id", "country", "year",	"rent",	"utilities",	"food",	"basicItems",
    	"transportation",	"educationTotal",	"educationSupplies",	"educationFee",	
      "educationType",	"accommodationType",	"profession",	"locationGiven",	
      "locationClustered",	"numResidents",	"numIncomes",	"numFullIncomes",	
      "numChildren",	"totalIncome",	"comments", "orgId", "orgName","userId" ];
  const worksheet = XLSX.utils.json_to_sheet((data as ExportedSurvey[]), {header:myHeader});
 /*   delete(worksheet['W1']);
  delete(worksheet['X1']);
  delete(worksheet['Y1']); */
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  if (data.length == 1) {  
    XLSX.writeFile(workbook, organization.orgName + "_" + survey.year + "_" + survey.country + "_" + survey.locationClustered + "_" + survey.id + ".xlsx");
  } else if (data.length > 1) {
    if (filterCountries.length == 1) {
      if (filterLocations.length == 1) {
        if (filterYears.length == 1) {
          XLSX.writeFile(workbook, organization.orgName + "_" + survey.year + "_" + survey.country + "_" + survey.locationClustered + ".xlsx");
        } else {
          XLSX.writeFile(workbook, organization.orgName + "_" + survey.country + "_" + survey.locationClustered + ".xlsx");
        }
      } else {
        XLSX.writeFile(workbook, organization.orgName + "_" + survey.country + ".xlsx");
      }
    } else {
      XLSX.writeFile(workbook, organization.orgName + ".xlsx");
    }
  } else {
    setErrorMsg("nothing to export");
    return;
  };
  setErrorMsg("");
};

export const createCsvFileName = (data: any, organization: Organization, 
  filterYears: string[], filterCountries: string[], 
  filterLocations: string[], setErrorMsg: Dispatch<SetStateAction<string>>) => {

    if (data.length == 1) {  
      return organization.orgName + "_" + data[0].year + "_" + data[0].country + "_" + data[0].locationClustered + "_" + data[0].id + ".csv";
    } else if (data.length > 1) {
      if (filterCountries.length == 1) {
        if (filterLocations.length == 1) {
          if (filterYears.length == 1) {
            return organization.orgName + "_" + data[0].year + "_" + data[0].country + "_" + data[0].locationClustered + ".csv";
          } else {
            return  organization.orgName + "_" + data[0].country + "_" + data[0].locationClustered + ".csv";
          }
        } else {
          return organization.orgName + "_" + data[0].country + ".csv";
        }
      } else {
        return organization.orgName + ".csv";
      }
    } else {
      setErrorMsg("Error during exporting data as CSV!");
      return;
    }
}

export function SignOut(setSignUpStatus: Dispatch<SetStateAction<boolean>>): void {
  setSignUpStatus(false);
  localStorage.clear();
  router.push("/");

}

export async function signInJwtTokenHandler(event: React.FormEvent<HTMLFormElement>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
  setSignUpStatus: Dispatch<SetStateAction<boolean>>,
  setUserNameAuth: Dispatch<SetStateAction<string>>,
  setUserDto: Dispatch<SetStateAction<UserDto>>,
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

        let userDto: UserDto = {
          userId: loggedUser.userId,
          username: loggedUser.username,
          email: loggedUser.email,
          roles: loggedUser.role,
          status: loggedUser.status
        }

        if (loggedUser) {
          localStorage.setItem("role", loggedUser.role);
          localStorage.setItem("jwt", loggedUser.token);
          localStorage.setItem("username", loggedUser.username);
          localStorage.setItem("email", loggedUser.email);
          localStorage.setItem("userId", userDto.userId);
          localStorage.setItem("status", userDto.status);
          setUserNameAuth(loggedUser.username);
          setUserDto(userDto);
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
    roles: "role_user",
    status: "pending",
    surveysIds: []
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
        return response.body;
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

    if (survey.country === null) { survey.country = ""; }
    if (typeof survey.year !== 'number') { survey.year = 0; }
    if (typeof survey.rent !== 'number') { survey.rent = 0; }
    if (typeof survey.utilities !== 'number') { survey.utilities = 0; }
    if (typeof survey.food !== 'number') { survey.food = 0; }
    if (typeof survey.basicItems !== 'number') { survey.basicItems = 0; }
    if (typeof survey.transportation !== 'number') { survey.transportation = 0; }
    if (typeof survey.educationTotal !== 'number') { survey.educationTotal = 0; }
    if (typeof survey.educationSupplies !== 'number') { survey.educationSupplies = 0; }
    if (typeof survey.educationFee !== 'number') { survey.educationFee = 0; }
    if (survey.educationType == null) { survey.educationType = ""; }
    if (survey.accommodationType === null) { survey.accommodationType = ""; }
    if (survey.profession === null) { survey.profession = ""; }
    if (survey.locationGiven === null) { survey.locationGiven = ""; }
    if (survey.locationClustered == null) { survey.locationClustered = ""; }
    if (typeof survey.numResidents !== 'number') { survey.numResidents = 0; }
    if (typeof survey.numIncomes !== 'number') { survey.numIncomes = 0; }
    if (typeof survey.numFullIncomes !== 'number') { survey.numFullIncomes = 0; }
    if (typeof survey.numChildren !== 'number') { survey.numChildren = 0; }
    if (typeof survey.totalIncome !== 'number') { survey.totalIncome = 0; }
    if (survey.comments == null) { survey.comments = ""; }
  })

  return data;
}

export function calculateMeanValues(country_arr: string[], filteredSurvey: Survey[]) {

  const fiveVar: string[] = ["rent", "utilities", "food", "basicItems", "transportation", "educationTotal"];
  let dataForGraph: number[][] = [];

  for (let fiveVarIndex = 0; fiveVarIndex < fiveVar.length; fiveVarIndex++) {
    let data: number[] = [];
    const prop = fiveVar[fiveVarIndex];

    for (let countryIndex = 0; countryIndex < country_arr.length; countryIndex++) {
      const lowerPart = filteredSurvey
        .filter((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop] && (country_arr[countryIndex] === s.locationClustered || country_arr[countryIndex] === s.country); } })
        .map((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop]; } })
        .length;

      const totalResult = filteredSurvey
        .filter((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop] && (country_arr[countryIndex] === s.locationClustered || country_arr[countryIndex] === s.country); } })
        .map((s) => { if (prop && isSurveyKey(prop, s)) { return s[prop]; } else { return 0 } })
        .reduce(function add(sum, rent) { return sum + rent; }, 0) / lowerPart;

      data.push(parseFloat(totalResult.toFixed(2)));
    }
    dataForGraph.push(data);
  }
  return dataForGraph;
}

function isSurveyKey<T>(
  prop: string,
  survey: Survey
): prop is keyof Omit<T, number | symbol> {
  return prop in survey;
}

export function checkIfLocalStorageDef() {
  let jwt = "";
  if (typeof window !== 'undefined') {
    jwt = localStorage.getItem('jwt') as string
  }
  return jwt;
}

export function getUserEmailDomain (userEmail: string) {
  const first: number = userEmail.indexOf("@");
  const last: number = userEmail.lastIndexOf(".");
  const domain = userEmail.substring(first+1, last)
  return domain;
}

export function handleClickedCountry(geoName: string, 
                                      clickedCountries: ClickedCountry[], 
                                      setClickedCountries: Dispatch<SetStateAction<ClickedCountry[]>>) {

  if (clickedCountries.filter(c=> c.country === geoName && c.country !== "").length > 0) {
    clickedCountries.map(c => {
      if (c.country === geoName) {
        c.clicked = !c.clicked;
      }

    });
  } else {
    if(geoName !== "")
    clickedCountries.push({
      country: geoName,
      clicked: true,
    });
  }
}

export function getCountryFromJson() {
  const countriesList: CountryGeo[] = 
  countiesListJson.objects.world.geometries.map((item, index: number ) => {
   return {
    key: index,
    value: item.properties.name,
    text: item.properties.name
  }});
  return countriesList;
}