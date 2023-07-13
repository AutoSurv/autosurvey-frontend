import { CSVLink } from "react-csv";
import { getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Header, Icon, Menu } from "semantic-ui-react";
import SurveyCard from "./SurveyCard";
import { OrgContext } from "@/helper/context";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";
import { SignOut, downloadExcel } from '@/helper/methods';
import Link from "next/link";


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
      <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
                <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
            </Header>
            <Menu size='small' color="blue">
                <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
                <Menu.Item> <Link href={"/org/"+ organization.orgId} style={{ textDecoration: 'none' }}>Surveys</Link></Menu.Item>
                <Menu.Item> <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button onClick={() => {
                            setSignUpStatus(false);
                            SignOut(setSignUpStatus);
                        }}
                            circular icon='sign out' color='blue' inverted></Button>
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
            <SurveyCard key={survey.id} organization={organization} survey={survey} />
          )
        })}

      </div>

    </div>
  )



}