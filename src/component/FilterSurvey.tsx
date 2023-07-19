import { AutoSurvey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCountry from "./FilterCountry";
import FilterLocation from "./FilterLocation";

type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredSurvey: Dispatch<SetStateAction<AutoSurvey[]>>
}

export default function FilterSurvey( { surveys, setFilteredSurvey } : FilterProps) {
  const [filteredCountry, setFilteredCountry] = useState<string[]>([]);
  const [filteredLocation, setFilteredLocation] = useState<string[]>([]);
/*
if (filteredCountry.length > 0) {
        return filteredCountry.some((country) => {
          if (country == "" || country == null) {
            return survey.country;
          } else {
            return survey.country.toLowerCase().includes(country.toLowerCase());
          }
        })
      } else {
        return survey;
      }
*/
  
  useEffect (() => {
    console.log("filteredLocation: ", )
    setFilteredSurvey(
    surveys.filter((survey: AutoSurvey) => {  
      if (filteredLocation.length > 0) {
        return filteredLocation.some((location) => {
          if (location == "" || location == null) {
            return survey.locationClustered;
          } else {
            return survey.locationClustered.toLowerCase().includes(location.toLowerCase());
          }
        })
      } else {
        return survey;
      }
    })
    )
  }, [surveys.length, filteredLocation.length])

  return(
    
    <section >
      
      

      {
        //<FilterCountry surveys={surveys}  setFilteredCountry={setFilteredCountry} />
      }
      {
        <FilterLocation surveys={surveys} setFilteredLocation={setFilteredLocation}/>
      }  
    </section>
  )
}