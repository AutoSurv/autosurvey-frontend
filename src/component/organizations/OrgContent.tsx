import { addOrganization, getOrganizations, getUser } from "@/helper/apiService";
import { Organization, ROLE, User } from "@/type/type";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  Modal,
} from "semantic-ui-react";
import OrgCard from "./OrgCard";
import { OrgContext } from "@/helper/context";
import Link from "next/link";
import { NavigationBar } from "../NavigationBar";
import { useRouter } from "next/router";
import { initOrg, initUser } from "@/helper/initializer";
import { getUserEmailDomain } from "@/helper/methods";

export default function OrgContent() {
  const router = useRouter();
  const [userEmailDomain, setUserEmailDomain] = useState("");
  const { userNameAuth, setUserNameAuth, setOrganization, setFilteredSurveys } =
    useContext(OrgContext);
  const [role, setRole] = useState("");
  const [user, setUser] = useState<User>(initUser)
  const [organizations, setOrganizations] = useState<Organization[]>([]);  
  let listOrg: Organization[];

  //useMemo(() => getOrganizations(setOrganizations), []);

  useEffect(() => {
    getUser(localStorage.getItem("username") as string, setUser);
    setOrganization(initOrg);
    setFilteredSurveys([]);
    setUserEmailDomain(getUserEmailDomain(localStorage.getItem("email") as string));
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


      <NavigationBar pathname={router.pathname} />

      {user.roles !== ROLE.user ? (<>
        <div className="org-modal-btn-container">
          <Button className="org-modal-btn" color="green" onClick={() => setOpen(true)}>
            Create Organization
          </Button>
        </div>
        <Modal
          animation={false}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}

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
        </Modal></>
      ) : null}
      <div className="orgs-orgcard-box">
        {organizations.filter(organization => {
          if (localStorage.getItem("role") === "ROLE_ADMIN") {
            return organization;
          } else if (localStorage.getItem("role") === "ROLE_MANAGER") {
            return organization.orgName.toLowerCase() === userEmailDomain.toLowerCase()
          } else {
            if (organization.orgName.toLowerCase() === userEmailDomain.toLowerCase()) {
              return organization;
            } 
          }   
        })        
        .map((organization) => {
          return (
            <OrgCard
              key={organization.orgId}
              organization={organization}
              setOrganizations={setOrganizations}
            />
          );
        })
        }
      </div>
    </div>
  );
}
