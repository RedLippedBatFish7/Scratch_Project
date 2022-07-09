const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const db = require('../../database/pg_model.js');

const stripeController = async (req, res, next) => {
  // Destructure what was sent in the request body
  const { dishes } = req.body;
  // dishes will be an object

  const lineItemsArr = [];
  for (let dishId in dishes) {
    // get price for each dish
    const params = [dishId];
    sqlDishQuery = `select * from public.dishes where pk_dish_id = $1`;
    dishData = await db.query(sqlDishQuery, params);

    const newItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: dishes[dishId].name,
        },
        // Price comes with a $ sign, this is why we used slice. Stripe takes price in cents thus *100
        unit_amount: Number(dishData.rows[0].price.slice(1) * 100),
      },
      quantity: dishes[dishId].quantity,
    };
    lineItemsArr.push(newItem);
  }
  console.log(
    '---------------------------------------------------------------------------------------'
  );
  console.log(lineItemsArr);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItemsArr,
      success_url: 'http://localhost:8080/',
      cancel_url: 'http://www.google.com',
    });
    res.locals.session = session;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = stripeController;
