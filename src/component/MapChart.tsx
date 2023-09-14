import { OrgContext } from "@/helper/context";
import { handleClickedCountry } from "@/helper/methods";
import { Survey } from "@/type/type";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>;
  propSetFilterCountry: Dispatch<SetStateAction<string[]>>;
};

export default function MapChart({
  propSetFilteredSurveys,
  propSetFilterCountry,
}: MapChartProps) {
  const { surveys, filterCountries, clickedCountry, setClickedCountry, clickedCountries, setClickedCountries } = useContext(OrgContext);
  const [geoData, setGeoData] = useState(""); 

  useEffect(() => {
      handleClickedCountry(geoData, clickedCountries, setClickedCountries);
    }, [clickedCountry, clickedCountries]);

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
      <Graticule stroke="#EAEAEC" strokeWidth={0.5} />
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
          
              
              const isClicked =
                clickedCountries.find((c) => c.country === geo.properties.name)
                  ?.country === geo.properties.name &&
                clickedCountries.find((c) => c.country === geo.properties.name)
                  ?.clicked;

              return d ? (
                <Popup
                  key={index}
                  trigger={
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#F53"
                      stroke="#EAEAEC"
                      onClick={async () => {
                        propSetFilteredSurveys(
                          surveys.filter((survey: Survey) => {
                            return survey.country
                              .toLowerCase()
                              .includes(geo.properties.name.toLowerCase());
                          })
                        );
                        let stringArray: string[] = filterCountries;
                        
                        if (stringArray.includes(geo.properties.name)) {
                          stringArray = filterCountries.filter(
                            (country) => country !== geo.properties.name
                          );
                        } else {
                          stringArray.push(geo.properties.name);
                        }
                        propSetFilterCountry(stringArray);
                        setGeoData(geo.properties.name);
                        setClickedCountry({
                          country: geo.properties.name,
                          clicked: true,
                        });

                       
                      }}
                      style={
                        !isClicked
                          ? {
                              default: {
                                fill: "#F53",
                                outline: "none",
                              },
                              hover: {
                                fill: "#F53",
                                outline: "none",
                              },
                              pressed: {
                                fill: "#F53",
                                outline: "none",
                              },
                            }
                          : {
                              default: {
                                fill: "#4183c4",
                                outline: "none",
                              },
                              hover: {
                                fill: "#4183c4",
                                outline: "none",
                              },
                              pressed: {
                                fill: "#4183c4",
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
                />
              ) : (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#D3D3D3"
                  stroke="#EAEAEC"
                  style={{
                    default: {
                      fill: "#D3D3D3",
                      outline: "none",
                    },
                    hover: {
                      fill: "#D3D3D3",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#D3D3D3",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      }
    </ComposableMap>
  );
}