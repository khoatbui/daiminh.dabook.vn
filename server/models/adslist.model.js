var mongoose = require('mongoose')
var adsListSchema = new mongoose.Schema({
    adsTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'AdsType' },
    adsCode: String,
    adsName: String,
    adsIntro: String,
    startDate:Date,
    endDate:Date,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    adsImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    adsImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    order:Number,
    keyword:String,
    isUsed:Boolean,
    isPromotion:Boolean,
    adsIntros:[],
    star:Number,
    link:String,
    linkMobile:String,
    startDate:Date,
    endDate:Date,
    ctaId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cta' },
    cta:{},
    isAds:Boolean
});
var AdsList =mongoose.model('AdsList',adsListSchema,'adslist');

module.exports = AdsList;