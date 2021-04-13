// require express so we can use it
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');

// create and set up express app
const app = express();

mongoose.connect('mongodb://localhost/simpleclientdb');
mongoose.Promise = global.Promise;

// use express.static to make "public" folder use
// static files services (css, images, html...)
app.use(express.static('public'));

app.use(bodyParser.json());

// use routes defined in files
app.use('/api', routes);

//error handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 4000, function(){
  console.log('Express is ready. Listening for requests...')
});
