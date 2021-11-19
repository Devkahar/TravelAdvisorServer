const path = require('path');
const express = require('express'); 
const  multer = require('multer');
const router = express.Router();
const { addReview } = require('../controller/reviewController')
const {signInRequired} = require('../middleware/userMiddleware')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        const p = `${Date.now()}-${file.originalname}`;
      cb(null, p)
    }
})
const upload = multer({ storage });

router.post('/uploadImages', upload.array('image'), (req, res) =>{
    // console.log(req.files);
    res.json(req.files);
})
router.post('/uploadImage', upload.single('image'), (req, res) =>{
  res.json(req.file);
})
router.post('/addReview',signInRequired,addReview);



module.exports = router;