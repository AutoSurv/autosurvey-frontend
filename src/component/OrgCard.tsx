import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';
import { Organization } from '@/pages/type/type';
import { Dispatch, SetStateAction } from 'react';

type OrgCardProp = {
  organization: Organization;
  setOrganizations: Dispatch<SetStateAction<Organization[]>>;
}

export default function OrgCard(props: OrgCardProp) {

  const { organization, setOrganizations } = props;

  return (
    <>

      <Link href={"/org/" + organization.orgId}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image=""
              alt={organization.orgName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {organization.orgName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {organization.orgId}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}