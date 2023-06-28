import { exportSurvey, importSurvey } from "@/helper/methods";
import { useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";




export default function ImportSurvey() {
  const [open, setOpen] = useState(false);
  const [errMessage, setErrMessage] = useState<string>("");
  
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
            e.preventDefault();
            importSurvey(e);
          }}>
            <Form.Field>
              <Label>Select File</Label>
              <Input placeholder="select file to import" type="file" name="fileToImport" />
            </Form.Field>
            
            <Button type="submit" color="blue">Add</Button>
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