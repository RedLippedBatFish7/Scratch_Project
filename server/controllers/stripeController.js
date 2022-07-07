const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const db = require('../../database/pg_model.js');


const stripeController = async (req, res, next) => {
    // Destructure what was sent in the request body
    const { dishId, quantity } = req.body
    // Store dishId in an array
    dish_id = [dishId]
    sqlDishQuery = `select * from public.dishes where pk_dish_id = $1`
    try {
      dishData = await db.query(sqlDishQuery, dish_id)
      data = dishData.rows[0]
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{
           price_data: {
            currency: "usd",
            product_data: {
              name: data.dish_name
            },
            // Price comes with a $ sign, this is why we used slice. Stripe takes price in cents thus *100
            unit_amount: Number(data.price.slice(1)*100)
          },
          quantity: quantity
        }],
        success_url: 'http://www.google.com',
        cancel_url: 'http://www.google.com',
      })
      res.locals.session = session
      return next()
    } catch (error) {
      return next(error)
    }
  }

  module.exports = stripeController;