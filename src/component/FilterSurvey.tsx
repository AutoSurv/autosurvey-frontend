import { AutoSurvey } from '@/type/type';
import { FormControl, InputLabel, ListItemText, OutlinedInput, SelectChangeEvent } from '@mui/material';
import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import { Checkbox, Dropdown, MenuItem, Select } from 'semantic-ui-react'


type FilterProps = {
  surveys: AutoSurvey[];
  setFilteredSurvey: Dispatch<SetStateAction<AutoSurvey[]>>
  setFilteredCountry: Dispatch<SetStateAction<string[]>>
}

export default function FilterSurvey( { surveys, setFilteredSurvey, setFilteredCountry } : FilterProps) {
  const [filterCountry, setFilterCountry] = useState<string[]>([]);
  const [filterSurvey, setFilterSurvey] = useState<AutoSurvey[]>([]);
  
  const stateOptions = surveys.sort().map( (survey, index) => ({
    key: index,
    text: survey.country,
    value: survey.country,
  }));

  console.log("surveys: ", surveys);
  
  const handleChange = (event: any, {value}: any) => {
    setFilterCountry(typeof value === 'string' ? value.split(',') : value);

    setFilterSurvey(
    surveys.filter((survey: AutoSurvey) => {  
      if (filterCountry.length > 0) {
        return filterCountry.some((country) => {
          if (country == "" || country == null) {
            return survey.country;
          } else {
            return survey.country.toLowerCase().includes(country.toLowerCase());
          }
        })
      } else {
        return survey;
      }
    })
    )
    
  };

  setFilteredCountry?.(filterCountry);

  useEffect(() => {
    setFilterSurvey(surveys);
    console.log("filterSurvey: ", filterSurvey);
  },[filterSurvey.length])

  

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
