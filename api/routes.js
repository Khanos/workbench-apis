const express = require('express');
const router = express.Router()
let TwitterController = require('./controllers/TwitterController');
let LinkedinController = require('./controllers/LinkedinController');
// Twitter Routes
router.get('/twitter', TwitterController.index);
router.get('/twitter/getLogin', TwitterController.getLogin);

// Linkedin Routes
router.get('/linkedin', LinkedinController.index);
router.get('/linkedin/getLogin', LinkedinController.getLogin);
router.get('/linkedin/getTokenInfo', LinkedinController.getTokenInfo);
router.get('/linkedin/callback', LinkedinController.callback);

module.exports = router;