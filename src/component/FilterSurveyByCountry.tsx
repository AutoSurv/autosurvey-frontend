import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCountry from "./FilterCountry";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurvey: Dispatch<SetStateAction<Survey[]>>
  propSetFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterSurveyByCountry( { propSurveys, propSetFilteredSurvey, propSetFilteredCountry } : FilterProps) {
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  
  useEffect (() => {
    propSetFilteredCountry(filterCountry);
    propSetFilteredSurvey(
      propSurveys.filter((survey: Survey) => {  
      if (filterCountry.length > 0) {
        return filterCountry.some((country) => {
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
  }, [propSurveys.length, filterCountry.length])

  return(
    
    
        <FilterCountry propSurveys={propSurveys}  propSetFilteredCountry={setFilterCountry} />
      
  )
}