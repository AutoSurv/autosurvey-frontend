import { OrgContext } from '@/helper/context';
import { ClickedCountry, Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { handleClickedCountry } from '../MapChart';

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterCountry( { propSurveys, propSetFilteredCountry } : FilterProps) {
  const {filterCountries, setFilterCountries} = useContext(OrgContext);
  const [geoData, setGeoData] = useState('');
  const [clickedCountries, setClickedCountries] = useState<ClickedCountry[]>([]);
  const [clickedCountry, setClickedCountry] = useState<ClickedCountry>({
    country: "",
    clicked: false
});
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
    setGeoData(value);
    setFilterCountries(typeof value === 'string' ? value.split(',') : value);
    handleClickedCountry(value[0], clickedCountries, clickedCountry);
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
