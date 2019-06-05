/*=======SEND MAI AUTOMATIC======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
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
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "sysadmin@dabook.vn", // generated ethereal user
            pass: "Black@ngelk510" // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"Khoat bui from dabook.vn" <sysadmin@dabook.vn>', // sender address
        to: "khoatbui.dev@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }).then(success => console.log('success: ', success))
    .catch(error => console.log('error: ', error))

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send('UPDATE COMPLETED')
})
module.exports = router