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
export default function () {
  const classes = useStyles();
  return (
    <Paper elevation={5} className={classes.menuitem}>
      <Stack direction="row" justifyContent="space-between">
        <h3>Kyle's Breakfast Scrambla - $11.50</h3>
        <h3>Quantity: 30</h3>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <p>Start your morning right with the breakfast scrambla</p>
        <Button variant="contained" color="secondary">
          Add to Cart
        </Button>
      </Stack>
    </Paper>
  );
}
