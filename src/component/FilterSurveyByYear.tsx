import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterCountry from "./FilterCountry";
import FilterYear from "./FilterYear";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurvey: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurveyByYear( { propSurveys, propSetFilteredSurvey } : FilterProps) {
  const [filterYear, setFilterYear] = useState<string[]>([]);
  
  useEffect (() => {
    propSetFilteredSurvey(
      propSurveys.filter((survey: Survey) => { 
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
  }, [propSurveys.length, filterYear.length])

  return(    
    <FilterYear propSurveys={propSurveys}  propSetFilteredYear={setFilterYear} />
    )
}