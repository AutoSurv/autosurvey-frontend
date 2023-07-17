import { CSVLink } from "react-csv";
import { getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Header, Icon, Menu, Table } from "semantic-ui-react";
import SurveyCard from "./SurveyTable";
import { OrgContext } from "@/helper/context";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";
import { SignOut, downloadExcel } from '@/helper/methods';
import Link from "next/link";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";



export default function SurveyContent() {
  const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  useEffect(() => {
    getSurveys(setSurveys);
  }, []);
  const options: ApexOptions = {
    chart: {
      height: 350,
      stacked: true,
      zoom: {
        enabled: true
      }
    },
    title: {
      text: 'Monthly Living Costs by country'
    }, 
    xaxis: {
      categories: surveys.map( (s) => s.country)
      
    },


  };

  const series = [{
    name: 'rent',
    data: surveys.map( (s) => s.rent)
  }, {
    name: 'utilities',
    data: surveys.map( (s) => s.utilities)
  }, {
    name: 'food',
    data: surveys.map( (s) => s.food)
  }, {
    name: 'basic item',
    data: surveys.map( (s) => s.basicItems)
  }, {
    name: 'transportation',
    data: surveys.map( (s) => s.transportation)
  }, {
    name: 'education total',
    data: surveys.map( (s) => s.educationTotal)
  }
]

 return (
    <div className="surveys-content">
      <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
        <Header.Content><Link href="/org"><Icon name='clipboard' className="home-header-icon" /></Link><Link className="home-header-autosurvey" href="/org">AutoSurvey</Link></Header.Content>
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
      
      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        height={350}
      />
      <div className="surveys-surveycard-box">
      
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>{organization.orgName}</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell >Survey ID</Table.HeaderCell>
              <Table.HeaderCell >Country</Table.HeaderCell>
              <Table.HeaderCell >Year</Table.HeaderCell>
              <Table.HeaderCell >Survey Collector</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {organization.surveys.map((survey) => {
              return (
                <SurveyCard key={survey.id} organization={organization} survey={survey} />
              )
            })}
          </Table.Body>
        </Table>
      </div>

    </div>
  )



}