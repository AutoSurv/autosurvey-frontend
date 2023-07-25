import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import FilterSurveyByCountry from "./FilterSurveyByCountry";
import FilterLocation from "./FilterLocation";
import { OrgContext } from "@/helper/context";
import FilterSurveyByYear from "./FilterSurveyByYear";
import FilterYear from "./FilterYear";

type FilterProps = {
  surveys: Survey[];
  setFilteredSurvey: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurvey( { surveys, setFilteredSurvey } : FilterProps) {
  const {filterLocation, setFilterLocation} = useContext(OrgContext);
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  const [filterYear, setFilterYear] = useState<string[]>([]);
  const [filterSurvey, setFilterSurvey] = useState<Survey[]>([]);

  useEffect (() => {
    setFilteredSurvey(
      filterSurvey
      .filter((survey: Survey) => { 
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
      { <FilterSurveyByCountry surveys={surveys} setFilteredSurvey={setFilterSurvey} setFilteredCountry={setFilterCountry}/> }
      {
        filterCountry.length > 0 ?
        <>
          <FilterSurveyByYear surveys={filterSurvey} setFilteredSurvey={setFilterSurvey} />
          
          <FilterLocation surveys={filterSurvey} setFilteredLocation={setFilterLocation} />
            
        </>
        : null
      }  
    </section>
  )
}