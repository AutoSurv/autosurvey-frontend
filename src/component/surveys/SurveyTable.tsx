import * as React from 'react';
import { Table } from 'semantic-ui-react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import { useContext, useEffect, useState } from 'react';
import UpdSurveyAsExcel from './UpdateSurveyRows';
import { OrgContext } from '@/helper/context';

type SurveyCardProp = {
    propOrganization: Organization,
    propSurvey: Survey
}

export default function SurveyRecord({propOrganization, propSurvey}: SurveyCardProp) {
  const { survey, setSurvey } = useContext(OrgContext);
  const [actualSurvey, setActualSurvey] = useState(propSurvey)
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (survey.id === propSurvey.id) {        
      setActualSurvey(survey);
    } else {
      setActualSurvey(propSurvey);
    }      
  }, [survey, actualSurvey, propSurvey] )

    return (        
        <Table.Row 
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
            <Table.Cell collapsing>
            {
              isHovering && (
              <UpdSurveyAsExcel propSurvey={actualSurvey} propOrgid={propOrganization.orgId} propSetSurvey={setSurvey} />
              )
            }
            </Table.Cell>
            <Table.Cell >
              <Link className='survey-link' href={"/org/" + propOrganization.orgId + "/" + actualSurvey.id}>{actualSurvey.id} </Link>
            </Table.Cell>
            <Table.Cell >
              <Link className='survey-link' href={"/org/" + propOrganization.orgId + "/" + actualSurvey.id}>{actualSurvey.country}</Link>
            </Table.Cell>
            <Table.Cell >
              <Link className='survey-link' href={"/org/" + propOrganization.orgId + "/" + actualSurvey.id}>{actualSurvey.year}</Link>
            </Table.Cell>
            <Table.Cell >
              {localStorage.getItem("username")}
            </Table.Cell>            
        </Table.Row>
       
    );
}