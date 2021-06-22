const path = require('path');
const env = require(`${path.resolve()}/config/env.json`);
const stripe = require('stripe')(env.stripe.secret_key);

module.exports = {
  createSession: async (objParams) => {
    try {
      const options = {
        success_url: objParams.success_url,
        cancel_url: objParams.cancel_url,
        payment_method_types: objParams.payment_method_types,
        line_items: [
          {
            price_data: {
              currency: objParams.currency,
              product_data: {
                name: objParams.productData || 'LookAtMe Services',
              },
              unit_amount: objParams.price
            },
            quantity: 1
          },
        ],
        mode: objParams.mode,
        locale: objParams.locale || 'en'
      }
      const session = await stripe.checkout.sessions.create(options);
      return { error: null, id: session.id }
    } catch (error) {
      return { error: error, id: null}
    }
  }
}