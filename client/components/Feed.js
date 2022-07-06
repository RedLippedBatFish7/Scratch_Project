import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cooking from "../assets/cooking.jpg";
import Button from "@material-ui/core/Button";
import { Stack } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import ZipCodeGrab from "./ZipCodeGrab";

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: "cover",
    backgroundRepeat: "none",
    backgroundColor: "transparent",
    padding: "0px 20px",
  },
  heavyFont: {
    color: "white",
    fontWeight: "900",
    fontSize: "40px",
    fontFamily: "Nunito",
  },
}));

export default function Body() {
  //Declare variables and state
  const classes = useStyles();
  const [ZipCode, setZipCode] = useState(false);

  //Get state of Zipcode
  useEffect(() => {
    //FETCH to grab Zipcode data
    //If Zipcode data exists, render to Zipcode
    //Else render component asking for Zipcode
  });

  //Return back to DOM

  if (ZipCode) {
  } else {
    return (
      <div className={classes.body}>
        <ZipCodeGrab />
        <h1 className={classes.heavyFont}>{`Test feed`}</h1>
        <Outlet />
      </div>
    );
  }
}
