import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cooking from "../assets/cooking.jpg";
import Button from "@material-ui/core/Button";
import { Stack } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import ZipCodeGrab from "./ZipCodeGrab";
import MenuComponent from "./MenuComponent";
import FloatingCart from "./FloatingCart";
import axios from "axios";

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
  const fakeResponse = {
    kitchenName: "Greg's Kitchen",
    dishes: {
      2: {
        name: "KFC",
        description: "finger licking good",
        price: 15,
        quantity: 30,
      },
      3: {
        name: "Sushi",
        description: "good stuff",
        price: 35,
        quantity: 100,
      },
    },
  };

  //Get request to server for restaurant data
  // useEffect(() => {
  //   axios.get("feed").then((response) => {
  //     //response.data contains seller id, name, seller number
  //     response.data.forEach((e, i) => {
  //       console.log("element", e);
  //       setMenu((old) => [
  //         ...old,
  //         <MenuComponent
  //           kitchenName={e.kitchen_name}
  //           street={e.seller_street_name}
  //         />,
  //       ]);
  //     });
  //   });
  // }, []);

  //Declare variables and state
  const classes = useStyles();
  const ZipCode = props.userZip;
  const UserId = props.buyerId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  const [floatPrice, setFloatPrice] = useState({ price: 0, dishes: 0 });

  // 1: {
  //   name: ,
  //   quantity: 0,
  // }

  console.log("Feed component hit, rendered with a zipcode of ", ZipCode);
  console.log("Buyer Id recognized as ", UserId);

  if (ZipCode || zipCodeAssigned) {
    return (
      <div className={classes.body}>
        <MenuComponent
          dishes={fakeResponse}
          setFloatPrice={setFloatPrice}
          floatPrice={floatPrice}
        />
        <FloatingCart floatPrice={floatPrice} />
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
