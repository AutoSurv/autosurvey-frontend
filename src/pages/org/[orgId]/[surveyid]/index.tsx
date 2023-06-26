import SurveyContent from "@/component/SurveyContent";
import { OrgContext } from "@/helper/context";
import { deleteSurvey, getOrganization, getSurvey, updateSurvey } from "@/pages/api/autosurvey";
import { Organization } from "@/pages/type/type";
import { Typography } from "@mui/material";
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react";
import { Button, Card, CardContent, Form, Input, Label, Modal } from "semantic-ui-react";
import { redirect } from 'next/navigation';


export default function SurveyDetails() {

  const  router  = useRouter();
  const { orgid, surveyid } = router.query;
  const { organization, setOrganization, survey, setSurvey, setSurveys} = useContext(OrgContext);
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  
  useEffect(() => {
    if (surveyid) {
      getSurvey(surveyid, setSurvey);
    }
  }, [surveyid])

  return (
    <div className="specificsurvey-card-container">
      <Card>
      <CardContent>
          <Typography gutterBottom variant="h3" component="div">Survey Details </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Country: {survey && survey.country} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Rent: {survey && survey.rent} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Food: {survey && survey.food} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Basic items: {survey && survey.basicItems} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Transportation: {survey && survey.transportation} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Education supplies: {survey && survey.educationSupplies} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Education fee: {survey && survey.educationFee} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Education total: {survey && survey.educationTotal} </Typography>
        </CardContent>        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Education type {survey && survey.educationType} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Accommodoation: {survey && survey.accommodationType} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Profession: {survey && survey.profession} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Location given: {survey && survey.locationGiven} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Location clustered: {survey && survey.locationClustered} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Number of residents: {survey && survey.numResidents} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Number of incomes: {survey && survey.numIncomes} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Number of full incomes: {survey && survey.numFullIncomes} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Number of children: {survey && survey.numChildren} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Total income: {survey && survey.totalIncome} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Comments: {survey && survey.comments} </Typography>
        </CardContent>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">Organization name: {survey && survey.orgName} </Typography>
        </CardContent>

        <Modal animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="surveys-modal-btn"> Edit Survey</Button>}>
        <Modal.Header>Edit Survey</Modal.Header>
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
            
            <Button type="submit">Edit Survey</Button>
          </Form>
        </Modal.Content>

      </Modal>
      <Button onClick={(e) => {
        e.preventDefault();
        deleteSurvey(surveyid, setSurveys);
        window.location.href = "/org/" + orgid;
        //redirect('/org/' + orgid);
        }} >Delete Survey</Button>
      </Card>
    </div>
  )
}