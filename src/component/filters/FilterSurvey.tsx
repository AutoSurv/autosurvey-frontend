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
  //const [filterCountries, setFilterCountries] = useState<string[]>([]);
  //const [filterYears, setFilterYears] = useState<string[]>([]);
  const [fromYear, setFromYear] = useState<Survey[]>([]);
  const [fromCountry, setFromCountry] = useState<Survey[]>([]);
  //const [fromLocation, setFromLocation] = useState<Survey[]>([]);

  const [filterSurveys, setFilterSurveys] = useState<Survey[]>([]);

  useEffect (() => {
    if (filterYears.length == 0) {
      setFilterSurveys(propSurveys)
    }
    propSetFilteredSurveys(
      filterSurveys
    )  
  }, [propSurveys.length, filterSurveys.length, filterYears.length, filterCountries.length, filterLocations.length]) 

  return(
    <section >
      { 
        <FilterSurveyByYear propSurveys={propSurveys} propSetFilteredSurvey={setFromYear}  />
      }
      {
        filterYears.length > 0 ?
        <>
          {
            <>
            <FilterSurveyByCountry propSurveys={fromYear} propSetFilteredSurveys={setFromCountry} />
            {
              filterCountries.length > 0 ?
              <>
              <FilterSurveyByLocation propSurveys={fromCountry} propSetFilteredSurveys={setFilterSurveys} />
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