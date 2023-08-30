import { getSurveys } from "@/helper/apiService";
import { Organization, Pagination, Survey } from "@/type/type";
import React, { useContext, useEffect, useState } from "react";
import { Header, Icon, Label, Table } from "semantic-ui-react";
import { OrgContext } from "@/helper/context";
import CreateSurvey from "./CreateSurvey";
import { calculateMeanValues } from '@/helper/methods';
import Link from "next/link";
import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic'
import FilterSurvey from "../filters/FilterSurvey";
import { TablePagination } from "@mui/material";
import { initPagination } from "@/helper/initializer";
import SurveyTable from "./SurveyTable";
import { NavigationBar } from "../NavigationBar";
import { useRouter } from "next/router";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type SurveyContentProps = {
  propOrgId: string;
}

export default function SurveyContent({propOrgId}: SurveyContentProps) {
  const router = useRouter();
  const { organization, setOrganization, 
          filterLocations, 
          filteredSurveys, setFilteredSurveys, 
          isFilterSet, setIsFilterSet, 
          surveys, setSurveys} = useContext(OrgContext);
  const [pagination, setPagination] = useState<Pagination>(initPagination);
  const [page, setPage] = useState(0);
  const [rowPage, setRowPage] = useState(10);
  
  let country_arr: string[] = [];
  let countryLocation_list = new Set<string>();
  
  filteredSurveys.forEach((s) => countryLocation_list.add(s.country));
  country_arr = Array.from(countryLocation_list);

  if (filterLocations.length !== 0) {
    filteredSurveys.forEach((s) => countryLocation_list.add(s.locationClustered));
    country_arr = Array.from(countryLocation_list);
  }

  useEffect(() => {
     getSurveys(setPagination, setSurveys, propOrgId);
  }, [surveys.length]);

  function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newpage: number) {
    setPage(newpage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setRowPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  let meanValues: number[][] = []
  if (isFilterSet) {
    meanValues = calculateMeanValues(country_arr, organization.surveys);
  } else {
    country_arr = ["world countries and cities"];
    //meanValues[0][0] = 0;
  }

  const options: ApexOptions = {
    chart: {
      stacked: true,
      //stackType: "100%",
      zoom: {
        enabled: true
      }
    },
    title: {
      text: 'Mean of Monthly Living Costs by country and region'
    },
    xaxis: {
      categories: country_arr
    },
  };

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
      
      <NavigationBar pathname={router.pathname} />      

      <section className="surveys-management">
        {
          surveys ?
          <FilterSurvey propSurveys={surveys} propSetFilteredSurveys={setFilteredSurveys} propSetIsFilterSet = {setIsFilterSet} />
          : null
        }            
        <CreateSurvey organization={organization} setOrganization={setOrganization} setSurveys={setSurveys} />
      </section>

      <section className="surveys-charts">
        <Chart
          height={450}
          //width={2000}
          type="bar"
          options={options}
          series={series}
        />
      </section>

      <div className="surveys-surveycard-box">
        <Table celled striped color="violet">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='5'><Label color="blue" size="large" ribbon>{organization.orgName}</Label></Table.HeaderCell>
            </Table.Row>
            <Table.Row>
            <Table.HeaderCell >Edit</Table.HeaderCell>
              <Table.HeaderCell >Survey ID</Table.HeaderCell>
              <Table.HeaderCell >Country</Table.HeaderCell>
              <Table.HeaderCell >Year</Table.HeaderCell>
              <Table.HeaderCell >Survey Collector</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              filteredSurveys.sort((a, b) => {
                if(a.country === b.country) {return a.year - b.year} else {return a.country.localeCompare(b.country)}}).slice(page * rowPage, page * rowPage + rowPage).map((matchingSurvey: Survey, index: number) => {
                  return <SurveyTable key={index} organization={organization} propSurvey={matchingSurvey} />
              })
            }
          </Table.Body>          
        </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={filteredSurveys.length}
            rowsPerPage={rowPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </div>

    </div> 
  ) 
}    