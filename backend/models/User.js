const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    name:{type : String , required : false},
    age:{type: Number , required: false},
    email:{type : String , required : false},
    password :{type : String , required : false},
    confirmPassword :{type : String , required : false}
});
module.exports = mongoose.models.user || mongoose.model("user",userSchema);