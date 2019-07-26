var mongoose = require('mongoose')
var blogDetailSchema = new mongoose.Schema({
    blogId:{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogList' },
    block01: String,
    block02: String,
    block03: String,
    block04:String,
    block05:String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    blogDetailImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    detailDocs:[{fileName:String,filePath:String,destination:String,size:Number}]
});
var BlogDetail =mongoose.model('BlogDetail',blogDetailSchema,'blogdetail');

module.exports = BlogDetail;