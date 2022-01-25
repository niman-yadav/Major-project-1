const express= require('express');

const app = express();
const userController = require('../controllers/users_controller.js');

const router = express.Router();

router.get('/profile' , userController.users_profile);

router.get('/sign-up' , userController.signUp);
router.get('/sign-in' , userController.signIn);

router.post('/create' , userController.create);
module.exports = router;