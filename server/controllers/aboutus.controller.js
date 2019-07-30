var AboutUs = require('../models/aboutus.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    AboutUs.find().then(function(aboutUs){
        res.send(aboutUs)
    })
};

module.exports.getUsed =function(req,res){
    AboutUs.find({"isUsed":true}).then(function(aboutUs){
        res.send(aboutUs)
    })
};

module.exports.getmAboutUsById=(req,res,next) => {
    AboutUs.findOne({"_id":req.params._id}).then(function(aboutUs){
        res.send(aboutUs)
    })
};

module.exports.deleteAboutUs= function (req, res) {
    AboutUs.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertAboutUs= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        AboutUs.create(req.body, function (err, aboutUs) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(aboutUs)
        }
        })
};

module.exports.updateAboutUs=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        AboutUs.updateOne({ _id: req.params._id },{$set:req.body},(err, aboutUs) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(aboutUs);
                 res.status(200).send(aboutUs);
        }
     });
};

module.exports.getAboutUsBySupplier=(req,res,next) => {
    AboutUs.find({supplierId:req.params.index}).then(function(aboutUs){
        console.log(aboutUs);
        res.send(aboutUs)
    })
};

module.exports.getAboutUsBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        AboutUs.find({supplierId:supp._id}).then(function(aboutUs){
            res.send(aboutUs)
        })
    })
};

