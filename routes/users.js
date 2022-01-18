const express= require('express');

const app = express();
const userController = require('../controllers/users_controller.js');

const router = express.Router();

router.get('/profile' , userController.users_profile);

module.exports = router;