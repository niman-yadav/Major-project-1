const express = require('express');

const app = express();
const homeController = require('../controllers/home_controller.js');

const router = express.Router();

console.log('Router is working fine');
router.get('/' , homeController.home );
router.use('/users' , require('./users.js'));
module.exports = router;
