const express = require('express');
const router = express.Router()
let TwitterController = require('./controllers/TwitterController');
// Twitter Routes
router.get('/twitter', TwitterController.index);
router.get('/twitter/getLogin', TwitterController.getLogin);

module.exports = router;