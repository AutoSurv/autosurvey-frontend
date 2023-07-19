import { AutoSurvey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCountry from "./FilterCountry";

type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredSurvey: Dispatch<SetStateAction<AutoSurvey[]>>
  setFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterSurveyByCountry( { surveys, setFilteredSurvey, setFilteredCountry } : FilterProps) {
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  

  useEffect (() => {
    setFilteredCountry(filterCountry);
    setFilteredSurvey(
    surveys.filter((survey: AutoSurvey) => {  
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
  }, [surveys.length, filterCountry.length])

  return(
    
    <section >
      
      

    
      {
        <FilterCountry surveys={surveys}  setFilteredCountry={setFilterCountry} />
      }
  

    </section>
  )
}