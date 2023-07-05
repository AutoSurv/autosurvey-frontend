import { addOrganization, getOrganizations } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { useEffect, useState } from "react";
import { Button, Form, Header, Icon, Input, Label, Menu, Modal, Segment } from "semantic-ui-react";
import OrgCard from "./OrgCard";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function OrgContent() {
    const {data: session, status} = useSession();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    useEffect(() => {
        getOrganizations(setOrganizations);
    }, []);

    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");

    console.log("organizations.length: ", organizations.length);

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
                    <Button circular icon='sign out' color='blue' inverted>{session?.user?.email}</Button>
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
                {organizations.map((organization: Organization, index: number) => {
                    return (
                        <OrgCard key={index} organization={organization} setOrganizations={setOrganizations} />
                    )
                })}

            </div>

        </div>
    )



}