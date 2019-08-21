var mongoose = require('mongoose')
var destinationSchema = new mongoose.Schema({
    cityId:{ type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    destinationCode: String,
    destinationName: String,
    destinationIntro: String,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    destinationImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    destinationImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    order:Number,
    keyword:String,
    isUsed:Boolean,
    isPromotion:Boolean,
    destinationIntros:[],
    map:String
});
var Destination =mongoose.model('Destination',destinationSchema,'destination');

module.exports = Destination;