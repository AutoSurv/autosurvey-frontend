import { addOrganization, getOrganizations } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";
import OrgCard from "./OrgCard";
import { OrgContext } from "@/helper/context";


export default function OrgContent() {
    const {setOrganization} =useContext(OrgContext);

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    useEffect(() => {
        getOrganizations(setOrganizations);
    }, []);

    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");

    return (
        <div className="orgs-content">
            <Modal animation={false}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button className="org-modal-btn"> Create Organization +</Button>}>
                <Modal.Header>Make Your Organization</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        addOrganization(e, setOrganizations, setOpen, setErrMessage);
                    }}>
                        <Form.Field>
                            <Label>Organization Name</Label>
                            <Input placeholder="Name your organization" type="text" name="orgname" />
                        </Form.Field>
                        <Button type="submit">Add Organization +</Button>
                    </Form>
                </Modal.Content>

            </Modal>
            <div className="orgs-orgcard-box">
                {organizations.map((organization) => {
                    return (
                        <OrgCard organization={organization} setOrganizations={setOrganizations} />
                    )
                })}

            </div>

        </div>
    )



}