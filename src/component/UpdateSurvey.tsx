import { initData } from "@/helper/initializer";
import { updateSurvey } from "@/pages/api/autosurvey";
import { AutoSurvey, Data } from "@/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Icon, Input, Label, Modal } from "semantic-ui-react";

type CreateSurveyProps = {
  survey: AutoSurvey;
  orgid: string | string[] | undefined;
  setSurvey: Dispatch<SetStateAction<AutoSurvey>>;
}

export default function UpdSurvey(props: CreateSurveyProps) {
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const { survey, setSurvey, orgid} = props;

  return(
    <Modal animation={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="surveys-modal-btn" color="blue" basic>Edit Survey</Button>}>
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
          updateSurvey(survey.id, e, setSurvey, setOpen, setErrMessage, orgid);
        }}>
        <Form.Field>
          <Label>Country Name</Label>
          <Input placeholder={survey.country} type="text" name="country" pattern="^[a-zA-Z]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Year</Label>
          <Input placeholder={survey.year} type="text" name="year" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Rent</Label>
          <Input placeholder={survey.rent} type="text" name="rent" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Utilities</Label>
          <Input placeholder={survey.utilities} type="text" name="utilities" />
        </Form.Field>
        <Form.Field>
          <Label>Food</Label>
          <Input placeholder={survey.food} type="text" name="food" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Basic Items</Label>
          <Input placeholder={survey.basicItems} type="text" name="basicItems" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Transportation</Label>
          <Input placeholder={survey.transportation} type="text" name="transportation" />
        </Form.Field>
        <Form.Field>
          <Label>Education Total</Label>
          <Input placeholder={survey.educationTotal} type="text" name="educationTotal" />
        </Form.Field>
        <Form.Field>
          <Label>Education Supplies</Label>
          <Input placeholder={survey.educationSupplies} type="text" name="educationSupplies" />
        </Form.Field>
        <Form.Field>
          <Label>Education Fee</Label>
          <Input placeholder={survey.educationFee} type="text" name="educationFee" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Education Type</Label>
          <Input placeholder={survey.educationType} type="text" name="educationType" pattern="^[a-zA-Z]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Accommodation Type</Label>
          <Input placeholder={survey.accommodationType} type="text" name="accommodationType" pattern="^[a-zA-Z]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Profession</Label>
          <Input placeholder={survey.profession} type="text" name="profession" pattern="^[a-zA-Z]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Location Given</Label>
          <Input placeholder={survey.locationGiven} type="text" name="locationGiven" pattern="^[a-zA-Z]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Location Clustered</Label>
          <Input placeholder={survey.locationClustered} type="text" name="locationClustered" pattern="^[a-zA-Z]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Number of Residents</Label>
          <Input placeholder={survey.numResidents} type="text" name="numResidents" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Number of Incomes</Label>
          <Input placeholder={survey.numIncomes} type="text" name="numIncomes" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Number of Full Incomes</Label>
          <Input placeholder={survey.numFullIncomes} type="text" name="numFullIncomes" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Number of Children</Label>
          <Input placeholder={survey.numChildren} type="text" name="numChildren" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Total Income</Label>
          <Input placeholder={survey.totalIncome} type="text" name="totalIncome" pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Comments</Label>
          <Input placeholder={survey.comments} type="text" name="comments" pattern="^[a-zA-Z]*$"/>
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