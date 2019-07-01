var HotelOrder = require('../models/hotelorder.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
module.exports.index =function(req,res){
    res.setHeader('Cache-Control', 'private');
    res.cookie('__session', "sessionCookie");
    HotelOrder.find().populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};

module.exports.getHotelOrder=(req,res,next) => {
    res.cookie('__session', "sessionCookie");
    HotelOrder.find().populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};

module.exports.getHotelOrderByTransactionCode=(req,res,next) => {
    res.cookie('__session', "sessionCookie");
    HotelOrder.findOne({'transactionCode':req.params._id}).populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};


module.exports.deleteHotelOrder= function (req, res) {
    HotelOrder.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertHotelOrder= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        HotelOrder.create(req.body, function (err, hotel) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(hotel)
        }
        })
};

module.exports.updateHotelOrder=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        HotelOrder.updateOne({ _id: req.params._id },{$set:req.body},(err, hotel) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(hotel);
                 res.status(200).send(hotel);
        }
     });
};

module.exports.getHotelOrderBySupplier=(req,res,next) => {
    HotelOrder.find({supplierId:req.params.index,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};

module.exports.getHotelOrderBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        HotelOrder.find({supplierId:supp._id,isUsed:true}).then(function(hotel){
            res.send(hotel)
        })
    })
};

module.exports.getPromoteHotelOrderBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        HotelOrder.find({supplierId:supp._id,isPromote:true}).then(function(hotel){
            console.log(hotel);
            res.send(hotel)
        })
    })
};


module.exports.getmListHotelOrderWithPromotion=(req,res,next) => {
    HotelOrder.find({isPromote:true,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmListHotelOrder=(req,res,next) => {
    HotelOrder.find({isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmListHotelOrderPromotionBySupplier=(req,res,next) => {
    HotelOrder.find({supplierId:req.params._id,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};