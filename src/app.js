const express = require('express');
const path = require('path');
require('./db/mongoose');
const pagesRouter = require('./routes/pages');
const adminRouter = require('./routes/admin_pages');


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

// set routes
app.use('/admin/pages', adminRouter);
app.use('/', pagesRouter);

app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});