const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    placeID: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    body:{
        type: String,
        required: true,
    },
    images:[
        {
            type: String
        }
    ],
    rating:{
        type: Number,
        required: true,
    },
},{
    timestamps: true,
})
const PlaceReview = mongoose.model('PlaceReview', reviewSchema);

module.exports = PlaceReview;