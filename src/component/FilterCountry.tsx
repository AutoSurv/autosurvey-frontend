import { Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterCountry( { propSurveys, propSetFilteredCountry } : FilterProps) {
  const [filterCountry, setFilterCountry] = useState<string[]>([]);

  const uniqueSurveyCountryArray: string[] = [];
  propSurveys.map(survey => {
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
    propSetFilteredCountry(filterCountry);
  },[filterCountry.length])

  return (
    <Dropdown
    placeholder='Country'
    multiple
    search
    selection
    options={stateOptions}
    onChange={handleChange}
    />
  )

}
