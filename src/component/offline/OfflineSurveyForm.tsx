import { Button, Form, Input, Label } from "semantic-ui-react";
import CountrySelector from "../surveys/CountrySelector";
import { Dispatch, SetStateAction } from "react";
import { saveOfflineSurvey } from "@/helper/methods";
import { Survey } from "@/type/type";


type OfflineSurveyFormProps = {
  propSetOpen: Dispatch<SetStateAction<boolean>>;
  propOfflineSurveys: Survey[];
  propOfflineSurveyCounter: number;
  propSetSurveyCounter: Dispatch<SetStateAction<string>>;
}
export default function OfflineSurveyForm({propSetOpen, propOfflineSurveys, propOfflineSurveyCounter, propSetSurveyCounter}: OfflineSurveyFormProps) {
  
  return(
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        saveOfflineSurvey(e, propOfflineSurveys, propOfflineSurveyCounter, propSetSurveyCounter);
        propSetOpen(false);
      }}
    >
      <Form.Field>
        <Label>Country Name</Label>
        <CountrySelector /> 
      </Form.Field>
      <Form.Field>
        <Label>Year</Label>
        <Input
          placeholder="Year"
          type="text"
          name="year"
          required="required"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Rent</Label>
        <Input
          placeholder="Rent"
          type="text"
          name="rent"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Utilities</Label>
        <Input
          placeholder="Utilities"
          type="text"
          name="utilities"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Food</Label>
        <Input
          placeholder="Food"
          type="text"
          name="food"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Basic Items</Label>
        <Input
          placeholder="Basic Items"
          type="text"
          name="basicItems"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Transportation</Label>
        <Input
          placeholder="Transportation"
          type="text"
          name="transportation"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Education Total</Label>
        <Input
          placeholder="Education Total"
          type="text"
          name="educationTotal"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Education Supplies</Label>
        <Input
          placeholder="Education Supplies"
          type="text"
          name="educationSupplies"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Education Fee</Label>
        <Input
          placeholder="Education Fee"
          type="text"
          name="educationFee"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Education Type</Label>
        <Input
          placeholder="Education Type"
          type="text"
          name="educationType"
          pattern="^[A-zÀ-ž\s]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Accommodation Type</Label>
        <Input
          placeholder="Accommodation Type"
          type="text"
          name="accommodationType"
          pattern="^[A-zÀ-ž\s]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Profession</Label>
        <Input
          placeholder="Profession"
          type="text"
          name="profession"
          pattern="^[A-zÀ-ž\s]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Location Given</Label>
        <Input
          placeholder="Location Given"
          type="text"
          name="locationGiven"
          pattern="^[A-zÀ-ž\s]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Location Clustered</Label>
        <Input
          placeholder="Location Clustered"
          type="text"
          name="locationClustered"
          required="required"
          pattern="^[A-zÀ-ž\s]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Number of Residents</Label>
        <Input
          placeholder="Number of Residents"
          type="text"
          name="numResidents"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Number of Incomes</Label>
        <Input
          placeholder="Number of Incomes"
          type="text"
          name="numIncomes"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Number of Full Incomes</Label>
        <Input
          placeholder="Number of Full Incomes"
          type="text"
          name="numFullIncomes"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Number of Children</Label>
        <Input
          placeholder="Number of Children"
          type="text"
          name="numChildren"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Total Income</Label>
        <Input
          placeholder="Total Income"
          type="text"
          name="totalIncome"
          pattern="^[0-9]*$"
        />
      </Form.Field>
      <Form.Field>
        <Label>Comments</Label>
        <Input
          placeholder="Comments"
          type="text"
          name="comments"
          pattern="^[A-z0-9À-ž.,+-\s]*$"
        />
      </Form.Field>

      <Button type="submit" color="green">
        Save Survey
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          propSetOpen(false);
        }}
        color="orange"
      >
        Cancel
      </Button>
    </Form>
  );
}