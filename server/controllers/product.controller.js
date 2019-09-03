var Product = require('../models/product.model')
var Supplier=require('../models/supplier.model')
var UploadController=require('../controllers/upload.controller')
var mongoose = require('mongoose');
module.exports.index =function(req,res){
    Product.find().then(function(product){
        res.send(product)
    })
};

module.exports.getUsed =function(req,res){
    Product.find({"isUsed":true}).then(function(product){
        res.send(product)
    })
};

module.exports.getProduct=(req,res,next) => {
    Product.find().then(function(product){
        res.send(product)
    })
};

module.exports.deleteProduct= function (req, res) {
    Product.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertProduct= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        Product.create(req.body, function (err, product) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(product)
        }
        })
};

module.exports.updateProduct=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        Product.updateOne({ _id: req.params._id },{$set:req.body},(err, product) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(product);
                 res.status(200).send(product);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getProductBySupplier=(req,res,next) => {
    Product.find({supplierId:req.params.index,isUsed:true}).then(function(product){
        console.log(product);
        res.send(product)
    })
};

module.exports.getProductBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Product.find({supplierId:supp._id,isUsed:true}).then(function(product){
            res.send(product)
        })
    })
};

module.exports.getPromoteProductBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        Product.find({supplierId:supp._id,isPromote:true}).then(function(product){
            console.log(product);
            res.send(product)
        })
    })
};


module.exports.getmListProductWithPromotion=(req,res,next) => {
    Product.find({isPromote:true,isUsed:true}).then(function(product){
        console.log(product);
        res.send(product)
    })
};
module.exports.getmProductById=(req,res,next) => {
    Product.findOne({'_id':req.params._id,isUsed:true}).then(function(product){
        console.log(product);
        res.send(product)
    })
};
module.exports.getmListProduct=(req,res,next) => {
    Product.find({isUsed:true}).then(function(product){
        console.log(product);
        res.send(product)
    })
};
module.exports.getmListProductPromotionBySupplier=(req,res,next) => {
    Product.find({supplierId:req.params._id,isUsed:true}).then(function(product){
        console.log(product);
        res.send(product)
    })
};

module.exports.getmPromotionProductBySearch=(req,res,next) => {
    Product.find({isPromote:true,isUsed:true,keyword: { $regex: req.body.keyword, $options: 'i' }}).then(function(product){
        console.log(product);
        res.send(product)
    })
};
module.exports.getmProductBySearch=(req,res,next) => {
    Product.find({isUsed:true}).then(function(product){
        var result=product.filter(item =>{ 
            return xoa_dau(item.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.cityId.cityName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.supplierId.supplierName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.productCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.productName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        console.log(product);
        res.send(result)
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