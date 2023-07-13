import { OrgContext } from "@/helper/context";
import { deleteSurvey, getSurvey, getSurveys } from "@/pages/api/autosurvey";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { Button, Confirm, Dropdown, Header, Icon, Menu } from "semantic-ui-react";
import { AutoSurvey } from '@/type/type';
import { CSVLink } from 'react-csv';
import UpdateSurvey from "@/component/UpdateSurvey";
import { SignOut, downloadExcel } from '@/helper/methods';
import Link from "next/link";


export default function SurveyDetails() {

  const router = useRouter();
  const { orgId, surveyid } = router.query;
  const { organization, survey, setSurvey, setSurveys, setSignUpStatus } = useContext(OrgContext);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (surveyid) {
      getSurvey(surveyid, setSurvey);
    }
    getSurveys(setSurveys);
  }, [setSurvey])

  const surveyArray: AutoSurvey[] = [survey];

  return (
    <div className="specificsurvey-card-container">
      <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
                <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
            </Header>
            <Menu size='small' color="blue">
                <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
                <Menu.Item>
                  <Link href={"#"}>   
                    <Dropdown text='Export Survey'>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link href={"#"} onClick={(e) => {
                            e.preventDefault();
                            downloadExcel(surveyArray);
                          }} >Export Surveys (xlsx)
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <label >
                            <CSVLink className="surveys-export-csv-link" filename={organization.orgName +"_" + survey.country + "_" +survey.id + ".csv"} data={surveyArray}> 
                              Export Survey (csv)
                            </CSVLink>
                          </label>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Link>
                </Menu.Item>
                <Menu.Item> <Link href={"/org/"+ organization.orgId} style={{ textDecoration: 'none' }}>Surveys</Link></Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item> <Link href={"/about"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
                  <Menu.Item>
                      <Button onClick={() => {
                          setSignUpStatus(false);
                          SignOut(setSignUpStatus);
                      }}
                          circular icon='sign out' color='blue' inverted></Button>
                  </Menu.Item>
                </Menu.Menu>
            </Menu>
      {surveyid && <TableContainer className="specificsurvey-table-container" component={Paper}>
        <Table className="specificsurvey-table" aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell className="specificsurvey-table-head" align="left" size="medium">Survey Details for {survey.orgName} in {survey.country}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Country:
              </TableCell>
              <TableCell align="center">{survey.country}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Year:
              </TableCell>
              <TableCell align="center">{survey.year}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Location Given:
              </TableCell>
              <TableCell align="center">{survey.locationGiven}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Location Cluestered:
              </TableCell>
              <TableCell align="center">{survey.locationClustered}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Rent:
              </TableCell>
              <TableCell align="center">{survey.rent}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Utilities
              </TableCell>
              <TableCell align="center">{survey.utilities}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Food:
              </TableCell>
              <TableCell align="center">{survey.food}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Basic Items:
              </TableCell>
              <TableCell align="center">{survey.basicItems}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Transportaions:
              </TableCell>
              <TableCell align="center">{survey.transportation}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Education Total:
              </TableCell>
              <TableCell align="center">{survey.educationTotal}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Education Supplies:
              </TableCell>
              <TableCell align="center">{survey.educationSupplies}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Education Fee:
              </TableCell>
              <TableCell align="center">{survey.educationFee}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Education Type:
              </TableCell>
              <TableCell align="center">{survey.educationType}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Accommodation Type:
              </TableCell>
              <TableCell align="center">{survey.accommodationType}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Profession:
              </TableCell>
              <TableCell align="center">{survey.profession}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                The number of residents:
              </TableCell>
              <TableCell align="center">{survey.numResidents}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                The number of incomes:
              </TableCell>
              <TableCell align="center">{survey.numIncomes}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                The number of full incomes:
              </TableCell>
              <TableCell align="center">{survey.numFullIncomes}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                The number of children:
              </TableCell>
              <TableCell align="center">{survey.numChildren}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Total income:
              </TableCell>
              <TableCell align="center">{survey.totalIncome}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
                Comments:
              </TableCell>
              <TableCell align="center">{survey.comments}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center">
              <UpdateSurvey surveyid={surveyid} orgid={orgId} setSurvey={setSurvey}/>
              </TableCell>
              <TableCell align="right"><Button onClick={() => {
                setOpenConfirm(true);
              }}  color="orange" basic>Delete Survey</Button><Confirm
              open={openConfirm}
              header='Remove your survey'
              content='Are you sure you want to remove your survey?'
              onCancel={() => setOpenConfirm(false)}
              onConfirm={(e) => {
                e.preventDefault();
                deleteSurvey(surveyid, setSurveys);
                setOpenConfirm(false);
                window.location.href = "/org/" + orgId;
              }}
            /></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  )
}