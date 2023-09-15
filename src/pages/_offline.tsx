import { ExportedSurvey, Survey } from "@/type/type";
import Head from "next/head";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Header,
  Icon,
  List,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";
import SignalWifiConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiConnectedNoInternet4";
import { TableHead } from "@mui/material";
import { offlineDownloadExcel } from "@/helper/methods";
import OfflineSurveyForm from "@/component/offline/OfflineSurveyForm";


export default function Fallback() {
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [surveyCounter, setSurveyCounter] = useState("0");
  let offlineSurveys: Survey[] = [];
  let offlineSurveyCounter: number = 0;

  useEffect(() => {}, [surveyCounter]);

  const saveOfflineSurvey = (e: FormEvent<HTMLFormElement>) => {
    const actualSurvey: Survey = {
      id: "",
      country: e.currentTarget.country.value,
      year: e.currentTarget.year.value,
      rent: e.currentTarget.rent.value,
      utilities: e.currentTarget.utilities.value,
      food: e.currentTarget.food.value,
      basicItems: e.currentTarget.basicItems.value,
      transportation: e.currentTarget.transportation.value,
      educationTotal: e.currentTarget.educationTotal.value,
      educationSupplies: e.currentTarget.educationSupplies.value,
      educationFee: e.currentTarget.educationFee.value,
      educationType: e.currentTarget.educationType.value,
      accommodationType: e.currentTarget.accommodationType.value,
      profession: e.currentTarget.profession.value,
      locationGiven: e.currentTarget.locationGiven.value,
      locationClustered: e.currentTarget.locationClustered.value,
      numResidents: e.currentTarget.numResidents.value,
      numIncomes: e.currentTarget.numIncomes.value,
      numFullIncomes: e.currentTarget.numFullIncomes.value,
      numChildren: e.currentTarget.numChildren.value,
      totalIncome: e.currentTarget.totalIncome.value,
      comments: e.currentTarget.comments.value,
      orgId: "",
      orgName: "",
      userId: ""
    };

    if (!localStorage.getItem("offlineSurvey")) {
      offlineSurveys.unshift(actualSurvey);
      localStorage.setItem("offlineSurvey", JSON.stringify(offlineSurveys));
      offlineSurveyCounter++;
      localStorage.setItem(
        "offlineSurveyCounter",
        JSON.stringify(offlineSurveyCounter)
      );
      offlineSurveys = [];
    } else {
      offlineSurveys = JSON.parse(
        window.localStorage.getItem("offlineSurvey")!
      );
      offlineSurveys.push(actualSurvey);
      localStorage.setItem("offlineSurvey", JSON.stringify(offlineSurveys));
      offlineSurveyCounter =
        1 + parseInt(JSON.parse(localStorage.getItem("offlineSurveyCounter")!));
      localStorage.setItem(
        "offlineSurveyCounter",
        JSON.stringify(offlineSurveyCounter)
      );
      offlineSurveys = [];
    }
    setSurveyCounter("" + offlineSurveyCounter);
  };


  return (
    <>
      <Head>
        <title>Offline Page</title>
      </Head>
      <div className="home-header-container">
        <Header
          className="home-header"
          as="h1"
          icon
          textAlign="center"
          color="blue"
        >
          <Header.Content>
            <Link href="/">
              <Icon name="clipboard" className="home-header-icon" />
            </Link>
            <Link className="home-header-autosurvey" href="/">
              AutoSurvey
            </Link>
          </Header.Content>
        </Header>
      </div>

      <section className="offline-project">
        <h1 className="offline-project-title">
          Offline mode <SignalWifiConnectedNoInternet4Icon fontSize="large" />
        </h1>
        <Button className="offline-online-btn" color="blue">
          <Link href="/" style={{ color: "white" }}>
            <Icon name="angle left" />
            Back to Online Mode
          </Link>
        </Button>
        <section className="offline-project-table-section">
          <Table className="offline-table">
            <TableHead>
              <TableRow>
                <TableCell
                  width={8}
                  className="about-table-head"
                  align="left"
                  size="medim"
                ></TableCell>
                <TableCell
                  className="about-table-head"
                  align="center"
                  size="medim"
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className="about-table-row">
                <TableCell align="center">
                  <p className="about-project-p">
                    You can continue collecting your survey here when you do not
                    have internet connection.
                  </p>
                  <p className="about-project-p">
                    Click <b>Create Offline Survey</b> button and fill up
                    survey. Then click
                    <b> Save Survey</b> button and it will be saved in the local
                    storage. You can continue to collecting/saving surveys
                    during the day.
                  </p>
                  <p className="about-project-p">
                    You can export your survey as excel file every time for each
                    survey, but it is also possible to save several surveys and
                    export them as one excel file. Remember that when you
                    export, your survey data in local storage will be reset.
                  </p>
                  <p className="about-project-p">
                    Finally, when you are back to your office with internet
                    connection, you can import the excel file that you saved
                    offline.
                  </p>
                  <p className="about-project-p">Happy Collecting!</p>
                </TableCell>
                <TableCell className="offline-table-cell-button" align="center">
                  <Modal
                    animation={false}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                      <Button className="offline-create-btn" color="green">
                        {" "}
                        Create Offline Survey
                      </Button>
                    }
                  >
                    <Modal.Header>
                      Make New Offline Survey
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                        }}
                        color="grey"
                        floated="right"
                      >
                        X
                      </Button>
                    </Modal.Header>
                    <Modal.Content>
                    <OfflineSurveyForm  
                      propSetOpen={setOpen} 
                      propOfflineSurveys={offlineSurveys}
                      propOfflineSurveyCounter={offlineSurveyCounter}
                      propSetSurveyCounter={setSurveyCounter} 
                    />
                    </Modal.Content>
                  </Modal>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      offlineDownloadExcel(offlineSurveys, setErrMessage, setSurveyCounter)
                      setOpen(false);
                    }}
                    color="olive"
                  >
                    Export Survey(s)
                  </Button>
                  <Header as="h6">
                    # of surveys to export:
                    {surveyCounter}
                  </Header>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </section>
      <footer className="home-footer">
        <List horizontal>
          <List.Item>
            <List.Content>
              <List.Header>Simon.H</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header>Marco.D</List.Header>
            </List.Content>
          </List.Item>
        </List>
      </footer>
    </>
  );
}
