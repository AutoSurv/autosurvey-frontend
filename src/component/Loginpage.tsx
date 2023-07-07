"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Label, Modal, Card, Image, Message } from 'semantic-ui-react';
import { TextInput, Toast } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { SignOut, signInJwtTokenHandler, signUpHandler } from "@/helper/methods";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
          header= 'Your user registration was successful'
          content='You may now log-in with the username you have chosen'
          >
          </Message> : null}
        </Box>
        <Grid container>
          <Grid item xs>
            <Link href="/" variant="body2">
              Forgot password?
            </Link>
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

    // <main className="flex min-h-screen flex-col items-center justify-start p-24">
    //   <div className="flex flex-col gap-4">
    //     {/* <Button>
    //       <FaGithub className="mr-2 h-5 w-5" />
    //       CONTINUE WITH GITHUB
    //     </Button>
    //     <Button>
    //       <FcGoogle className="mr-2 h-5 w-5" />
    //       CONTINUE WITH GOOGLE
    //     </Button>
    //     <span>----- OR -----</span> */}
    //     <div>
    //       <div className="mb-2 block">
    //         <Label htmlFor="username"  value="Username">User Name</Label>
    //       </div>
    //       <TextInput
    //         type="text"
    //         id="username"
    //         name="username"
    //         placeholder="Username"
    //         onChange={(e) => handleInput(e)}
    //         required={true}
    //         color={!formData.username ? "failure" : "gray"}
    //         helperText={
    //           !formData.username ? (
    //             <React.Fragment>Please enter username.</React.Fragment>
    //           ) : (
    //             <></>
    //           )
    //         }
    //       />
    //     </div>
    //     <div>
    //       <div className="mb-2 block">
    //         <Label htmlFor="password" value="Password">Password</Label>
    //       </div>
    //       <TextInput
    //         type="password"
    //         id="password"
    //         name="password"
    //         placeholder="Password"
    //         onChange={(e) => handleInput(e)}
    //         required={true}
    //         color={!formData.password ? "failure" : "gray"}
    //         helperText={
    //           !formData.password ? (
    //             <React.Fragment>Please enter your password.</React.Fragment>
    //           ) : (
    //             <></>
    //           )
    //         }
    //       />
    //     </div>
    //     <Button
    //       type="submit"
    //       onClick={() => {
    //         setErrorMsg("");
    //         jwtTokenHandler();
    //       }}
    //     >
    //       LOG IN
    //     </Button>
    //     <Button
    //       type="submit"
    //       onClick={() => {
    //         setErrorMsg("");
    //         console.log('hello');
    //         SignOut();
    //       }}
    //     >
    //       LOG OUT
    //     </Button>
    //     <div>
    //       {errorMsg ? (
    //         <Toast>
    //           <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
    //             <HiX className="h-5 w-5" />
    //           </div>
    //           <div className="ml-3 text-sm font-normal">{errorMsg}</div>
    //           <Toast.Toggle />
    //         </Toast>
    //       ) : (
    //         <></>
    //       )}
    //     </div>
    //     <span>----------</span>
    //     <div className="flex flex-col gap-4 mt-6">
    //       <p>Don't have an account?</p>
    //       <div className={!signUpStatus ? "hidden" : "visible"}>
    //         <div>
    //           <div className="mb-2 block">
    //             <Label htmlFor="username" value="Username" />
    //           </div>
    //           <TextInput
    //             type="text"
    //             name="username"
    //             placeholder="Username"
    //             onChange={(e) => handleSignupInput(e)}
    //             required={true}
    //             color={!formDataSingup.username ? "failure" : "gray"}
    //             helperText={
    //               !formDataSingup.username ? (
    //                 <React.Fragment>Please enter username.</React.Fragment>
    //               ) : (
    //                 <></>
    //               )
    //             }
    //           />
    //         </div>
    //         <div>
    //           <div className="mb-2 block">
    //             <Label htmlFor="password" value="Password" />
    //           </div>
    //           <TextInput
    //             type="password"
    //             name="password"
    //             placeholder="Password"
    //             onChange={(e) => handleSignupInput(e)}
    //             required={true}
    //             color={!formDataSingup.password ? "failure" : "gray"}
    //             helperText={
    //               !formDataSingup.password ? (
    //                 <React.Fragment>Please enter your password.</React.Fragment>
    //               ) : (
    //                 <></>
    //               )
    //             }
    //           />
    //         </div>
    //         <div>
    //           <div className="mb-2 block">
    //             <Label htmlFor="email" value="Email address" />
    //           </div>
    //           <TextInput
    //             type="email"
    //             name="email"
    //             placeholder="Email address"
    //             onChange={(e) => handleSignupInput(e)}
    //             required={true}
    //             color={!formDataSingup.email ? "failure" : "gray"}
    //             helperText={
    //               !formDataSingup.email ? (
    //                 <React.Fragment>
    //                   Please enter your email address.
    //                 </React.Fragment>
    //               ) : (
    //                 <></>
    //               )
    //             }
    //           />
    //         </div>
    //       </div>
    //       <Button type="submit" onClick={() => signUpHandler()}>
    //         SIGN UP FOR AutoSurvey
    //       </Button>
    //       <div>
    //         {signupSuccessMessage ? (
    //           <div className="text-green-400">{signupSuccessMessage}</div>
    //         ) : (
    //           <></>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
};

export default Login;