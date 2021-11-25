const User = require('../model/user');
const Place = require('../model/placeDetail');
const generateToken = require('../utils/generateToken');
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password,pic } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({message: 'User already exists'})
    }
    const user = await User.create({
      name,
      email,
      password,
      pic: '/uploads/'+pic,
    })
    try {
        if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              token: generateToken(user._id),
              pic: user.pic,
            })
        } 
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};

const loginUser = async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
            pic: user.pic,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400).json({message: 'Invaild Login Details'});
        
    }
    
};

const addToBucket = async (req, res) => {
    const placeID = req.body.placeID;
    const type = req.body.type;
    const _id = req.user.id;
    const resdata = await  Place.findOne({placeID : placeID});
        if(resdata){
              try {
                  const user = await User.updateOne({_id}, {$push: {bucketList: resdata._id}})
                  res.status(201).json({
                      message: 'Added Successfully'
                  })
              } catch (error) {
                console.log(error.message);
                res.status(401).json(error);
              }
        }else{
            const data = await getPlacesDetails(placeID,type);
            if(data){
                const placeData = await Place.create({placeID: locationID,name: data?.name,image: data?.photo.images.original.url});
                if(placeData){
                    try {
                        const user = await User.updateOne({_id}, {$push: {bucketList: placeData._id}})
                        res.status(201).json({
                            message: 'Added Successfully'
                        })
                    } catch (error) {
                      console.log(error.message);
                      res.status(401).json(error);
                    }
                }else{
                    res.status(401).json(error);
                }
            }
        }
}
module.exports = {
    registerUser,
    loginUser,
    addToBucket
}