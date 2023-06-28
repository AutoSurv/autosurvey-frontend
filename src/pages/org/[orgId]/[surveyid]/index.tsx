import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { deleteSurvey, getSurvey, updateSurvey } from "@/pages/api/autosurvey";
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { Button, Form, Header, Icon, Input, Label, Menu, Modal } from "semantic-ui-react";

export default function SurveyDetails() {

  const router = useRouter();
  const { orgid, surveyid } = router.query;
  const { organization, setOrganization, survey, setSurvey, setSurveys } = useContext(OrgContext);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
    if (surveyid) {
      getSurvey(surveyid, setSurvey);
    }
  }, [surveyid])

  return (
    <div className="specificsurvey-card-container">
      <Header className="home-header" as='h1' icon textAlign='center' color='pink'>
        <Header.Content><Icon name='clipboard' />AutoSurvey</Header.Content>
      </Header>
      <Menu size='small' color="yellow" inverted>
        <Menu.Item> <Link href={"/org"} style={{ textDecoration: 'none' }}>Home</Link></Menu.Item>
        <Menu.Item> <Link href={"/org/" + survey.orgId} style={{ textDecoration: 'none' }}>Organization</Link></Menu.Item>
        <Menu.Item> <Link href={"/"} style={{ textDecoration: 'none' }}>About</Link></Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button inverted>Sign Out</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <TableContainer className="specificsurvey-table-container" component={Paper}>
        <Table className="specificsurvey-table" aria-label="simple table">
          
          <TableHead>
            <TableRow>
              <TableCell className="specificsurvey-table-head" align="left" size="medium">Survey Details for {survey.orgName} in {survey.country}</TableCell>
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
                <Modal animation={false}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={<Button className="surveys-modal-btn" color="blue"> Edit Survey</Button>}>
                  <Modal.Header>Edit Survey
                    <Button onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                      }} color="grey" floated='right'
                      >X</Button>
                  </Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={(e) => {
                      e.preventDefault();
                      updateSurvey(surveyid, e, setSurvey, setOpen, setErrMessage, orgid);
                    }}>
                      <Form.Field>
                        <Label>Country Name</Label>
                        <Input placeholder="Name your country" type="text" name="country" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Rent</Label>
                        <Input placeholder="Rent" type="text" name="rent" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Utilities</Label>
                        <Input placeholder="Utilities" type="text" name="utilities" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Food</Label>
                        <Input placeholder="Food" type="text" name="food" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Basic Items</Label>
                        <Input placeholder="Basic Items" type="text" name="basicItems" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Transportation</Label>
                        <Input placeholder="Transportation" type="text" name="transportation" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Education Total</Label>
                        <Input placeholder="Education Total" type="text" name="educationTotal" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Education Supplies</Label>
                        <Input placeholder="Education Supplies" type="text" name="educationSupplies" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Education Fee</Label>
                        <Input placeholder="Education Fee" type="text" name="educationFee" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Education Type</Label>
                        <Input placeholder="Education Type" type="text" name="educationType" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Accommodation Type</Label>
                        <Input placeholder="Accommodation Type" type="text" name="accommodationType" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Profession</Label>
                        <Input placeholder="Profession" type="text" name="profession" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Location Given</Label>
                        <Input placeholder="Location Given" type="text" name="locationGiven" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Location Clustered</Label>
                        <Input placeholder="Location Clustered" type="text" name="locationClustered" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Number of Residents</Label>
                        <Input placeholder="Number of Residents" type="text" name="numResidents" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Number of Incomes</Label>
                        <Input placeholder="Number of Incomes" type="text" name="numIncomes" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Number of Full Incomes</Label>
                        <Input placeholder="Number of Full Incomes" type="text" name="numFullIncomes" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Number of Children</Label>
                        <Input placeholder="Number of Children" type="text" name="numChildren" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Total Income</Label>
                        <Input placeholder="Total Income" type="text" name="totalIncome" />
                      </Form.Field>
                      <Form.Field>
                        <Label>Comments</Label>
                        <Input placeholder="Comments" type="text" name="comments" />
                      </Form.Field>
                      <Button type="submit" color="blue">Edit Survey</Button>
                      <Button onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                      }} color="orange"
                      >Cancel</Button>
                    </Form>
                  </Modal.Content>
                </Modal>
              </TableCell>
              <TableCell align="right"><Button onClick={(e) => {
                e.preventDefault();
                deleteSurvey(surveyid, setSurveys);
                window.location.href = "/org/" + orgid;
              }} color="orange">Delete Survey</Button></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}