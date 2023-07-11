"use client";
import React, { useContext, useState } from "react";
import { Message, Popup } from 'semantic-ui-react';
import { SignOut, signInJwtTokenHandler } from "@/helper/methods";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { OrgContext } from "@/helper/context";
import { SignUp } from "./SignUp";

const Login = () => {
  const { signUpStatus, setSignUpStatus, userNameAuth, setUserNameAuth } = useContext(OrgContext);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  console.log(signUpStatus);
  if (typeof window !== "undefined") {
    setSignUpStatus(true);
    setUserNameAuth(localStorage.getItem("username") as string);
  }; 
  return (

    <Container component="main" maxWidth="xs">

      {(signUpStatus === false || !localStorage.getItem('jwt')) ? 
      <Box
        sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", }} >
        <Box component="form" onSubmit={(e) => {
          e.preventDefault();
          signInJwtTokenHandler(e, setErrorMsg, setSignUpStatus, setUserNameAuth);
        }} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="username" 
                    label="User Name" name="username" autoComplete="username" autoFocus
          />
          <TextField margin="normal" required fullWidth name="password" label="Password"
                      type="password" id="password" autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> 
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
            <SignUp setErrorMsg={setErrorMsg} setSignupSuccessMessage={setSignupSuccessMessage}/>
          </Grid>
        </Grid>
      </Box>
       :<>  
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
        onClick={() => {SignOut(setSignUpStatus)}}> Sign Out User: {userNameAuth}</Button>
        <Button href="/org" fullWidth>Go to Organization</Button></>}
    </Container>
  );
};

export default Login;