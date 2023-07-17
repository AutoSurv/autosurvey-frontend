import { CSVLink } from "react-csv";
import { getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Header, Icon, Menu } from "semantic-ui-react";
import SurveyCard from "./SurveyCard";
import { OrgContext } from "@/helper/context";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";
import { downloadExcel } from '@/helper/methods';
import Link from "next/link";
import { SignOut } from "@/helper/methods";
import FilterSurvey from "./FilterSurvey";



export default function SurveyContent() {
  const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  const [filteredSurvey, setFilteredSurvey] = useState<AutoSurvey[]>([]);
  const [filteredCountry, setFilteredCountry] = useState<string[]>([]);

  useEffect(() => {
    getSurveys(setSurveys);
  }, []);

  return (
    <div className="surveys-content">
      <>
        <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
          <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
        </Header>
        <Menu size='small' color="blue">
          <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Home</Link></Menu.Item>
          
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
                        Export Surveys (csv)
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
      </>

      <CreateSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />
      
      <FilterSurvey surveys={organization.surveys} setFilteredSurvey={setFilteredSurvey} setFilteredCountry={setFilteredCountry}/>

      <div className="surveys-surveycard-box">
        { 
          surveys.filter((survey: AutoSurvey) => {  
            if (filteredCountry.length > 0) {
              return filteredCountry.some((country) => {
                if (country == "" || country == null) {
                  return survey.country;
                } else {
                  return survey.country.toLowerCase().includes(country.toLowerCase());
                }
              })
            } else {
              return survey;
            }
          }).map((matchingSurvey: AutoSurvey, index: number) => {
            return <SurveyCard key={index} organization={organization} survey={matchingSurvey} />
          })  
        }         
      </div>
    </div>
  )



}