import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import FilterCountry from "./FilterCountry";
import { OrgContext } from "@/helper/context";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurveyByCountry( { propSurveys, propSetFilteredSurveys
  } : FilterProps) {
  const { filterCountries, setFilterYears, setFilterCountries, setFilterLocations } = useContext(OrgContext);
  
  useEffect (() => {
    setFilterCountries(filterCountries);
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
        setFilterLocations([]);
        setFilterYears([])
        return survey;
      }
    })
    )
  }, [propSurveys.length, filterCountries.length])

  return(    
    <FilterCountry propSurveys={propSurveys}  propSetFilteredCountry={setFilterCountries} />  
  )
}