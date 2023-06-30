import { AutoSurvey } from '@/pages/type/type';
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