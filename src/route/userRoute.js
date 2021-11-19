const express = require('express');
const router = express.Router();
const {registerUser,loginUser, addToBucket} = require('../controller/user');
const {signInRequired} = require('../middleware/userMiddleware')
router.post('/user/signup/',registerUser);
router.post('/user/login/',loginUser);
router.post('/user/bucket/',signInRequired,addToBucket);
module.exports = router;
