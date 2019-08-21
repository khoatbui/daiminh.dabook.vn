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
module.exports.getmDestinationByCity = function(req,res){
    Destination.find({'isUsed':true,'cityId':req.params._id}).populate('cityId').then(function(destination){
        res.send(destination)
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
        Destination.updateOne({ _id: req.params._id },{$set:req.body},(err, destination) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(destination);
                 res.status(200).send(destination);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getDestinationBySupplier=(req,res,next) => {
    Destination.find({supplierId:req.params.index}).populate('cityId').then(function(destination){
        console.log(destination);
        res.send(destination)
    })
};
module.exports.getDestinationBySearrch=(req,res,next) => {
    Destination.find({isUsed:true}).populate('cityId').then(function(destination){
        var result=destination.filter(item =>{ 
            return xoa_dau(item.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.cityId.cityName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        res.send(result)
    })
};

module.exports.getDestinationBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).populate('cityId').then(function(supp){
        Destination.find({supplierId:supp._id}).then(function(destination){
            res.send(destination)
        })
    })
};

function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }