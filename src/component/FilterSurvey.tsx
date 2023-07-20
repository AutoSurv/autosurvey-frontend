import { AutoSurvey } from "@/type/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import FilterSurveyByCountry from "./FilterSurveyByCountry";
import FilterLocation from "./FilterLocation";

type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredSurvey: Dispatch<SetStateAction<AutoSurvey[]>>
}

export default function FilterSurvey( { surveys, setFilteredSurvey } : FilterProps) {
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  const [filterSurvey, setFilterSurvey] = useState<AutoSurvey[]>([]);

  useEffect (() => {
    setFilteredSurvey(
      filterSurvey.filter((survey: AutoSurvey) => { 
        if (filterLocation.length > 0) {
          return filterLocation.some((location) => {
            if (location == "" || location == null) {
              return survey.locationClustered;
            } else {
              return survey.locationClustered.toLowerCase().includes(location.toLowerCase());
            }
          })
        } 
        else {
          return survey;
        }
      })
    )
  }, [filterSurvey.length, filterLocation.length])

  return(
    <section >
      { <FilterSurveyByCountry surveys={surveys}  setFilteredSurvey={setFilterSurvey} setFilteredCountry={setFilterCountry}/> }
      {
        filterCountry.length > 0 ?
        <FilterLocation surveys={filterSurvey} setFilteredLocation={setFilterLocation} filteredCountry={filterCountry}/>
        : null
      }  
    </section>
  )
}