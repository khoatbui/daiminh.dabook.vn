var mongoose = require('mongoose')
var pricePackageSchema = new mongoose.Schema({
    pricePackageCode: String,
    pricePackageName: String,
    pricePackageIntro: String,
    pricePackageIntros:[],
    lang:String,
    pricePackageImages:[{fileName:String,filePath:String,destination:String,size:Number}],
    pricePackageImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
    prices:[{
        isRequired:Boolean,
        groupCode:String,
        selectType:String,
        priceTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'PriceType' },
        startDate:Date,
        endDate:Date,
        netPrice:Number,
        unitTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'UnitType' },
        commission:{
            commission:Number,
            commissionType:String},
        order:Number,
    }],
    isUsed:Boolean,
    isPromotion:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
});
var PricePackage =mongoose.model('PricePackage',pricePackageSchema,'pricePackage');

module.exports = PricePackage;