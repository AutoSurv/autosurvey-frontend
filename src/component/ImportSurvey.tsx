import { addImportedSurvey } from "@/pages/api/autosurvey";
import { AutoSurvey, Organization } from "@/type/type";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";
import * as XLSX from 'xlsx'

type ImportSurveyProps = {
  organization: Organization;
  setOrganization: Dispatch<SetStateAction<Organization>>;
  setSurveys: Dispatch<SetStateAction<AutoSurvey[]>>;
}

export default function ImportSurvey(props: ImportSurveyProps) {

  const { organization, setOrganization, setSurveys } = props;

  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const [data, setData] = useState<AutoSurvey[]>([]);



  const handleFileUpload = (e: any) => {
    if (e != null) {

      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target!.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        
        if (typeof json[0] === "object"){
          const surveyArr: AutoSurvey[] = JSON.parse(JSON.stringify(json));
          setData(surveyArr);
        }
      };
    }  
  }

  const saveImportedSurvey = () => {
    addImportedSurvey(data, organization.orgId, setErrMessage, setOpen, setSurveys, setOrganization)
  }
  
  return (
    <>
    <Modal animation={false}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="surveys-modal-btn" color="green"> Import Survey</Button>}>
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