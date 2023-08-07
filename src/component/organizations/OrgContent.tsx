import { addOrganization, getOrganizations } from "@/helper/apiService";
import { Organization, ROLE } from "@/type/type";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Menu,
  Modal,
} from "semantic-ui-react";
import OrgCard from "./OrgCard";
import { OrgContext } from "@/helper/context";
import Link from "next/link";
import UserOptions from "../UserOptions";

export default function OrgContent() {
  const { setSignUpStatus, userNameAuth, setUserNameAuth } =
    useContext(OrgContext);
  const [role, setRole] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    setUserNameAuth(localStorage.getItem("username") as string);
    setRole(localStorage.getItem("role") as string);
    getOrganizations(setOrganizations);
  }, []);

  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  return (
    <div className="orgs-content">
      <div className="home-header-container">
        <Header
          className="home-header"
          as="h1"
          icon
          textAlign="center"
          color="blue"
        >
          <Header.Content>
            <Link href="/org">
              <Icon name="clipboard" className="home-header-icon" />
            </Link>
            <Link className="home-header-autosurvey" href="/org">
              AutoSurvey
            </Link>
          </Header.Content>
        </Header>
      </div>

      <Menu size="small" color="blue">
        <Menu.Item>
          {" "}
          <Link href={"/org"} style={{ textDecoration: "none" }}>
            Organization
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
        <Menu.Item> 
          <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link>
        </Menu.Item> 
        <UserOptions />
        </Menu.Menu>
      </Menu>
      {role !== ROLE.user ? (
        <Modal
          animation={false}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={
            <Button className="org-modal-btn" color="green">
              {" "}
              Create Organization
            </Button>
          }
        >
          <Modal.Header>Make Your Organization</Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                addOrganization(
                  e,
                  setOrganizations,
                  setOpen,
                  setErrMessage,
                  userNameAuth
                );
              }}
            >
              <Form.Field>
                <Label>Organization Name</Label>
                <Input
                  placeholder="Name your organization"
                  type="text"
                  name="orgname"
                  pattern="^[a-zA-Z]*$"
                />
              </Form.Field>
              <Button type="submit" color="green">
                Add Organization
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
                color="orange"
              >
                Cancel
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      ) : null}
      <div className="orgs-orgcard-box">
        {organizations.map((organization) => {
          return (
            <OrgCard
              key={organization.orgId}
              organization={organization}
              setOrganizations={setOrganizations}
            />
          );
        })}
      </div>
    </div>
  );
}
