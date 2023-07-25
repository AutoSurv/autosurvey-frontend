import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import FilterSurveyByCountry from "./FilterSurveyByCountry";
import FilterLocation from "./FilterLocation";
import { OrgContext } from "@/helper/context";
import FilterSurveyByYear from "./FilterSurveyByYear";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurvey( { propSurveys, propSetFilteredSurveys } : FilterProps) {
  const {filterLocations, setFilterLocations} = useContext(OrgContext);
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  const [filterSurveys, setFilterSurveys] = useState<Survey[]>([]);

  useEffect (() => {
    propSetFilteredSurveys(
      filterSurveys
      .filter((survey: Survey) => { 
        if (filterLocations.length > 0) {
          return filterLocations.some((location) => {
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
  }, [filterSurveys.length, filterLocations.length])

  return(
    <section >
      { <FilterSurveyByCountry propSurveys={propSurveys} propSetFilteredSurveys={setFilterSurveys} propSetFilteredCountries={setFilterCountries}/> }
      {
        filterCountries.length > 0 ?
        <>
          <FilterSurveyByYear propSurveys={filterSurveys} propSetFilteredSurvey={setFilterSurveys} />
          
          <FilterLocation propSurveys={filterSurveys} propSetFilteredLocations={setFilterLocations} />
            
        </>
        : null
      }  
    </section>
  )
}