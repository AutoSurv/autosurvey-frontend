import { authenticateUser } from '@/pages/api/autosurvey';
import { AutoSurvey, LoginUser } from '@/pages/type/type';
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

// export function SignOut(setFormDataSingup: Dispatch<SetStateAction<UserData>>): void {
//   const formData = {
//     username: "",
//     password: "",
//     email: "",
//     roles: "role_user"
//   }
//   localStorage.clear();
//   const myHeaders = new Headers();
//   myHeaders.delete("Authorization");
//   console.log(1);
//   setFormDataSingup(formData);
//   router.push("");
//   console.log(2);
// }

export function SignOut(): void {
  
  localStorage.clear();
  router.push("/");
 
}

export async function jwtTokenHandler(event: React.FormEvent<HTMLFormElement>, setErrorMsg: Dispatch<SetStateAction<string>>, setUserNameAuth: Dispatch<SetStateAction<string>>){
    
  const user: LoginUser = {
    username: event.currentTarget.username.value,
    password: event.currentTarget.password.value,
  }    
  const serverResponse = authenticateUser(user);

  const userName = await serverResponse.then((response) => {
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
        localStorage.setItem("username", user.username);
        setUserNameAuth(user.username);
        return user.username;
      }
    });
    return userName;
}