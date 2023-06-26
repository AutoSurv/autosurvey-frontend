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
        <>
          

            <Link href={"/"}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image=""
                            alt={props.survey.country}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.organization.orgName}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </>
    );
}