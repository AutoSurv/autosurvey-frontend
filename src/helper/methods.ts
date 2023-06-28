import { useState } from "react";
import Papa from "papaparse";
import { AutoSurvey } from "@/pages/type/type";
import { stringify } from "querystring";

export function importSurvey(event: React.FormEvent<HTMLFormElement>) {
  //const [parsedString, setParsedString] = useState();
  
  const CSVString =
  "Tarantino,50,M,USA\n Carey Mulligan,27,F,UK\n Gong Li,45,F,China";
  
  //Papa.parse(event.currentTarget.fileToImport.value, {
    Papa.parse(CSVString, {
    complete: function(results) {
      console.log("Finished importing:", results.data);
    }
  });
}

export function exportSurvey(survey: any) {
  //const [parsedString, setParsedString] = useState();
  
  const CSVString = Papa.unparse(survey);
  console.log("Finished exporting:", CSVString);

}
