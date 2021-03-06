var mongoose = require('mongoose')
var tourListSchema = new mongoose.Schema({
    destinationIds:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
    travelStyleIds:[{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelStyle' }],
    destinationId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    travelStyleId:{ type: mongoose.Schema.Types.ObjectId, ref: 'TravelStyle' },
    tourTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'TourType' },
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
    priceChild04:Number,
    priceChild48:Number,
    isUsed:Boolean,
    isPromotion:Boolean,
    tourIntros:[],
    star:Number,
    map:String,
    time:{},
    tourImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
});
var TourList =mongoose.model('TourList',tourListSchema,'tourlist');

module.exports = TourList;