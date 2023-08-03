import { OrgContext } from '@/helper/context';
import { Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  propSurveys: Survey[];
  propSetFilteredLocations: Dispatch<SetStateAction<string[]>>
}

export default function FilterLocation( { propSurveys, propSetFilteredLocations } : FilterProps) {
  const {filterLocations, setFilterLocations} = useContext(OrgContext);
  
  const uniqueSurveyLoacationArray: string[] = [];    
  propSurveys.filter(survey => {
      if (uniqueSurveyLoacationArray.indexOf(survey.locationClustered) === -1) {
        uniqueSurveyLoacationArray.push(survey.locationClustered);
      }
    })  
  
  const stateOptions = uniqueSurveyLoacationArray.sort().map( (locationClustered, index: number) => ({
    key: index,
    text: locationClustered,
    value: locationClustered,
  }));
  
  const handleChange = (event: React.SyntheticEvent<HTMLElement, Event>, {value}: any) => {
    setFilterLocations(typeof value === 'string' ? value.split(',') : value);
   
  };

  useEffect(() => {
    propSetFilteredLocations(filterLocations);
  },[filterLocations.length])  

  return (

    <Dropdown
      placeholder='Location'
      multiple
      clearable
      search
      selection
      options={stateOptions}
      onChange={handleChange} 
      value={filterLocations}
    />
  )
}