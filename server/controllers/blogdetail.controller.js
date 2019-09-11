var BlogDetail = require('../models/blogdetail.model')
var BlogList=require('../models/bloglist.model')
var BlogType=require('../models/blogtype.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    BlogDetail.find().populate('blogId').then(function(blogdetail){
        res.send(blogdetail)
    })
};
module.exports.getUsed =function(req,res){
    BlogDetail.find({"isUsed":true}).populate('blogId').then(function(blogdetail){
        res.send(blogdetail)
    })
  };
  
module.exports.getBlogAboutUs =function(req,res){
    BlogType.findOne({'blogTypeCode':'ABU'}).then(function(blogType){
        BlogList.find({'blogTypeId':blogType._id}).then(function(blogLists){
            var ids=[];
            blogLists.forEach(element => {
                ids.push(element._id)
            });
            console.log(ids)
            BlogDetail.find({"blogId": { $in : ids }}).populate('blogId').then(function(blogdetail){
                console.log(blogdetail)
                res.send(blogdetail)
            })
        })
    })
};
module.exports.getmBlogDetailLangById=(req,res,next) => {
    BlogDetail.findOne({"blogId":req.params._id}).populate('blogId').then(function(blogdetail){
        res.send(blogdetail)
    })
};
module.exports.getmBlogDetailById=(req,res,next) => {
    BlogDetail.find({"blogId":req.params._id}).populate('blogId').then(function(blogdetail){
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

