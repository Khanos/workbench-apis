const path = require('path');
const env = require(`${path.resolve()}/config/env.json`);
const stripe = require('stripe')(env.stripe.secret_key);

module.exports = {
  index: (req, res) => {
    console.log('hello from stripe');
    return res.render('stripe/index.ejs', {
      stripepublickey: env.stripe.public_key
    });
  },
  checkout: (req, res) => {
    console.log('Response:', req.body)
    stripe.charges.create({
      amount: req.body.price,
      source: req.body.stripeTokenId,
      currency: 'usd'
    }).then(function(response){
      console.log('Payment successfully: ', response.receipt_url);
      return res.json({message: 'Payment successfully'})
    }).catch(function(err) {
      console.log('Payment fail')
      return res.status(500).end();
    });
  }
}