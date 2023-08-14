import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import FilterLocation from "./FilterLocation";
import { OrgContext } from "@/helper/context";

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredSurveys: Dispatch<SetStateAction<Survey[]>>
  //propSetFilter: Dispatch<SetStateAction<string[]>>
}

export default function FilterSurveyByLocation( { propSurveys, propSetFilteredSurveys
  //, propSetFilter 
} : FilterProps) {
  const { filterYears, setFilterYears } = useContext(OrgContext);
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  
  useEffect (() => {
    //propSetFilter(filterLocation);
    propSetFilteredSurveys(
      propSurveys.filter((survey: Survey) => {  
      if (filterLocation.length > 0) {
        return filterLocation.some((location) => {
          if (location == "" || location == null) {
            return survey.locationClustered;
          } else {
            return survey.locationClustered.toLowerCase().includes(location.toLowerCase());
          }
        })
      } else {
        setFilterYears([])
        return survey;
      }
    })
    )
  }, [propSurveys.length, filterLocation.length])

  return(
    
    
    <FilterLocation propSurveys={propSurveys} propSetFilteredLocations={setFilterLocation} />
      
  )
}