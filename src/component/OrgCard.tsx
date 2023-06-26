import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';
import { Organization } from '@/pages/type/type';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Button, Form, Input, Label, Modal } from 'semantic-ui-react';
import { updateOrganizationName } from '@/pages/api/autosurvey';
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
    <>

      
        <Card sx={{ maxWidth: 345 }}>
          <Link href={"/org/" + organization.orgId}>
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
          </Link>
          <Modal animation={false}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button className="org-modal-btn"> Edit Organization Name</Button>}>
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
                      <Button type="submit">Edit</Button>
                    </Form>
                </Modal.Content>
            </Modal>
          <Button>Delete Organization</Button>
        </Card>

    </>
  );
}