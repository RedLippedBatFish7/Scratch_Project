// const axios = require('axios');
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

/* 

- pickup time window: from and till
- address fields
- "enable" for selling
- cuisine

*/

//Styling
const useStyles = makeStyles((theme) => ({
  dishesContainer: {
    // flex: '0 0 100%',
    // overflowY: 'scroll',
  },
  dishRow: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    padding: '20px',
  },
  dishPre: {
    display: 'flex',
  },
  dishStats: {
    display: 'flex',
    flexGrow: 0,
    flexShrink: 1,
  },
  dishStatItem: {
    width: '60px',
    margin: '10px',
  },
  dishName: {
    flexGrow: 1,
  },
}));

export default function Body(props) {
  const classes = useStyles();

  return (
    <Paper
      elevation={2}
      className={classes.dishRow + ' dishRow'}
      key={props.dishId}
      id={props.dishId}
    >
      <div className={classes.dishPre}>
        <TextField
          required
          variant='filled'
          defaultValue={props.name}
          className={classes.dishName + ' dishName'}
          label='Dish Name'
          onChange={(e) =>
            props.updateDish(props.dishId, 'name', e.target.value)
          }
        />
        <div className={classes.dishStats}>
          <CurrencyTextField
            required
            currencySymbol='$'
            minimumValue='0'
            //   outputFormat='number'
            decimalCharacter='.'
            digitGroupSeparator=','
            defaultValue={props.price.slice(1)}
            className={classes.dishStatItem + ' dishPrice'}
            label='Price'
            onChange={(e) =>
              props.updateDish(props.dishId, 'price', e.target.value)
            }
          />
          <TextField
            required
            type='number'
            defaultValue={props.quantity}
            className={classes.dishStatItem + ' dishQty'}
            label='Qty'
            onChange={(e) =>
              props.updateDish(props.dishId, 'quantity', e.target.value)
            }
          />
          <Tooltip title='Delete Dish'>
            <IconButton
              onClick={() => {
                props.deleteDish(props.dishId);
              }}
            >
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <TextField
        defaultValue={props.description}
        className={classes.dishDesc + ' dishDesc'}
        //   variant='filled'
        label='Extended description'
        multiline
        minRows={1}
        maxRows={3}
        onChange={(e) =>
          props.updateDish(props.dishId, 'description', e.target.value)
        }
      />
    </Paper>
  );
}
