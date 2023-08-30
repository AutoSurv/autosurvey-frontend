import { OrgContext } from "@/helper/context";
import { getSurvey, getSurveys } from "@/helper/apiService";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { Header, Icon } from "semantic-ui-react";
import { Pagination } from '@/type/type';
import UpdateSurvey from "@/component/surveys/UpdateSurvey";
import Link from "next/link";
import { initPagination } from "@/helper/initializer";
import { NavigationBar } from "@/component/NavigationBar";
import DelSurvey from "@/component/surveys/DeleteSurvey";


export default function SurveyDetails() {

  const router = useRouter();
  const { orgId, surveyid } = router.query;

  const [pagination, setPagination] = useState<Pagination>(initPagination);
  const { survey, setSurvey, setSurveys, organization, filteredSurveys} = useContext(OrgContext);

  //useMemo(() => getSurveys(setPagination, setSurveys), [] );

  useEffect(() => {
  
    if (router.isReady) {

      if (surveyid) {
        getSurvey(surveyid, setSurvey);
      }
      getSurveys(setSurveys);

    }
    
  }, [setSurvey, router.isReady])

  return (
    <div className="specificsurvey-card-container">
      <div className="home-header-container">
        <Header className="home-header" as='h1' icon textAlign='center' color='blue'>
          <Header.Content><Link href="/org"><Icon name='clipboard' className="home-header-icon" /></Link><Link className="home-header-autosurvey" href="/org">AutoSurvey</Link></Header.Content>
        </Header>
      </div>

      <NavigationBar organization={organization} pathname={router.pathname} filteredSurveys={filteredSurveys} />      
      
      {surveyid && <TableContainer className="specificsurvey-table-container" component={Paper}>
        <Table className="specificsurvey-table" aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell colSpan={2} className="specificsurvey-table-head" align="left" size="medium">Survey Details for {survey.organization.orgName} in {survey.country} {survey.year}</TableCell>
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
              <TableCell align="center">
                <DelSurvey propOrgid={survey.organization.orgId} propSurveyid={surveyid} propSurvey={survey} propSetPagination={setPagination}/>
                </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  )
}