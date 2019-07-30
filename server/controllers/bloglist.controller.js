var BlogList = require('../models/bloglist.model')
var Supplier=require('../models/supplier.model')
var Destination=require('../models/destination.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    BlogList.find().populate('destinationId').populate('travelStyleId').populate('blogTypeId').then(function(bloglist){
        res.send(bloglist)
    })
};


module.exports.getmAllBlogPromotion =function(req,res){
    BlogList.find({"isPromotion":true,"isUsed":true}).populate('destinationId').populate('travelStyleId').populate('travelServiceId').populate('miceId').populate('blogTypeId').then(function(bloglist){
        res.send(bloglist)
    })
};

module.exports.getmAllBlog =function(req,res){
    BlogList.find({"isUsed":true}).populate('destinationId').populate('travelStyleId').populate('travelServiceId').populate('miceId').populate('blogTypeId').then(function(bloglist){
        res.send(bloglist)
    })
};
module.exports.getmAllBlogByCity =function(req,res){
    var des=[];
    Destination.find({'cityId':req.params._id}).then(function(pac){
        pac.forEach(element => {
            des.push(element._id)
        });
    })
    BlogList.find({"isUsed":true,'destinationId':{ $in : des }}).populate('destinationId').populate('travelStyleId').populate('travelServiceId').populate('miceId').populate('blogTypeId').then(function(bloglist){
        res.send(bloglist)
    })
};
module.exports.getmAllBlogBySearch =function(req,res){
    BlogList.find({"isUsed":true}).populate('destinationId').populate('travelStyleId').populate('travelServiceId').populate('miceId').populate('blogTypeId').then(function(pac){
        var result=pac.filter(item =>{ 
            return xoa_dau(item.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationId.destinationName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.destinationId.destinationCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.travelStyleId.travelStyleName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.travelStyleId.travelStyleCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.blogTypeId.blogTypeName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.blogTypeId.blogTypeCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.blogCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.blogName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        res.send(result)
    })
};

module.exports.getmTop10AllBlogPromotion =function(req,res){
    BlogList.find({"isPromotion":true,"isUsed":true}).limit(10).populate('destinationId').populate('travelServiceId').populate('miceId').populate('travelStyleId').populate('blogTypeId').then(function(bloglist){
        res.send(bloglist)
    })
};

module.exports.getmBlogListById=(req,res,next) => {
    BlogList.findOne({"_id":req.params._id}).populate('destinationId').populate('travelStyleId').populate('blogTypeId').then(function(bloglist){
        res.send(bloglist)
    })
};

module.exports.deleteBlogList= function (req, res) {
    BlogList.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertBlogList= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
    console.log(req.body);
        BlogList.create(req.body, function (err, bloglist) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(bloglist)
        }
        })
};

module.exports.updateBlogList=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        BlogList.updateOne({ _id: req.params._id },{$set:req.body},(err, bloglist) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(bloglist);
                 res.status(200).send(bloglist);
        }
     });
};

module.exports.getBlogListBySupplier=(req,res,next) => {
    BlogList.find({supplierId:req.params.index}).populate('destinationId').populate('travelStyleId').populate('blogTypeId').then(function(bloglist){
        console.log(bloglist);
        res.send(bloglist)
    })
};

module.exports.getBlogListBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).populate('destinationId').populate('travelStyleId').populate('blogTypeId').then(function(supp){
        BlogList.find({supplierId:supp._id}).then(function(bloglist){
            res.send(bloglist)
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