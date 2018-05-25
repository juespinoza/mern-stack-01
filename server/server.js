// Import libs***************
const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');
// Const declaration*********
const app = express();

// Settings *****************
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));

// static files
// app.use('/modules',express.static(path.join(__dirname, 'node_modules')))

// Routes********************
app.use('/', router);

module.exports=app;