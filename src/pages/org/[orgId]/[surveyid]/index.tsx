import { OrgContext } from "@/helper/context";
import { deleteSurvey, getSurvey } from "@/pages/api/autosurvey";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { AutoSurvey } from '@/type/type';
import { CSVLink } from 'react-csv';
import UpdateSurvey from "@/component/UpdateSurvey";
import { downloadExcel } from '@/helper/methods';
import { AutoSurveyHeader } from '@/component/AutoSurveyHeader';


export default function SurveyDetails() {

  const router = useRouter();
  const { orgid, surveyid } = router.query;
  const {  survey, setSurvey, setSurveys } = useContext(OrgContext);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    if (surveyid) {
      getSurvey(surveyid, setSurvey);
    }
  }, [setSurvey])

  const surveyArray: AutoSurvey[] = [survey];

  return (
    <div className="specificsurvey-card-container">
      {surveyid &&<AutoSurveyHeader />}

     {surveyid && <TableContainer className="specificsurvey-table-container" component={Paper}>
        <Table className="specificsurvey-table" aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell className="specificsurvey-table-head" align="left" size="medium">Survey Details for {survey.orgName} in {survey.country}</TableCell>
              <TableCell align="right"><Button onClick={(e) => {
                e.preventDefault();
                downloadExcel(surveyArray);
              }} color="green">Export(Excel) Survey</Button>
                <Button color="green">
                  <CSVLink className="specificsurvey-export-csv-link" filename={"survey.csv"} data={surveyArray}> Export(CSV) Survey</CSVLink>
                </Button>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Country:
              </TableCell>
              <TableCell align="right">{survey.country}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Location Given:
              </TableCell>
              <TableCell align="right">{survey.locationGiven}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Location Cluestered:
              </TableCell>
              <TableCell align="right">{survey.locationClustered}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Rent:
              </TableCell>
              <TableCell align="right">{survey.rent}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Utilities
              </TableCell>
              <TableCell align="right">{survey.utilities}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Food:
              </TableCell>
              <TableCell align="right">{survey.food}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Basic Items:
              </TableCell>
              <TableCell align="right">{survey.basicItems}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Transportaions:
              </TableCell>
              <TableCell align="right">{survey.transportation}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Education Total:
              </TableCell>
              <TableCell align="right">{survey.educationTotal}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Education Supplies:
              </TableCell>
              <TableCell align="right">{survey.educationSupplies}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Education Fee:
              </TableCell>
              <TableCell align="right">{survey.educationFee}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Education Type:
              </TableCell>
              <TableCell align="right">{survey.educationType}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Accommodation Type:
              </TableCell>
              <TableCell align="right">{survey.accommodationType}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Profession:
              </TableCell>
              <TableCell align="right">{survey.profession}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                The number of residents:
              </TableCell>
              <TableCell align="right">{survey.numResidents}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                The number of incomes:
              </TableCell>
              <TableCell align="right">{survey.numIncomes}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                The number of full incomes:
              </TableCell>
              <TableCell align="right">{survey.numFullIncomes}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                The number of children:
              </TableCell>
              <TableCell align="right">{survey.numChildren}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Total income:
              </TableCell>
              <TableCell align="right">{survey.totalIncome}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
                Comments:
              </TableCell>
              <TableCell align="right">{survey.comments}</TableCell>
            </TableRow>
            <TableRow className="survey-table-row">
              <TableCell component="th" scope="row" align="left">
              <UpdateSurvey surveyid={surveyid} orgid={orgid} setSurvey={setSurvey}/>
              </TableCell>
              <TableCell align="right"><Button onClick={(e) => {
                e.preventDefault();
                deleteSurvey(surveyid, setSurveys);
                console.log("orgid: ", orgid)
                window.location.href = "/org/" + orgid;
              }} color="orange" basic>Delete Survey</Button></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  )
}