import { AutoSurvey } from '@/type/type';
import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import FilterSurveyByCountry from './FilterSurveyByCountry';


type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredLocation: Dispatch<SetStateAction<string[]>>
}

export default function FilterLocation( { surveys, setFilteredLocation } : FilterProps) {
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filteredSurvey, setFilteredSurvey] = useState<AutoSurvey[]>([]);

  const uniqueSurveyCountryArray: string[] = [];

  console.log("filteredSurvey:", filteredSurvey);

  filteredSurvey.map(survey => {
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
    <FilterSurveyByCountry surveys={surveys}  setFilteredSurvey={setFilteredSurvey} />
    <Dropdown
      placeholder='Location'
      fluid
      multiple
      search
      selection
      options={stateOptions}
      onChange={handleChange} /></>
  )

}
