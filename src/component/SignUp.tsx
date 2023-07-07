import { initFormDataSingup } from "@/helper/initializer";
import { signUpHandler } from "@/pages/api/autosurvey";
import { FormDataSingup } from "@/pages/type/type";
import Link from "@mui/material/Link";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";

export function SignUp() {
    const [open, setOpen] = useState(false);
    
    return (
    <>
    <Modal animation={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Link variant="body2">
        {"Don't have an account? Sign Up"}
      </Link>}>
      <Modal.Header>Sign Up</Modal.Header>
      
      <Modal.Content>
        <Form onSubmit={(e) => {
          e.preventDefault();
          signUpHandler(e);
          setOpen(false);
        }}>
          <Form.Field>
            <Label>User Name</Label>
            <Input placeholder="User Name" type="text" name="username" />
          </Form.Field>
          <Form.Field>
            <Label>Password</Label>
            <Input placeholder="Password" type="text" name="password" />
          </Form.Field>
          <Form.Field>
            <Label>Email</Label>
            <Input placeholder="Email" type="text" name="email" />
          </Form.Field>
          <Button type="submit" >Sign Up +</Button>
          <Button onClick={(e) => {
            e.preventDefault();
            setOpen(false);
          }}
          >Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>

    </>
  )
}