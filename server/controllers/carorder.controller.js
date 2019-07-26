var CarOrder = require('../models/carorder.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
module.exports.index =function(req,res){
    res.setHeader('Cache-Control', 'private');
    res.cookie('__session', "sessionCookie");
    CarOrder.find().populate('supplierId').populate('cityId').then(function(car){
        res.send(car)
    })
};

module.exports.getCarOrder=(req,res,next) => {
    res.cookie('__session', "sessionCookie");
    CarOrder.find().populate('supplierId').populate('cityId').then(function(car){
        res.send(car)
    })
};

module.exports.getCarOrderByTransactionCode=(req,res,next) => {
    res.cookie('__session', "sessionCookie");
    CarOrder.findOne({'transactionCode':req.params._id}).populate('supplierId').populate('cityId').then(function(car){
        res.send(car)
    })
};


module.exports.deleteCarOrder= function (req, res) {
    CarOrder.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertCarOrder= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        CarOrder.create(req.body, function (err, car) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(car)
        }
        })
};

module.exports.updateCarOrder=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        CarOrder.updateOne({ _id: req.params._id },{$set:req.body},(err, car) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(car);
                 res.status(200).send(car);
        }
     });
};

module.exports.getCarOrderBySupplier=(req,res,next) => {
    CarOrder.find({supplierId:req.params.index,isUsed:true}).then(function(car){
        console.log(car);
        res.send(car)
    })
};

module.exports.getCarOrderBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        CarOrder.find({supplierId:supp._id,isUsed:true}).then(function(car){
            res.send(car)
        })
    })
};

module.exports.getPromoteCarOrderBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        CarOrder.find({supplierId:supp._id,isPromote:true}).then(function(car){
            console.log(car);
            res.send(car)
        })
    })
};


module.exports.getmListCarOrderWithPromotion=(req,res,next) => {
    CarOrder.find({isPromote:true,isUsed:true}).then(function(car){
        console.log(car);
        res.send(car)
    })
};
module.exports.getmListCarOrder=(req,res,next) => {
    CarOrder.find({isUsed:true}).then(function(car){
        console.log(car);
        res.send(car)
    })
};
module.exports.getmListCarOrderPromotionBySupplier=(req,res,next) => {
    CarOrder.find({supplierId:req.params._id,isUsed:true}).then(function(car){
        console.log(car);
        res.send(car)
    })
};