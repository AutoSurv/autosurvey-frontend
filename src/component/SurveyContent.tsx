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
import FilterSurvey from "./FilterSurvey";
import { color } from "@mui/system";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function SurveyContent() {
  const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  const [filteredSurvey, setFilteredSurvey] = useState<AutoSurvey[]>([]);
  let country_list = new Set<string>([]);
  filteredSurvey.forEach((s) => country_list.add(s.country));
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

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize_rent = filteredSurvey.filter((s) => s.rent && s.rent !== 0 && country_arr[i] === s.country).map((s) => s.rent).length;
    const result_rent = filteredSurvey.filter((s) => s.rent && s.rent !== 0 && country_arr[i] === s.country).map((s) => s.rent).reduce(function add(sum, rent) {
      return sum + rent;
    }, 0) / filteredSize_rent;
    five_data.rent.push(parseInt(result_rent.toFixed(2)));
  }

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize_util = filteredSurvey.filter((s) => s.utilities && s.utilities !== 0 && country_arr[i] === s.country).map((s) => s.utilities).length;
    const result_util = filteredSurvey.filter((s) => s.utilities && s.utilities !== 0 && country_arr[i] === s.country).map((s) => s.utilities).reduce(function add(sum, utilities) {
      return sum + utilities;
    }, 0) / filteredSize_util;
    five_data.utilities.push(parseFloat(result_util.toFixed(2)));
  }

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize_food = filteredSurvey.filter((s) => s.food && s.food !== 0 && country_arr[i] === s.country).map((s) => s.food).length;
    const result_food = surveys.filter((s) => s.food && s.food !== 0 && country_arr[i] === s.country).map((s) => s.food).reduce(function add(sum, food) {
      return sum + food;
    }, 0) / filteredSize_food;
    five_data.food.push(parseFloat(result_food.toFixed(2)));
  }

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize_basicItem = filteredSurvey.filter((s) => s.basicItems && s.basicItems !== 0 && country_arr[i] === s.country).map((s) => s.basicItems).length;
    const result_basicItem = filteredSurvey.filter((s) => s.basicItems && s.basicItems !== 0 && country_arr[i] === s.country).map((s) => s.basicItems).reduce(function add(sum, basicItems) {
      return sum + basicItems;
    }, 0) / filteredSize_basicItem;
    five_data.basicItems.push(parseFloat(result_basicItem.toFixed(2)));
  }

  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize_tranport = filteredSurvey.filter((s) => s.transportation && s.transportation !== 0 && country_arr[i] === s.country).map((s) => s.transportation).length;
    const result_transport = filteredSurvey.filter((s) => s.transportation && s.transportation !== 0 && country_arr[i] === s.country).map((s) => s.transportation).reduce(function add(sum, transportation) {
      return sum + transportation;
    }, 0) / filteredSize_tranport;
    five_data.transportation.push(parseFloat(result_transport.toFixed(2)));
  }


  for (let i = 0; i < country_arr.length; i++) {
    const filteredSize_edu = filteredSurvey.filter((s) => s.educationTotal && s.educationTotal !== 0 && country_arr[i] === s.country).map((s) => s.educationTotal).length;
    const result_edu = filteredSurvey.filter((s) => s.educationTotal && s.educationTotal !== 0 && country_arr[i] === s.country).map((s) => s.educationTotal).reduce(function add(sum, educationTotal) {
      return sum + educationTotal;
    }, 0) / filteredSize_edu;
    five_data.educationTotal.push(parseFloat(result_edu.toFixed(2)));
  }




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
      <div className="home-header-container">
        <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
          <Header.Content><Link href="/org"><Icon name='clipboard' className="home-header-icon" /></Link><Link className="home-header-autosurvey" href="/org">AutoSurvey</Link></Header.Content>
        </Header>
      </div>
      <Menu size='small' color="blue">
        <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
        <Menu.Item >
          <Link href={"#"}>
            <Dropdown className="exp-imp-items" text='Export / Import'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <ImportSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href={"#"} onClick={(e) => {
                    e.preventDefault();
                    downloadExcel(filteredSurvey.filter(s => s.orgName === organization.orgName));
                  }} >Export Surveys (xlsx)
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <label >
                    <CSVLink className="surveys-export-csv-link" filename={"surveys.csv"} data={filteredSurvey.filter(s => s.orgName === organization.orgName)}>
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
      <FilterSurvey surveys={organization.surveys} setFilteredSurvey={setFilteredSurvey} />

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
            {
              filteredSurvey
                .map((matchingSurvey: AutoSurvey, index: number) => {
                  return <SurveyCard key={index} organization={organization} survey={matchingSurvey} />
                })
            }
          </Table.Body>
        </Table>
      </div>

    </div>
  )



}