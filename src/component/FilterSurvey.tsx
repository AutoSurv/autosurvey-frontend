import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import FilterSurveyByCountry from "./FilterSurveyByCountry";
import FilterLocation from "./FilterLocation";
import { OrgContext } from "@/helper/context";
import FilterSurveyByYear from "./FilterSurveyByYear";
import FilterYear from "./FilterYear";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurvey: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurvey( { propSurveys, propSetFilteredSurvey } : FilterProps) {
  const {filterLocation, setFilterLocation} = useContext(OrgContext);
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  const [filterYear, setFilterYear] = useState<string[]>([]);
  const [filterSurvey, setFilterSurvey] = useState<Survey[]>([]);

  useEffect (() => {
    propSetFilteredSurvey(
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
      { <FilterSurveyByCountry propSurveys={propSurveys} propSetFilteredSurvey={setFilterSurvey} propSetFilteredCountry={setFilterCountry}/> }
      {
        filterCountry.length > 0 ?
        <>
          <FilterSurveyByYear propSurveys={filterSurvey} propSetFilteredSurvey={setFilterSurvey} />
          
          <FilterLocation propSurveys={filterSurvey} propSetFilteredLocation={setFilterLocation} />
            
        </>
        : null
      }  
    </section>
  )
}