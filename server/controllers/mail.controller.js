require('dotenv').config();
var Mail = require('../models/mail.model')
var mongoose = require('mongoose');
var moment = require('moment');
var nodemailer = require('nodemailer')
moment().format();


// =======================
var emailInfo = {
    emailId: 'contact@daiminhtravel.com',
    emailPass: 'daiminhmd2383'
}
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SYSTEM_EMAIL,
        pass: process.env.SYSTEM_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
var current = {
    currentCode: 0,
    currentDate: 6
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
    req.body.createDate = new Date();
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
    req.body.modifyDate = new Date();
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
    Mail.find({ "hotelId": req.params.hotelId, "roomTypeId": req.params.roomTypeId }).populate('packageId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};

module.exports.getPriceByService = (req, res, next) => {
    Mail.find({ "hotelId": req.params.hotelId, "roomTypeId": req.params.roomTypeId }).populate('packageId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};

module.exports.sendHotelBookingEmail = function (req, res) {
    const transactionCode = req.body.packageCode + moment().format('YYMM') + uniqeNumber();

    const strCustomerSubject = `[DAIMINH-TRAVEL] Order confirmation ${transactionCode}`;
    const strEmployeeeSubject = `[HOTEL-${transactionCode}] Sale confirmation : ${req.body.name} | ${req.body.phone}`;
    const outputCustomer = generateCustomoerHotelConfirm(req.body,transactionCode);
    const outputStaff = generateStaffHotelConfirm(req.body,transactionCode);
    let Cusinfo = transporter.sendMail({
        from: `"daiminh.dabook.vn" <${emailInfo.emailId}>`, // sender address
        to: req.body.email, // list of receivers
        subject: strCustomerSubject, // Subject line
        text: "Hello world?", // plain text body
        html: outputCustomer // html body
    }).then(success => console.log('success: ', success))
        .catch(error => console.log('error: ', error))

    let Empinfo = transporter.sendMail({
        from: `"daiminh.dabook.vn" <${emailInfo.emailId}>`, // sender address
        to: process.env.HOTEL_CUSTOMER_MAIL_TO, // list of receivers
        subject: strEmployeeeSubject, // Subject line
        text: "Hello world?", // plain text body
        html: outputStaff // html body
    }).then(success => console.log('success: ', success))
        .catch(error => console.log('error: ', error))

    res.send(transactionCode)
};

module.exports.sendTourBookingEmail = function (req, res) {
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
    const strCustomerSubject = `[DAIMINH-TRAVEL] Xac nhan don hang ${transactionCode}`;
    const strEmployeeeSubject = `[HOTEL-${transactionCode}] Sale confirmation : ${req.body.name} | ${req.body.phone}`;

    let Cusinfo = transporter.sendMail({
        from: `"daiminh.dabook.vn" <${emailInfo.emailId}>`, // sender address
        to: req.body.email, // list of receivers
        subject: strCustomerSubject, // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }).then(success => console.log('success: ', success))
        .catch(error => console.log('error: ', error))

    let Empinfo = transporter.sendMail({
        from:`"daiminh.dabook.vn" <${emailInfo.emailId}>`, // sender address
        to: process.env.TOUR_CUSTOMER_MAIL_TO, // list of receivers
        subject: strEmployeeeSubject, // Subject line
        text: "Hello world?", // plain text body
        html: output // html body
    }).then(success => console.log('success: ', success))
        .catch(error => console.log('error: ', error))

    res.send(transactionCode)
};

module.exports.sendCarBookingEmail = function (req, res) {
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
    const strsubject = `[CAR-${req.body.carId}]  Yeu cau tu khach hang ${req.body.name} / ${req.body.phone}`;

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



function uniqeNumber() {
    if (current.currentDate == moment().get('date')) {
        current.currentCode++;
    }
    else {
        current.currentCode = 0;
        current.currentDate = moment().get('date');
    }
    if (parseInt(current.currentCode) < 10) {
        return '00' + current.currentCode;
    }
    else if (parseInt(current.currentCode) < 100) {
        return '0' + current.currentCode;
    }
    else {
        return current.currentCode;
    }
}

function generateStaffHotelConfirm(reqBody,transactionCode){
  var template=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Title</title>
  
    <script src="https://kit.fontawesome.com/43094bff7d.js"></script>
  
  
  </head>
  
  <body style="-moz-box-sizing: border-box; -ms-text-size-adjust: 100%; -webkit-box-sizing: border-box; -webkit-text-size-adjust: 100%; Margin: 0; box-sizing: border-box; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; min-width: 100%; padding: 0; text-align: left; width: 100% !important;">
    <style>
      @media only screen {
        html {
          min-height: 100%;
          background: #f3f3f3;
        }
      }
      
      @media only screen and (max-width: 596px) {
        .small-float-center {
          margin: 0 auto !important;
          float: none !important;
          text-align: center !important;
        }
        .small-text-center {
          text-align: center !important;
        }
        .small-text-left {
          text-align: left !important;
        }
        .small-text-right {
          text-align: right !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        .hide-for-large {
          display: block !important;
          width: auto !important;
          overflow: visible !important;
          max-height: none !important;
          font-size: inherit !important;
          line-height: inherit !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body table.container .hide-for-large,
        table.body table.container .row.hide-for-large {
          display: table !important;
          width: 100% !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body table.container .callout-inner.hide-for-large {
          display: table-cell !important;
          width: 100% !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body table.container .show-for-large {
          display: none !important;
          width: 0;
          mso-hide: all;
          overflow: hidden;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body img {
          width: auto;
          height: auto;
        }
        table.body center {
          min-width: 0 !important;
        }
        table.body .container {
          width: 95% !important;
        }
        table.body .columns,
        table.body .column {
          height: auto !important;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding-left: 16px !important;
          padding-right: 16px !important;
        }
        table.body .columns .column,
        table.body .columns .columns,
        table.body .column .column,
        table.body .column .columns {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        table.body .collapse .columns,
        table.body .collapse .column {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        td.small-1,
        th.small-1 {
          display: inline-block !important;
          width: 8.33333% !important;
        }
        td.small-2,
        th.small-2 {
          display: inline-block !important;
          width: 16.66667% !important;
        }
        td.small-3,
        th.small-3 {
          display: inline-block !important;
          width: 25% !important;
        }
        td.small-4,
        th.small-4 {
          display: inline-block !important;
          width: 33.33333% !important;
        }
        td.small-5,
        th.small-5 {
          display: inline-block !important;
          width: 41.66667% !important;
        }
        td.small-6,
        th.small-6 {
          display: inline-block !important;
          width: 50% !important;
        }
        td.small-7,
        th.small-7 {
          display: inline-block !important;
          width: 58.33333% !important;
        }
        td.small-8,
        th.small-8 {
          display: inline-block !important;
          width: 66.66667% !important;
        }
        td.small-9,
        th.small-9 {
          display: inline-block !important;
          width: 75% !important;
        }
        td.small-10,
        th.small-10 {
          display: inline-block !important;
          width: 83.33333% !important;
        }
        td.small-11,
        th.small-11 {
          display: inline-block !important;
          width: 91.66667% !important;
        }
        td.small-12,
        th.small-12 {
          display: inline-block !important;
          width: 100% !important;
        }
        .columns td.small-12,
        .column td.small-12,
        .columns th.small-12,
        .column th.small-12 {
          display: block !important;
          width: 100% !important;
        }
        table.body td.small-offset-1,
        table.body th.small-offset-1 {
          margin-left: 8.33333% !important;
          Margin-left: 8.33333% !important;
        }
        table.body td.small-offset-2,
        table.body th.small-offset-2 {
          margin-left: 16.66667% !important;
          Margin-left: 16.66667% !important;
        }
        table.body td.small-offset-3,
        table.body th.small-offset-3 {
          margin-left: 25% !important;
          Margin-left: 25% !important;
        }
        table.body td.small-offset-4,
        table.body th.small-offset-4 {
          margin-left: 33.33333% !important;
          Margin-left: 33.33333% !important;
        }
        table.body td.small-offset-5,
        table.body th.small-offset-5 {
          margin-left: 41.66667% !important;
          Margin-left: 41.66667% !important;
        }
        table.body td.small-offset-6,
        table.body th.small-offset-6 {
          margin-left: 50% !important;
          Margin-left: 50% !important;
        }
        table.body td.small-offset-7,
        table.body th.small-offset-7 {
          margin-left: 58.33333% !important;
          Margin-left: 58.33333% !important;
        }
        table.body td.small-offset-8,
        table.body th.small-offset-8 {
          margin-left: 66.66667% !important;
          Margin-left: 66.66667% !important;
        }
        table.body td.small-offset-9,
        table.body th.small-offset-9 {
          margin-left: 75% !important;
          Margin-left: 75% !important;
        }
        table.body td.small-offset-10,
        table.body th.small-offset-10 {
          margin-left: 83.33333% !important;
          Margin-left: 83.33333% !important;
        }
        table.body td.small-offset-11,
        table.body th.small-offset-11 {
          margin-left: 91.66667% !important;
          Margin-left: 91.66667% !important;
        }
        table.body table.columns td.expander,
        table.body table.columns th.expander {
          display: none !important;
        }
        table.body .right-text-pad,
        table.body .text-pad-right {
          padding-left: 10px !important;
        }
        table.body .left-text-pad,
        table.body .text-pad-left {
          padding-right: 10px !important;
        }
        table.menu {
          width: 100% !important;
        }
        table.menu td,
        table.menu th {
          width: auto !important;
          display: inline-block !important;
        }
        table.menu.vertical td,
        table.menu.vertical th,
        table.menu.small-vertical td,
        table.menu.small-vertical th {
          display: block !important;
        }
        table.menu[align="center"] {
          width: auto !important;
        }
        table.button.small-expand,
        table.button.small-expanded {
          width: 100% !important;
        }
        table.button.small-expand table,
        table.button.small-expanded table {
          width: 100%;
        }
        table.button.small-expand table a,
        table.button.small-expanded table a {
          text-align: center !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        table.button.small-expand center,
        table.button.small-expanded center {
          min-width: 0;
        }
      }
    </style>
    <!-- <style> -->
    <table class="body" data-made-with-foundation="" style="Margin: 0; background: #f3f3f3; background-color: #50C0C0 !important; border-collapse: collapse; border-spacing: 0; box-sizing: border-box; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; height: 100%; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
      <tbody>
        <tr class="" style="padding: 0; text-align: left; vertical-align: top;">
          <td class="float-center" align="center" valign="top" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0 auto; border-collapse: collapse !important; color: #0a0a0a; float: none; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; word-wrap: break-word;">
            <center style="min-width: 580px; width: 100%;">
              <table class="container container-body" style="Margin: 0 auto; background: #fefefe; border-collapse: collapse; border-radius: 10px; border-spacing: 0; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); font-family: 'Roboto', sans-serif !important; height: auto; margin: 10px auto !important; overflow: hidden; padding: 10px; text-align: inherit; vertical-align: top; width: 880px;">
                <tbody>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr style="padding: 0; text-align: center; vertical-align: top;">
                            <th class="small-6 large-6 columns center-element" style="Margin: 0 auto; color: #0a0a0a; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 30px 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: center; width: 274px;">
                              <img class="logo-img" src="http://daiminh.dabook.vn/img/new_logo.jpg" alt="" style="-ms-interpolation-mode: bicubic; clear: both; display: block; max-width: 100%; outline: none; text-decoration: none; width: 160px;">
                            </th>
                            <th class="small-6 large-6 columns center-element" style="Margin: 0 auto; color: #0a0a0a; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 30px 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: center; width: 274px;">
                              <img class="logo-img" src="http://daiminh.dabook.vn/img/logo_dabook.jpg" alt="" style="-ms-interpolation-mode: bicubic; clear: both; display: block; max-width: 100%; outline: none; text-decoration: none; width: 160px;">
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th class="small-12 large-12 columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 564px;">
                              <h3 class="thankyou-title" style="Margin: 0; Margin-bottom: 10px; color: #50C0C0; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 20px; text-align: center; text-transform: uppercase; word-wrap: normal;">Thank you for choosing DaiMinh Travel</h3>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="order-summary" style="border-bottom: 1px solid #7B6972; color: #7B6972; font-weight: bold; padding: 10px; padding-bottom: 20px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-6 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 274px;">
                              <div class="left-order-summary" style="color: #7B6972; flex-grow: 1; flex-shrink: 1; font-weight: bold; padding: 0 8px; text-align: left;">
                                Order #: <a href="#" class="link-button" style="Margin: 0; background-color: #5d4a8e !important; border-radius: 4px; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); color: #FFF !important; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 4px; padding: 2px 4px; text-align: left; text-decoration: none;"> ${transactionCode} </a>
                              </div>
                            </th>
                            <th class="small-12 large-6 last columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 16px; text-align: left; width: 274px;">
                              <div class="right-order-summary" style="color: #7B6972; flex-grow: 1; flex-shrink: 1; font-weight: bold; padding: 0 8px; text-align: right;">
                                Order Date: ${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}
                              </div>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th class="small-12 large-6 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 274px;">
                              <div class="section">
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Dear Mr(Ms). ${reqBody.name},</p>
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Thank you very much for your Request: Code:${transactionCode}</p>
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Dai Minh Travel proud to assist you through your upcoming journey as per your request details:</p>
                              </div>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <h5 class="header-section" style="Margin: 0; Margin-bottom: 10px; background-color: #50C0C0; border: 2px solid #50C0C0; border-top-left-radius: 8px; border-top-right-radius: 8px; box-sizing: border-box; color: #FFF; font-family: Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: normal; height: 30px; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 10px; text-align: left; word-wrap: normal;">Request Infomation</h5>
                      <table class="row body-section" style="border: 1px solid #dee2e6; border-collapse: collapse; border-radius: 12px; border-spacing: 0; display: table; font-size: 12px; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="small-6 large-12 columns" style="padding: 0; text-align: left; vertical-align: top;">
  
                          </tr>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">HOTEL/LOCATION :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 border-right paragraph" style="border-right: 1px solid #50C0C0; font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.hotelName}</div>
                            </th>
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">ROOM TYPE :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2  paragraph" style="font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.roomTypeName}</div>
                            </th>
                          </tr>
                          <tr class="row-border" style="border-bottom: 1px solid #dee2e6; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">SERVICE PACKAGE :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 border-right paragraph" style="border-right: 1px solid #50C0C0; font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.packageName}</div>
                            </th>
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">CHECKIN - CHECKOUT:</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 paragraph" style="font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.checkin} ==> ${reqBody.checkout}</div>
                            </th>
                          </tr>
                          <tr class="row-border" style="border-bottom: 1px solid #dee2e6; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">NUMBER OF GUESTS :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 border-right paragraph" style="border-right: 1px solid #50C0C0; font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.personQty}</div>
                            </th>
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">NUMBER OF ROOM</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 paragraph" style="font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.roomQty}</div>
                            </th>
                          </tr>
                          <tr class="row-border c" style="border-bottom: 1px solid #dee2e6; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">ADDITION DETAILS :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 border-right paragraph" style="border-right: 1px solid #50C0C0; font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.optionServiceName}</div>
                            </th>
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">TOTAL :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 paragraph" style="font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.totalPrice}</div>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <h5 class="header-section" style="Margin: 0; Margin-bottom: 10px; background-color: #50C0C0; border: 2px solid #50C0C0; border-top-left-radius: 8px; border-top-right-radius: 8px; box-sizing: border-box; color: #FFF; font-family: Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: normal; height: 30px; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 10px; text-align: left; word-wrap: normal;">Request Infomation</h5>
                      <table class="row body-section" style="border: 1px solid #dee2e6; border-collapse: collapse; border-radius: 12px; border-spacing: 0; display: table; font-size: 12px; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="small-6 large-12 columns" style="padding: 0; text-align: left; vertical-align: top;">
  
                          </tr>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">Fullname :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 border-right paragraph" style="border-right: 1px solid #50C0C0; font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.name}</div>
                            </th>
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">Email :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 paragraph" style="font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.email}</div>
                            </th>
                          </tr>
                          <tr class="row-border" style="border-bottom: 1px solid #dee2e6; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">Telephone :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 border-right paragraph" style="border-right: 1px solid #50C0C0; font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.phone}</div>
                            </th>
                            <th class="small-6 large-1 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 32.33333px;">
                              <div class="col-1 paragraph" style="border-right: 1px dashed #dee2e6; font-size: 12px; font-weight: bold; line-height: 1.7em; padding: 0 8px;">Option :</div>
                            </th>
                            <th class="small-6 large-4 second columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 177.33333px;">
                              <div class="col-2 paragraph" style="font-size: 12px; line-height: 1.7em; padding: 0 8px;">${reqBody.other}</div>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <h5 style="Margin: 0; Margin-bottom: 10px; color: inherit; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; text-align: left; word-wrap: normal;">Please be noticed that:</h5>
                      <table class="row border-top" style="border-collapse: collapse; border-spacing: 0; border-top: 1px solid #7B6972; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="small-12 large-12 columns" style="padding: 0; text-align: left; vertical-align: top;">
  
                          </tr>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-12  columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 564px;">
                              <ul>
                                <li class="paragraph" style="font-size: 12px; line-height: 1.7em;">Following the Laws of Vietnam, all products have to be tagged in VND – Vietnam Dong. To Check the PRICE on your currency please clink here <a class="link-button" href="https://www.vietcombank.com.vn/ExchangeRates/Converter.aspx?lang=en"
                                    target="_blank" style="Margin: 0; background-color: #5d4a8e !important; border-radius: 4px; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); color: #FFF !important; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 4px; padding: 2px 4px; text-align: left; text-decoration: none;">USD CONVERT
                                    TO VND</a></li>
                                <li class="paragraph" style="font-size: 12px; line-height: 1.7em;">Within the next 1 hours, there will be One email sent from Dai Minh Travel to guide you on the Reconfirmation and Payment to Complete your Request.</li>
                                <li class="paragraph" style="font-size: 12px; line-height: 1.7em;">Please spend sometimes to review our <a class="link-button" href="http://daiminh.dabook.vn/function/legal.html" target="_blank" style="Margin: 0; background-color: #5d4a8e !important; border-radius: 4px; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); color: #FFF !important; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 4px; padding: 2px 4px; text-align: left; text-decoration: none;">Privacy Policy | Term of use </a>                                </li>
                              </ul>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
  
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-12  columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 564px;">
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Dai Minh is looking forward to serving you soon,</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Wish you a pleasant journey,</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Best Regards,</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Reservation Department</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Dai Minh Travel </p>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
  
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 10px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-6 columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: right; width: 274px;">
                              <span class="footer-item " style="font-size: 12px; line-height: 1.7em;"><a href="tel:19001542" class="footer-item-contact border-right" style="Margin: 0; border-right: 1px solid #50C0C0; color: #50C0C0; font-family: Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: bold; line-height: 1.3; margin: 0; padding: 10px; text-align: left; text-decoration: none;"><i class="fas fa-headset"></i> 19001542</a> </span>
                            </th>
                            <th class="small-12 large-6  columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 274px;"><span class="footer-item" style="font-size: 12px; line-height: 1.7em;"><a class="footer-item-contact" href="mailto:nhungbt@daiminhtravel.com" style="Margin: 0; color: #50C0C0; font-family: Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: bold; line-height: 1.3; margin: 0; padding: 10px; text-align: left; text-decoration: none;"><i class="far fa-envelope"></i>
                                nhungbt@daiminhtravel.com</a></span>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </td>
        </tr>
      </tbody>
    </table>
  
  
  </body>
  
  </html>`;
  return template;
}
function generateCustomoerHotelConfirm(reqBody,transactionCode){
  var template=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Title</title>
  
    <script src="https://kit.fontawesome.com/43094bff7d.js"></script>
  
  
  </head>
  
  <body style="-moz-box-sizing: border-box; -ms-text-size-adjust: 100%; -webkit-box-sizing: border-box; -webkit-text-size-adjust: 100%; Margin: 0; box-sizing: border-box; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; min-width: 100%; padding: 0; text-align: left; width: 100% !important;">
    <style>
      @media only screen {
        html {
          min-height: 100%;
          background: #f3f3f3;
        }
      }
      
      @media only screen and (max-width: 596px) {
        .small-float-center {
          margin: 0 auto !important;
          float: none !important;
          text-align: center !important;
        }
        .small-text-center {
          text-align: center !important;
        }
        .small-text-left {
          text-align: left !important;
        }
        .small-text-right {
          text-align: right !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        .hide-for-large {
          display: block !important;
          width: auto !important;
          overflow: visible !important;
          max-height: none !important;
          font-size: inherit !important;
          line-height: inherit !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body table.container .hide-for-large,
        table.body table.container .row.hide-for-large {
          display: table !important;
          width: 100% !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body table.container .callout-inner.hide-for-large {
          display: table-cell !important;
          width: 100% !important;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body table.container .show-for-large {
          display: none !important;
          width: 0;
          mso-hide: all;
          overflow: hidden;
        }
      }
      
      @media only screen and (max-width: 596px) {
        table.body img {
          width: auto;
          height: auto;
        }
        table.body center {
          min-width: 0 !important;
        }
        table.body .container {
          width: 95% !important;
        }
        table.body .columns,
        table.body .column {
          height: auto !important;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding-left: 16px !important;
          padding-right: 16px !important;
        }
        table.body .columns .column,
        table.body .columns .columns,
        table.body .column .column,
        table.body .column .columns {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        table.body .collapse .columns,
        table.body .collapse .column {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        td.small-1,
        th.small-1 {
          display: inline-block !important;
          width: 8.33333% !important;
        }
        td.small-2,
        th.small-2 {
          display: inline-block !important;
          width: 16.66667% !important;
        }
        td.small-3,
        th.small-3 {
          display: inline-block !important;
          width: 25% !important;
        }
        td.small-4,
        th.small-4 {
          display: inline-block !important;
          width: 33.33333% !important;
        }
        td.small-5,
        th.small-5 {
          display: inline-block !important;
          width: 41.66667% !important;
        }
        td.small-6,
        th.small-6 {
          display: inline-block !important;
          width: 50% !important;
        }
        td.small-7,
        th.small-7 {
          display: inline-block !important;
          width: 58.33333% !important;
        }
        td.small-8,
        th.small-8 {
          display: inline-block !important;
          width: 66.66667% !important;
        }
        td.small-9,
        th.small-9 {
          display: inline-block !important;
          width: 75% !important;
        }
        td.small-10,
        th.small-10 {
          display: inline-block !important;
          width: 83.33333% !important;
        }
        td.small-11,
        th.small-11 {
          display: inline-block !important;
          width: 91.66667% !important;
        }
        td.small-12,
        th.small-12 {
          display: inline-block !important;
          width: 100% !important;
        }
        .columns td.small-12,
        .column td.small-12,
        .columns th.small-12,
        .column th.small-12 {
          display: block !important;
          width: 100% !important;
        }
        table.body td.small-offset-1,
        table.body th.small-offset-1 {
          margin-left: 8.33333% !important;
          Margin-left: 8.33333% !important;
        }
        table.body td.small-offset-2,
        table.body th.small-offset-2 {
          margin-left: 16.66667% !important;
          Margin-left: 16.66667% !important;
        }
        table.body td.small-offset-3,
        table.body th.small-offset-3 {
          margin-left: 25% !important;
          Margin-left: 25% !important;
        }
        table.body td.small-offset-4,
        table.body th.small-offset-4 {
          margin-left: 33.33333% !important;
          Margin-left: 33.33333% !important;
        }
        table.body td.small-offset-5,
        table.body th.small-offset-5 {
          margin-left: 41.66667% !important;
          Margin-left: 41.66667% !important;
        }
        table.body td.small-offset-6,
        table.body th.small-offset-6 {
          margin-left: 50% !important;
          Margin-left: 50% !important;
        }
        table.body td.small-offset-7,
        table.body th.small-offset-7 {
          margin-left: 58.33333% !important;
          Margin-left: 58.33333% !important;
        }
        table.body td.small-offset-8,
        table.body th.small-offset-8 {
          margin-left: 66.66667% !important;
          Margin-left: 66.66667% !important;
        }
        table.body td.small-offset-9,
        table.body th.small-offset-9 {
          margin-left: 75% !important;
          Margin-left: 75% !important;
        }
        table.body td.small-offset-10,
        table.body th.small-offset-10 {
          margin-left: 83.33333% !important;
          Margin-left: 83.33333% !important;
        }
        table.body td.small-offset-11,
        table.body th.small-offset-11 {
          margin-left: 91.66667% !important;
          Margin-left: 91.66667% !important;
        }
        table.body table.columns td.expander,
        table.body table.columns th.expander {
          display: none !important;
        }
        table.body .right-text-pad,
        table.body .text-pad-right {
          padding-left: 10px !important;
        }
        table.body .left-text-pad,
        table.body .text-pad-left {
          padding-right: 10px !important;
        }
        table.menu {
          width: 100% !important;
        }
        table.menu td,
        table.menu th {
          width: auto !important;
          display: inline-block !important;
        }
        table.menu.vertical td,
        table.menu.vertical th,
        table.menu.small-vertical td,
        table.menu.small-vertical th {
          display: block !important;
        }
        table.menu[align="center"] {
          width: auto !important;
        }
        table.button.small-expand,
        table.button.small-expanded {
          width: 100% !important;
        }
        table.button.small-expand table,
        table.button.small-expanded table {
          width: 100%;
        }
        table.button.small-expand table a,
        table.button.small-expanded table a {
          text-align: center !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        table.button.small-expand center,
        table.button.small-expanded center {
          min-width: 0;
        }
      }
    </style>
    <!-- <style> -->
    <table class="body" data-made-with-foundation="" style="Margin: 0; background: #f3f3f3; background-color: #50C0C0 !important; border-collapse: collapse; border-spacing: 0; box-sizing: border-box; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; height: 100%; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; width: 100%;">
  
      <tbody>
        <tr class="" style="padding: 0; text-align: left; vertical-align: top;">
          <td class="float-center" align="center" valign="top" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0 auto; border-collapse: collapse !important; color: #0a0a0a; float: none; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; word-wrap: break-word;">
            <center style="min-width: 580px; width: 100%;">
              <table class="container container-body" style="Margin: 0 auto; background: #fefefe; border-collapse: collapse; border-radius: 10px; border-spacing: 0; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); font-family: 'Roboto', sans-serif !important; height: auto; margin: 10px auto !important; overflow: hidden; padding: 10px; text-align: inherit; vertical-align: top; width: 880px;">
                <!-- <tr>
                              <td class="padding">
                                  <table class="row">
                                      <tr style="text-align: center">
                                          <th class="order-status ribbon">
                                              STATUS : CHECKING SERVICE'S AVAILABILITY
                                          </th>
                                      </tr>
                                  </table>
                              </td>
                          </tr> -->
                <tbody>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr style="padding: 0; text-align: center; vertical-align: top;">
                            <th class="small-6 large-6 columns center-element" style="Margin: 0 auto; color: #0a0a0a; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 30px 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: center; width: 274px;">
                              <img class="logo-img" src="http://daiminh.dabook.vn/img/new_logo.jpg" alt="" style="-ms-interpolation-mode: bicubic; clear: both; display: block; max-width: 100%; outline: none; text-decoration: none; width: 160px;">
                            </th>
                            <th class="small-6 large-6 columns center-element" style="Margin: 0 auto; color: #0a0a0a; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 30px 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: center; width: 274px;">
                              <img class="logo-img" src="http://daiminh.dabook.vn/img/logo dabook.png" alt="" style="-ms-interpolation-mode: bicubic; clear: both; display: block; max-width: 100%; outline: none; text-decoration: none; width: 160px;">
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th class="small-12 large-12 columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 564px;">
                              <h3 class="thankyou-title" style="Margin: 0; Margin-bottom: 10px; color: #50C0C0; font-family: Helvetica, Arial, sans-serif; font-size: 28px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 20px; text-align: center; text-transform: uppercase; word-wrap: normal;">Thank you for choosing DaiMinh Travel</h3>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="order-summary" style="border-bottom: 1px solid #7B6972; color: #7B6972; font-weight: bold; padding: 10px; padding-bottom: 20px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-6 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 274px;">
                              <div class="left-order-summary " style="color: #7B6972; flex-grow: 1; flex-shrink: 1; font-weight: bold; padding: 0 8px; text-align: left;">
                                Order #: <a href="#" class="link-button" style="Margin: 0; background-color: #5d4a8e !important; border-radius: 4px; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); color: #FFF !important; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 4px; padding: 2px 4px; text-align: left; text-decoration: none;"> ${transactionCode} </a>
                              </div>
                            </th>
                            <th class="small-12 large-6 last columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 16px; text-align: left; width: 274px;">
                              <div class="right-order-summary" style="color: #7B6972; flex-grow: 1; flex-shrink: 1; font-weight: bold; padding: 0 8px; text-align: right;">
                                Order Date: 10/06/2019
                              </div>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th class="small-12 large-6 first columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 16px; padding-right: 8px; text-align: left; width: 274px;">
                              <div class="section" style="padding: 10px;">
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Dear Mr(Ms). ${reqBody.name},</p>
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Thank you very much for your request</p>
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">DaiMinh Travel's staff is checking the availibility of services as per your request</p>
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Within the next 6 hours, DaiMinh Travel's staff will email you for detail information / reconfirmation and so on</p>
                                <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Please wait and check your email then</p>
                              </div>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr style="padding: 0; text-align: left; vertical-align: top;">
                            <th class="small-12 large-12 columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: center; width: 564px;">
                              <div class="status-notice" style="background: #e91e63 !important; border-radius: 10px; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); color: #FFF; display: inline-block; font-size: 1rem; font-weight: bold; padding: 0;">
                                <h5 class="ticket-order" style="Margin: 0; Margin-bottom: 10px; border-right: 3px dashed #FFF; color: inherit; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 30px; text-align: left; word-wrap: normal;"> Order #: <b>${transactionCode}</b></h5>
                                <h5 class="ticket-status" style="Margin: 0; Margin-bottom: 10px; color: inherit; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 30px; text-align: left; word-wrap: normal;">Status # :<b> CHECKING SERVICE'S AVAILABILITY</b></h5>
                              </div>
                            </th>
  
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <h6 style="Margin: 0; Margin-bottom: 10px; color: #7B6972; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal; line-height: 1.3; margin: 0; margin-bottom: 10px; padding: 0; padding-left: 20px; text-align: left; word-wrap: normal;">Please be noticed that:</h6>
                      <table class="row border-top" style="border-collapse: collapse; border-spacing: 0; border-top: 1px solid #7B6972; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="small-12 large-12 columns" style="padding: 0; text-align: left; vertical-align: top;">
  
                          </tr>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 20px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-12  columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 564px;">
                              <ul>
                                <li class="paragraph" style="font-size: 12px; line-height: 1.7em;">Following the Laws of Vietnam, all products have to be tagged in VND – Vietnam Dong. To Check the PRICE on your currency please clink here <a class="link-button" href="https://www.vietcombank.com.vn/ExchangeRates/Converter.aspx?lang=en"
                                    target="_blank" style="Margin: 0; background-color: #5d4a8e !important; border-radius: 4px; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); color: #FFF !important; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 4px; padding: 2px 4px; text-align: left; text-decoration: none;">USD CONVERT
                                                          TO VND</a></li>
                                <li class="paragraph" style="font-size: 12px; line-height: 1.7em;">Please spend sometimes to review our <a class="link-button" href="http://daiminh.dabook.vn/function/legal.html" target="_blank" style="Margin: 0; background-color: #5d4a8e !important; border-radius: 4px; box-shadow: 0px 6px 10px 0px rgba(0,0,0,0.14); color: #FFF !important; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 4px; padding: 2px 4px; text-align: left; text-decoration: none;">Privacy Policy | Term of use </a>                                </li>
                              </ul>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row " style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 20px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-12  columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 20px; padding-right: 8px; text-align: left; width: 564px;">
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Dai Minh is looking forward to serving you soon,</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Wish you a pleasant journey,</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Best Regards,</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Reservation Department</p>
                              <p class="paragraph" style="Margin: 0; Margin-bottom: 10px; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 12px; font-weight: normal; line-height: 1.7em; margin: 0; margin-bottom: 10px; padding: 0; text-align: left;">Dai Minh Travel </p>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr style="padding: 0; text-align: left; vertical-align: top;">
                    <td class="padding" style="-moz-hyphens: auto; -webkit-hyphens: auto; Margin: 0; border-collapse: collapse !important; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 10px; text-align: left; vertical-align: top; word-wrap: break-word;">
                      <table class="row" style="border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%;">
                        <tbody>
                          <tr class="row-border paragraph" style="border-bottom: 1px solid #dee2e6; font-size: 12px; line-height: 1.7em; padding: 20px; text-align: left; vertical-align: top;">
                            <th class="small-12 large-6  columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: right; width: 274px;">
                              <span class="footer-item " style="font-size: 12px; line-height: 1.7em;"><a href="tel:19001542" class="footer-item-contact border-right" style="Margin: 0; border-right: 1px solid #50C0C0; color: #50C0C0; font-family: Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: bold; line-height: 1.3; margin: 0; padding: 10px; text-align: left; text-decoration: none;"><i class="fas fa-headset"></i> 19001542</a> </span>
                            </th>
                            <th class="small-12 large-6  columns" style="Margin: 0 auto; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; padding-bottom: 16px; padding-left: 8px; padding-right: 8px; text-align: left; width: 274px;"><span class="footer-item" style="font-size: 12px; line-height: 1.7em;"><a class="footer-item-contact" href="mailto:nhungbt@daiminhtravel.com" style="Margin: 0; color: #50C0C0; font-family: Helvetica, Arial, sans-serif; font-size: 1rem; font-weight: bold; line-height: 1.3; margin: 0; padding: 10px; text-align: left; text-decoration: none;"><i class="far fa-envelope"></i>
                                                      nhungbt@daiminhtravel.com</a></span>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </td>
        </tr>
      </tbody>
    </table>
  
  
  </body>
  
  </html>`
  return template;
}
