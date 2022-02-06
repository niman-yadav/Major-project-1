const express= require('express');
const app = express();
const passport = require('passport');
const commentController = require('../controllers/comments_controller');

const router = express.Router();

router.post('/create' ,passport.checkAuthentication, commentController.create );
router.get('/destroy/:id' , passport.checkAuthentication , commentController.destroy);
module.exports = router;