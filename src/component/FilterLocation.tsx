import { AutoSurvey } from '@/type/type';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredLocation: Dispatch<SetStateAction<string[]>>
  filteredCountry: string[]
}

export default function FilterLocation( { surveys, setFilteredLocation, filteredCountry } : FilterProps) {
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filterSurvey, setFilterSurvey] = useState<AutoSurvey[]>([]);
  
  const uniqueSurveyCountryArray: string[] = [];
    
      surveys
      //filterSurvey
    .filter(survey => {
      if (uniqueSurveyCountryArray.indexOf(survey.locationClustered) === -1) {
        uniqueSurveyCountryArray.push(survey.locationClustered);
      }
    })
  
  
  const stateOptions = uniqueSurveyCountryArray.sort().map( (locationClustered, index: number) => ({
    key: index,
    text: locationClustered,
    value: locationClustered,
  }));
  
  const handleChange = (event: any, {value}: any) => {
    setFilterLocation(typeof value === 'string' ? value.split(',') : value);
   
  };

  useEffect(() => {
    setFilteredLocation(filterLocation);
  },[filterLocation.length])

  

  return (
    <>
    <Dropdown
      placeholder='Location'
      multiple
      search
      selection
      options={stateOptions}
      onChange={handleChange} /></>
  )

}