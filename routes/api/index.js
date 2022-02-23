const express = require('express');
const app = express();
const router = express.Router();

console.log('Router is working fine in apis');
router.use('/v1', require('./v1'));

module.exports = router;