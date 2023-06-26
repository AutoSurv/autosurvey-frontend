import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';
import { AutoSurvey, Organization } from '@/pages/type/type';

type SurveyCardProp = {
    organization: Organization,
    survey: AutoSurvey
}

export default function SurveyCard(props: SurveyCardProp) {

    return (
        <div className='survey-card-container'>
            <Card sx={{ maxWidth: 345 }}>
                <Link href={"/org/" + props.organization.orgId + "/" + props.survey.id} underline="none" color="inherit" >
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://tukuz.com/wp-content/uploads/2019/09/medecins-sans-frontieres-doctors-without-borders-logo-vector.png"
                            alt={props.survey.country}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.organization.orgName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {props.survey.country} / {props.survey.locationGiven}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>

    );
}