import { addSurvey, getSurveys } from "@/pages/api/autosurvey";
import { AutoSurvey, Organization } from "@/pages/type/type";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button, Form, Header, Icon, Input, Label, Modal } from "semantic-ui-react";
import SurveyCard from "./SurveyCard";
import { OrgContext } from "@/helper/context";



export default function SurveyContent() {
  const { organization, setOrganization } = useContext(OrgContext);
  const [surveys, setSurveys] = useState<AutoSurvey[]>([]);
  useEffect(() => {
    getSurveys(setSurveys);
  }, []);

  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  useEffect(() => {
  
  }, []);

  return (
    <div className="surveys-content">
       <Header className="home-header" as='h1' icon textAlign='center' color='pink'>
                <Header.Content><Icon name='clipboard' /> AutoSurvey</Header.Content>
            </Header>
      <Modal animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="surveys-modal-btn" color="green"> Create Survey +</Button>}>
        <Modal.Header>Make New Survey</Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => {
            e.preventDefault();
            addSurvey(e, organization.orgId, setSurveys, setOrganization, setOpen, setErrMessage);
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

            <Button type="submit">Add Survey +</Button>
          </Form>
        </Modal.Content>

      </Modal>
      <div className="surveys-surveycard-box">
        {organization.surveys.map((survey) => {
          return (
            <SurveyCard organization={organization} survey={survey} />
          )
        })}

      </div>

    </div>
  )



}