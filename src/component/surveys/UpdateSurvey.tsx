import { getSurvey, getSurveys, updateSurvey } from "@/helper/apiService";
import { OrgContext } from "@/helper/context";
import { Survey, UserDto } from "@/type/type";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";

type CreateSurveyProps = {
  survey: Survey;
  orgid: string ;
  setSurvey: Dispatch<SetStateAction<Survey>>;
  propUserDto: UserDto;
}

export default function UpdSurvey(props: CreateSurveyProps) {
  const [open, setOpen] = useState(false);
  const { setOrganization, setFilteredSurveys, setSurveys } = useContext(OrgContext);
  const [errMessage, setErrMessage] = useState<string>("");

  const { survey, setSurvey, orgid, propUserDto} = props;

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
          updateSurvey(survey.id, e, setSurvey, setOpen, setErrMessage, survey.organization, setOrganization, setFilteredSurveys, setSurveys, propUserDto);
        }}>
        <Form.Field>
          <Label>Country Name</Label>
          <Input placeholder={survey.country} type="text" name="country" defaultValue={survey.country} pattern="^[A-zÀ-ž\s]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Year</Label>
          <Input placeholder={survey.year} type="text" name="year" defaultValue={survey.year} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Rent</Label>
          <Input placeholder={survey.rent} type="text" name="rent" defaultValue={survey.rent} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Utilities</Label>
          <Input placeholder={survey.utilities} type="text" name="utilities" defaultValue={survey.utilities} pattern="^[0-9]*$" />
        </Form.Field>
        <Form.Field>
          <Label>Food</Label>
          <Input placeholder={survey.food} type="text" name="food" defaultValue={survey.food} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Basic Items</Label>
          <Input placeholder={survey.basicItems} type="text" name="basicItems" defaultValue={survey.basicItems} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Transportation</Label>
          <Input placeholder={survey.transportation} type="text" name="transportation" defaultValue={survey.transportation} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Education Total</Label>
          <Input placeholder={survey.educationTotal} type="text" name="educationTotal" defaultValue={survey.educationTotal} pattern="^[0-9]*$" />
        </Form.Field>
        <Form.Field>
          <Label>Education Supplies</Label>
          <Input placeholder={survey.educationSupplies} type="text" name="educationSupplies" defaultValue={survey.educationSupplies} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Education Fee</Label>
          <Input placeholder={survey.educationFee} type="text" name="educationFee" defaultValue={survey.educationFee} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Education Type</Label>
          <Input placeholder={survey.educationType} type="text" name="educationType" defaultValue={survey.educationType} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Accommodation Type</Label>
          <Input placeholder={survey.accommodationType} type="text" name="accommodationType" defaultValue={survey.accommodationType} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
        </Form.Field>
        <Form.Field>
          <Label>Profession</Label>
          <Input placeholder={survey.profession} type="text" name="profession" defaultValue={survey.profession} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
        </Form.Field>
        <Form.Field>
          <Label>Location Given</Label>
          <Input placeholder={survey.locationGiven} type="text" name="locationGiven" defaultValue={survey.locationGiven} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
        </Form.Field>
        <Form.Field>
          <Label>Location Clustered</Label>
          <Input placeholder={survey.locationClustered} type="text" name="locationClustered" defaultValue={survey.locationClustered} pattern="^[A-zÀ-ž\s\p{P}\p{S}]*$" />
        </Form.Field>
        <Form.Field>
          <Label>Number of Residents</Label>
          <Input placeholder={survey.numResidents} type="text" name="numResidents" defaultValue={survey.numResidents} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Number of Incomes</Label>
          <Input placeholder={survey.numIncomes} type="text" name="numIncomes" defaultValue={survey.numIncomes} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Number of Full Incomes</Label>
          <Input placeholder={survey.numFullIncomes} type="text" name="numFullIncomes" defaultValue={survey.numFullIncomes} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Number of Children</Label>
          <Input placeholder={survey.numChildren} type="text" name="numChildren" defaultValue={survey.numChildren} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Total Income</Label>
          <Input placeholder={survey.totalIncome} type="text" name="totalIncome" defaultValue={survey.totalIncome} pattern="^[0-9]*$"/>
        </Form.Field>
        <Form.Field>
          <Label>Comments</Label>
          <Input placeholder={survey.comments} type="text" name="comments" defaultValue={survey.comments} pattern="^[A-z0-9À-ž.,+-\s\p{P}\p{S}]*$"/>
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