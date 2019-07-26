var BlogType = require('../models/blogtype.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    BlogType.find().then(function(blogType){
        res.send(blogType)
    })
};

module.exports.getmBlogTypeById=(req,res,next) => {
    BlogType.findOne({"_id":req.params._id}).then(function(blogType){
        res.send(blogType)
    })
};

module.exports.deleteBlogType= function (req, res) {
    BlogType.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertBlogType= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        BlogType.create(req.body, function (err, blogType) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(blogType)
        }
        })
};

module.exports.updateBlogType=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        BlogType.updateOne({ _id: req.params._id },{$set:req.body},(err, blogType) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(blogType);
                 res.status(200).send(blogType);
        }
     });
};

module.exports.getBlogTypeBySupplier=(req,res,next) => {
    BlogType.find({supplierId:req.params.index}).then(function(blogType){
        console.log(blogType);
        res.send(blogType)
    })
};

module.exports.getBlogTypeBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        BlogType.find({supplierId:supp._id}).then(function(blogType){
            res.send(blogType)
        })
    })
};

