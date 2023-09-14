import { OrgContext } from '@/helper/context';
import { handleClickedCountry } from '@/helper/methods';
import { Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterCountry( { propSurveys, propSetFilteredCountry } : FilterProps) {
  const {filterCountries, setFilterCountries, clickedCountry, setClickedCountry, clickedCountries, setClickedCountries} = useContext(OrgContext);

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
  
  const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
    console.log();
    const strArr: string[] = typeof value === 'string' ? value.split(',') : value;
    
    for (let i=0; i< strArr.length; i++) {   
      handleClickedCountry(strArr[i], clickedCountries, setClickedCountries);
    }
    setFilterCountries(strArr);
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
    value={filterCountries}
    />
  )

}
