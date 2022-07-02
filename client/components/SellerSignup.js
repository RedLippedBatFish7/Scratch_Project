import React from "react";
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

  return (
    <div>
      <Paper elevation={6} className={classes.signupstack}>
        <h2> Sign Up </h2>
        <Stack spacing={2}>
          <TextField label={"Username"} />
          <TextField type="email" label={"Email"} />
          <TextField type="password" label={"Password"} />
          <Button color="primary">Submit</Button>
        </Stack>
      </Paper>
    </div>
  );
}
