const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

const mainRoute = require('./routes/main.router')
const destinationRoute = require('./routes/destination.router')
const travelStyleRoute = require('./routes/travelstyle.router')
const cityRoute = require('./routes/city.router')
const tourListRoute = require('./routes/tourlist.router')

app.set('view engine','pug');
app.set('views','./views');

// ****************ROUTER****************
app.use('/main',mainRoute);
app.use('/destination',destinationRoute);
app.use('/travelstyle',travelStyleRoute);
app.use('/city',cityRoute);
app.use('/tourlist',tourListRoute);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.get('/', (req,res) =>{
    res.send('hello world')
})

app.listen(port,() => console.log('Server run'))