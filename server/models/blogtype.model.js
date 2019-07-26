var mongoose = require('mongoose')
var blogTypeSchema = new mongoose.Schema({
    blogTypeCode: String,
    blogTypeName: String,
    blogTypeNameEN: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    blogTypeImages:[{fileName:String,filePath:String,destination:String,size:Number}]
});
var BlogType =mongoose.model('BlogType',blogTypeSchema,'blogType');

module.exports = BlogType;