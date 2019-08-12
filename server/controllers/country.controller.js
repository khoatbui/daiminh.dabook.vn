var Country = require('../models/country.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    Country.find().populate('areaId').then(function(country){
        res.send(country)
    })
};

module.exports.getmCountryById=(req,res,next) => {
    Country.findOne({"_id":req.params._id}).populate('areaId').then(function(country){
        res.send(country)
    })
};

module.exports.deleteCountry= function (req, res) {
    Country.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertCountry= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Country.create(req.body, function (err, country) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(country)
        }
        })
};

module.exports.updateCountry=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        Country.updateOne({ _id: req.params._id },{$set:req.body},(err, country) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(country);
                 res.status(200).send(country);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getCountryBySupplier=(req,res,next) => {
    Country.find({supplierId:req.params.index}).populate('areaId').then(function(country){
        console.log(country);
        res.send(country)
    })
};

module.exports.getCountryBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Country.find({supplierId:supp._id}).populate('areaId').then(function(country){
            res.send(country)
        })
    })
};

