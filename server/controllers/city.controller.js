var City = require('../models/city.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    City.find().populate('countryId').then(function(city){
        res.send(city)
    })
};

module.exports.getmCityById=(req,res,next) => {
    City.findOne({"_id":req.params._id}).populate('countryId').then(function(city){
        res.send(city)
    })
};

module.exports.deleteCity= function (req, res) {
    City.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertCity= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        City.create(req.body, function (err, city) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(city)
        }
        })
};

module.exports.updateCity=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        City.updateOne({ _id: req.params._id },{$set:req.body},(err, city) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(city);
                 res.status(200).send(city);
        }
     });
};

module.exports.getCityBySupplier=(req,res,next) => {
    City.find({supplierId:req.params.index}).populate('countryId').then(function(city){
        console.log(city);
        res.send(city)
    })
};

module.exports.getCityBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).populate('countryId').then(function(supp){
        City.find({supplierId:supp._id}).then(function(city){
            res.send(city)
        })
    })
};

