import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import FilterSurveyByCountry from "./FilterSurveyByCountry";
import FilterLocation from "./FilterLocation";
import { OrgContext } from "@/helper/context";
import FilterSurveyByYear from "./FilterSurveyByYear";
import FilterCountry from "./FilterCountry";
import FilterSurveyByLocation from "./FilterSurveyByLocation";
import FilterYear from "./FilterYear";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurvey( { propSurveys, propSetFilteredSurveys } : FilterProps) {
  const {filterYears, filterCountries, filterLocations} = useContext(OrgContext);
  
  const [fromYear, setFromYear] = useState<Survey[]>([]);
  const [fromCountry, setFromCountry] = useState<Survey[]>([]);
  const [filterSurveys, setFilterSurveys] = useState<Survey[]>([]);

  useEffect (() => {
    console.log("filterCountries.length: ", filterCountries.length)
    if (filterYears.length == 0 && filterCountries.length == 0 && filterLocations.length == 0) {
      setFilterSurveys(propSurveys)
    } 
    if (filterYears.length != 0 && filterCountries.length == 0 && filterLocations.length == 0) {
      setFilterSurveys(fromYear)
    } 
    if (filterYears.length != 0 && filterCountries.length != 0 && filterLocations.length == 0) {
      setFilterSurveys(fromCountry)
    } 
    propSetFilteredSurveys(
      filterSurveys
    )  
  }, [propSurveys.length, filterSurveys.length, fromYear.length, fromCountry.length, filterLocations.length, filterCountries.length]) 

  return(
    <section >      
        <FilterSurveyByYear propSurveys={propSurveys} propSetFilteredSurvey={setFromYear} 
        //propSetFilter={setFilterYears}
        />    
      {
        filterYears.length > 0 ?
        <>
          {
            <>
            <FilterSurveyByCountry propSurveys={fromYear} propSetFilteredSurveys={setFromCountry} 
            //propSetFilter={setFilterCountries}
            />
            {
              filterCountries.length > 0 ?
              <>
              <FilterSurveyByLocation propSurveys={fromCountry} propSetFilteredSurveys={setFilterSurveys} 
              //propSetFilter={setFilterLocations}
              />
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