const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

const mainRoute = require('./routes/main.router')
const destinationRoute = require('./routes/destination.router')
const travelStyleRoute = require('./routes/travelstyle.router')
const cityRoute = require('./routes/city.router')
const areaRouter = require('./routes/area.router')
const tourListRoute = require('./routes/tourlist.router')
const tourDetailRoute = require('./routes/tourdetail.router')
const uploadRoute = require('./routes/upload.router')
const mailRoute = require('./routes/automaticemail.router')
const hotelRoute = require('./routes/hotel.router')
const supplierRoute = require('./routes/supplier.router')
const packageRoute = require('./routes/package.router')
const roomtypeRoute = require('./routes/roomtype.router')
const optionServiceRoute = require('./routes/optionservice.router')

app.set('view engine','pug');
app.set('views','./views');

// ****************ROUTER****************
app.use('/main',mainRoute);
app.use('/destination',destinationRoute);
app.use('/travelstyle',travelStyleRoute);
app.use('/city',cityRoute);
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

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.get('/', (req,res) =>{
    res.send('hello world')
})

app.listen(port,() => console.log('Server run'))