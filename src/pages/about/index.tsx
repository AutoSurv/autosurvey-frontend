import UserOptions from "@/component/UserOptions";
import { OrgContext } from "@/helper/context";
import Link from "next/link";
import { Header, Icon, Menu, Table, TableBody, TableCell, TableRow} from "semantic-ui-react";
import { useContext, useEffect, useState } from "react";
import { TableHead } from "@mui/material";


export default function About() {
  const { organization } =
    useContext(OrgContext);
   
    return (
      <>

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
      
        <main className="org-main">
          <section className="about-project">
            <h1>The project</h1>

            <section className="about-table-section">
              <Table className="about-table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} className="about-table-head" align="left" size="medim"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow className="survey-table-row">
                    <TableCell component="th" scope="row" align="left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </TableCell>
                    <TableCell align="center">
                      fdgfsfffd
                    </TableCell>
                  </TableRow>
                </TableBody>  
              </Table>
            </section>
  
          </section>  
          <section className="about-us">
            <h1>The team</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?
            </p>  
          </section> 
        </main>
        </>
    )

}