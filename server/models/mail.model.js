var mongoose = require('mongoose')

var mailSchema = new mongoose.Schema({
    supplierId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
    packageId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    price:Number,
    lang: String,
    note:String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date
});
var Mail =mongoose.model('Mail',mailSchema,'mail');

module.exports = Mail;