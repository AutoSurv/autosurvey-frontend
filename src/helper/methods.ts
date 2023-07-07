import { AutoSurvey } from '@/pages/type/type';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import * as XLSX from 'xlsx';

type UserData = {
  username: string,
  password: string,
  email: string,
  roles: string
}

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


export function SignOut(): void {

  localStorage.clear();
  router.push("/");

}

export async function signInJwtTokenHandler(event: React.FormEvent<HTMLFormElement>,
  setErrorMsg: Dispatch<SetStateAction<string>>): Promise<void> {

  const inputBody = {
    username: event.currentTarget.username.value,
    password: event.currentTarget.password.value
  }

  const url = "http://localhost:8080/authenticate";
  await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(inputBody),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 200) return response.text();
      else if (response.status === 401 || response.status === 403) {
        setErrorMsg("Invalid username or password");
      } else {
        setErrorMsg(
          "Something went wrong, try again later or reach out to simonhong85@gmail.com"
        );
      }
    })
    .then((data: any) => {
      const jwtToken = data;
      if (jwtToken) {
        localStorage.setItem("jwt", jwtToken);
        localStorage.setItem("username", inputBody.username);
        router.push("org");
      }
    });
}

export async function signUpHandler(event: React.FormEvent<HTMLFormElement>,
  setErrorMsg: Dispatch<SetStateAction<string>>,
  setSignupSuccessMessage: Dispatch<SetStateAction<string>>,
  setOpen: Dispatch<SetStateAction<boolean>>
): Promise<void> {

  const inputSignUpBody = {
    username: event.currentTarget.username.value,
    password: event.currentTarget.password.value,
    email: event.currentTarget.email.value,
    roles: "role_user"
  }
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

  const url = "http://localhost:8080/users/new";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(inputSignUpBody),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (response.ok) {
    setOpen(false);
    setSignupSuccessMessage("Successfully signed up");
    setErrorMsg(
      ""
    );
  } else {
    setErrorMsg('User aleady exists. Choose other name');
  }

}