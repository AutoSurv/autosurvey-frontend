import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';
import { Organization } from '@/pages/type/type';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Button, Form, Input, Label, Modal } from 'semantic-ui-react';
import { deleOrganization, updateOrganizationName } from '@/pages/api/autosurvey';
import { OrgContext } from '@/helper/context';

type OrgCardProp = {
  organization: Organization;
  setOrganizations: Dispatch<SetStateAction<Organization[]>>;
}

export default function OrgCard(props: OrgCardProp) {
  const { organization, setOrganizations } = props;
  const { setOrganization } = useContext(OrgContext);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  return (


    <div className="org-card-container">
      <Card sx={{ maxWidth: 345 }} className="org-card">
        <Link href={"/org/" + organization.orgId} underline="none" color="inherit">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://tukuz.com/wp-content/uploads/2019/09/medecins-sans-frontieres-doctors-without-borders-logo-vector.png"
              alt={organization.orgName}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" >
                {organization.orgName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                the number of surveys: {organization.surveys.length}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Link>
        <Modal animation={false}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className="org-modal-btn" color="blue"> Edit Name</Button>}>
          <Modal.Header>Make Your Organization</Modal.Header>
          <Modal.Content>
            <Form onSubmit={(e) => {
              e.preventDefault();
              updateOrganizationName(organization.orgId, e, setOrganizations, setOrganization, setOpen, setErrMessage);
            }}>
              <Form.Field>
                <Label>Organization Name</Label>
                <Input placeholder="Name your organization" type="text" name="orgname" />
              </Form.Field>
              <Button type="submit" color="blue">Edit</Button>
            </Form>
          </Modal.Content>
        </Modal>
        <Button onClick={(e) => {
          e.preventDefault();
          deleOrganization(organization.orgId, setOrganizations)
        }} color="orange"
        >Delete Org.</Button>
      </Card>

    </div>
  );
}