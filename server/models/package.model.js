var mongoose = require('mongoose')

var pakageSchema = new mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    packageCode:String,
    packageName:String,
    price:Number,
    lang: String,
    note:String,
    isUsed:Boolean,
    createBy:String,
    createDate:Date,
    modifyBy:String,
    modifyDate:Date,
    packageIntro:String,
    packageIntros:[],
    packageImagesWebp:[{fileName:String,filePath:String,destination:String,size:Number}],
});
var Package =mongoose.model('Package',pakageSchema,'package');

module.exports = Package;