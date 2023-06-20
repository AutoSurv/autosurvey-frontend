import { Button } from "@mui/material";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { Form, Input, Label, Modal } from "semantic-ui-react";
import { addOrganization, getOrganizations } from "../api/autosurvey";
import { CountryRequestDto, OrgRequestDto, Organization } from "../type/type";

export default function Orgs() {

    const [countryName, setcountryName] = useState<CountryRequestDto>({} as CountryRequestDto);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");
    
    useEffect(() => {
        getOrganizations(setOrganizations);
    }, [])

    return (
        <main className="org-main">

            <div className="org-add-org">
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
            </div>

        </main>

    )

}