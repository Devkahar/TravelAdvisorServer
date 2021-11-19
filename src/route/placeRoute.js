const express = require('express');
const router = express.Router();
const {placeReview} = require('../controller/placeController');

router.post('/place/reviews/',placeReview);

module.exports = router;
