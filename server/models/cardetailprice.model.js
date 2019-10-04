var mongoose = require('mongoose')

var carDetailPriceSchema = new mongoose.Schema({
    cityId:{ type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'CarSupplier' },
    carTransTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'CarTransType' },
    tripCode:String,
    tripName:String,
    tripIntro:String,
    fromLocation: String,
    toLocation: String,
    kmTotal:Number,
    nightTotal:Number,
    isUsed:Boolean,
    isPromotion:Boolean,
    smallPrice:Number,
    lang:String,
    priceByCarType:[{
        carTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'CarType' },
        price: Number,
        markUpPercent: Number,
        markUpPlus: Number,
        isUsed:Boolean,
        isPromotion:Boolean,
        carTypeName:String,
        seatNumber: Number,
        carTypeIntro: String,
        carImages:[]
    }],
  tripImages: [
    { fileName: String, filePath: String, destination: String, size: Number }
  ],
  tripImagesWebp: [
    { fileName: String, filePath: String, destination: String, size: Number }
  ],
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    optionServices:[{
        optionPrice: Number,
        optionServiceCode: String,
        optionServiceName: String,
        optionNote: String,
        isUsed: Boolean
    }],
    carDetailsImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    tripIntros:[],
    map:String
});
var CarDetailPrice =mongoose.model('CarDetailPrice',carDetailPriceSchema,'carDetailPrice');

module.exports = CarDetailPrice;