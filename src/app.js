const express = require('express');
const path = require('path');
require('./db/mongoose');
const multer  = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');

// Routes
const pagesRouter = require('./routes/pages');
const adminRouter = require('./routes/admin_pages');
const categoriesRouter = require('./routes/admin_categories');
const adminProductsRouter = require('./routes/admin_products');

const port = 5000;

const publicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../views');


// init app
const app = express();

app.locals.errors = null;

// Body parser middleware
// 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use(express.json());

// public folder setup
app.use(express.static(publicDir));

// Multer middleware
const upload = multer({ dest: 'uploads/' });

// view engine setup
app.set('view engine', 'ejs');
app.set('views', viewsPath);

// routes setup 
app.use('/admin/pages', adminRouter);
app.use('/admin/categories', categoriesRouter);
app.use('/admin/products', adminProductsRouter);
app.use('/', pagesRouter);

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