const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan');
const path = require("path");
require('dotenv/config')
const config = require('./config.json')

const app = express()
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

// routes path
app.use('/admin', require('./router/admin_router'))
app.use('/api', require('./router/user_router'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', 'Content-Type', 'Authorization');
    next()
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('URL Not Found')
    err.status = 400;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
    res.status(200).send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

// listen
app.listen(config.data.PORT, (req) => {
    console.log(`RESTFUL API server running in ${config.data.URL}:${config.data.PORT}`)
})