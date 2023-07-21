import { CSVLink } from "react-csv";
import { getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey, Data } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Header, Icon, Label, Menu, Table } from "semantic-ui-react";
import SurveyCard from "./SurveyTable";
import { OrgContext } from "@/helper/context";
import CreateSurvey from "./CreateSurvey";
import ImportSurvey from "./ImportSurvey";
import { SignOut, calculateMeanValues, downloadExcel } from '@/helper/methods';
import Link from "next/link";
import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic'
import FilterSurvey from "./FilterSurvey";
import { initData } from "@/helper/initializer";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/* const useSurveys = () => {
  const [status, setStatus] = useState("LOADING");
  const [data, setData] = useState<{id: number} | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData({id: 1});
  }, []);
  return {status, data, error};
}
 */

export default function SurveyContent() {
  const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  const [datas, setDatas] = useState<Data>(initData);
  
  const [filteredSurveys, setFilteredSurveys] = useState<AutoSurvey[]>([]);
  
  let country_list = new Set<string>(filteredSurveys.map(({ country }) => country));
  //filteredSurveys.forEach((s) => country_list.add(s.country));
  const country_arr = Array.from(country_list);

  useEffect(() => {
      getSurveys(setDatas, setSurveys);
  }, []);

  const options: ApexOptions = {
    chart: {
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

  const meanValues = calculateMeanValues(country_arr, filteredSurveys);

  const series = [{
    name: 'rent',
    data: meanValues[0]
  }, {
    name: 'utilities',
    data: meanValues[1]
  }, {
    name: 'food',
    data: meanValues[2]
  }, {
    name: 'basic item',
    data: meanValues[3]
  }, {
    name: 'transportation',
    data: meanValues[4]
  }, {
    name: 'education total',
    data: meanValues[5]
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
                    downloadExcel(filteredSurveys.filter(s => s.orgName === organization.orgName));
                  }} >Export Surveys (xlsx)
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <label >
                    <CSVLink className="surveys-export-csv-link" filename={"surveys.csv"} data={filteredSurveys.filter(s => s.orgName === organization.orgName)}>
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
      <FilterSurvey surveys={organization.surveys} setFilteredSurvey={setFilteredSurveys} />

      <Chart
        type="bar"
        options={options}
        series={series}
      />
       
      <div className="surveys-surveycard-box">

        <Table celled striped color="violet">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='4'><Label color="blue" size="large" ribbon>{organization.orgName}</Label></Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell >Survey ID</Table.HeaderCell>
              <Table.HeaderCell >Country</Table.HeaderCell>
              <Table.HeaderCell >Year</Table.HeaderCell>
              <Table.HeaderCell >Survey Collector</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          <label>first: {datas.first}</label>
          <label>last: {datas.last}</label>
            {
              datas.surveys.sort()
                .map((matchingSurvey: AutoSurvey, index: number) => {
                  return <SurveyCard key={index} organization={organization} survey={matchingSurvey} />
                })
            }
            <label>number of elements{datas.numberOfElements}</label>
            <label>page size{datas.pageSize}</label>
            <label>total pages{datas.totalPages}</label>
          </Table.Body>
        </Table>
      </div>

    </div>
  )



}