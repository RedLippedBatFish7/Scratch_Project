const axios = require('axios');
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cooking from '../assets/cooking.jpg';
import Button from '@material-ui/core/Button';
import {
  Paper,
  TextField,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import AddCircle from '@mui/icons-material/AddCircle';
import MenuItemEdit from './MenuItemEdit';
import CuisineSelect from './CuisineSelect';
import { width } from '@mui/system';

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
    maxHeight: '85vh',
    justifyContent: 'space-between',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90%',
    overflowY: 'auto',
  },
  dishesContainer: {
    marginTop: '20px',
    backgroundColor: 'rgb(220,220,220)',
    // border: '10px solid gray',
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '80px',
  },
  kitchenUpper: {
    display: 'flex',
    flexDirection: 'column',
  },
  kitchenStats: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  addressFull: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    marginRight: '20px',
  },
  topAddress: {
    width: '100%',
  },
  leftAddress: {
    // width: '50%',
    marginRight: '10px',
  },
  rightAddress: {
    // width: '50%',
    marginLeft: '10px',
  },
  timeOps: {
    display: 'flex',
    flexDirection: 'column',
  },
  timeOpItem: {
    marginBottom: '15px',
  },
  activeKitchenName: {
    width: '50%',
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
  const [selectedCuisines, setSelectedCuisines] = useState(false);
  const [cuisinesUpdated, setCuisinesUpdated] = useState(false);
  const [kitchenName, setKitchenName] = useState({
    first: '',
    old: '',
    current: '',
  });

  const refresh = () => {
    // redirect if not a seller ? I don't think I need this
    console.log(props);
    if (props.userType !== 'seller') navigate('/');
    axios
      .post(`/db/getmenu/`, {
        userId: props.userId,
      })
      .then((res) => {
        res = res.data;
        console.log(res);
        const kname = res.kitchenName
          ? res.kitchenName
          : '{ EDIT THIS KITCHEN NAME }';
        setKitchenName({
          current: kname,
          old: kname,
          first: kname,
        });
        setDishesArr(res.dishes);
        setSelectedCuisines('Mexican, Italian'.split(', '));
        // setSelectedCuisines(res.cuisines.split(', '))
      })
      .catch((error) => {
        // handle error
        console.log('hit error response');
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  useEffect(() => {
    // run this first time the component mounts
    // later, we can use refresh to fetch again without remounting
    refresh();
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
      kitchenName.first !== kitchenName.current ||
      cuisinesUpdated === true
    ) {
      console.log({
        kitchenName:
          kitchenName.first !== kitchenName.current
            ? kitchenName.current
            : false,
        selectedCuisines: cuisinesUpdated ? selectedCuisines.join(', ') : false,
        menuChanges: Object.keys(changesObj).length ? changesObj : false,
      });

      axios
        .post(`/db/updatemenu`, {
          kitchenName:
            kitchenName.first !== kitchenName.current
              ? kitchenName.current
              : false,
          selectedCuisines: cuisinesUpdated
            ? selectedCuisines.join(', ')
            : false,
          menuChanges: Object.keys(changesObj).length ? changesObj : false,
        })
        .then((res) => res.json())
        .then((res) => {
          // refresh the page to perform another fetch
          // better yet, put useeffect stuff into a refresh function, and call it from useeffect
          // then call that here
        })
        .catch((error) => {
          // handle error
          console.log('hit error response');
          console.log(error);
        })
        .then(() => {
          // always executed
          refresh();
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
      <MenuItemEdit
        key={dish}
        dishId={dish}
        name={dishesArr[dish].name}
        price={dishesArr[dish].price}
        quantity={dishesArr[dish].quantity}
        description={dishesArr[dish].description}
        updateDish={updateDishProp}
        deleteDish={deleteDish}
      />
    );
  }

  // if we don't render selectedCuisines conditionally, it seems that it will render early
  // and because it uses useeffect to update its initial list, if it has no data the
  // first time it renders, it will not add anything
  const cuisineRender = [];
  if (!selectedCuisines === false) {
    cuisineRender.push(
      <CuisineSelect
        key='cuisineselect'
        selectedCuisines={selectedCuisines}
        setSelectedCuisines={setSelectedCuisines}
        setCuisinesUpdated={setCuisinesUpdated}
      />
    );
  }

  let kitchenNameElement;
  if (updatingKitchenName) {
    kitchenNameElement = (
      <div className={classes.kitchenNameContainer}>
        <TextField
          className={classes.activeKitchenName}
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
  const kitchenUpper = (
    <div className={classes.kitchenUpper}>
      {kitchenNameElement}
      <div className={classes.kitchenStats}>
        <h3 style={{ textAlign: 'center' }}>
          Cuisines In This Menu
          {cuisineRender}
        </h3>
        <div className={classes.timeOps}>
          <h3 style={{ textAlign: 'center' }}>Pickup Window</h3>
          <TextField
            className={classes.timeOpItem}
            label={'Start Pickup'}
            type={'time'}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className={classes.timeOpItem}
            label={'End Pickup'}
            type={'time'}
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className={classes.addressFull}>
          <h3 style={{ marginBottom: 0 }}>Pickup Address</h3>
          <span>
            <TextField label={'Address'} className={classes.topAddress} />
          </span>
          <span>
            <TextField label={'City'} className={classes.topAddress} />
          </span>
          <span>
            <TextField label={'State'} className={classes.leftAddress} />
            <TextField label={'Zip'} className={classes.rightAddress} />
          </span>
        </div>
      </div>
    </div>
  );

  //Return back to DOM
  return (
    <div className={classes.body}>
      <Paper>
        <form className={classes.form} onSubmit={submitChanges}>
          <div className={classes.menuContainer}>
            {kitchenUpper}
            <div className={classes.dishesContainer}>
              <h3 style={{ textAlign: 'center' }}>Menu Customization</h3>
              {dishesRender}
            </div>
          </div>
          <div className={classes.submitContainer}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label='Toggle Market Visibility'
            />
            <IconButton onClick={addNewDish}>
              <AddCircle /> {'New Dish'}
            </IconButton>
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
