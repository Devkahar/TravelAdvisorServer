const express = require('express');
const app = express();
require('dotenv').config();
const {connectDB} = require('./services/db');
const path = require('path');
connectDB();
const userRoute = require('./route/userRoute');
const reviewRoute = require('./route/reviewRoute');
const placeRoute = require('./route/placeRoute');
const cors = require('cors');
const port =  process.env.PORT || 5000;
app.use(express.json({limit: '50mb'}));
// app.use(cors());
const d = path.resolve();
// console.log(d);
app.use('/uploads', express.static(path.join(d, '/src/uploads')))
app.use('/api',userRoute);
app.use('/api',placeRoute);
app.use('/api',reviewRoute);
app.listen(port,()=>{
    console.log("Server is listning on port " + port);
});