import Link from "next/link";
import { Card, Header, Icon, Table, TableBody, TableCell, TableRow, Image } from "semantic-ui-react";
import { TableHead } from "@mui/material";
import { useRouter } from "next/router";
import { NavigationBar } from "@/component/NavigationBar";


export default function About() {
  const router = useRouter();

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

      <NavigationBar pathname={router.pathname} />

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
                    <img className="about-project-img" src="dataColleciton.jpg" alt="collecting data" />
                  </TableCell>
                  <TableCell align="center">
                    <p className="about-project-p">
                      Hello everyone and thanks for using <b>Autosurvey!</b> The
                      project started in 2023 by <b>Simon H.</b> and <b>Marco D.
                      </b> as a tool to help NGO collecting, store and manage data in a
                      centralized way.
                    </p>
                    <p className="about-project-p">
                      Many NGO collects data maually (door to door, paper, phone, email, etc.).
                      The process itself is very <i>time and effort consuming</i> and is <i>not efficient</i>.
                      Futhermore human interactions can lead to an increase
                      of errors, fake data and redundancy.
                    </p>
                    <p className="about-project-p">
                      With <b>Autosurvey</b> we can automatically import several
                      survey and use them globally, <i>decreasing the time and the resources
                      </i> needed. With one standardized entry point for data collection we aim
                      to <i>boost the quality (efficiency, consistency)</i> and the quantity of
                      collected data.
                    </p>
                    <p className="about-project-p">
                      Operators and managers can check the data collected thanks to a centralized
                      charts.
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </section>

        <section className="about-us">

          <Header as="h1" className="about-project-title">The Team Developers</Header>
          <Card.Group className="about-team-card-container">
            <Card className="about-team-card">
              <Image src='marco2.png' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Marco</Card.Header>
                <Card.Meta>Started in June 2023</Card.Meta>
                <Card.Description>
                  I am a 40 years old guy that moved to Stockholm less than a year ago. I have a 30 years old passion for coding and creating new things.
                  I love to create applications from scratch and improve my knowledge.
                  Previously worked as field and validation tester in telecommunications.
                </Card.Description>
              </Card.Content>
              <Card.Content extra className="about-team-card-link">
                <a href="https://www.linkedin.com/in/marco-debernardi-0292a3146/">
                  <img src="https://img.shields.io/badge/Marco-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white" alt="LinkedIn Badge" />
                </a>
                <a href="https://github.com/debe82">
                  <img src="https://img.shields.io/badge/Marco-Github-black?style=flat&logo=github&logoColor=white" alt="Github Badge" />
                </a>
              </Card.Content>
            </Card>
            <Card className="about-team-card">
              <Image src='simon.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Simon</Card.Header>
                <Card.Meta>Started in June 2023</Card.Meta>
                <Card.Description>
                  I am a Korean living in Oslo with a passion for coding & start-ups.
                  Handling data from various sources and setting up code is one of my passions.
                  Previously worked as a Data Researcher/analyst & changed my career to follow my passion for web development.
                </Card.Description>
              </Card.Content>
              <Card.Content extra className="about-team-card-link">
                <a href="https://www.linkedin.com/in/seongbong-hong-080293121">
                  <img src="https://img.shields.io/badge/Simon-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white" alt="LinkedIn Badge" />
                </a>
                <a href="https://github.com/simonhong2022">
                  <img src="https://img.shields.io/badge/Simon-Github-black?style=flat&logo=github&logoColor=white" alt="Github Badge" />
                </a>
              </Card.Content>
            </Card>
          </Card.Group>

        </section>
      </main>
    </>
  )

}