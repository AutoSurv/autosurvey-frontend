import * as React from 'react';
import {  Table } from 'semantic-ui-react';
import Link from 'next/link';
import { AutoSurvey, Organization } from '@/type/type';

type SurveyCardProp = {
    organization: Organization,
    survey: AutoSurvey
}

export default function SurveyRecord(props: SurveyCardProp) {
   // const orgLowerName: string = props.survey.orgName.toLowerCase();

    return (
        
        <Table.Row>
            <Table.Cell >
            <Link className='survey-link' href={"/org/" + props.organization.orgId + "/" + props.survey.id}>{props.survey.id}</Link>
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