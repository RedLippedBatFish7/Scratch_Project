import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { Stack } from "@mui/material";
import MenuItem from "./MenuItem";

const useStyles = makeStyles((theme) => ({
  menuitem: {
    backgroundColor: "#bdc3c7",
    padding: "10px",
    margin: "10px",
  },
}));
export default function (props) {
  const classes = useStyles();
  return (
    <Paper elevation={5} className={classes.menuitem}>
      <Stack direction="row" justifyContent="space-between">
        <h3>
          {props.name} - {props.price}
        </h3>
        <h3>Quantity: {props.quantity}</h3>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <p>{props.description}</p>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            props.setFloatPrice({
              ...props.floatPrice,
              price: props.floatPrice.price + props.price,
            })
          }
        >
          Add to Cart
        </Button>
      </Stack>
    </Paper>
  );
}
