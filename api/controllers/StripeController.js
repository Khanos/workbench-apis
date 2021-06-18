const path = require('path');
const env = require(`${path.resolve()}/config/env.json`);
const stripe = require('stripe')(env.stripe.secret_key);

module.exports = {
  index: (req, res) => {
    console.log(env)
    res.send('hello from stripe');
  }
}