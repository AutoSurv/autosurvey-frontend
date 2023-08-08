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
            <h1 className="about-project-title">The project</h1>

            <section className="about-project-table-section">
              <Table className="about-table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} className="about-table-head" align="left" size="medim"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className="about-table-row">
                    <TableCell component="th" scope="row" align="left">
                        <p className="about-project-p">
                          Hello everyone and thanks for using <strong>Autosurvey!</strong> The 
                          project started in 2023 by <strong>Simon H.</strong> and <strong>Marco D.
                          </strong> as a tool to help NGO collecting, store and manage data in a 
                          centralized way. 
                        </p>
                        <p className="about-project-p">  
                          Many NGO collects data maually (door to door, by paper, phone, etc.). 
                          The process itself is very time and effort consuming and is not so 
                          efficient. Futhermore human interactions can lead to an increase of 
                          errors, fake data and redundancy. 
                        </p>
                        <p className="about-project-p">  
                          With <strong>Autosurvey</strong> we can automatically import several 
                          survey in and use them globally, decreasing the time and the resources 
                          needed. With one standardized entry point for data collection we aim to 
                          boost the quality (efficiency, consistency) and the quantity of  
                          collected data.
                        </p>
                        <p className="about-project-p">  
                          Operators and managers can check the data collected thanks to a centralized
                          charts.
                        </p>
                    </TableCell>
                    <TableCell align="center">
                      <img className="about-project-img" src="https://humansofdata.atlan.com/wp-content/uploads/2018/02/stefan-stefancik-257625-2.jpg" alt="collecting data"/>
                    </TableCell>
                  </TableRow>
                </TableBody>  
              </Table>
            </section>
  
          </section>  
          <section className="about-us">
            <h1>The team</h1>

            <section className="about-team-table-section">
              <Table className="about-table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} className="about-table-head" align="left" size="medim"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow className="about-table-row">
                    <TableCell component="th" scope="row" align="left">
                      picture
                    </TableCell>
                    <TableCell align="center">
                      simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon simon 
                    </TableCell>
                  </TableRow>

                  <TableRow className="survey-table-row">
                    <TableCell component="th" scope="row" align="left">
                      picture
                    </TableCell>
                    <TableCell align="center">
                      marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco marco 
                    </TableCell>
                  </TableRow>
                </TableBody>  
              </Table>
            </section> 
          </section> 
        </main>
        </>
    )

}