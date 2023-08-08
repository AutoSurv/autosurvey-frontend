import UserOptions from "@/component/UserOptions";
import { OrgContext } from "@/helper/context";
import Link from "next/link";
import { Card, Header, Icon, Menu, Table, TableBody, TableCell, TableRow, Image } from "semantic-ui-react";
import { useContext, useEffect, useState } from "react";
import { Paper, TableHead } from "@mui/material";


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

      <main className="org-main">
        <section className="about-project">
          <Paper>
            <Header as="h1">The AutoSurvey Project</Header>

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
                      <img className="about-project-img" src="https://humansofdata.atlan.com/wp-content/uploads/2018/02/stefan-stefancik-257625-2.jpg" alt="collecting data" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </Paper>

        </section>
        <section className="about-us">
          <Paper>
            <Header as="h1">The Team Developers</Header>
            <Card>
              <Image src='marco2.png' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Marco</Card.Header>
                <Card.Meta>Started in June 2023</Card.Meta>
                <Card.Description>
                  Daniel is a comedian living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a href="https://www.linkedin.com/in/marco-debernardi-0292a3146/">
                  <img src="https://img.shields.io/badge/Marco-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white" alt="LinkedIn Badge" />
                </a>
                <a href="https://github.com/debe82">
                  <img src="https://img.shields.io/badge/Marco-Github-black?style=flat&logo=github&logoColor=white" alt="Github Badge" />
                </a>
              </Card.Content>
            </Card>
            <Card>
              <Image src='simon.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Simon</Card.Header>
                <Card.Meta>Started in June 2023</Card.Meta>
                <Card.Description>
                  Daniel is a comedian living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a href="https://www.linkedin.com/in/seongbong-hong-080293121">
                  <img src="https://img.shields.io/badge/Simon-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white" alt="LinkedIn Badge" />
                </a>
                <a href="https://github.com/simonhong2022">
                  <img src="https://img.shields.io/badge/Simon-Github-black?style=flat&logo=github&logoColor=white" alt="Github Badge" />
                </a>
              </Card.Content>
            </Card>
          </Paper>
        </section>
      </main>
    </div>
  )

}