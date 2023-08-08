import { OrgContext } from "@/helper/context";
import { useContext, useEffect, useState } from "react";
import { getUserApi } from "../api/surveyAPI";
import { User } from "@/type/type";
import Link from "next/link";
import { Card, Header, Icon, Menu, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import UserOptions from "@/component/UserOptions";

export default function UserInfo() {
  const { userNameAuth, organization } = useContext(OrgContext);
  const [user, setUser] = useState<User>();

  const getUserInfo = async () => {
    const apiResponse = await getUserApi(userNameAuth);
    if (apiResponse.status === 200) {
      const data: User = await apiResponse.json();
      setUser(data);
    }
  }

  useEffect(() => {
    console.log(userNameAuth)
    getUserInfo();
  }, [])

  return (

    <main className="org-main">
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
          <Link href={"/org"} style={{ textDecoration: "none" }}>
            Back to Organizations
          </Link>
        </Menu.Item>
        {
          organization.orgId.length > 0 ?
            <>
              <Menu.Item>
                <Link href={"/org/" + organization.orgId} style={{ textDecoration: "none" }}>
                  Back to Surveys
                </Link>
              </Menu.Item>
            </>
            : null
        }
        <Menu.Menu position="right">
          <Menu.Item>
            <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link>
          </Menu.Item>
          <UserOptions />
        </Menu.Menu>
      </Menu>

      <div className="user-card-container">
        <Card className="user-card" >
          <Card.Content className="user-header" header='User Profile' />
          <Table className="user-table">
            <TableBody>
              <TableRow className="user-table-row">
                <TableCell component="th" scope="row" align="left">
                  Username:
                </TableCell>
                <TableCell component="th" scope="row" align="right" class="right aligned">
                  {user?.username}
                </TableCell>
              </TableRow>
              <TableRow className="user-table-row">
                <TableCell component="th" scope="row" align="left">
                  Email:
                </TableCell>
                <TableCell component="th" scope="row" align="right" class="right aligned">
                  {user?.email}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Card.Content extra className="user-table-role">
            #{user?.roles}
          </Card.Content>
        </Card>
      </div>
    </main>

  )

}