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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. 
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