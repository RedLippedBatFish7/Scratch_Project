const axios = require('axios');
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';
import Button from '@material-ui/core/Button';
import { Stack } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { Paper, TextField, IconButton, Tooltip } from '@material-ui/core';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBox from '@mui/icons-material/AddBox';
import AddCircle from '@mui/icons-material/AddCircle';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

/* 

should the "select available times for pickup TOMORROW" be on this page?
and it's tomorrow, right?

am I missing anything else that should be on this page? Remember, it's the Seller's kitchen page.

I guess somewhere I need to add a place to have their address?

Oh and somewhere to "enable" the shop so they'll appear on the market feed

*/

//Styling
const useStyles = makeStyles((theme) => ({
  body: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '120px',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    backgroundColor: 'transparent',
    padding: '0px 40px',
  },
  heavyFont: {
    color: 'black',
    fontWeight: '900',
    fontSize: '40px',
    fontFamily: 'Nunito',
  },
  kitchenNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    marginRight: '20px',
    height: '85vh',
    justifyContent: 'space-between',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
  },
  dishesContainer: {
    // flex: '0 0 100%',
    overflowY: 'scroll',
  },
  dishRow: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
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
    width: '80px',
    margin: '10px',
  },
  dishName: {
    flexGrow: 1,
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px',
  },
}));

export default function Body(props) {
  //Declare variables and state
  const classes = useStyles();
  const navigate = useNavigate();
  const [dishesArr, setDishesArr] = useState({});
  const [changesObj, setChangesObj] = useState({});
  const [newDishNum, setNewDishNum] = useState(-1);
  const [updatingKitchenName, setUpdatingKitchenName] = useState(false);
  const [kitchenName, setKitchenName] = useState({
    first: '',
    old: '',
    current: '',
  });

  // populate dishesArr with the seller's dishes
  useEffect(() => {
    // redirect if not a seller ? I don't think I need this
    if (props.userType !== 'seller') navigate('/');
    // axios
    //   .get(`/db/menu/`, {
    //     userId: props.userId,
    //   })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     // expect an array of objects
    //     // { name: 'chips', price: 2.50, quantity: 4}
    //     console.log('dishes: ', res);
    //     setDishesArr(res);
    //   })
    //   .catch((error) => {
    //     // handle error
    //     console.log('hit error response');
    //     console.log(error);
    //   })
    //   .then(() => {
    //     // always executed
    //   });

    const fakeResponse = {
      kitchenName: "Greg's Kitchen",
      dishes: {
        2: {
          name: 'KFC',
          description: 'finger licking good',
          price: 15,
          quantity: 30,
        },
        3: {
          name: 'Sushi',
          description: 'good stuff',
          price: 35,
          quantity: 100,
        },
      },
    };

    setKitchenName({
      current: fakeResponse.kitchenName,
      old: fakeResponse.kitchenName,
      first: fakeResponse.kitchenName,
    });
    setDishesArr(fakeResponse.dishes);
  }, []);

  const updateDishProp = (id, prop, newVal) => {
    // clone dishes
    const tempDishes = { ...dishesArr };
    // replace id with an altered clone of itself
    tempDishes[id] = { ...tempDishes[id], [prop]: newVal };
    // overwrite dishes
    setDishesArr(tempDishes);
    // adjust changes
    const tempChanges = { ...changesObj };
    tempChanges[id] = tempDishes[id];
    setChangesObj(tempChanges);
  };

  const submitChanges = (e) => {
    e.preventDefault();
    if (
      Object.keys(changesObj).length ||
      kitchenName.first !== kitchenName.current
    ) {
      console.log({
        kitchenName:
          kitchenName.first !== kitchenName.current
            ? kitchenName.current
            : false,
        menuChanges: Object.keys(changesObj).length ? changesObj : false,
      });

      axios
        .post(`/db/updatemenu`, {
          kitchenName:
            kitchenName.first !== kitchenName.current
              ? kitchenName.current
              : '',
          menuChanges: Object.keys(changesObj).length ? changesObj : false,
        })
        .then((res) => res.json())
        .then((res) => {
          // hope it worked ?
        })
        .catch((error) => {
          // handle error
          console.log('hit error response');
          console.log(error);
        })
        .then(() => {
          // always executed
          setChangesObj({});
          setKitchenName({
            ...kitchenName,
            first: kitchenName.current,
          });
        });
    } else console.log('no changes');
  };

  const addNewDish = () => {
    dishesArr[newDishNum] = {
      name: '',
      price: '',
      quantity: '',
      description: '',
    };
    setNewDishNum(newDishNum - 1);
  };
  const deleteDish = (id) => {
    // delete dish from state no matter what
    const tempDishes = { ...dishesArr };
    delete tempDishes[id];
    setDishesArr(tempDishes);

    const tempChanges = { ...changesObj };
    // if it's a pre-existing dish, we need to tell BE to delete it
    if (id > 0) {
      tempChanges[id] = {};
    }
    // if it's new (no id yet), we just remove it from changesobj
    else {
      delete tempChanges[id];
    }
    setChangesObj(tempChanges);
  };

  const dishesRender = [];
  for (let dish in dishesArr) {
    dishesRender.push(
      <Paper
        elevation={2}
        className={classes.dishRow + ' dishRow'}
        key={dish}
        id={dish}
      >
        <div className={classes.dishPre}>
          <TextField
            required
            variant='filled'
            defaultValue={dishesArr[dish].name}
            className={classes.dishName + ' dishName'}
            label='Dish Name'
            onChange={(e) => updateDishProp(dish, 'name', e.target.value)}
          />
          <div className={classes.dishStats}>
            <CurrencyTextField
              required
              currencySymbol='$'
              minimumValue='0'
              //   outputFormat='number'
              decimalCharacter='.'
              digitGroupSeparator=','
              defaultValue={dishesArr[dish].price}
              className={classes.dishStatItem + ' dishPrice'}
              //   InputProps={{
              //     startAdornment: (
              //       <InputAdornment position='start'>$</InputAdornment>
              //     ),
              //   }}
              label='Price'
              onChange={(e) => updateDishProp(dish, 'price', e.target.value)}
            />
            <TextField
              required
              type='number'
              defaultValue={dishesArr[dish].quantity}
              className={classes.dishStatItem + ' dishQty'}
              label='Qty'
              onChange={(e) => updateDishProp(dish, 'quantity', e.target.value)}
            />
            <Tooltip title='Delete Dish'>
              <IconButton
                onClick={() => {
                  deleteDish(dish);
                }}
              >
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <TextField
          defaultValue={dishesArr[dish].description}
          className={classes.dishDesc + ' dishDesc'}
          //   variant='filled'
          label='Extended description'
          multiline
          minRows={1}
          maxRows={3}
          onChange={(e) => updateDishProp(dish, 'description', e.target.value)}
        />
      </Paper>
    );
  }

  let kitchenNameElement;
  if (updatingKitchenName) {
    kitchenNameElement = (
      <div className={classes.kitchenNameContainer}>
        <TextField
          label='Kitchen Name'
          defaultValue={kitchenName.current}
          variant='filled'
          onChange={(e) =>
            setKitchenName({ ...kitchenName, current: e.target.value })
          }
        ></TextField>
        <Link
          to='#'
          onClick={() => {
            if (
              kitchenName.old !== kitchenName.current &&
              kitchenName.current !== ''
            ) {
              setKitchenName({ ...kitchenName, old: kitchenName.current });
            } else {
              setKitchenName({ ...kitchenName, current: kitchenName.old });
            }
            setUpdatingKitchenName(false);
          }}
        >
          Accept Change
        </Link>
        <Link
          to='#'
          onClick={() => {
            setKitchenName({ ...kitchenName, current: kitchenName.old });
            setUpdatingKitchenName(false);
          }}
        >
          Cancel
        </Link>
      </div>
    );
  } else {
    kitchenNameElement = (
      <div className={classes.kitchenNameContainer}>
        <h1>{kitchenName.current}</h1>
        <Link
          to='#'
          onClick={() => {
            setUpdatingKitchenName(true);
          }}
        >
          Edit Kitchen Name
        </Link>
      </div>
    );
  }

  //Return back to DOM
  return (
    <div className={classes.body}>
      <Paper>
        <form className={classes.form} onSubmit={submitChanges}>
          <div className={classes.menuContainer}>
            {kitchenNameElement}
            <div className={classes.dishesContainer}>{dishesRender}</div>
            <IconButton onClick={addNewDish}>
              <AddCircle /> {'New Dish'}
            </IconButton>
          </div>
          <div className={classes.submitContainer}>
            <Button type='submit' variant='contained' color='primary'>
              Submit All Kitchen Changes
            </Button>
          </div>
        </form>
      </Paper>
      <Outlet />
    </div>
  );
}
