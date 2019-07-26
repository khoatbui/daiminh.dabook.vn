var BlogDetail = require('../models/blogdetail.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    BlogDetail.find().populate('blogId').then(function(blogdetail){
        res.send(blogdetail)
    })
};

module.exports.getmBlogDetailById=(req,res,next) => {
    BlogDetail.findOne({"blogId":req.params._id}).populate('blogId').then(function(blogdetail){
        res.send(blogdetail)
    })
};

module.exports.deleteBlogDetail= function (req, res) {
    BlogDetail.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertBlogDetail= function (req, res) {
    console.log('in')
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        BlogDetail.create(req.body, function (err, blogdetail) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(blogdetail)
        }
        })
};

module.exports.updateBlogDetail=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        BlogDetail.updateOne({ _id: req.params._id },{$set:req.body},(err, blogdetail) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(blogdetail);
                 res.status(200).send(blogdetail);
        }
     });
};

module.exports.getBlogDetailBySupplier=(req,res,next) => {
    BlogDetail.find({supplierId:req.params.index}).then(function(blogdetail){
        console.log(blogdetail);
        res.send(blogdetail)
    })
};

module.exports.getBlogDetailBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        BlogDetail.find({supplierId:supp._id}).then(function(blogdetail){
            res.send(blogdetail)
        })
    })
};

