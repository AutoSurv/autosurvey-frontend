import { OrgContext } from "@/helper/context";
import { Survey } from "@/type/type";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import { Popup } from "semantic-ui-react";

const geoUrl = "/countries.json";

type MapChartProps = {
  setTooltipContent: any;
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>;
  propSetFilterCountry: Dispatch<SetStateAction<string[]>>;
};

export default function MapChart({
  setTooltipContent,
  propSetFilteredSurveys,
  propSetFilterCountry,
}: MapChartProps) {
  const { surveys, filterCountries } = useContext(OrgContext);
  const [clickedCity, setClickedCity] = useState("");

  const handleClick = (geo: any) => {
    setClickedCity(geo.properties.name);
  };

  return (
    <ComposableMap
      projectionConfig={{
        rotate: [-11, 0, 0],
        scale: 155,
      }}
      width={800}
      height={400}
      style={{ width: "100%", height: "auto" }}
    >
    
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo, index: number) => {
              const d = surveys.find((s) => s.country === geo.properties.name);
              let location_arr: string[] = [];
              let countryLocation_list = new Set<string>();
              const filteredSurveys = surveys.filter(
                (s) => s.country === geo.properties.name
              );
              filteredSurveys.forEach((s) =>
                countryLocation_list.add(s.locationClustered)
              );
              location_arr = Array.from(countryLocation_list);

              return (d ?
                <Popup
                  key={index}
                  trigger={
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#F53"
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
                  content={
                    <>
                      <p>
                        # of Surveys:{" "}
                        {
                          surveys.filter(
                            (s) => s.country === geo.properties.name
                          ).length
                        }
                      </p>
                      <p>
                        Locations:{" "}
                        {location_arr.toString().replaceAll(",", ", ")}
                      </p>
                    </>
                  }
                  header={geo.properties.name}
                  basic
                />:
                <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#D6D6DA"
                stroke="black"
                strokeWidth="0.1"
                />
              );
            })
          }
        </Geographies>
      }
    </ComposableMap>
  );
};
