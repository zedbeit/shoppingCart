const express = require('express');
const path = require('path');


const port = 5000;

const publicDir = path.join(__dirname,'../public');


// init app
const app = express();

// public folder setup
app.use(express.static(publicDir));

// view engine setup
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
});