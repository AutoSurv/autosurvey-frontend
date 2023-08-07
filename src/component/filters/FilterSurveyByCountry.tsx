import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCountry from "./FilterCountry";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurveyByCountry( { propSurveys, propSetFilteredSurveys } : FilterProps) {
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  
  useEffect (() => {
    propSetFilteredSurveys(
      propSurveys.filter((survey: Survey) => {  
      if (filterCountries.length > 0) {
        return filterCountries.some((country) => {
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
  }, [propSurveys.length, filterCountries.length])

  return(
    
    
        <FilterCountry propSurveys={propSurveys}  propSetFilteredCountry={setFilterCountries} />
      
  )
}