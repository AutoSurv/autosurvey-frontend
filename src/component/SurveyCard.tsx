import * as React from 'react';
import { Card, Image } from 'semantic-ui-react';
import Link from 'next/link';
import { AutoSurvey, Organization } from '@/type/type';

type SurveyCardProp = {
    organization: Organization,
    survey: AutoSurvey
}

export default function SurveyCard(props: SurveyCardProp) {
    const orgLowerName: string = props.survey.orgName.toLowerCase();
    return (
        <div className='survey-card-container'>
            <Card >
                <Link href={"/org/" + props.organization.orgId + "/" + props.survey.id}  >
                    <Image className="org-card-image" src={`/${orgLowerName}.png`} alt={props.survey.country} size='large' />
                    <Card.Content>
                        <Card.Header> {props.organization.orgName}</Card.Header>
                        <Card.Meta>Country: {props.survey.country}</Card.Meta>
                        <Card.Meta>Survey Id: {props.survey.id}</Card.Meta>
                    </Card.Content>
                </Link>
            </Card>
        </div>

    );
}