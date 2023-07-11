import * as React from 'react';
import { Organization } from '@/type/type';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Button, Form, Input, Label, Modal, Card, Image } from 'semantic-ui-react';
import { deleOrganization, updateOrganizationName } from '@/pages/api/autosurvey';
import { OrgContext } from '@/helper/context';
import Link from 'next/link';

type OrgCardProp = {
  organization: Organization;
  setOrganizations: Dispatch<SetStateAction<Organization[]>>;
}

export default function OrgCard(props: OrgCardProp) {
  const { organization, setOrganizations } = props;
  const { setOrganization } = useContext(OrgContext);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const orgLowerName: string = organization.orgName.toLowerCase();


  return (


    <div className="org-card-container">
      <Card className="org-card" >
        <Link href={"/org/" + organization.orgId} >
          <Image className="org-card-image" src={`/${orgLowerName}.png`} alt={organization.orgName} size='large'  />
          <Card.Content>
            <Card.Header>{organization.orgName}</Card.Header>
            <Card.Meta>the number of surveys: {organization.surveys.length}</Card.Meta>
          </Card.Content>

        </Link>
        <div className="org-card-btn-container">
        <Modal animation={false}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className="org-modal-btn" basic color="blue"> Edit Name</Button>}>
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
              <Button onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
              }} color="orange"
              >Cancel</Button>
            </Form>
          </Modal.Content>
        </Modal>
        <Button className="org-modal-btn" onClick={(e) => {
          e.preventDefault();
          deleOrganization(organization.orgId, setOrganizations)
        }} color="orange" basic
        >Delete Org.</Button>
        </div>
      </Card>

    </div>
  );
}