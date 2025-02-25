const mongoose = require('mongoose')
require('dotenv').config();

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@flowtracker.zecsl.mongodb.net/`

const connectToMOngo = () =>{
    mongoose.connect(mongoURI).then(console.log('Connected to Mongo'))
    .catch((error)=>console.log(error.message));
}

module.exports= connectToMOngo;