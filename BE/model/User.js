const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
   
},{collection:'Users'})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;