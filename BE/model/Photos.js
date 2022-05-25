const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
   
    albumId: {
        type: Number,
        required: true
    },
    userId:{
        type:Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl:{
        type:String,
        required:true
    }
   
},{collection:'Photos'})

const PhotosModel = mongoose.model('Photos', PhotoSchema);

module.exports = PhotosModel;