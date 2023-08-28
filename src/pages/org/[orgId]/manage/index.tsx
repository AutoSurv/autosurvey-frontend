import { NavigationBar } from "@/component/NavigationBar";
import UserTable from "@/component/UserTable";
import { getUsers } from "@/helper/apiService";
import { OrgContext } from "@/helper/context";
import { getUserEmailDomain } from "@/helper/methods";
import { User } from "@/type/type"
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { Header, Icon, Label, Table } from "semantic-ui-react";


export default function Manage() {
  const { organization } =useContext(OrgContext);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    if(router.isReady){
      getUsers(setUsers);
    } 
    
  },[router.isReady]);

  return (
    <>
      <div className="home-header-container">
        <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
          <Header.Content><Link href="/org"><Icon name='clipboard' className="home-header-icon" /></Link><Link className="home-header-autosurvey" href="/org">AutoSurvey</Link></Header.Content>
        </Header>
      </div>
      
      <NavigationBar pathname={router.pathname} /> 

      <Table celled striped color="violet" >
        <Table.Header >
          <Table.Row>
            <Table.HeaderCell textAlign="left" colSpan='6'><Label color="blue" size="large" ribbon>{organization.orgName}</Label></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell >User ID</Table.HeaderCell>
            <Table.HeaderCell >User name</Table.HeaderCell>
            <Table.HeaderCell >User email</Table.HeaderCell>
            <Table.HeaderCell >User role</Table.HeaderCell>
            <Table.HeaderCell >User status</Table.HeaderCell>
            <Table.HeaderCell >Manage</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            users.length > 0 ?
            users
            .filter((user: User) => {
               return organization.orgName.toLowerCase() === getUserEmailDomain(user.email).toLowerCase();
              }
            ).map((user: User, index: number) => {
              return(
                <>
                  <UserTable key={index} propOrgId={organization.orgId} propUser={user} setUsers={setUsers} />
                </>
              )
            })
            :
            <div>Organziation {organization.orgName} has no user(s)</div>
          }
        </Table.Body>
      </Table>
    </>
  )
}