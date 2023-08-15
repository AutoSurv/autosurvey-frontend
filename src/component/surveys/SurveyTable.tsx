import * as React from 'react';
import {  Button, Modal, Pagination, Table } from 'semantic-ui-react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import { useContext, useEffect, useState } from 'react';
import { OrgContext } from '@/helper/context';
import UpdSurveyAsExcel from './UpdateSurveyAsExcel';
import { initPagination } from "@/helper/initializer";
import DelSurvey from './DeleteSurvey';

type SurveyCardProp = {
    propOrganization: Organization,
    propSurvey: Survey
}

export default function SurveyRecord({propOrganization, propSurvey}: SurveyCardProp) {
    const { survey, setSurvey } = useContext(OrgContext);
    const [actualSurvey, setActualSurevey] = useState(propSurvey)
    const [pagination, setPagination] = useState(initPagination);  

    useEffect(() => {
      if (survey.id === propSurvey.id) {        
        setActualSurevey(survey);
      }      
    }, [survey] )

    return (        
        <Table.Row >
            <Table.Cell >
              <Link className='survey-link' href={"/org/" + propOrganization.orgId + "/" + actualSurvey.id}>{actualSurvey.id} </Link>
            </Table.Cell>
            <Table.Cell collapsing>
                  <UpdSurveyAsExcel propSurvey={actualSurvey} propOrgid={propOrganization.orgId} propSetSurvey={setSurvey} />
                  <DelSurvey propOrgid={survey.orgId} propSurvey={survey} propSetPagination={setPagination}/>
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