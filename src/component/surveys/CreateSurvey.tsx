import { initPagination } from "@/helper/initializer";
import { addSurvey } from "@/helper/apiService";
import { Survey, Organization, Pagination } from "@/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";

type CreateSurveyProps = {
  organization: Organization;
  orgId: string;
  setOrganization: Dispatch<SetStateAction<Organization>>;
  setSurveys: Dispatch<SetStateAction<Survey[]>>;
}

export default function CreateSurvey(props: CreateSurveyProps) {
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>(initPagination);

  const { organization, orgId, setOrganization, setSurveys } = props;

  return (
  <>
    <Modal animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="surveys-modal-btn" color="green"> Create Survey</Button>}>
        <Modal.Header>Make New Survey
        <Button onClick={(e) => {
          e.preventDefault();
          setOpen(false);
        }} color="grey" floated='right'
        >X</Button>
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => {
            e.preventDefault();
            addSurvey(e, organization, setPagination, setSurveys, setOrganization, setOpen, setErrMessage);
          }}>
            <Form.Field>
              <Label>Country Name</Label>
              <Input placeholder="Name your country" type="text" name="country" pattern="^[a-zA-Z]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Year</Label>
              <Input placeholder="Year" type="text" name="year" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Rent</Label>
              <Input placeholder="Rent" type="text" name="rent" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Utilities</Label>
              <Input placeholder="Utilities" type="text" name="utilities" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Food</Label>
              <Input placeholder="Food" type="text" name="food" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Basic Items</Label>
              <Input placeholder="Basic Items" type="text" name="basicItems" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Transportation</Label>
              <Input placeholder="Transportation" type="text" name="transportation" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Education Total</Label>
              <Input placeholder="Education Total" type="text" name="educationTotal" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Education Supplies</Label>
              <Input placeholder="Education Supplies" type="text" name="educationSupplies" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Education Fee</Label>
              <Input placeholder="Education Fee" type="text" name="educationFee" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Education Type</Label>
              <Input placeholder="Education Type" type="text" name="educationType" pattern="^[a-zA-Z]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Accommodation Type</Label>
              <Input placeholder="Accommodation Type" type="text" name="accommodationType" pattern="^[a-zA-Z]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Profession</Label>
              <Input placeholder="Profession" type="text" name="profession" pattern="^[a-zA-Z]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Location Given</Label>
              <Input placeholder="Location Given" type="text" name="locationGiven" pattern="^[a-zA-Z]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Location Clustered</Label>
              <Input placeholder="Location Clustered" type="text" name="locationClustered" pattern="^[a-zA-Z]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Number of Residents</Label>
              <Input placeholder="Number of Residents" type="text" name="numResidents" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Number of Incomes</Label>
              <Input placeholder="Number of Incomes" type="text" name="numIncomes" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Number of Full Incomes</Label>
              <Input placeholder="Number of Full Incomes" type="text" name="numFullIncomes" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Number of Children</Label>
              <Input placeholder="Number of Children" type="text" name="numChildren" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Total Income</Label>
              <Input placeholder="Total Income" type="text" name="totalIncome" pattern="^[0-9]*$"/>
            </Form.Field>
            <Form.Field>
              <Label>Comments</Label>
              <Input placeholder="Comments" type="text" name="comments" pattern="^[a-zA-Z]*$"/>
            </Form.Field>

            <Button type="submit" color="green">Add Survey</Button>
            <Button onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }} color="orange"
            >Cancel</Button>
          </Form>
        </Modal.Content>

      </Modal>
  </>
  );
}