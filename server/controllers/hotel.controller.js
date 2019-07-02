var Hotel = require('../models/hotels.model')
var Supplier=require('../models/supplier.model')
var UploadController=require('../controllers/upload.controller')
var mongoose = require('mongoose');
module.exports.index =function(req,res){
    res.setHeader('Cache-Control', 'private');
    res.cookie('__session', "sessionCookie");
    Hotel.find().populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};

module.exports.getHotel=(req,res,next) => {
    res.cookie('__session', "sessionCookie");
    Hotel.find().populate('supplierId').populate('cityId').then(function(hotel){
        res.send(hotel)
    })
};

module.exports.deleteHotel= function (req, res) {
    Hotel.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertHotel= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Hotel.create(req.body, function (err, hotel) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(hotel)
        }
        })
};

module.exports.updateHotel=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        Hotel.updateOne({ _id: req.params._id },{$set:req.body},(err, hotel) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(hotel);
                 res.status(200).send(hotel);
        }
     });
};

module.exports.getHotelBySupplier=(req,res,next) => {
    Hotel.find({supplierId:req.params.index,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};

module.exports.getHotelBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Hotel.find({supplierId:supp._id,isUsed:true}).then(function(hotel){
            res.send(hotel)
        })
    })
};

module.exports.getPromoteHotelBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Hotel.find({supplierId:supp._id,isPromote:true}).then(function(hotel){
            console.log(hotel);
            res.send(hotel)
        })
    })
};


module.exports.getmListHotelWithPromotion=(req,res,next) => {
    Hotel.find({isPromote:true,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmListHotel=(req,res,next) => {
    Hotel.find({isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};
module.exports.getmListHotelPromotionBySupplier=(req,res,next) => {
    Hotel.find({supplierId:req.params._id,isUsed:true}).then(function(hotel){
        console.log(hotel);
        res.send(hotel)
    })
};