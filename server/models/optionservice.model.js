var mongoose = require('mongoose')

var optionServiceSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    roomTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
    optionServiceCode:String,
    optionServiceName:String,
    price:Number,
    lang: String,
    note:String,
    isUsed:Boolean,
    serviceList: [{
        optionServiceCode: String,
        optionServiceName: String,
        price:Number,
        markUpPlus: Number,
        markUpPercent:Number,
        note:String,
        isUsed: Boolean
    }],
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var OptionService =mongoose.model('OptionService',optionServiceSchema,'optionService');

module.exports = OptionService;