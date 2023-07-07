"use client";
import React, { useState } from "react";
import { Form, Input, Label, Modal, Message, Popup } from 'semantic-ui-react';
import { signInJwtTokenHandler, signUpHandler } from "@/helper/methods";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Login = () => {
  const [signUpStatus, setSignUpStatus] = useState<boolean>(false);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  return (

    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={(e) => {
          e.preventDefault();
          signInJwtTokenHandler(e, setErrorMsg);
        }} noValidate sx={{ mt: 1 }}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus

          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {(errorMsg.length > 0) ? <Message warning>
            <p>{errorMsg}</p>
          </Message> : null}
          {(signupSuccessMessage.length > 0) ? <Message success
            header='Your user registration was successful'
            content='You may now log-in with the username you have chosen'
          >
          </Message> : null}
        </Box>
        <Grid container>
          <Grid item xs>
            <Popup
              trigger={<Link variant="body2">
                Forgot password?
              </Link>}
              content='Contact simonhong85@gmail.com'
              position='bottom center'
            />
          </Grid>
          <Grid item>
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
                    <Input placeholder="Email" type="text" name="email" />
                  </Form.Field>
                  <Button type="submit" >Sign Up +</Button>
                  <Button onClick={(e) => {
                    e.preventDefault();
                    setErrorMsg("");
                    setOpen(false);
                  }}
                  >Cancel</Button>
                </Form>
                {(errorMsg.length > 0) ? <Message warning>
                  <p>{errorMsg}</p>
                </Message> : null}
              </Modal.Content>
            </Modal>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;