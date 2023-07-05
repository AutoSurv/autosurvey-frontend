import * as XLSX from 'xlsx';
import { CSVLink, CSVDownload } from "react-csv";
import { addSurvey, getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey } from "@/pages/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Header, Icon, Input, Label, Menu, Modal } from "semantic-ui-react";
import SurveyCard from "./SurveyCard";
import { OrgContext } from "@/helper/context";
import Link from "next/link";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";
import { downloadExcel } from '@/helper/methods';


export default function SurveyContent() {
  const { organization, setOrganization } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  useEffect(() => {
    getSurveys(setSurveys);
  }, []);

  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {

  }, []);

  return (
    <div className="surveys-content">
      <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
        <Header.Content><Icon name='clipboard' /> AutoSurvey</Header.Content>
      </Header>
      <Menu size='small' color="blue">
        <Menu.Item> <Link href={"/org"}>Home</Link></Menu.Item>
        <Menu.Item> <Link href={"/org/" + organization.orgId}>Organization</Link></Menu.Item>
        <Menu.Item> <Link href={"/"}>About</Link></Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
          <Button circular icon='sign out' color='blue' inverted></Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      
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
          return (
            <SurveyCard organization={organization} survey={survey} />
          )
        })}

      </div>

    </div>
  )



}