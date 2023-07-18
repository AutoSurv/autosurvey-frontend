import { OrgContext } from "@/helper/context";
import { useContext, useEffect, useState } from "react";
import { getSurveys } from "../api/autosurvey";
import { AutoSurvey } from "@/type/type";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";


export default function Charts() {
  const { organization, setOrganization, setSignUpStatus } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);

  //avg, median, 25, 75



  useEffect(() => {
    getSurveys(setSurveys);
  }, []);

  console.log("organization.surveys[0]: ", organization.surveys);
  console.log("surveys: ", surveys);
  
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
      <>
      <p>Chart!</p>
      <div>

      <ReactApexChart
        type="bar"
        options={options}
        series={series}
        height={350}
      />
      </div>
         
        

      </>
  ) 
}