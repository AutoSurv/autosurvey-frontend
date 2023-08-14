import { OrgContext } from "@/helper/context";
import { deleteSurvey, getSurvey, getSurveys } from "@/helper/apiService";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useMemo, useState } from "react";
import { Button, Confirm, Header, Icon } from "semantic-ui-react";
import { Survey, Pagination } from '@/type/type';
import UpdateSurvey from "@/component/surveys/UpdateSurvey";
import Link from "next/link";
import { initPagination } from "@/helper/initializer";
import { NavigationBar } from "@/component/NavigationBar";


export default function SurveyDetails() {

  const router = useRouter();
  const { orgId, surveyid } = router.query;

  const { organization, survey, setSurvey, setSurveys } = useContext(OrgContext);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pagination, setPagination] = useState<Pagination>(initPagination);
  const {setFilterYears, setFilterCountries, setFilterLocations} = useContext(OrgContext);

  //useMemo(() => getSurveys(setPagination, setSurveys), [] );

  useEffect(() => {
    setFilterCountries([])
    setFilterLocations([])
    setFilterYears([])
    if (surveyid) {
      getSurvey(surveyid, setSurvey);
    }
    getSurveys(setPagination, setSurveys);
  }, [])

  return (
    <div className="specificsurvey-card-container">
      <div className="home-header-container">
        <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
          <Header.Content><Link href="/org"><Icon name='clipboard' className="home-header-icon" /></Link><Link className="home-header-autosurvey" href="/org">AutoSurvey</Link></Header.Content>
        </Header>
      </div>

      <NavigationBar pathname={router.pathname} />      
      
      {surveyid && <TableContainer className="specificsurvey-table-container" component={Paper}>
        <Table className="specificsurvey-table" aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell colSpan={2} className="specificsurvey-table-head" align="left" size="medium">Survey Details for {survey.orgName} in {survey.country} {survey.year}</TableCell>
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
                <UpdateSurvey survey={survey} orgid={orgId} setSurvey={setSurvey} />
              </TableCell>
              <TableCell align="center"><Button onClick={() => {
                setOpenConfirm(true);
              }} color="orange" basic>Delete Survey</Button><Confirm
                  open={openConfirm}
                  header='Remove your survey'
                  content='Are you sure you want to remove your survey?'
                  onCancel={() => setOpenConfirm(false)}
                  onConfirm={(e) => {
                    e.preventDefault();
                    deleteSurvey(organization.orgId, survey.id, setPagination, setSurveys);
                    setOpenConfirm(false);
                  }}
                /></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  )
}