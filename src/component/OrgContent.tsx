import { addOrganization, getOrganizations } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Header, Icon, Input, Label, Menu, Modal, Segment } from "semantic-ui-react";
import OrgCard from "./OrgCard";
import { OrgContext } from "@/helper/context";
import Link from "next/link";


export default function OrgContent() {
    const { setOrganization } = useContext(OrgContext);

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    useEffect(() => {
        getOrganizations(setOrganizations);
    }, []);

    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");

    return (
        <div className="orgs-content">
            <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
                <Header.Content><Icon name='clipboard' /> AutoSurvey </Header.Content>
            </Header>
            <Menu size='small' color="blue" >
                <Menu.Item> <Link href={"/org"} >Home</Link></Menu.Item>
                <Menu.Item> <Link href={"/"} >About</Link></Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                    <Button circular icon='sign out' color='blue' inverted></Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Modal animation={false}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button className="org-modal-btn" color="green"> Create Organization +</Button>}>
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
                        <Button type="submit" color="green">Add Organization +</Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                        }} color="orange"
                        >Cancel</Button>
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