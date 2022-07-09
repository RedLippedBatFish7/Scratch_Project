import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { Stack } from "@mui/material";
import MenuItem from "./MenuItem";

const useStyles = makeStyles((theme) => ({
  papermain: {
    width: "50%",
    padding: "10px 0px 0px 10px",
    margin: "10px 0px 20px 10px",
  },
  stack: {
    padding: "0px 10px",
  },
  paperbody: {
    width: "50%",
    backgroundColor: "#ecf0f1",
    margin: "10px",
  },
}));

const destructure = (object, props) => {
  const menuUnit = [];
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      menuUnit.push(
        <MenuItem
          name={element.name}
          description={element.description}
          price={element.price}
          quantity={element.quantity}
          setFloatPrice={props.setFloatPrice}
          floatPrice={props.floatPrice}
        />
      );
    }
  }
  return menuUnit;
};
export default function MenuComponent(props) {
  const [restaurantName, setRestaurantName] = useState("");
  const classes = useStyles();
  const dishes = props.dishes.dishes;
  return (
    <Paper className={classes.paperbody}>
      <Stack className={classes.papermain}>
        <h2>{props.dishes.kitchenName}</h2>
        <span>{props.dishes.street}</span>
        <span>8:00AM - 10:00AM ET</span>
      </Stack>
      {destructure(dishes, props)}
    </Paper>
  );
}
