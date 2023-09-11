import { OrgContext } from "@/helper/context";
import { CountryChart, Survey } from "@/type/type";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
//import { csv } from "d3-fetch";
//import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "/countries.json";
//const geoUrl =
//  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
// const colorScale = scaleLinear()
//   .domain([0.29, 0.68])
//   .range(["#ffedea", "#ff5233"]);

type MapChartProps = {
  setTooltipContent: any,
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>,
  propSetFilterCountry: Dispatch<SetStateAction<string[]>>
}

const MapChart = ({setTooltipContent, propSetFilteredSurveys, propSetFilterCountry} : MapChartProps) => {

  const { surveys, filterCountries } = useContext(OrgContext);
  const [data, setData] = useState<Survey[]>([]);

  useEffect(() => {
    // csv(`/vulnerability.csv`).then((data) => {
       setData(surveys);
    // });
  }, []);

 /*  return (
    <ComposableMap projectionConfig={{
      rotate: [-10, 0, 0],
      scale: 150
    }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography 
              key={geo.rsmKey} 
              geography={geo} 
              onMouseEnter={() =>{
                setTooltipContent("hello!");
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              style={{
                default: {
                  fill: "#D6D6DA",
                  outline: "none"
                },
                hover: {
                  fill: "#F53",
                  outline: "none"
                },
                pressed: {
                  fill: "#E42",
                  outline: "none"
                }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  ) */
 
  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 135
      }}
    >
      {
        //<Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      }     
      
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {//data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.country === geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? "#F53" : "#D6D6DA"}
                  onClick={()=>{
                    propSetFilteredSurveys(surveys.filter((survey: Survey) => {  
                      return survey.country.toLowerCase().includes(geo.properties.name.toLowerCase());
                    })


                    );
                    propSetFilterCountry([geo.properties.name]);
                    setTooltipContent("hej");
                  }}
                  onMouseLeave={()=>{
                    setTooltipContent("");
                  }}
                  style={{
                    hover: {
                      fill: "#FF3",
                      outline: "none"
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      //)
      }
    </ComposableMap>
  ); 
};

export default MapChart;
