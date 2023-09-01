import { getOrganization, updateSurvey } from "@/helper/apiService";
import { OrgContext } from "@/helper/context";
import { Organization, Survey } from "@/type/type";
import { Box, Collapse } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button, Form, Input, Label } from "semantic-ui-react";

type UpdateSurveyProps = {
  openStatus: boolean;
  setOpenStatus: Dispatch<SetStateAction<boolean>>;
  propSurvey: Survey;
  propOrg: Organization;
  propSetSurvey: Dispatch<SetStateAction<Survey>>;
}

export default function CollapseUpdate({ openStatus, setOpenStatus, propOrg, propSurvey, propSetSurvey }: UpdateSurveyProps) {
  const { setOrganization, setFilteredSurveys } = useContext(OrgContext);
  const [errMessage, setErrMessage] = useState<string>("");

  return (
    <Collapse in={openStatus} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>

        <Form className="surveys-form" onSubmit={(e) => {
          e.preventDefault();
          updateSurvey(propSurvey.id, e, propSetSurvey, setOpenStatus, setErrMessage, propOrg, setOrganization, setFilteredSurveys);
          getOrganization(propOrg.orgId, setOrganization);
        }} >
          <Form.Group className="surveys-form-edit" >
            <Form.Field className="surveys-form-edit-field">
              <Label>Country</Label>
              <Input placeholder={propSurvey.country} type="text" name="country" pattern="^[A-zÀ-ž\s]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Year</Label>
              <Input placeholder={propSurvey.year} type="text" name="year" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Rent</Label>
              <Input placeholder={propSurvey.rent} type="text" name="rent" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Utilities</Label>
              <Input placeholder={propSurvey.utilities} type="text" name="utilities" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Food</Label>
              <Input placeholder={propSurvey.food} type="text" name="food" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Basic Items</Label>
              <Input placeholder={propSurvey.basicItems} type="text" name="basicItems" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Transportation</Label>
              <Input placeholder={propSurvey.transportation} type="text" name="transportation" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Education Total</Label>
              <Input placeholder={propSurvey.educationTotal} type="text" name="educationTotal" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Education Supplies</Label>
              <Input placeholder={propSurvey.educationSupplies} type="text" name="educationSupplies"  pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Education Fee</Label>
              <Input placeholder={propSurvey.educationFee} type="text" name="educationFee" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Education Type</Label>
              <Input placeholder={propSurvey.educationType} type="text" name="educationType" pattern="^[A-zÀ-ž\s]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Accommodation Type</Label>
              <Input placeholder={propSurvey.accommodationType} type="text" name="accommodationType" pattern="^[A-zÀ-ž\s]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Profession</Label>
              <Input placeholder={propSurvey.profession} type="text" name="profession" pattern="^[A-zÀ-ž\s]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Location Given</Label>
              <Input placeholder={propSurvey.locationGiven} type="text" name="locationGiven" pattern="^[A-zÀ-ž\s]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Location Clustered</Label>
              <Input placeholder={propSurvey.locationClustered} type="text" name="locationClustered" pattern="^[A-zÀ-ž\s]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Number of Residents</Label>
              <Input placeholder={propSurvey.numResidents} type="text" name="numResidents" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Number of Incomes</Label>
              <Input placeholder={propSurvey.numIncomes} type="text" name="numIncomes" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Number of Full Incomes</Label>
              <Input placeholder={propSurvey.numFullIncomes} type="text" name="numFullIncomes" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Number of Children</Label>
              <Input placeholder={propSurvey.numChildren} type="text" name="numChildren" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Total Income</Label>
              <Input placeholder={propSurvey.totalIncome} type="text" name="totalIncome" pattern="^[0-9]*$" />
            </Form.Field>
            <Form.Field className="surveys-form-edit-field">
              <Label>Comments</Label>
              <Input placeholder={propSurvey.comments} type="text" name="comments" pattern="^[A-z0-9À-ž.,+-\s]*$" />
            </Form.Field>

          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Box>

    </Collapse>
  )

}