/*=======SEND MAI AUTOMATIC======
+ Khi nhận request từ khách hàng, sẽ gửi emal tới nhân viên + email confirm cho khách
+ Code duoc sinh tu dong và luu vao database
==================================*/
var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
var moment = require('moment');
var jsonParser = bodyParser.json()
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
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/hotel-booking', jsonParser, function (req, res) {
    console.log(req.body);
    const output = `
        <p>You have new contact request</p>
        <h3>Contact Detail</h3>
        <ul>
            <li>Name : ${req.body.name}</li>
            <li>Company : ${req.body.company}</li>
            <li>Email : ${req.body.email}</li>
            <li>Phone : ${req.body.phone}</li>
            <li>HotelId : ${req.body.hotelId}</li>
            <li>HotelName : ${req.body.hotelId}</li>
            <li>Price : ${req.body.hotelId}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    const strsubject=`[HOTEL-${req.body.hotelId}] Yeu cau tu khach hang ${req.body.name} / ${req.body.phone}`;
    const transactionCode="VP" +moment().format('YYMM') + uniqeNumber();
    console.log(transactionCode);
    let info = transporter.sendMail({
        from: `"daiminh.dabook.vn" <${emailInfo.emailId}>`, // sender address
        to: "khoatbui.dev@gmail.com", // list of receivers
        subject: strsubject, // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }).then(success => console.log('success: ', success))
    .catch(error => console.log('error: ', error))

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send('UPDATE COMPLETED')
})

router.post('/tour-booking', jsonParser, function (req, res) {
    console.log(req.body);
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

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send('UPDATE COMPLETED')
})

router.post('/car-booking', jsonParser, function (req, res) {
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

    //console.log("Message sent: %s", info.messageId);
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send('UPDATE COMPLETED')
})


function uniqeNumber (){
    console.log(current.currentDate);
    console.log(moment().get('date'));
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
module.exports = router