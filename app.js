var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var societyRouter = require('./routes/society');
var membersRouter = require('./routes/members');

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/society');

const connection=mongoose.connection;

connection.once('open',()=>{
    console.log('Connection esteblished successfully');
});

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/societies', societyRouter);
app.use('/members', membersRouter);

module.exports = app;
