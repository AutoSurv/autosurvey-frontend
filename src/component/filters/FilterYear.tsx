import { OrgContext } from '@/helper/context';
import { Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredYears: Dispatch<SetStateAction<string[]>>
}

export default function FilterYear( { propSurveys, propSetFilteredYears } : FilterProps) {
  const {filterYears, setFilterYears} = useContext(OrgContext);

  const uniqueSurveyYearArray: number[] = [];
  propSurveys.filter(survey => {
    if (uniqueSurveyYearArray.indexOf(survey.year) === -1) {
      uniqueSurveyYearArray.push(survey.year);
    }
  })

  const stateOptions = uniqueSurveyYearArray.sort().map( (year, index: number) => ({
    key: index,
    text: year,
    value: year,
  }));
  
  const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
      setFilterYears(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    propSetFilteredYears(filterYears);
  },[filterYears.length])

  return (
    <Dropdown
    placeholder='Year'
    multiple
    clearable
    search
    selection
    options={stateOptions}
    onChange={handleChange}
    />
  )

}
