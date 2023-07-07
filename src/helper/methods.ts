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
  router.push("/login");
 
}