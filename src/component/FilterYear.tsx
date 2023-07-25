import { Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredYear: Dispatch<SetStateAction<string[]>>
}

export default function FilterYear( { propSurveys, propSetFilteredYear } : FilterProps) {
  const [filterYear, setFilterYear] = useState<string[]>([]);

  const uniqueSurveyYearArray: number[] = [];
  propSurveys.filter(survey => {
    if (uniqueSurveyYearArray.indexOf(survey.year) === -1) {
      uniqueSurveyYearArray.push(survey.year);
    }
  })

  console.log("uniqueSurveyYearArray: ", uniqueSurveyYearArray);

  const stateOptions = uniqueSurveyYearArray.sort().map( (year, index: number) => ({
    key: index,
    text: year,
    value: year,
  }));
  
  const handleChange = (event: any, {value}: any) => {
    
    setFilterYear(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    propSetFilteredYear(filterYear);
  },[filterYear.length])

  return (
    <Dropdown
    placeholder='Year'
    //multiple
    search
    selection
    options={stateOptions}
    onChange={handleChange}
    />
  )

}
