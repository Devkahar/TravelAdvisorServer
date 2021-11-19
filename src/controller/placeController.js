const Place = require('../model/placeDetail');

const placeReview = async (req, res) => {
    let placeID = req.body.placeID;
    const place = await Place.findOne({placeID: placeID}).populate({path: 'review', populate:{path: 'user',model: 'User'}});
    console.log(place?.review);
    if(place){
        res.status(200).json(place);
    }
}




module.exports ={
    placeReview,
}