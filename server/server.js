// Import libs***************
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
//bodyparser - No need it body-parser since express 4.16.2
const router = require('./routes/routes.js');

// Const declaration*********
const app = express();
const configDB = require('./config/database.js');

// Utilizar las promesas de node
mongoose.Promise = global.Promise;
// connect to our database
mongoose.connect(configDB.url, { 
	useMongoClient: true
});
mongoose.connection.on('error', (err) => {
	throw err;
	process.exit(1);
	// En caso de error, detener
});

// Settings *****************
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json({limit: '50mb'})); // No need it body-parser since express 4.16.2
app.use(express.urlencoded({limit: '50mb', extended: false}));
/*app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));*/

// static files
// app.use('/modules',express.static(path.join(__dirname, 'node_modules')))

// Routes********************
app.use('/', router);

module.exports=app;