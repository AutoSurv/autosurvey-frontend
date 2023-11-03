"use client";
import React, { useContext, useEffect, useState } from "react";
import { Message, Modal } from "semantic-ui-react";
import { SignOut, signInJwtTokenHandler } from "@/helper/methods";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { OrgContext } from "@/helper/context";
import { SignUp } from "./SignUp";
import OfflineButton from "./OfflineButton";

const Login = () => {
  const {
    signUpStatus,
    setSignUpStatus,
    userNameAuth,
    setUserNameAuth,
    setUserDto,
  } = useContext(OrgContext);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSignUpStatus(true);
      setUserNameAuth(localStorage.getItem("username") as string);
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      {signUpStatus === false || !localStorage.getItem("jwt") ? (
        <>

          <form
            className="form make-offer-form flex flex-col gap-[10px] max-w-[450px] p-[20px] relative mx-auto  "
            onSubmit={(e) => {
              e.preventDefault();
              signInJwtTokenHandler(
                e,
                setErrorMsg,
                setSignUpStatus,
                setUserNameAuth,
                setUserDto
              );
            }}
          >
            <label className="">
              <input
                className=" input bg-white placeholder:translate-x-6  align-middle w-full outline-none px-[10px] py-[16px] border border-black/25 opacity-80 rounded-full mt-9 focus:border-primary  "
                type="text"
                required
                id="username"
                placeholder="Username"
                name="username"
              />
            </label>
            <label className="">
              <input
                className=" bg-white input w-full placeholder:translate-x-6 outline-none px-[10px] py-[16px] border border-black/25 opacity-80 rounded-full  focus:border-primary"
                name="password"
                required
                placeholder="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </label>
            <button className="bg-primary hover:bg-accent rounded-full text-third h-[50px] cursor-pointer  text-sec font-primary text-lg" type="submit">Sign In</button>
            <OfflineButton/>
            {errorMsg.length > 0 ? (
              <Message warning>
                <p>{errorMsg}</p>
              </Message>
            ) : null}
            {signupSuccessMessage.length > 0 ? (
              <Message success>
                <Message.Header>
                  Your user registration was successful <br />
                  If you wish to be added as manager for the organization,
                  please contact the admins:
                  <br />
                  seongbong.hong@appliedtechnology.se or
                  marco.debernardi@appliedtechnology.se.
                </Message.Header>
                <br />
                <Message.Content>
                  You may now log-in with the username you have chosen
                </Message.Content>
              </Message>
            ) : null}
          </form>
          <Grid container>
            <Grid item xs>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <Button
                    className="login-forgotpassword"
                    variant="text"
                    size="small"
                    style={{ textTransform: "none" }}
                  >
                    Forgot password?
                  </Button>
                }
              >
                <Modal.Header>Forgot password?</Modal.Header>
                <Modal.Content>
                  Contact: <br /> <i>seonbong.hong@appliedtechnology.se</i>{" "}
                  <br /> or <br /> <i>marco.debernardi@appliedtechnology.se</i>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Actions>
              </Modal>
            </Grid>
            <Grid item>
              <SignUp
                setErrorMsg={setErrorMsg}
                setSignupSuccessMessage={setSignupSuccessMessage}
              />
            </Grid>
          </Grid>
    
        </>
      ) : (
        <>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              SignOut(setSignUpStatus);
            }}
          >
            {" "}
            Sign Out User: {userNameAuth}
          </Button>
          <Button href="/org" fullWidth>
            Go to Organization
          </Button>
        </>
      )}
    </Container>
  );
};

export default Login;
