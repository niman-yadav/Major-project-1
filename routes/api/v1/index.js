const express = require('express');
const app = express();
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/postsApi')
console.log('Router is working fine in apis');
router.get('/posts', postsApi.index);
router.delete('/posts/:id', postsApi.destroy);
module.exports = router;