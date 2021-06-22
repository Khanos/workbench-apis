const path = require('path');
const env = require(`${path.resolve()}/config/env.json`);
const StripeService = require('../services/StripeService');

module.exports = {
  index: (req, res) => {
    console.log('hello from stripe');
    return res.render('stripe/index.ejs', {
      stripepublickey: env.stripe.public_key
    });
  },
  checkout: async (req, res) => {
    console.log('Response:', req.body);
    const options = {
      success_url: `${decodeURIComponent(req.body.sourceUrl)}?status=success`,
      cancel_url: `${decodeURIComponent(req.body.sourceUrl)}?status=cancel`,
      payment_method_types: ['card'],
      currency: 'usd',
      productData: 'LookAtMe Services',
      price: req.body.price,
      mode: 'payment',
      locale: 'en'
    }
    const session = await StripeService.createSession(options);
    if(session.error){
      return res.status(500).end();
    }
    return res.json({ id: session.id });
  }
}