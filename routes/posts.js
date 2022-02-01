const express= require('express');
const app = express();
const passport = require('passport');
const postController = require('../controllers/posts_controller');

const router = express.Router();

router.post('/create' ,passport.checkAuthentication, postController.create );

module.exports = router;