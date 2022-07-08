const axios = require("axios");
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import { CardContent, Paper, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  signupstack: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    margin: "30px auto auto 0px",
    left: "20%",
    right: "20%",
    zIndex: "1",
  },
}));

export default function SignUp() {
  const classes = useStyles();

  // set form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch here
    axios
      .post("/auth/signup", {
        seller_nickname: username,
        seller_email: email,
        password,
        userType: "seller",
      })
      .then((response) => {
        // clear form
        setEmail("");
        setUsername("");
        setPassword("");
        // set "success" in state
        setSuccess(true);
      })
      .catch((error) => {
        // handle error
        console.log("hit error response");
        console.log(error);
      })
      .then(() => {
        console.log("end of fetch in signup");
        // always executed
      });
  };

  // display only success message if signup successful
  if (success) {
    return (
      <div>
        <Paper elevation={6} className={classes.signupstack}>
          <h2> Sign Up </h2>
          <p>Account created successfully!</p>
        </Paper>
      </div>
    );
  }
  return (
    <div>
      <Paper elevation={6} className={classes.signupstack}>
        <form className={classes.root} onSubmit={handleSubmit}>
          <h2> Sign Up </h2>
          <Stack spacing={2}>
            <TextField
              label={"Username"}
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="email"
              label={"Email"}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label={"Password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
