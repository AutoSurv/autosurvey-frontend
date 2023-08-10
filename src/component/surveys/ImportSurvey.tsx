import { initPagination } from "@/helper/initializer";
import { checkImportedSurveyFields } from "@/helper/methods";
import { addImportedSurvey } from "@/helper/apiService";
import { Survey, Pagination, ImportedSurvey, Organization } from "@/type/type";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";
import * as XLSX from 'xlsx'

type ImportSurveyProps = {
  organization: Organization;
  setOrganization: Dispatch<SetStateAction<Organization>>;
  setSurveys: Dispatch<SetStateAction<Survey[]>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
}

export default function ImportSurvey(props: ImportSurveyProps) {
  const { organization, setOrganization, setSurveys, setErrorMsg, setSuccessMessage } = props;
  const [pagination, setPagination] = useState<Pagination>(initPagination);

  const [open, setOpen] = useState(false);
  const [dataFromImportedSurvey, setDataFromImportedSurvey] = useState<Survey[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {

      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);

      reader.onload = (e) => {
        const data = e.target!.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: ImportedSurvey[] = XLSX.utils.sheet_to_json(worksheet);
            
        const valuetedData = checkImportedSurveyFields(json);

        if (typeof valuetedData[0] === "object"){
          const surveyArr: Survey[] = JSON.parse(JSON.stringify(json));
          setDataFromImportedSurvey(surveyArr);
        }
      };
    }  
  }

  const saveImportedSurvey = () => {
    addImportedSurvey(dataFromImportedSurvey, organization.orgId, setPagination, setErrorMsg, setSuccessMessage, setOpen, setSurveys, setOrganization)
  }
  
  return (
    <>
    <Modal animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<label className="surveys-modal-btn" > Import Survey</label>}>
        <Modal.Header>Make New Survey
        <Button onClick={(e) => {
          e.preventDefault();
          setOpen(false);
        }} color="grey" floated='right'
        >X</Button>
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={(e) => {
            saveImportedSurvey();
            e.preventDefault();
            setOpen(false);
          }}>
            <Form.Field>
              <Label>Select File</Label>
              <Input placeholder="select file to import" 
                type="file" name="fileToImport" 
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}  
              />
            </Form.Field>
            <Button type="submit" color="green">Ok</Button>
            <Button onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }} color="orange"
            >Cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>
  </>
  )
}