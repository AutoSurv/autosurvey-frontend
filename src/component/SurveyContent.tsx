import { CSVLink } from "react-csv";
import { getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey, Data } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Header, Icon, Menu, Table } from "semantic-ui-react";
import SurveyCard from "./SurveyTable";
import { OrgContext } from "@/helper/context";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";
import { SignOut, downloadExcel } from '@/helper/methods';
import Link from "next/link";
import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic'
import CountryFilter from "./CountryFilter";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function SurveyContent() {
  const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  const [filterValue, setFilterValue] = useState<string[]>([]);
  const filterChanged = (value: string[]) => {
    setFilterValue(value);
  }

  let country_list = new Set<string>([]);
  surveys.forEach((s) => country_list.add(s.country));
  const country_arr = Array.from(country_list);

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
      categories: country_arr

    },


  };


  const five_var: string[] = ["rent", "utilities", "food", "basicItems", "transportation", "educationTotal"];
 
  let five_data: Data = {
    rent: [],
    utilities: [],
    food: [],
    basicItems: [],
    transportation: [],
    educationTotal: []
  };
  if (surveys.filter((s) => filterValue.includes(s.country))) {}
  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize = surveys.filter((s) => filterValue.includes(s.country) && country_arr[i] === s.country && s.rent).map((s) => s.rent).length;
    const result = surveys.filter((s) => filterValue.includes(s.country) && country_arr[i] === s.country && s.rent).map((s) => s.rent).reduce(function add(sum, rent) {
      return sum + rent;
    }, 0) / filteredSize;
    five_data.rent.push(parseInt(result.toFixed(2)));
  };

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize = surveys.filter((s) => country_arr[i] === s.country && s.utilities).map((s) => s.utilities).length;
    const result = surveys.filter((s) => country_arr[i] === s.country && s.utilities).map((s) => s.utilities).reduce(function add(sum, utilities) {
      return sum + utilities;
    }, 0) / filteredSize;
    five_data.utilities.push(parseFloat(result.toFixed(2)));
  };

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize = surveys.filter((s) => country_arr[i] === s.country && s.food).map((s) => s.food).length;
    const result = surveys.filter((s) => country_arr[i] === s.country && s.food).map((s) => s.food).reduce(function add(sum, food) {
      return sum + food;
    }, 0) / filteredSize;
    five_data.food.push(parseFloat(result.toFixed(2)));
  };

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize = surveys.filter((s) => country_arr[i] === s.country && s.basicItems).map((s) => s.basicItems).length;
    const result = surveys.filter((s) => country_arr[i] === s.country && s.basicItems).map((s) => s.basicItems).reduce(function add(sum, basicItems) {
      return sum + basicItems;
    }, 0) / filteredSize;
    five_data.basicItems.push(parseFloat(result.toFixed(2)));
  };
  
  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize = surveys.filter((s) => country_arr[i] === s.country && s.transportation).map((s) => s.transportation).length;
    const result = surveys.filter((s) => country_arr[i] === s.country && s.transportation).map((s) => s.transportation).reduce(function add(sum, transportation) {
      return sum + transportation;
    }, 0) / filteredSize;
    five_data.transportation.push(parseFloat(result.toFixed(2)));
  };

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize = surveys.filter((s) => country_arr[i] === s.country && s.educationTotal).map((s) => s.educationTotal).length;
    const result = surveys.filter((s) => country_arr[i] === s.country && s.educationTotal).map((s) => s.educationTotal).reduce(function add(sum, educationTotal) {
      return sum + educationTotal;
    }, 0) / filteredSize;
    five_data.educationTotal.push(parseFloat(result.toFixed(2)));
  };



  const series = [{
    name: 'rent',
    data: five_data.rent
  }, {
    name: 'utilities',
    data: five_data.utilities
  }, {
    name: 'food',
    data: five_data.food
  }, {
    name: 'basic item',
    data: five_data.basicItems
  }, {
    name: 'transportation',
    data: five_data.transportation
  }, {
    name: 'education total',
    data: five_data.educationTotal
  }
  ];

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
                  <ImportSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />
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
      <CountryFilter country_arr={country_arr} filterChanged={filterChanged} filterValue={filterValue} />

      <Chart
        type="bar"
        options={options}
        series={series}
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
            {organization.surveys.filter((s) => filterValue.includes(s.country)).map((survey) => {
             
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