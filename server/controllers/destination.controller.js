var Destination = require('../models/destination.model')
var Supplier=require('../models/supplier.model')
var City=require('../models/city.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    Destination.find().populate('cityId').then(function(destination){
        res.send(destination)
    })
};

module.exports.getUsed =function(req,res){
    Destination.find({'isUsed':true}).populate('cityId').then(function(destination){
        res.send(destination)
    })
};

module.exports.getmDestinationByAreaCountry =function(req,res){
    console.log(req.params._id);
    City.find({'areaCountryId':req.params._id}).then(function(pac){
        var tempArray=[];
        pac.forEach(element => {
        tempArray.push(element._id);
        tempArray.push(element._id);
        });
        Destination.find({'isUsed':true,"cityId": { $in: tempArray }}).populate('cityId').then(function(destination){
            console.log(destination);
            res.send(destination)
        })
    })
};

module.exports.getmTop10Destination =function(req,res){
    Destination.find().sort('order')
    .limit(10).populate('cityId').then(function(destination){
        res.send(destination)
    })
};

module.exports.getmDestinationById=(req,res,next) => {
    Destination.findOne({"_id":req.params._id}).populate('cityId').then(function(destination){
        res.send(destination)
    })
};

module.exports.deleteDestination= function (req, res) {
    Destination.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertDestination= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Destination.create(req.body, function (err, destination) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(destination)
        }
        })
};

module.exports.updateDestination=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        Destination.updateOne({ _id: req.params._id },{$set:req.body},(err, destination) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(destination);
                 res.status(200).send(destination);
        }
     });
};

module.exports.getDestinationBySupplier=(req,res,next) => {
    Destination.find({supplierId:req.params.index}).populate('cityId').then(function(destination){
        console.log(destination);
        res.send(destination)
    })
};

module.exports.getDestinationBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).populate('cityId').then(function(supp){
        Destination.find({supplierId:supp._id}).then(function(destination){
            res.send(destination)
        })
    })
};

