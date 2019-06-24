var mongoose = require('mongoose')

var pakageHotelRELSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
    roomTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType' },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
    price: Number,
    less4Price: Number,
    less12Price: Number,
    more12Price: Number,
    lang: String,
    note: String,
    isUsed: Boolean,
    isDefault: Boolean,
    startDate: Date,
    endDate: Date,
    markUpPlus: Number,
    markUpPercent: Number,
    priceRanges: [{
        price: Number,
        markUpPercent: Number,
        markUpPlus: Number,
        less4Price: Number,
        less12Price: Number,
        more12Price: Number,
        startDate: Date,
        endDate: Date, isUsed: Boolean
    }],
    optionServices: [{
        optionPrice: Number,
        optionServiceCode: String,
        optionServiceName: String,
        optionNote: String,
        isUsed: Boolean
    }],
    maxAdult: Number,
    createBy: String,
    createDate: Date,
    modifyBy: String,
    modifyDate: Date
});
var PackageHotelREL = mongoose.model('PackageHotelREL', pakageHotelRELSchema, 'packageHotelREL');

module.exports = PackageHotelREL;