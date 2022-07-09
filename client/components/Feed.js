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
import FeedCardsContainer from "./FeedCardsContainer";

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
    width: "100%",
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
  feedItem: {
    marginTop: "15px",
    width: "100%",
    padding: "5px",
    maxWidth: "800px",
    backgroundColor: "#FA8072",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
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

  //Declare variables and state
  const classes = useStyles();
  const ZipCode = props.userZip;
  const UserId = props.buyerId;
  const [zipCodeAssigned, setZipCodeAssigned] = useState(false);
  const [floatPrice, setFloatPrice] = useState({ price: 0, dishes: {} });

  // 1: {
  //   name: ,
  //   quantity: 0,
  // }
  const [feedActive, setFeedActive] = useState(true);
  // define state
  const [kitchens, setKitchens] = useState({});

  // FEED COMPONENT
  // state: cartState
  // path: '/feed'

  // Cards component (all cards rendered here) // you are here
  // path: '/feed' exact
  // button routes us to '/feed/:sellerid'

  // Seller Page
  // path: '/feed/:sellerId' exact

  // useEffect to update the state exactly once here

  useEffect(() => {
    // axios to get state
    axios
      .get("/feed", {})
      .then((res) => {
        setKitchens(res.data);
      })
      .catch((error) => {
        console.log(`error in getting kitchen's feed`);
        console.log(error);
      })
      .then(() => {
        console.log(`what's going on?`);
      });
  }, []);

  //Return back to DOM
  // feed component would conditionally render either Cards or SellerPage

  if (ZipCode || zipCodeAssigned) {
    if (feedActive) {
      console.log("FEED IS ACTIVE -----");
      return (
        <FeedCardsContainer
          setFeedActive={setFeedActive}
          kitchensFromFeed={kitchens}
        />
      );
    }
    if (!feedActive) return <div>SELLER PAGE HERE</div>;

    return (
      //Display purposes only
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
    // check for zipCode, if exists, then render the Feed container
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
