import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';
import { Country, Organization } from '@/pages/type/type';

type CountryCardProp = {
    organization: Organization,
    country: Country
}

export default function CountryCard(props: CountryCardProp) {
   
    return (
        <>
          

            <Link href={"/country/"}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image=""
                            alt={props.country.country}
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