import { AutoSurvey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCountry from "./FilterCountry";
import FilterYear from "./FilterYear";

type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredSurvey: Dispatch<SetStateAction<AutoSurvey[]>>
}

export default function FilterSurveyByYear( { surveys, setFilteredSurvey } : FilterProps) {
  const [filterYear, setFilterYear] = useState<string[]>([]);
  
  useEffect (() => {
    setFilteredSurvey(
      surveys.filter((survey: AutoSurvey) => { 
        if (filterYear.length > 0) {
          return filterYear.some((year) => {
            if (year == "" || year == null) {
              return survey.country;
            } else {
              return survey.year.toString().includes(year);
            }
          })
        } else {
          return survey;
        } 
    })
    )
  }, [surveys.length, filterYear.length])

  return(    
    <FilterYear surveys={surveys}  setFilteredYear={setFilterYear} />
    )
}