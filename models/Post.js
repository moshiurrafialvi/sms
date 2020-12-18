const mongoose = require("mongoose");
var Post = mongoose.model('Post',
{
    title : {type:String},
    message : {type:String},
},'post')

module.exports = { Post}