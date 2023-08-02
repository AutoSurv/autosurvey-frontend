import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import FilterSurveyByCountry from "./FilterSurveyByCountry";
import FilterLocation from "./FilterLocation";
import { OrgContext } from "@/helper/context";
import FilterSurveyByYear from "./FilterSurveyByYear";
import FilterCountry from "./FilterCountry";
import FilterSurveyByLocation from "./FilterSurveyByLocation";
import FilterYear from "./FilterYear";
import { Button } from "semantic-ui-react";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>
}

export default function FilterSurvey( { propSurveys, propSetFilteredSurveys } : FilterProps) {
  const {filterLocations, setFilterLocations} = useContext(OrgContext);
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  const [filterYears, setFilterYears] = useState<string[]>([]);
  const [fromYear, setFromYear] = useState<Survey[]>([]);
  const [fromCountry, setFromCountry] = useState<Survey[]>([]);
  //const [fromLocation, setFromLocation] = useState<Survey[]>([]);

  const [filterSurveys, setFilterSurveys] = useState<Survey[]>([]);

  console.log("filterYears: ", filterYears)
  console.log("filterCountries: ", filterCountries)
  console.log("filterLocations: ", filterLocations)

  useEffect (() => {
    if (filterYears.length == 0) {
      setFilterCountries([])
      setFilterLocations([])
      setFilterSurveys(propSurveys)
    }
    propSetFilteredSurveys(
      filterSurveys
/*        .filter((survey: Survey) => { 
        if (filterYears.length > 0) {
          return filterCountries.some((year) => {
            if (year == "" || year == null) {
              return survey.year;
            } else {
              return survey.year.toString().includes(year);
            }
          })
        } 
        else {
          return survey;
        }
      }) */ 
/*       .filter((survey: Survey) => { 
        if (filterCountries.length > 0) {
          return filterCountries.some((country) => {
            if (country == "" || country == null) {
              return survey.country;
            } else {
              return survey.country.toLowerCase().includes(country.toLowerCase());
            }
          })
        } 
        else {
          return survey;
        }
      })  */
/*       .filter((survey: Survey) => { 
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
    })  */  
    )  
  }, [propSurveys.length, filterSurveys.length, filterYears.length, filterCountries.length, filterLocations.length]) 

  return(
    <section >
      { 
        <FilterSurveyByYear propSurveys={propSurveys} propSetFilteredSurvey={setFromYear} propFilteredYears={setFilterYears} />
      //  <FilterSurveyByCountry propSurveys={propSurveys} propSetFilteredSurveys={setFilterSurveys} propSetFilteredCountries={setFilterCountries}/> 
      // <FilterYear propSurveys={propSurveys}  propSetFilteredYears={setFilterYears} />
      }
      {
        //filterCountries.length > 0 ?
        filterYears.length > 0 ?
        <>
          {
          //  <FilterSurveyByYear propSurveys={filterSurveys} propSetFilteredSurvey={setFilterSurveys} propFilteredYears={setFilterYears} />
            <FilterSurveyByCountry propSurveys={fromYear} propSetFilteredSurveys={setFromCountry} propSetFilteredCountries={setFilterCountries}/>
          //  <FilterCountry propSurveys={filterSurveys}  propSetFilteredCountry={setFilterCountries} />
          }
          {/*           {
            filterCountries.length > 0 ?
            <> */}
            {
              <FilterSurveyByLocation propSurveys={fromCountry} propSetFilteredSurveys={setFilterSurveys} propSetFilteredLocations={setFilterLocations}/>
            //  <FilterLocation propSurveys={filterSurveys} propSetFilteredLocations={setFilterLocations} />
            }
          {/*             </>
            : null
          } */
          }
            
        </>
        : null
      }  
    </section>
  )
}