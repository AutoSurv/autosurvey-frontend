import { AutoSurvey } from '@/type/type';
import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'


type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterCountry( { surveys, setFilteredCountry } : FilterProps) {
  const [filterCountry, setFilterCountry] = useState<string[]>([]);

  const uniqueSurveyCountryArray: string[] = [];

  surveys.map(survey => {
    if (uniqueSurveyCountryArray.indexOf(survey.country) === -1) {
      uniqueSurveyCountryArray.push(survey.country);
    }
  })
  
  const stateOptions = uniqueSurveyCountryArray.sort().map( (country, index: number) => ({
    key: index,
    text: country,
    value: country,
  }));
  
  const handleChange = (event: any, {value}: any) => {
    setFilterCountry(typeof value === 'string' ? value.split(',') : value);
   
  };

  

  useEffect(() => {
    setFilteredCountry(filterCountry);
  },[filterCountry.length])

  

  return (
    <Dropdown
    placeholder='Country'
    fluid
    multiple
    search
    selection
    options={stateOptions}
    onChange={handleChange}
    />
  )

}
