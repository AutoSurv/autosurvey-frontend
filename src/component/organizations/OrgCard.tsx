import * as React from 'react';
import { Organization, ROLE } from '@/type/type';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { Button, Form, Input, Label, Modal, Card, Image, Confirm, Icon } from 'semantic-ui-react';
import { deleteOrganization, updateOrganizationName } from '@/helper/apiService';
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
  const [role, setRole] = useState("");
  const [errMessage, setErrMessage] = useState<string>("");
  const orgLowerName: string = organization.orgName.toLowerCase();
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("role") as string);
  }, []);

  return (
    <div className="org-card-container">
      <Card className="org-card" >
        <Link href={"/org/" + organization.orgId} >
          <Image className="org-card-image" src={`/${orgLowerName}.png`} alt={organization.orgName} size='large' />
          <Card.Content>
            <Card.Header className='org-card-header'>{organization.orgName}</Card.Header>
            <Card.Meta className='org-card-meta'># the number of surveys: {organization.surveys.length}</Card.Meta>
          </Card.Content>
        </Link>

        {role !== ROLE.user ?
          <div className="org-card-btn-container">
            <Modal animation={false}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button className="org-modal-btn" color="grey" icon size='mini' ><Icon name="edit" /></Button>}>
              <Modal.Header>Rename Your Organization</Modal.Header>
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
            <Button className="org-modal-btn" onClick={() => {
              setOpenConfirm(true);
            }}  icon size='mini' color="grey"
            ><Icon name="trash alternate" /></Button>
            <Confirm
              open={openConfirm}
              header='Remove your organization'
              content='Are you sure you want to remove your organization?'
              onCancel={() => setOpenConfirm(false)}
              onConfirm={(e) => {
                e.preventDefault();
                deleteOrganization(organization.orgId, setOrganizations);
                setOpenConfirm(false);
              }}
            />
          </div>
          : null
        }
        
      </Card>
    </div>
  );
}