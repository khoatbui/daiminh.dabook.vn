var TourOrder = require('../models/tourorder.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
module.exports.index =function(req,res){
    res.setHeader('Cache-Control', 'private');
    res.cookie('__session', "sessionCookie");
    TourOrder.find().populate('supplierId').populate('cityId').then(function(tour){
        res.send(tour)
    })
};
module.exports.getUsed =function(req,res){
    res.setHeader('Cache-Control', 'private');
    res.cookie('__session', "sessionCookie");
    TourOrder.find({"isUsed":true}).populate('supplierId').populate('cityId').then(function(tour){
        res.send(tour)
    })
};

module.exports.getTourOrder=(req,res,next) => {
    res.cookie('__session', "sessionCookie");
    TourOrder.find().populate('supplierId').populate('cityId').then(function(tour){
        res.send(tour)
    })
};

module.exports.getTourOrderByTransactionCode=(req,res,next) => {
    res.cookie('__session', "sessionCookie");
    TourOrder.findOne({'transactionCode':req.params._id}).populate('supplierId').populate('cityId').then(function(tour){
        res.send(tour)
    })
};


module.exports.deleteTourOrder= function (req, res) {
    TourOrder.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertTourOrder= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        TourOrder.create(req.body, function (err, tour) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(tour)
        }
        })
};

module.exports.updateTourOrder=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        TourOrder.updateOne({ _id: req.params._id },{$set:req.body},(err, tour) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(tour);
                 res.status(200).send(tour);
        }
     });
};

module.exports.getTourOrderBySupplier=(req,res,next) => {
    TourOrder.find({supplierId:req.params.index,isUsed:true}).then(function(tour){
        console.log(tour);
        res.send(tour)
    })
};

module.exports.getTourOrderBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        TourOrder.find({supplierId:supp._id,isUsed:true}).then(function(tour){
            res.send(tour)
        })
    })
};

module.exports.getPromoteTourOrderBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        TourOrder.find({supplierId:supp._id,isPromote:true}).then(function(tour){
            console.log(tour);
            res.send(tour)
        })
    })
};


module.exports.getmListTourOrderWithPromotion=(req,res,next) => {
    TourOrder.find({isPromote:true,isUsed:true}).then(function(tour){
        console.log(tour);
        res.send(tour)
    })
};
module.exports.getmListTourOrder=(req,res,next) => {
    TourOrder.find({isUsed:true}).then(function(tour){
        console.log(tour);
        res.send(tour)
    })
};
module.exports.getmListTourOrderPromotionBySupplier=(req,res,next) => {
    TourOrder.find({supplierId:req.params._id,isUsed:true}).then(function(tour){
        console.log(tour);
        res.send(tour)
    })
};