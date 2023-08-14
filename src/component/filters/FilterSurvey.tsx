import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import FilterSurveyByCountry from "./FilterSurveyByCountry";
import { OrgContext } from "@/helper/context";
import FilterSurveyByYear from "./FilterSurveyByYear";
import FilterSurveyByLocation from "./FilterSurveyByLocation";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>
  propSetIsFilterSet: Dispatch<SetStateAction<boolean>>
}

export default function FilterSurvey( { propSurveys, propSetFilteredSurveys, propSetIsFilterSet } : FilterProps) {
  const {filterYears, filterCountries, filterLocations} = useContext(OrgContext);
  
  const [fromCountry, setFromCountry] = useState<Survey[]>([]);
  const [fromLocations, setFromLocations] = useState<Survey[]>([]);
  const [filterSurveys, setFilterSurveys] = useState<Survey[]>([]);

  useEffect (() => {
    if (filterCountries.length == 0 && filterLocations.length == 0 && filterYears.length == 0) {
      propSetIsFilterSet(false);
      setFilterSurveys(propSurveys);
    } 
    if (filterCountries.length != 0 && filterLocations.length == 0 && filterYears.length == 0) {
      propSetIsFilterSet(true);
      setFilterSurveys(fromCountry);
    } 
    if (filterCountries.length != 0 && filterLocations.length != 0 && filterYears.length == 0) {
      setFilterSurveys(fromLocations);
    } 
    propSetFilteredSurveys(
      filterSurveys
    )  
  }, [propSurveys.length, filterSurveys.length, fromLocations.length, fromCountry.length, filterLocations.length, filterCountries.length, filterYears.length]) 

  return(
    <section >      
      <FilterSurveyByCountry propSurveys={propSurveys} propSetFilteredSurveys={setFromCountry} />        
      {
        filterCountries.length > 0 ?
        <>
          {
            <>
            <FilterSurveyByLocation propSurveys={fromCountry} propSetFilteredSurveys={setFromLocations} />
            {
              filterLocations.length > 0 ?
              <>
                <FilterSurveyByYear propSurveys={fromLocations} propSetFilteredSurvey={setFilterSurveys} />    
              </>
              : null
            }  
            </>
          }           
        </>
        : null
      }  
    </section>
  )
}