import { OrgContext } from "@/helper/context";
import { useContext, useEffect, useState } from "react";
import { getUserApi } from "../api/surveyAPI";
import { User } from "@/type/type";
import Link from "next/link";
import { Card, Header, Icon, Menu, Table, TableBody, TableCell, TableRow } from "semantic-ui-react";
import UserOptions from "@/component/UserOptions";
import { useRouter } from "next/router";
import { NavigationBar } from "@/component/NavigationBar";

export default function UserInfo() {
  const { setUserNameAuth, organization } = useContext(OrgContext);
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const getUserInfo = async () => {
    const userName: string = window.localStorage.getItem("username") as string
    const apiResponse = await getUserApi(userName);
    if (apiResponse.status === 200) {
      const data: User = await apiResponse.json();
      setUser(data);
    }
  }

  useEffect(() => {
    setUserNameAuth(localStorage.getItem("username") as string);
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

      <NavigationBar pathname={router.pathname} />

      <div className="user-card-container">
        <Card className="user-card" >
          <Card.Content className="user-header" header='User Profile' />
          <Table className="user-table">
            <TableBody>
              <TableRow className="user-table-row">
                <TableCell component="th" scope="row" align="left">
                  Username:
                </TableCell>
                <TableCell component="th" scope="row" align="right" >
                  {user?.username}
                </TableCell>
              </TableRow>
              <TableRow className="user-table-row">
                <TableCell component="th" scope="row" align="left">
                  Email:
                </TableCell>
                <TableCell component="th" scope="row" align="right" >
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