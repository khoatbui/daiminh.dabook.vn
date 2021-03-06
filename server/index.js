require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});
const app = express()
app.use(cookieParser())
const port = process.env.PORT
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(cors())

const mainRoute = require('./routes/main.router')
const destinationRoute = require('./routes/destination.router')
const travelStyleRoute = require('./routes/travelstyle.router')
const cityRoute = require('./routes/city.router')
const countryRoute = require('./routes/country.router')
const areaRouter = require('./routes/area.router')
const areaCountryRouter = require('./routes/areacountry.router')
const tourSupplierRoute = require('./routes/toursupplier.router')
const tourTypeRoute = require('./routes/tourtype.router')
const tourListRoute = require('./routes/tourlist.router')
const tourDetailRoute = require('./routes/tourdetail.router')
const uploadRoute = require('./routes/upload.router')
const mailRoute = require('./routes/mail.router')
const hotelRoute = require('./routes/hotel.router')
const supplierRoute = require('./routes/supplier.router')
const packageRoute = require('./routes/package.router')
const roomtypeRoute = require('./routes/roomtype.router')
const optionServiceRoute = require('./routes/optionservice.router')
const packageHotelRELRouter = require('./routes/packagehotelREL.router')
const paymentsRouter = require('./routes/payments.router')
const userRouter = require('./routes/auth.router')

const hotelOrderRouter=require('./routes/hotelorder.router')
const tourOrderRouter=require('./routes/tourorder.router')
const carOrderRouter=require('./routes/carorder.router')

const carSuppler=require('./routes/carsupplier.router')
const carType=require('./routes/cartype.router')
const carTransType=require('./routes/cartranstype.router')
const carDetailPrice=require('./routes/cardetailprice.router')

const ads=require('./routes/ads.router')

const blogType=require('./routes/blogtype.router')
const blogList=require('./routes/bloglist.router')
const blogDetail=require('./routes/blogdetail.router')

const mice=require('./routes/mice.router')
const fit=require('./routes/fit.router')
const travelService=require('./routes/travelservice.router')
const aboutUs=require('./routes/aboutus.router')
const cta=require('./routes/cta.router')

const adsType=require('./routes/adstype.router')
const adsList=require('./routes/adslist.router')
const adsDetail=require('./routes/adsdetail.router')

const pricepackage=require('./routes/pricepackage.router')
const priceType=require('./routes/pricetype.router')
const unitType=require('./routes/unittype.router')
const product=require('./routes/product.router')
const productSupplier=require('./routes/productsupplier.router')
const productCategory=require('./routes/productcategory.router')

const reviewsRouter=require('./routes/reviews.router')
const reviewsBookingRelRouter=require('./routes/reviewsbookingrel.router')
const reviewsBookingRelHisRouter=require('./routes/reviewsbookingrelhis.router')

app.set('view engine','pug');
app.set('views','./views');

// ****************ROUTER****************
app.use('/main',mainRoute);
app.use('/destination',destinationRoute);
app.use('/travelstyle',travelStyleRoute);
app.use('/city',cityRoute);
app.use('/country',countryRoute);
app.use('/areacountry',areaCountryRouter);
app.use('/toursupplier',tourSupplierRoute);
app.use('/tourtype',tourTypeRoute);
app.use('/tourlist',tourListRoute);
app.use('/tourdetail',tourDetailRoute);
app.use('/area',areaRouter);
app.use('/upload',uploadRoute);
app.use('/mail',mailRoute);
app.use('/hotel',hotelRoute);
app.use('/supplier',supplierRoute);
app.use('/package',packageRoute);
app.use('/roomtype',roomtypeRoute);
app.use('/optionservice',optionServiceRoute);
app.use('/packagehotelrel',packageHotelRELRouter);
app.use('/payment',paymentsRouter);
app.use('/user',userRouter)
app.use('/hotelorder',hotelOrderRouter)
app.use('/tourorder',tourOrderRouter)
app.use('/carorder',carOrderRouter)

app.use('/carsupplier',carSuppler)
app.use('/cartype',carType)
app.use('/cartranstype',carTransType)
app.use('/cardetailprice',carDetailPrice)

app.use('/ads',ads)

app.use('/blogtype',blogType)
app.use('/bloglist',blogList)
app.use('/blogdetail',blogDetail)

app.use('/mice',mice)
app.use('/fit',fit)
app.use('/travelservice',travelService)
app.use('/aboutus',aboutUs)
app.use('/cta',cta)

app.use('/adstype',adsType)
app.use('/adslist',adsList)
app.use('/adsdetail',adsDetail)

app.use('/pricepackage',pricepackage)
app.use('/pricetype',priceType)
app.use('/unittype',unitType)
app.use('/product',product)
app.use('/productsupplier',productSupplier)
app.use('/productcategory',productCategory)

app.use('/reviews',reviewsRouter)
app.use('/reviewsbookingrel',reviewsBookingRelRouter)
app.use('/reviewsbookingrelhis',reviewsBookingRelHisRouter)


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.get('/', (req,res) =>{
    res.send('hello world')
})

app.listen(port,() => console.log('Server run'))