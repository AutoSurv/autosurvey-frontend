import { Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterCountry( { propSurveys, propSetFilteredCountry } : FilterProps) {
  const [filterCountries, setFilterCountries] = useState<string[]>([]);
  console.log("propSurveys counttry: ", propSurveys)

  const uniqueSurveyCountryArray: string[] = [];
  propSurveys.map(survey => {
    if (uniqueSurveyCountryArray.indexOf(survey.country) === -1) {
      uniqueSurveyCountryArray.push(survey.country);
    }
  })

  console.log("uniqueSurveyCountryArray:",  uniqueSurveyCountryArray);
  
  const stateOptions = uniqueSurveyCountryArray.sort().map( (country, index: number) => ({
    key: index,
    text: country,
    value: country,
  }));
  
  const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
    console.log("country value: ", value)
    setFilterCountries(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    propSetFilteredCountry(filterCountries);
  },[filterCountries.length])

  return (
    <Dropdown
    placeholder='Country'
    multiple
    clearable
    search
    selection
    options={stateOptions}
    onChange={handleChange}

    />
  )

}
