var mongoose = require('mongoose')
var tourListSchema = new mongoose.Schema({
    destinationId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    travelStyleId:{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelStyle' },
    tourCode: String,
    tourName: String,
    tourIntro: String,
    from:String,
    to:String,
    startDate:Date,
    endDate:Date,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    tourImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    order:Number,
    keyword:String,
    voteStatus:String,
    voteScore:String,
    discount:Number,
    price:Number,
    isUsed:Boolean,
    isPromotion:Boolean,
    tourIntros:[]
});
var TourList =mongoose.model('TourList',tourListSchema,'tourlist');

module.exports = TourList;