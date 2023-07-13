import { signUpHandler } from "@/helper/methods";
import Link from "@mui/material/Link";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Input, Label, Modal } from "semantic-ui-react";

type SignUpProps = {
  setErrorMsg: Dispatch<SetStateAction<string>>
  setSignupSuccessMessage: Dispatch<SetStateAction<string>>
}

export function SignUp({setErrorMsg, setSignupSuccessMessage} : SignUpProps) {
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
          signUpHandler(e, setErrorMsg, setSignupSuccessMessage, setOpen);
          setOpen(false);
        }}>
          <Form.Field>
            <Label>User Name</Label>
            <Input placeholder="User Name" type="text" name="username" />
          </Form.Field>
          <Form.Field>
            <Label>Password</Label>
            <Input placeholder="Password" type="password" name="password" />
          </Form.Field>
          <Form.Field>
            <Label>Email</Label>
            <Input placeholder="Email" type="email" name="email" />
          </Form.Field>
          <Button type="submit" >Sign Up</Button>
          <Button onClick={(e) => {
            e.preventDefault();
            setErrorMsg("");
          }}
          >Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>

    </>
  )
}