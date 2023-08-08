import UserOptions from "@/component/UserOptions";
import { OrgContext } from "@/helper/context";
import { Paper } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { Header, Icon, Menu } from "semantic-ui-react";

export default function About() {
  const { organization } = useContext(OrgContext);

  return (
    <div>
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
        <Menu.Item> <Link href={"/org/" + organization.orgId} style={{ textDecoration: 'none' }}>Surveys</Link></Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link>
          </Menu.Item>
          <UserOptions />
        </Menu.Menu>
      </Menu>
      <Paper>This is about page. We are working on it.</Paper>

    </div>
  )

}