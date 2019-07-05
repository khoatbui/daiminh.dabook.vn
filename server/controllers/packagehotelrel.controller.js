var PackageHotelREL = require('../models/packagehotelrel.model')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();

module.exports.index = function (req, res) {
    PackageHotelREL.find().populate('supplierId').populate('hotelId').populate('roomTypeId').populate('packageId').then(function (package) {
        res.send(package)
    })
};

module.exports.getPackageHotelREL = (req, res, next) => {
    PackageHotelREL.find().then(function (package) {
        res.send(package)
    })
};

module.exports.deletePackageHotelREL = function (req, res) {
    PackageHotelREL.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertPackageHotelREL = function (req, res) {
    console.log('create');
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    PackageHotelREL.create(req.body, function (err, package) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(package)
        }
    })
};

module.exports.updatePackageHotelREL = function (req, res) {
    console.log('update');
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    PackageHotelREL.updateOne({ _id: req.params._id }, { $set: req.body }, (err, package) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(package);
        }
    });
};

module.exports.getPackageByHotelRoomType = (req, res, next) => {
    PackageHotelREL.find({"hotelId":req.params.hotelId,"roomTypeId":req.params.roomTypeId}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        res.send(pac)
    })
};
module.exports.getPackageBySingleHotelRoomType=(req, res, next) => {
    PackageHotelREL.find({"hotelId":req.body.hotelId._id,"roomTypeId":req.body.roomTypeId._id}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};
module.exports.getPackageByMultiHotelRoomType=(req, res, next) => {
    var tempArray=[];
    req.body.roomTypeId.forEach(element => {
        tempArray.push(element.roomType._id);
        tempArray.push(element.roomType._id);
    });
    PackageHotelREL.find({"hotelId":req.body.hotelId,"roomTypeId": { $in: tempArray }}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};
module.exports.getPriceByService=(req, res, next) => {
    PackageHotelREL.find({"hotelId":req.params.hotelId,"roomTypeId":req.params.roomTypeId}).populate('packageId').then(function (pac) {
        res.send(pac)
    })
};

// MOBILE

module.exports.getmAllPackage = (req, res, next) => {
    PackageHotelREL.find({"isUsed":true}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        res.send(pac)
    })
};

module.exports.getmAllPromotionPackage = (req, res, next) => {
    PackageHotelREL.find({"isUsed":true,"isPromote":true}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        res.send(pac)
    })
};

module.exports.getmAllPromotePackageBySupplier = (req, res, next) => {
    PackageHotelREL.find({"isUsed":true,"isPromote":true,"supplierId":req.params._id}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        res.send(pac)
    })
};
module.exports.getmAllPackageBySupplier = (req, res, next) => {
    PackageHotelREL.find({"isUsed":true,"supplierId":req.params._id}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        res.send(pac)
    })
};

module.exports.getmPackageDetail = (req, res, next) => {
    PackageHotelREL.findOne({"isUsed":true,"_id":req.params._id}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        res.send(pac)
    })
};

module.exports.getmAllPackageBySearch = (req, res, next) => {
    console.log(req.body.keyword);
    PackageHotelREL.find({"isUsed":true}).populate('packageId').populate('hotelId').populate('roomTypeId').populate('supplierId').then(function (pac) {
        var result=pac.filter(item =>{ 
            return xoa_dau(item.hotelId.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.hotelId.hotelName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.hotelId.hotelCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.packageId.packageName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.packageId.packageCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.supplierId.supplierName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.supplierId.supplierCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.roomTypeId.roomTypeName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.roomTypeId.roomTypeCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        res.send(result)
    })
    // PackageHotelREL.find({ $or:[
    //     {"isUsed":true,"hotelId.keyword": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"hotelId.hotelName": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"hotelId.hotelCode": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"packageId.packageName": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"packageId.packageCode": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"supplierId.supplierName": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"supplierId.supplierCode": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"roomTypeId.roomTypeName": { $regex: req.body.keyword, $options: 'i' }},
    //     {"isUsed":true,"roomTypeId.roomTypeCode": { $regex: req.body.keyword, $options: 'i' }}
    // ]}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
    //     res.send(pac)
    // })
};

module.exports.getmAllPromotionPackageBySearch = (req, res, next) => {
    PackageHotelREL.find({"isUsed":true,"isPromote":true}).populate('packageId').populate('hotelId').populate('roomTypeId').populate('supplierId').then(function (pac) {
        var result=pac.filter(item =>{ 
            return xoa_dau(item.hotelId.keyword).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.hotelId.hotelName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.hotelId.hotelCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.packageId.packageName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.packageId.packageCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.supplierId.supplierName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.supplierId.supplierCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.roomTypeId.roomTypeName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
            xoa_dau(item.roomTypeId.roomTypeCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
    })
        res.send(result)
    })
};

function checkHotel(age) {
    return item.hotelId.hotelName.toLowerCase().indexOf(req.body.keyword.toLowerCase())
  }
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