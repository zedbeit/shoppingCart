const express = require('express');
const path = require('path');
require('./db/mongoose');
const pagesRouter = require('./routes/pages');
const adminRouter = require('./routes/admin_pages');
const bodyParser = require('body-parser');
const session = require('express-session');

const port = 5000;

const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../views');


// init app
const app = express();

// public folder setup
app.use(express.static(publicDir));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// routes setup 
app.use('/admin/pages', adminRouter);
app.use('/', pagesRouter);

// Body-parser middleware
// 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express-session middleware
// 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});