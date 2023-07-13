import { OrgContext } from "@/helper/context";
import { deleteSurvey, getSurvey, getSurveys } from "@/pages/api/autosurvey";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Header, Icon, Menu } from "semantic-ui-react";
import { AutoSurvey } from '@/type/type';
import { CSVLink } from 'react-csv';
import UpdateSurvey from "@/component/UpdateSurvey";
import { SignOut, downloadExcel } from '@/helper/methods';
import { AutoSurveyHeader } from '@/component/AutoSurveyHeader';
import Link from "next/link";
import ImportSurvey from "@/component/ImportSurvey";


export default function SurveyDetails() {

  const router = useRouter();
  const { orgid, surveyid } = router.query;
  const { organization, setOrganization, survey, setSurvey, setSignUpStatus } = useContext(OrgContext);
  const [errMessage, setErrMessage] = useState<string>("");
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);

  useEffect(() => {
    if (surveyid) {
      getSurvey(surveyid, setSurvey);
    }
    getSurveys(setSurveys);
  }, [surveyid])

  const surveyArray: AutoSurvey[] = [survey];

  return (
    <>
    <div className="specificsurvey-card-container">
      <Header className="home-header" as='h1' icon textAlign='center' color='blue' >
        <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
      </Header>
      <Menu size='small' color="blue">
        <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Home</Link></Menu.Item>
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
                    <CSVLink className="surveys-export-csv-link" filename={organization.orgName +"_" + survey.country + "_" +survey.id + ".csv"} data={surveys.filter(s => s.orgName === organization.orgName)}> 
                      Export Survey (csv)
                    </CSVLink>
                  </label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Link>
        </Menu.Item>
        <Menu.Item> <Link href={"/org/" + orgid} style={{ textDecoration: 'none' }}>Surveys</Link></Menu.Item>
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
    
      <TableContainer className="specificsurvey-table-container" component={Paper}>
        <Table className="specificsurvey-table" aria-label="simple table">
          <TableBody>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="center" >
                Country:
              </TableCell>
              <TableCell align="center">{survey.country}</TableCell>
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
              <UpdateSurvey survey={survey} orgid={orgid} setSurvey={setSurvey}/>
              </TableCell>
              <TableCell align="center"><Button onClick={(e) => {
                e.preventDefault();
                deleteSurvey(surveyid, setSurveys);
                window.location.href = "/org/" + orgid;
              }} color="orange" basic>Delete Survey</Button></TableCell>
            </TableRow>
            
          
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </>
  )
}