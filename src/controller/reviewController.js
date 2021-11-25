const PlaceReview = require('../model/review');
const Place = require('../model/placeDetail');
const {getPlacesDetails} = require('../utils/helper');
const User = require('../model/user');
const addReview = async (req, res) => {
    const _id = req.user.id;
    console.log(_id);
    const images = req.body.images;
    const body = req.body.body;
    const rating = req.body.rating;
    const locationID = req.body.locationID;
    const type = req.body.type;
    // console.log(locationID);
    if(body===''){
        res.status(401).json(error);
        return;
    }
    const imageData = [];
    images?.map((image, i) => {
        const str = '/uploads/' + image.filename;
        imageData.push(str);
    });
    const resdata = await  Place.findOne({placeID : locationID});
        if(resdata){
            try {
                const review = await PlaceReview.create({
                user: _id,
                images: imageData,
                body,
                rating: rating
            })
            if(review && await User.updateOne({_id},{ $push: {userReviews: review._id}}) && await Place.updateOne({_id: resdata._id},{$push:{"review": review._id}})){
                res.status(201).json(review);
            }else{
                console.log(error.message);
                res.status(401).json(error);
            }
            } catch (error){
                console.log(error.message);
                res.status(401).json(error);
            }   
        }else{
            const data = await getPlacesDetails(locationID,type);
            if(data){
                const placeData = await Place.create({placeID: locationID,name: data?.name,image: data?.photo?.images?.original?.url});
                if(placeData){
                    try {
                            const review = await PlaceReview.create({
                            user: _id,
                            images: imageData,
                            body,
                            rating: rating
                        })
                        if(review && await User.updateOne({_id},{ $push: {userReviews: review._id}}) && await Place.updateOne({_id: placeData._id},{$push:{"review": review._id}})){
                            res.status(201).json(review);
                        }else{
                            console.log(error.message);
                            res.status(401).json(error);
                        }
                       
                    } catch (error){
                        console.log(error.message);
                        res.status(401).json(error);
                    }
                    
                }else{
                    res.status(401).json(error);
                }
            }
        }
    
}

module.exports ={
    addReview,
}