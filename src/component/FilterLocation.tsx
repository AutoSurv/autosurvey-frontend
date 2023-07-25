import { OrgContext } from '@/helper/context';
import { Survey } from '@/type/type';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

type FilterProps = {
  surveys: Survey[];
  setFilteredLocation: Dispatch<SetStateAction<string[]>>
}

export default function FilterLocation( { surveys, setFilteredLocation } : FilterProps) {
  const {filterLocation, setFilterLocation} = useContext(OrgContext);
  
  const uniqueSurveyLoacationArray: string[] = [];    
  surveys.filter(survey => {
      if (uniqueSurveyLoacationArray.indexOf(survey.locationClustered) === -1) {
        uniqueSurveyLoacationArray.push(survey.locationClustered);
      }
    })  
  
  const stateOptions = uniqueSurveyLoacationArray.sort().map( (locationClustered, index: number) => ({
    key: index,
    text: locationClustered,
    value: locationClustered,
  }));
  
  const handleChange = (event: any, {value}: any) => {
    setFilterLocation(typeof value === 'string' ? value.split(',') : value);
   
  };

  useEffect(() => {
    setFilteredLocation(filterLocation);
  },[filterLocation.length])  

  return (

    <Dropdown
      placeholder='Location'
      multiple
      search
      selection
      options={stateOptions}
      onChange={handleChange} />
  )
}