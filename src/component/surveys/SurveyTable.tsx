import * as React from 'react';
import {  Table } from 'semantic-ui-react';
import Link from 'next/link';
import { Survey, Organization } from '@/type/type';
import UpdSurvey from './UpdateSurvey';
import { useContext } from 'react';
import { OrgContext } from '@/helper/context';
import UpdSurveyAsExcel from './UpdateSurveyAsExcel';

type SurveyCardProp = {
    organization: Organization,
    survey: Survey
}

export default function SurveyRecord(props: SurveyCardProp) {
    const { setSurvey } =useContext(OrgContext);
    //<Form.Group widths='equal'>
    return (        
        <Table.Row >
            <Table.Cell >
              <Link className='survey-link' href={"/org/" + props.organization.orgId + "/" + props.survey.id}>{props.survey.id} </Link>
            </Table.Cell>
            <Table.Cell collapsing>
              <UpdSurveyAsExcel survey={props.survey} orgid={props.organization.orgId} setSurvey={setSurvey} />
            </Table.Cell>
            <Table.Cell >
              <Link className='survey-link' href={"/org/" + props.organization.orgId + "/" + props.survey.id}>{props.survey.country}</Link>
            </Table.Cell>
            <Table.Cell >
              <Link className='survey-link' href={"/org/" + props.organization.orgId + "/" + props.survey.id}>{props.survey.year}</Link>
            </Table.Cell>
            <Table.Cell >
              {localStorage.getItem("username")}
            </Table.Cell>
            
        </Table.Row>
       
    );
}