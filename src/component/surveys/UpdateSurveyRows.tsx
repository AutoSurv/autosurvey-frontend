import { getOrganization, updateSurvey } from "@/helper/apiService";
import { OrgContext } from "@/helper/context";
import { Survey } from "@/type/type";
import router from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Button, Form, Icon, Input, Label, Modal, Table } from "semantic-ui-react";

type UpdateSurveyProps = {
  propSurvey: Survey;
  propOrgid: string;
  propSetSurvey: Dispatch<SetStateAction<Survey>>;
}

export default function UpdSurvey({ propOrgid, propSurvey, propSetSurvey }: UpdateSurveyProps) {
  const [open, setOpen] = useState(false);
  const { setOrganization } = useContext(OrgContext);
  const [errMessage, setErrMessage] = useState<string>("");

  return(
    <Modal animation={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="fullscreen"
      trigger={<Icon className="edit-icon" name="edit outline" />}>
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
            updateSurvey(propSurvey.id, e, propSetSurvey, setOpen, setErrMessage, propOrgid);
            getOrganization(propOrgid, setOrganization)
          }}          
        >
        <></>
        {
/*        <div className="excelStyle">
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
        </div>
*/
        }
        <></>
        <div className="flex-or-grid">
          <div className="excelElement">
            <Label className="excelElement-label">Country Name</Label>
            <Input className="excelElement-input" placeholder={propSurvey.country} type="text" name="country" pattern="^[a-zA-Z]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Year</Label>
            <Input className="excelElement-input" placeholder={propSurvey.year} type="text" name="year" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Rent</Label>
            <Input className="excelElement-input" placeholder={propSurvey.rent} type="text" name="rent" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Utilities</Label>
            <Input className="excelElement-input" placeholder={propSurvey.utilities} type="text" name="utilities" />
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Food</Label>
            <Input className="excelElement-input" placeholder={propSurvey.food} type="text" name="food" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Basic Items</Label>
            <Input className="excelElement-input" placeholder={propSurvey.basicItems} type="text" name="basicItems" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Transportation</Label>
            <Input className="excelElement-input" placeholder={propSurvey.transportation} type="text" name="transportation" />
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Education Total</Label>
            <Input className="excelElement-input" placeholder={propSurvey.educationTotal} type="text" name="educationTotal" />
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Education Supplies</Label>
            <Input className="excelElement-input" placeholder={propSurvey.educationSupplies} type="text" name="educationSupplies" />
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Education Fee</Label>
            <Input className="excelElement-input" placeholder={propSurvey.educationFee} type="text" name="educationFee" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Education Type</Label>
            <Input className="excelElement-input" placeholder={propSurvey.educationType} type="text" name="educationType" pattern="^[a-zA-Z]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Accommodation Type</Label>
            <Input className="excelElement-input" placeholder={propSurvey.accommodationType} type="text" name="accommodationType" pattern="^[a-zA-Z]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Profession</Label>
            <Input className="excelElement-input" placeholder={propSurvey.profession} type="text" name="profession" pattern="^[a-zA-Z]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Location Given</Label>
            <Input className="excelElement-input" placeholder={propSurvey.locationGiven} type="text" name="locationGiven" pattern="^[a-zA-Z]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Location Clustered</Label>
            <Input className="excelElement-input" placeholder={propSurvey.locationClustered} type="text" name="locationClustered" pattern="^[a-zA-Z]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Number of Residents</Label>
            <Input className="excelElement-input" placeholder={propSurvey.numResidents} type="text" name="numResidents" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Number of Incomes</Label>
            <Input className="excelElement-input" placeholder={propSurvey.numIncomes} type="text" name="numIncomes" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Number of Full Incomes</Label>
            <Input className="excelElement-input" placeholder={propSurvey.numFullIncomes} type="text" name="numFullIncomes" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Number of Children</Label>
            <Input className="excelElement-input" placeholder={propSurvey.numChildren} type="text" name="numChildren" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Total Income</Label>
            <Input className="excelElement-input" placeholder={propSurvey.totalIncome} type="text" name="totalIncome" pattern="^[0-9]*$"/>
          </div>
          <div className="excelElement">
            <Label className="excelElement-label">Comments</Label>
            <Input className="excelElement-input" placeholder={propSurvey.comments} type="text" name="comments" pattern="^[a-zA-Z]*$"/>
          </div>

        </div>

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