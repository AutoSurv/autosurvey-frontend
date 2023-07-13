import { addOrganization, getOrganizations } from "@/pages/api/autosurvey";
import { Organization, ROLE } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Header, Icon, Input, Label, Menu, Modal } from "semantic-ui-react";
import OrgCard from "./OrgCard";
import { OrgContext } from "@/helper/context";
import Link from "next/link";
import { SignOut } from "@/helper/methods";



export default function OrgContent() {
    const { setSignUpStatus } = useContext(OrgContext);
    const [role, setRole] = useState("");
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    useEffect(() => {
        setRole(localStorage.getItem("role") as string);
        getOrganizations(setOrganizations);
    }, []);

    const [open, setOpen] = useState(false);
    const [errMessage, setErrMessage] = useState<string>("");

    return (
        <div className="orgs-content">

            <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
                <Header.Content><Link href="/org"><Icon name='clipboard' className="home-header-icon" /></Link><Link className="home-header-autosurvey" href="/org">AutoSurvey</Link></Header.Content>
            </Header>

            <Menu size='small' color="blue">
                <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
                <Menu.Item> <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button onClick={() => {
                            setSignUpStatus(false);
                            SignOut(setSignUpStatus);
                        }}
                            circular icon='sign out' color='blue' inverted></Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            {role !== ROLE.user ?
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
                : null
            }
            <div className="orgs-orgcard-box">
                {organizations.map((organization) => {
                    return (
                        <OrgCard key={organization.orgId} organization={organization} setOrganizations={setOrganizations} />
                    )
                })}

            </div>

        </div>
    )



}