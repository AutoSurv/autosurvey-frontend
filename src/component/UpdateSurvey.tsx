import { addSurvey, updateSurvey } from "@/pages/api/autosurvey";
import { AutoSurvey, Organization } from "@/pages/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";

type CreateSurveyProps = {
  surveyid: string | string[] | undefined;
  orgid: string | string[] | undefined;
  setSurvey: Dispatch<SetStateAction<AutoSurvey>>;
}

export default function CreateSurvey(props: CreateSurveyProps) {
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const { surveyid, setSurvey, orgid} = props;

  return(
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
  )
  
}