import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
  },
}));
export default function ZipCodeGrab() {
  const classes = useStyles();
  //grabs Zipcode from text field
  const [UserZip, setUserZip] = useState(0);
  //tracks errors if incorrect zipcode format is entered
  const [ErrorZip, setErrorZip] = useState(false);

  //store userid in state

  const submitZipCode = (e) => {
    const zipRegex = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
    console.log();
    e.preventDefault();
    if (zipRegex.test(UserZip)) {
      console.log("Accepted!");
      setErrorZip(false);

      //Post request, send entered field to server
      const dataBody = {
        zipcode: UserZip,
        userid: User,
      };
    } else {
      setErrorZip(true);
    }
  };

  useEffect(() => {
    //Grab the users ID and set to state
    //[UserId, setUserId] = useState(data.userid);
  });

  return (
    <div>
      <Paper elevation={5} sx={{ p: 2 }} className={classes.paper}>
        <h1>Which neighborhood are you located in?</h1>
        <form onSubmit={submitZipCode}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Zipcode"
              variant="outlined"
              type="number"
              error={ErrorZip}
              helperText={
                ErrorZip == true ? "Please enter a valid Zipcode" : false
              }
              onChange={(e) => setUserZip(e.target.value)}
            />
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
