var User = require('../models/user.model')
var mongoose = require('mongoose');
module.exports.login =function(req,res){
    User.find().then(function(user){
        res.send(user)
    })
};

module.exports.postLogin =function(req,res){
    console.log(req.body);
    User.find({userEmail:req.body.userEmail}).then(function(user){
        if (user.length>0) {
            User.find({userEmail:req.body.userEmail,password:req.body.password}).then(function(us){
                if (us.length>0) {
                    res.cookie('userEmail',us.userEmail);
                    res.send({
                        'status':true,
                        'login':us,
                        'message':'Login success'});
                }
                else{
                    res.send({
                        'status':false,
                        'login':"",
                        'message':'Wrong password'});
                }
            })
        }
        else{
            res.send({
                'status':false,
                'login':"",
                'message':'Wrong email'});
        }
    })
};

module.exports.getUser=(req,res,next) => {
    User.find().then(function(user){
        res.send(user)
    })
};

module.exports.deleteUser= function (req, res) {
    User.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertUser= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        User.create(req.body, function (err, user) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(user)
        }
        })
};

module.exports.updateUser=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        User.updateOne({ _id: req.params._id },{$set:req.body},(err, user) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(user);
                 res.status(200).send(user);
        }
     });
};

module.exports.getUserBySupplier=(req,res,next) => {
    User.find({supplierId:req.params.index}).then(function(user){
        console.log(user);
        res.send(user)
    })
};

module.exports.getUserBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        User.find({supplierId:supp._id}).then(function(user){
            res.send(user)
        })
    })
};

