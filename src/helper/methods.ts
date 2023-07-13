import { authenticateUser, signUpUser } from '@/pages/api/autosurvey';
import { AutoSurvey, FormDataSingUp, LoggedUser, LoginUser } from '@/type/type';
import router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import * as XLSX from 'xlsx';


export const downloadExcel = (data: any) => {

  const surneyAsString: string = JSON.stringify(data[0]);
  const survey: AutoSurvey = JSON.parse(surneyAsString);

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  if (data.length == 1) {
    XLSX.writeFile(workbook, survey.orgName + "_" + survey.country + "_" + survey.id + ".xlsx");
  } else {
    XLSX.writeFile(workbook, survey.orgName + ".xlsx");
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
      const loggedUser: LoggedUser = JSON.parse(data);
      if (loggedUser) {
        localStorage.setItem("role", loggedUser.role);
        localStorage.setItem("jwt", loggedUser.token);
        localStorage.setItem("username", loggedUser.username);
        setUserNameAuth(loggedUser.username);
        setSignUpStatus(true);
        router.push("org");
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
      if (response?.status == 200) {
        setOpen(false);
        setSignupSuccessMessage("Successfully signed up");
        setErrorMsg(
          ""
        );
        return;
      } else {
        setErrorMsg('User aleady exists. Choose other name');
      }
    });



}