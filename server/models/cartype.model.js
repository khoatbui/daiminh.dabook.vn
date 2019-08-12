var mongoose = require('mongoose')

var carTypeSchema = new mongoose.Schema({
    supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'CarSupplier' },
    carTypeCode:String,
    carTypeName:String,
    seatNumber: Number,
    carTypeIntro: String,
    carTypeIntros:[],
    lang: String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    carImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    carImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
});
var CarType =mongoose.model('CarType',carTypeSchema,'carType');

module.exports = CarType;