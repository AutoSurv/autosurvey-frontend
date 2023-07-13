import { CSVLink } from "react-csv";
import { getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Header, Icon, Menu } from "semantic-ui-react";
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

  useEffect(() => {

  }, []);

  return (
    <div className="surveys-content">
      <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
                <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
            </Header>
            <Menu size='small' color="blue">
                <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
                <Menu.Item >
            <Link href={"#"}>
              <Dropdown text='Export / Import'>
                <Dropdown.Menu>
                  <Dropdown.Item >
                    <Link href={"#"}>
                      <ImportSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href={"#"} onClick={(e) => {
                      e.preventDefault();
                      downloadExcel(surveys.filter(s => s.orgName === organization.orgName));
                    }} >Export Surveys (xlsx)
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <label >
                      <CSVLink className="surveys-export-csv-link" filename={"surveys.csv"} data={surveys.filter(s => s.orgName === organization.orgName)}> 
                        Export Survey (csv)
                      </CSVLink>
                    </label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Link>
          </Menu.Item>
                
                <Menu.Menu position='right'>
                  <Menu.Item> <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
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