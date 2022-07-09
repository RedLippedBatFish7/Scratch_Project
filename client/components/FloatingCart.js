import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { Stack } from "@mui/material";
import MenuItem from "./MenuItem";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "fixed",
    bottom: "0",
    marginBottom: "60px",
    width: "50%",
    right: "25%",
    padding: "10px",
  },
}));
export default function () {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.footer}>
        <Stack>
          <h3> Current Cart: </h3>
          <h3> Kyle's Scrambla </h3>
          <Button>Checkout</Button>
        </Stack>
      </Paper>
    </div>
  );
}
