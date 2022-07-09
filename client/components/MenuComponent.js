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
  },
}));
export default function MenuComponent(props) {
  const [restaurantName, setRestaurantName] = useState("");
  const classes = useStyles();
  return (
    <Paper className={classes.paperbody}>
      <Stack className={classes.papermain}>
        <h2>Kyle's Tacos</h2>
        <span>123 Conch Street</span>
        <span>8:00AM - 10:00AM ET</span>
      </Stack>
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </Paper>
  );
}
