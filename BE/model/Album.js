const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
   
    userId: {
        type: Number,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    lastUpdateDate: {
        type: String,
        required: true
    },
   
},{collection:'Album'})

const AlbumModel = mongoose.model('Album', AlbumSchema);

module.exports = AlbumModel;