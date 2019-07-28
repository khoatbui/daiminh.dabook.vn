var mongoose = require('mongoose')
var hotelSchema = new mongoose.Schema({
    supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    cityId:{ type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    hotelCode: String,
    hotelName: String,
    star: Number,
    lang:String,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    isUsed:Boolean,
    isHot:Boolean,
    isPromote:Boolean,
    hotelImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    keyword:String,
    hotelIntro:String,
    hotelIntros:[]
});
var Hotel =mongoose.model('Hotel',hotelSchema,'hotel');

module.exports = Hotel;