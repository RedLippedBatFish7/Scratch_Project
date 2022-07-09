import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cooking from "../assets/cooking.jpg";
import Button from "@material-ui/core/Button";
import { Stack } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import ZipCodeGrab from "./ZipCodeGrab";
import MenuComponent from "./MenuComponent";
import FloatingCart from "./FloatingCart";

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

export default function Body(props) {
  //Declare variables and state
  const classes = useStyles();
  const ZipCode = props.userZip;
  const UserId = props.buyerId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);

  console.log("Feed component hit, rendered with a zipcode of ", ZipCode);
  console.log("Buyer Id recognized as ", UserId);

  if (ZipCode || zipCodeAssigned) {
    return (
      <div className={classes.body}>
        <MenuComponent />
        <FloatingCart />
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className={classes.body}>
        <ZipCodeGrab buyerId={UserId} setZipCodeAssigned={setZipCodeAssigned} />
        <h1 className={classes.heavyFont}>{`Test feed`}</h1>
        <Outlet />
      </div>
    );
  }
}
