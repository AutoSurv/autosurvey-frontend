"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label, TextInput, Button, Toast } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { signOut } from "next-auth/react";
import { SignOut } from "@/helper/methods";

const Login = () => {
  const {data: session, status} = useSession();
  const loading = status === "loading";
  const [username, setUsername] = useState("");
  const [signUpStatus, setSignUpStatus] = useState<boolean>(false);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formDataSingup, setFormDataSingup] = useState({
    username: "",
    password: "",
    email: "",
    roles: "role_user",
  });
  const [formDataSingupAuth, setFormDataSingupAuth] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  async function jwtTokenHandler(): Promise<void> {
    const url = "http://localhost:8080/authenticate";
    await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) return response.text();
        else if (response.status === 401 || response.status === 403) {
          setErrorMsg("Invalid username or password");
        } else {
          setErrorMsg(
            "Something went wrong, try again later or reach out to simonhong85@gmail.com"
          );
        }
      })
      .then((data: any) => {
        const jwtToken = data;
        if (jwtToken) {
          localStorage.setItem("jwt", jwtToken);
          localStorage.setItem("username", username);
          router.push("org");
        }
      });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
    if (fieldName === "username") {
      setUsername(fieldValue);
    }
  }

  function handleSignupInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormDataSingup((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));

    if (fieldName === "username") {
      setFormDataSingupAuth((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    }
    if (fieldName === "password") {
      setFormDataSingupAuth((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
    }
  }

  async function signUpHandler(): Promise<void> {
    setSignUpStatus(!signUpStatus);
    if (
      !formDataSingup.username &&
      !formDataSingup.password &&
      !formDataSingup.email
    ) {
      console.log("all empty fields");
    } else {
      const url = "http://localhost:8080/users/new";
      console.log("formDataSingup: ", formDataSingup);
      await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(formDataSingup),
        headers: {
          "Content-type": "application/json",
        },
      });
      setSignupSuccessMessage("Successfully signed up");
    }
  }

/*   if (status === "authenticated" && session.user) {
    return (
      <>
          Signed in as {session.user.email} <br />
          <Button className="home-login-btn" variant='contained' href='/org' color="blue">To Organizations</Button>
          <Button onClick={() => signOut()} color="orange">Sign out</Button>
      </>
  )
  } */
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="flex flex-col gap-4">

        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" color="white" value="Username" />
          </div>
          <TextInput
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => handleInput(e)}
            required={true}
            color={!formData.username ? "failure" : "gray"}
            helperText={
              !formData.username ? (
                <React.Fragment>Please enter username.</React.Fragment>
              ) : (
                <></>
              )
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" color="white" value="Password" />
          </div>
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => handleInput(e)}
            required={true}
            color={!formData.password ? "failure" : "gray"}
            helperText={
              !formData.password ? (
                <React.Fragment>Please enter your password.</React.Fragment>
              ) : (
                <></>
              )
            }
          />
        </div>
        <Button
          type="submit"
          onClick={() => {
            setErrorMsg("");
            jwtTokenHandler();
          }}
        >
          LOG IN
        </Button>
        <Button
          type="submit"
          onClick={() => {
            setErrorMsg("");
            console.log('hello');
            SignOut();
          }}
        >
          LOG OUT
        </Button>
        <div>
          {errorMsg ? (
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <HiX className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">{errorMsg}</div>
              <Toast.Toggle />
            </Toast>
          ) : (
            <></>
          )}
        </div>
        {/* <span>----------</span>
        <div className="flex flex-col gap-4 mt-6">
          <p>Don't have an account?</p>
          <div className={!signUpStatus ? "hidden" : "visible"}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="username" color="white" value="Username" />
              </div>
              <TextInput
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => handleSignupInput(e)}
                required={true}
                color={!formDataSingup.username ? "failure" : "gray"}
                helperText={
                  !formDataSingup.username ? (
                    <React.Fragment>Please enter username.</React.Fragment>
                  ) : (
                    <></>
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" color="white" value="Password" />
              </div>
              <TextInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => handleSignupInput(e)}
                required={true}
                color={!formDataSingup.password ? "failure" : "gray"}
                helperText={
                  !formDataSingup.password ? (
                    <React.Fragment>Please enter your password.</React.Fragment>
                  ) : (
                    <></>
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" color="white" value="Email address" />
              </div>
              <TextInput
                type="email"
                name="email"
                placeholder="Email address"
                onChange={(e) => handleSignupInput(e)}
                required={true}
                color={!formDataSingup.email ? "failure" : "gray"}
                helperText={
                  !formDataSingup.email ? (
                    <React.Fragment>
                      Please enter your email address.
                    </React.Fragment>
                  ) : (
                    <></>
                  )
                }
              />
            </div>
          </div>
          <Button type="submit" onClick={() => signUpHandler()}>
            SIGN UP FOR AutoSurvey
          </Button>
          <div>
            {signupSuccessMessage ? (
              <div className="text-green-400">{signupSuccessMessage}</div>
            ) : (
              <></>
            )}
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default Login;