var AreaCountry = require('../models/areacountry.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    AreaCountry.find().then(function(areaCountry){
        res.send(areaCountry)
    })
};

module.exports.getmAreaCountryById=(req,res,next) => {
    AreaCountry.findOne({"_id":req.params._id}).then(function(areaCountry){
        res.send(areaCountry)
    })
};

module.exports.deleteAreaCountry= function (req, res) {
    AreaCountry.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertAreaCountry= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        AreaCountry.create(req.body, function (err, areaCountry) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(areaCountry)
        }
        })
};

module.exports.updateAreaCountry=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        AreaCountry.updateOne({ _id: req.params._id },{$set:req.body},(err, areaCountry) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(areaCountry);
                 res.status(200).send(areaCountry);
        }
     });
};

module.exports.getAreaCountryBySupplier=(req,res,next) => {
    AreaCountry.find({supplierId:req.params.index}).then(function(areaCountry){
        console.log(areaCountry);
        res.send(areaCountry)
    })
};

module.exports.getAreaCountryBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        AreaCountry.find({supplierId:supp._id}).then(function(areaCountry){
            res.send(areaCountry)
        })
    })
};

