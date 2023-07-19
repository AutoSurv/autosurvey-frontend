import { AutoSurvey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCountry from "./FilterCountry";
import FilterLocation from "./FilterLocation";

type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredSurvey: Dispatch<SetStateAction<AutoSurvey[]>>
}

export default function FilterSurveyByCountry( { surveys, setFilteredSurvey } : FilterProps) {
  const [filteredCountry, setFilteredCountry] = useState<string[]>([]);
  const [filteredLocation, setFilteredLocation] = useState<string[]>([]);
  
  useEffect (() => {
    setFilteredSurvey(
    surveys.filter((survey: AutoSurvey) => {  
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
    })
    )
  }, [surveys.length, filteredCountry])

  return(
    
    <section >
      
      

    
      <FilterCountry surveys={surveys}  setFilteredCountry={setFilteredCountry} />
  

    </section>
  )
}