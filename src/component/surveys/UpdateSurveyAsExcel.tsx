import { updateSurvey } from "@/helper/apiService";
import { Survey } from "@/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal, Table } from "semantic-ui-react";

type CreateSurveyProps = {
  survey: Survey;
  orgid: string | string[] | undefined;
  setSurvey: Dispatch<SetStateAction<Survey>>;
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
      size="fullscreen"
      trigger={<Button className="surveys-modal-btn" color="blue" basic>Edit Survey</Button>}>
      <Modal.Header>Edit Survey
        <Button onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }} color="grey" floated='right'
          >X</Button>
      </Modal.Header>
      <Modal.Content>
        <Form className="surveys-modal-form"
          onSubmit={(e) => {
          e.preventDefault();
            updateSurvey(survey.id, e, setSurvey, setOpen, setErrMessage, orgid);
          }}
          
        >
        <Form.Group >
          <Label >Country Name</Label>
          <Label>Year</Label>
          <Label>Rent</Label>
          <Label>Utilities</Label>
          <Label>Food</Label>
          <Label>Basic Items</Label>
          <Label>Transportation</Label>
          <Label>Education Total</Label>
          <Label>Education Supplies</Label>
          <Label>Education Fee</Label>
          <Label>Education Type</Label>
          <Label>Accommodation Type</Label>
          <Label>Profession</Label>
          <Label>Location Given</Label>
          <Label>Location Clustered</Label>
          <Label>Number of Residents</Label>
          <Label>Number of Incomes</Label>
          <Label>Number of Full Incomes</Label>
          <Label>Number of Children</Label>
          <Label>Total Income</Label>
          <Label>Comments</Label>
        </Form.Group>

        <Form.Group widths={16}>
          <Input placeholder={survey.country} type="text" name="country" pattern="^[a-zA-Z]*$"/>
          <Input placeholder={survey.year} type="text" name="year" pattern="^[0-9]*$"/>
          <Input placeholder={survey.rent} type="text" name="rent" pattern="^[0-9]*$"/>
          <Input placeholder={survey.utilities} type="text" name="utilities" />
          <Input placeholder={survey.food} type="text" name="food" pattern="^[0-9]*$"/>
          <Input placeholder={survey.basicItems} type="text" name="basicItems" pattern="^[0-9]*$"/>
          <Input placeholder={survey.transportation} type="text" name="transportation" />
          <Input placeholder={survey.educationTotal} type="text" name="educationTotal" />
          <Input placeholder={survey.educationSupplies} type="text" name="educationSupplies" />
          <Input placeholder={survey.educationFee} type="text" name="educationFee" pattern="^[0-9]*$"/>
          <Input placeholder={survey.educationType} type="text" name="educationType" pattern="^[a-zA-Z]*$"/>
          <Input placeholder={survey.accommodationType} type="text" name="accommodationType" pattern="^[a-zA-Z]*$"/>
          <Input placeholder={survey.profession} type="text" name="profession" pattern="^[a-zA-Z]*$"/>
          <Input placeholder={survey.locationGiven} type="text" name="locationGiven" pattern="^[a-zA-Z]*$"/>
          <Input placeholder={survey.locationClustered} type="text" name="locationClustered" pattern="^[a-zA-Z]*$"/>
          <Input placeholder={survey.numResidents} type="text" name="numResidents" pattern="^[0-9]*$"/>
          <Input placeholder={survey.numIncomes} type="text" name="numIncomes" pattern="^[0-9]*$"/>
          <Input placeholder={survey.numFullIncomes} type="text" name="numFullIncomes" pattern="^[0-9]*$"/>
          <Input placeholder={survey.numChildren} type="text" name="numChildren" pattern="^[0-9]*$"/>
          <Input placeholder={survey.totalIncome} type="text" name="totalIncome" pattern="^[0-9]*$"/>
          <Input placeholder={survey.comments} type="text" name="comments" pattern="^[a-zA-Z]*$"/>
        </Form.Group>

        <Table singleLine compact >
          <Table.Header >
            <Table.Row>
              <Table.HeaderCell collapsing>Country Name</Table.HeaderCell>
              <Table.HeaderCell collapsing>Year</Table.HeaderCell>
              <Table.HeaderCell collapsing>Rent</Table.HeaderCell>
              <Table.HeaderCell collapsing>Utilities</Table.HeaderCell>
              <Table.HeaderCell collapsing>Food</Table.HeaderCell>
              <Table.HeaderCell collapsing>Basic Items</Table.HeaderCell>
              <Table.HeaderCell collapsing>Transportation</Table.HeaderCell>
              <Table.HeaderCell collapsing>Education Total</Table.HeaderCell>
              <Table.HeaderCell collapsing>Education Supplies</Table.HeaderCell>
              <Table.HeaderCell collapsing>Education Fee</Table.HeaderCell>
              <Table.HeaderCell collapsing>Education Type</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input size="mini" placeholder={survey.country} type="text" name="country" pattern="^[a-zA-Z]*$"/>
                </Form.Field>              
              </Table.Cell>
              <Table.Cell collapsing>
              <Form.Field>
                <Input placeholder={survey.year} type="text" name="year" pattern="^[0-9]*$"/>
              </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>          
                  <Input placeholder={survey.rent} type="text" name="rent" pattern="^[0-9]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.utilities} type="text" name="utilities" />
                </Form.Field>                
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.food} type="text" name="food" pattern="^[0-9]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.basicItems} type="text" name="basicItems" pattern="^[0-9]*$"/>
                </Form.Field>                
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.transportation} type="text" name="transportation" />
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.educationTotal} type="text" name="educationTotal" />
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.educationSupplies} type="text" name="educationSupplies" />
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.educationFee} type="text" name="educationFee" pattern="^[0-9]*$"/>
                </Form.Field>                
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.educationType} type="text" name="educationType" pattern="^[a-zA-Z]*$"/>
                </Form.Field>
              </Table.Cell>
            </Table.Row>  
            </Table.Body>

          <Table.Header>
            <Table.Row>  
              <Table.HeaderCell collapsing>Accommodation Type</Table.HeaderCell>
              <Table.HeaderCell collapsing>Profession</Table.HeaderCell>
              <Table.HeaderCell collapsing>Location Given</Table.HeaderCell>
              <Table.HeaderCell collapsing>Location Clustered</Table.HeaderCell>
              <Table.HeaderCell collapsing>Number of Residents</Table.HeaderCell>
              <Table.HeaderCell collapsing>Number of Incomes</Table.HeaderCell>
              <Table.HeaderCell collapsing>Number of Full Incomes</Table.HeaderCell>
              <Table.HeaderCell collapsing>Number of Children</Table.HeaderCell>
              <Table.HeaderCell collapsing>Total Income</Table.HeaderCell>
              <Table.HeaderCell collapsing>Comments</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.accommodationType} type="text" name="accommodationType" pattern="^[a-zA-Z]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.profession} type="text" name="profession" pattern="^[a-zA-Z]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.locationGiven} type="text" name="locationGiven" pattern="^[a-zA-Z]*$"/>
                </Form.Field>                
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.locationClustered} type="text" name="locationClustered" pattern="^[a-zA-Z]*$"/>
                </Form.Field>                
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.numResidents} type="text" name="numResidents" pattern="^[0-9]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.numIncomes} type="text" name="numIncomes" pattern="^[0-9]*$"/>
                </Form.Field>                
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.numFullIncomes} type="text" name="numFullIncomes" pattern="^[0-9]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.numChildren} type="text" name="numChildren" pattern="^[0-9]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.totalIncome} type="text" name="totalIncome" pattern="^[0-9]*$"/>
                </Form.Field>
              </Table.Cell>
              <Table.Cell collapsing>
                <Form.Field>
                  <Input placeholder={survey.comments} type="text" name="comments" pattern="^[a-zA-Z]*$"/>
                </Form.Field>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

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