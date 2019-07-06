var mongoose = require('mongoose')

var carDetailPriceSchema = new mongoose.Schema({
    supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'CarSupplier' },
    carTransTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'CarTransType' },
    tripCode:String,
    tripName:String,
    fromLocation: String,
    toLocation: String,
    kmTotal:Number,
    nightTotal:Boolean,
    isUsed:Boolean,
    lang:String,
    priceByCarType:[{
        carTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'CarType' },
        price: Number,
        markUpPercent: Number,
        markUpPlus: Number,
        isUsed:Boolean
    }],
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
    carDetailsImages:[{fileName:String,filePath:String,destination:String,size:Number}]
});
var CarDetailPrice =mongoose.model('CarDetailPrice',carDetailPriceSchema,'carDetailPrice');

module.exports = CarDetailPrice;