const express = require('express');
const router = express.Router()
const TwitterController = require('./controllers/TwitterController');
const LinkedinController = require('./controllers/LinkedinController');
const StripeController = require('./controllers/StripeController');
const GoogleController = require('./controllers/GoogleController');
const BlogController = require('./controllers/BlogController');
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
// Google Routes
router.get('/google/maps', GoogleController.maps);
// Blog Routes
router.get('/blog', BlogController.index);
router.post('/post', BlogController.createPost);
router.put('/post', BlogController.editPost);
router.delete('/post', BlogController.deletePost);
router.post('/comment', BlogController.createComment);
router.put('/comment', BlogController.editComment);
router.post('/like', BlogController.likePost);
router.post('/dislike', BlogController.dislikePost);

module.exports = router;