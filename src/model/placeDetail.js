const mongoose = require('mongoose');

const placeDetailSchema = mongoose.Schema({
    placeID:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    review:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'PlaceReview'
        }
    ]
},{
    timestamps: true,
})


const Place = mongoose.model('Place', placeDetailSchema)

module.exports = Place;