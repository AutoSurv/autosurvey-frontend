import { CSVLink } from "react-csv";
import { getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import SurveyCard from "./SurveyCard";
import { OrgContext } from "@/helper/context";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";
import { downloadExcel } from '@/helper/methods';
import { AutoSurveyHeader } from './AutoSurveyHeader';


export default function SurveyContent() {
  const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  useEffect(() => {
    getSurveys(setSurveys);
  }, []);
  const [open, setOpen] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <div className="surveys-content">
      <AutoSurveyHeader />

      
      <CreateSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />
      <ImportSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />

      <Button onClick={(e) => {
        e.preventDefault();
        downloadExcel(surveys.filter(s => s.orgName === organization.orgName));
      }} color="green">Export(Excel) Surveys
      </Button>
      <Button color="green"><CSVLink className="surveys-export-csv-link" filename={"surveys.csv"} data={surveys.filter(s => s.orgName === organization.orgName)}> Export(CSV) Survey</CSVLink>
      </Button>
      <div className="surveys-surveycard-box">
        {organization.surveys.map((survey) => {
          console.log(organization.surveys);
          return (
            <SurveyCard key={survey.id} organization={organization} survey={survey} />
          )
        })}

      </div>

    </div>
  )



}