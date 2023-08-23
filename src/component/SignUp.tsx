import { signUpHandler } from "@/helper/methods";
import { Dispatch, SetStateAction, useState } from "react";
import { Form, Input, Label, Modal } from "semantic-ui-react";
import Button from "@mui/material/Button";

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
      trigger={<Button className="login-signup" variant="text" size="small" style={{textTransform: 'none'}}>
        {"Don't have an account? Sign Up"}
      </Button>}>
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
            <Label>Email (use the organization email)</Label>
            <Input placeholder="Email" type="email" name="email" />
          </Form.Field>
          <Button className="login-signup-confirm" type="submit" variant="contained" >Sign Up</Button>
          <Button variant="outlined"  onClick={(e) => {
            e.preventDefault();
            setErrorMsg("");
            setOpen(false);
          }}
          >Cancel</Button>
        </Form>
      </Modal.Content>
    </Modal>

    </>
  )
}