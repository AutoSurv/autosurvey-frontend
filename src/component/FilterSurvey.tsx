import { AutoSurvey } from '@/type/type';
import React, { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'semantic-ui-react'


type FilterProps = {
  surveys: AutoSurvey[];
  //setVisibleSurveys: Dispatch<SetStateAction<AutoSurvey[]>>
}



export default function FilterSurvey( { surveys } : FilterProps) {
  const stateOptions = surveys.map( (survey, index) => ({
    key: survey.id[index],
    text: survey.country,
    value: survey.country[index],
  }));

  //setVisibleSurveys(stateOptions);

  return (
    <Dropdown
      placeholder='State'
      fluid
      multiple
      search
      selection
      options={stateOptions}
    />
)
  }
