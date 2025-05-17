const express = require('express'); 
const router = express.Router(); 

const RoutesVinicius = require('./RoutesVinicius.js');

router.use('/', RoutesVinicius);

module.exports = router;