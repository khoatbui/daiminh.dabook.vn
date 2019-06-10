var Mail = require('../models/mail.model')
var mongoose = require('mongoose');
var moment =require('moment');
var nodemailer = require('nodemailer')
moment().format();


// =======================
var emailInfo={
    emailId:'contact@daiminhtravel.com',
    emailPass:'daiminhmd2383'
}
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: emailInfo.emailId, 
        pass: emailInfo.emailPass
    },
    tls:{
        rejectUnauthorized:false
    }
});
var current={
    currentCode:0,
    currentDate:6
};
// ========================================
module.exports.index = function (req, res) {
    Mail.find().populate('supplierId').populate('hotelId').populate('roomTypeId').populate('packageId').then(function (package) {
        console.log(package);
        res.send(package)
    })
};

module.exports.getMail = (req, res, next) => {
    Mail.find().then(function (package) {
        res.send(package)
    })
};

module.exports.deleteMail = function (req, res) {
    console.log(req.params._id);
    Mail.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertMail = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    Mail.create(req.body, function (err, package) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(package)
        }
    })
};

module.exports.updateMail = function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    Mail.updateOne({ _id: req.params._id }, { $set: req.body }, (err, package) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(package);

            res.status(200).send(package);
        }
    });
};

module.exports.getPackageByHotelRoomType = (req, res, next) => {
    console.log(req.params.hotelId);
    console.log(req.params.roomTypeId);
    Mail.find({"hotelId":req.params.hotelId,"roomTypeId":req.params.roomTypeId}).populate('packageId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};

module.exports.getPriceByService=(req, res, next) => {
    Mail.find({"hotelId":req.params.hotelId,"roomTypeId":req.params.roomTypeId}).populate('packageId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};

module.exports.sendHotelBookingEmail=function (req, res) {
    const output = `
        <p>You have new contact request</p>
        <h3>Contact Detail</h3>
        <ul>
            <li>Name : ${req.body.name}</li>
            <li>Company : ${req.body.company}</li>
            <li>Email : ${req.body.email}</li>
            <li>Phone : ${req.body.phone}</li>
            <li>HotelId : ${req.body.hotelId}</li>
            <li>HotelName : ${req.body.hotelName}</li>
            <li>Price : ${req.body.price}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    const strsubject=`[HOTEL-${req.body.hotelId}] Yeu cau tu khach hang ${req.body.name} / ${req.body.phone}`;
    const transactionCode="VP" +moment().format('YYMM') + uniqeNumber();
    let info = transporter.sendMail({
        from: `"daiminh.dabook.vn" <${emailInfo.emailId}>`, // sender address
        to: "khoatbui.dev@gmail.com", // list of receivers
        subject: strsubject, // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }).then(success => console.log('success: ', success))
    .catch(error => console.log('error: ', error))

    res.send('UPDATE COMPLETED')
};

module.exports.sendTourBookingEmail= function (req, res) {
    const output = `
        <p>You have new contact request</p>
        <h3>Contact Detail</h3>
        <ul>
            <li>Name : ${req.body.name}</li>
            <li>Company : ${req.body.company}</li>
            <li>Email : ${req.body.email}</li>
            <li>Phone : ${req.body.phone}</li>
            <li>Phone : ${req.body.tourId}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    const strsubject=`[TOUR-${req.body.tourId}]  Yeu cau tu khach hang ${req.body.name} / ${req.body.phone}`;

    let info = transporter.sendMail({
        from: '"daiminh.dabook.vn" <sysadmin@dabook.vn>', // sender address
        to: "khoatbui.dev@gmail.com", // list of receivers
        subject: strsubject, // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }).then(success => console.log('success: ', success))
    .catch(error => console.log('error: ', error))

    res.send('UPDATE COMPLETED')
};

module.exports.sendCarBookingEmail=function (req, res) {
    const output = `
        <p>You have new contact request</p>
        <h3>Contact Detail</h3>
        <ul>
            <li>Name : ${req.body.name}</li>
            <li>Company : ${req.body.company}</li>
            <li>Email : ${req.body.email}</li>
            <li>Phone : ${req.body.phone}</li>
            <li>Phone : ${req.body.hotelId}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    const strsubject=`[CAR-${req.body.carId}]  Yeu cau tu khach hang ${req.body.name} / ${req.body.phone}`;

    let info = transporter.sendMail({
        from: '"daiminh.dabook.vn" <sysadmin@dabook.vn>', // sender address
        to: "khoatbui.dev@gmail.com", // list of receivers
        subject: strsubject, // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }).then(success => console.log('success: ', success))
    .catch(error => console.log('error: ', error))

    res.send('UPDATE COMPLETED')
};



function uniqeNumber (){
    if (current.currentDate == moment().get('date'))
    {
        current.currentCode ++;
    }
    else{
        current.currentCode=0;
        current.currentDate=moment().get('date');
    }
    if (parseInt(current.currentCode)<10) {
        return '00'+ current.currentCode;
    }
    else if (parseInt(current.currentCode)<100) {
        return '0'+ current.currentCode;
    }
    else{
        return current.currentCode;
    }
}

