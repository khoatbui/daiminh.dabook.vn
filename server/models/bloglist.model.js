var mongoose = require('mongoose')
var blogListSchema = new mongoose.Schema({
    blogTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogType' },
    blogCode: String,
    blogName: String,
    blogIntro: String,
    startDate:Date,
    endDate:Date,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    blogImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    order:Number,
    keyword:String,
    isUsed:Boolean,
    isPromotion:Boolean,
    blogIntros:[],
    star:Number,
    link:String,
    travelStyleId:{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelStyle' },
    travelServiceId:{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelService' },
    miceId:{ type: mongoose.Schema.Types.ObjectId, ref: 'MICE' },
    aboutUsId:{ type: mongoose.Schema.Types.ObjectId, ref: 'AboutUs' }
});
var BlogList =mongoose.model('BlogList',blogListSchema,'bloglist');

module.exports = BlogList;