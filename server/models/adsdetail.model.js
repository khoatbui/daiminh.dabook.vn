var mongoose = require('mongoose')
var adsDetailSchema = new mongoose.Schema({
    adsId:{ type: mongoose.Schema.Types.ObjectId, ref: 'AdsList' },
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
    adsDetailImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    adsDetailImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    isUsed:Boolean,
    detailDocs:[{fileName:String,filePath:String,destination:String,size:Number}]
});
var AdsDetail =mongoose.model('AdsDetail',adsDetailSchema,'adsdetail');

module.exports = AdsDetail;