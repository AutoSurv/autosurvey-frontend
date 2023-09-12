import { OrgContext } from "@/helper/context";
import { CountryChart, Survey } from "@/type/type";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
//import { csv } from "d3-fetch";
//import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { Popup } from "semantic-ui-react";

const geoUrl = "/countries.json";
//const geoUrl =
//  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
// const colorScale = scaleLinear()
//   .domain([0.29, 0.68])
//   .range(["#ffedea", "#ff5233"]);

type MapChartProps = {
  setTooltipContent: any;
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>;
  propSetFilterCountry: Dispatch<SetStateAction<string[]>>;
};

const MapChart = ({
  setTooltipContent,
  propSetFilteredSurveys,
  propSetFilterCountry,
}: MapChartProps) => {
  const { surveys, filterCountries } = useContext(OrgContext);
  const [clickedCity, setClickedCity] = useState("");

  const handleClick = (geo: any) => {
    setClickedCity(geo.properties.name);
  };

  

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
        scale: 135,
      }}
    >
      {
        //<Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      }

      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {
        //data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = surveys.find((s) => s.country === geo.properties.name);
              let location_arr: string[] = [];
              let countryLocation_list = new Set<string>();
              const filteredSurveys = surveys.filter((s) => s.country === geo.properties.name);
              filteredSurveys.forEach((s) => countryLocation_list.add(s.locationClustered));
              location_arr = Array.from(countryLocation_list);
              
              return (
                <Popup
                  trigger={
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={d ? "#F53" : "#D6D6DA"}
                      stroke="black"
                      strokeWidth="0.1"
                      onClick={() => {
                        propSetFilteredSurveys(
                          surveys.filter((survey: Survey) => {
                            return survey.country
                              .toLowerCase()
                              .includes(geo.properties.name.toLowerCase());
                          })
                        );
                        propSetFilterCountry([geo.properties.name]);
                        handleClick(geo);
                        setTooltipContent("hej");
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={
                        d
                          ? {
                              default: {
                                fill: "#F53",
                                outline: "none",
                              },
                              hover: {
                                fill: "#228B22",
                                outline: "none",
                              },
                              pressed: {
                                fill: "#228B22",
                                outline: "none",
                              },
                            }
                          : {
                              default: {
                                fill: "#D6D6DA",
                                outline: "none",
                              },
                              hover: {
                                fill: "#D6D6DA",
                                outline: "none",
                              },
                            }
                      }
                    />
                  }
                  content={ <>
                  <p># of Surveys: {surveys.filter(s=> s.country === geo.properties.name).length}</p> 
                             <p>Locations: {location_arr.toString().replaceAll("," , ", ")}</p>                
                             </> }
                  header={geo.properties.name}
                  basic
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
function dispatcher(arg0: any) {
  throw new Error("Function not implemented.");
}

function getState(arg0: { value: any }): any {
  throw new Error("Function not implemented.");
}
