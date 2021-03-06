const express = require('express');
const router = express.Router()
let TwitterController = require('./controllers/TwitterController');
let LinkedinController = require('./controllers/LinkedinController');
let StripeController = require('./controllers/StripeController');
// Twitter Routes
router.get('/twitter', TwitterController.index);
router.get('/twitter/getLogin', TwitterController.getLogin);
router.get('/twitter/callback', TwitterController.callback);
router.get('/twitter/getAdsAccounts', TwitterController.getAdsAccounts);
// Linkedin Routes
router.get('/linkedin', LinkedinController.index);
router.get('/linkedin/getLogin', LinkedinController.getLogin);
router.get('/linkedin/getLoginId', LinkedinController.getLoginId);
router.get('/linkedin/getTokenInfo', LinkedinController.getTokenInfo);
router.get('/linkedin/callback', LinkedinController.callback);
// Stripe Routes
router.get('/stripe', StripeController.index);
router.post('/stripe/checkout', StripeController.checkout);

module.exports = router;