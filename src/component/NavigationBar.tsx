import Link from "next/link";
import { Dropdown, Menu, Message, Progress } from "semantic-ui-react";
import UserOptions from "./UserOptions";
import ImportSurvey from "./surveys/ImportSurvey";
import { downloadExcel } from "@/helper/methods";
import { CSVLink } from "react-csv";
import { useContext, useState } from "react";
import { OrgContext } from "@/helper/context";
import { Survey } from "@/type/type";

type HeaderProps = {
  pathname: string
}

export function NavigationBar({ pathname }: HeaderProps) {
  const { organization, setOrganization,
    filterYears,
    filterCountries, filterLocations,
    filteredSurveys, setSurveys, survey
  } = useContext(OrgContext);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [totalCounter, setTotalCounter] = useState(0);
  const [progressCounter, setProgressCounter] = useState(0);

  const surveyArray: Survey[] = [survey];
  const yearsArray: string[] = [survey.year.toString()];
  const countriesArray: string[] = [survey.country];
  const locationsArray: string[] = [survey.locationClustered];

  const handleDismiss = () => {
    setErrorMsg("");
    setSuccessMessage("");
  }

  return (
    <>
      {progressCounter > 0 && progressCounter < totalCounter  ? 
      <Progress value={progressCounter} total={totalCounter} progress='ratio' indicating /> : null}

      <Message visible={errorMsg.length > 0} hidden={errorMsg.length === 0}
        onDismiss={handleDismiss} negative compact>
        <p>{errorMsg}</p>
      </Message>

      <Message visible={successMessage.length > 0} hidden={successMessage.length === 0}
        onDismiss={handleDismiss} positive compact>
        <p>{successMessage}</p>
      </Message>

      <Menu size="small" color="blue">
        <Menu.Item>
          {" "}
          <Link href={"/org"} style={{ textDecoration: "none" }}>
            Organizations
          </Link>
        </Menu.Item>

        {
          pathname.includes("[orgId]") && !pathname.includes("[surveyid]") ?
            <Menu.Item >
              <Dropdown className="exp-imp-items" text='Export / Import'>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <ImportSurvey organization={organization}
                      setOrganization={setOrganization}
                      setSurveys={setSurveys}
                      setErrorMsg={setErrorMsg}
                      setSuccessMessage={setSuccessMessage}
                      setTotalCounter={setTotalCounter}
                      setProgressCounter={setProgressCounter}
                    />
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <label onClick={(e) => {
                      e.preventDefault();
                      downloadExcel(filteredSurveys.filter(s => s.orgName === organization.orgName), filterYears, filterCountries, filterLocations, setErrorMsg);
                    }} style={{ textDecoration: 'none', color: '#4183c4' }} >Export Surveys (xlsx)
                    </label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <label >
                      <CSVLink className="surveys-export-csv-link" filename={"surveys.csv"} data={filteredSurveys.filter(s => s.orgName === organization.orgName)}>
                        Export Survey (csv)
                      </CSVLink>
                    </label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            : null
        }

        {
          pathname.includes("[surveyid]") ?
            <>
              <Menu.Item> <Link href={"/org/" + organization.orgId} style={{ textDecoration: 'none' }}>Surveys</Link></Menu.Item>
              <Menu.Item>
                <Dropdown text='Export Survey' style={{ textDecoration: 'none', color: '#4183c4' }}>
                  <Dropdown.Menu>
                    <Dropdown.Item> <label onClick={(e) => {
                      e.preventDefault();
                      downloadExcel(surveyArray, yearsArray, countriesArray, locationsArray, setErrorMsg);
                    }} style={{ textDecoration: 'none', color: '#4183c4' }}>Export Surveys (xlsx)</label>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <label >
                        <CSVLink className="surveys-export-csv-link" filename={organization.orgName + "_" + survey.country + "_" + survey.id + ".csv"} data={surveyArray}>
                          Export Survey (csv)
                        </CSVLink>
                      </label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </>
            : null
        }

        {
          pathname.includes("about") || pathname.includes("userInfo") ?
            <>
              {
                organization.orgId.length > 0 ?
                  <>
                    <Menu.Item>
                      <Link href={"/org/" + organization.orgId} style={{ textDecoration: "none" }}>
                        Surveys
                      </Link>
                    </Menu.Item>
                  </>
                  : null
              }
            </>
            : null
        }

        <Menu.Menu position='right' className="menu-nav-about-user">
        <Menu.Item>
            <Link href={"/_offline"} style={{ textDecoration: 'none' }}>Offline Mode</Link>
          </Menu.Item>
          <Menu.Item>
            <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link>
          </Menu.Item>
          <UserOptions />
        </Menu.Menu>
      </Menu>
    </>
  )
}