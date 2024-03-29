import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterYear from "./FilterYear";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurvey: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurveyByYear( { propSurveys, propSetFilteredSurvey, 
  } : FilterProps) {
  const [filterYears, setFilterYears] = useState<string[]>([]);

  useEffect (() => {
    setFilterYears(filterYears);
    propSetFilteredSurvey(
      propSurveys.filter((survey: Survey) => { 
        if (filterYears.length > 0) {
          return filterYears.some((year) => {
            if (year == "" || year == null) {
              return survey.year;
            } else {
              return survey.year.toString().toLowerCase().includes(year);
            }
          })
        } else {
          return survey;
        } 
    })
    )
  }, [propSurveys.length, filterYears.length])

  return(    
    <FilterYear propSurveys={propSurveys}  propSetFilteredYears={setFilterYears} />
    )
}