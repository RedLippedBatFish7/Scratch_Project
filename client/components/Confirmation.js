import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperbody: {
    marginTop: '50%',
  },
}));
export default function (props) {
  const classes = useStyles();
  let success = props.success;

  if (success) {
    return (
      <div>
        <Paper className={classes.paperbody}>
          <h2>Coming right up!</h2>
          <p> Thank you for ordering with OnlyPans, here's your order of</p>
          {props.dishes}
          <h6>
            Something wrong with the order? Too bad we didn't have enough time
            to code a resolution.
          </h6>
        </Paper>
      </div>
    );
  } else {
    return (
      <div>
        <Paper>
          <h2>Looks like your order hit a snag! Try again</h2>
        </Paper>
      </div>
    );
  }
}
