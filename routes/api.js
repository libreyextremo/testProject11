const express = require('express');
const router = express.Router();
const ClientModel = require('../models/client_model.ns');

// set reply to "localhost:4000/" get request
// req: request information
// res: response to the request
router.get('/', function(req, res){
  console.log('GET request');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  res.send("<html><body><h1>Welcome to SimpleClientDB</h1><p>by JM Sobrinos</p></body></html>");
});

// set reply to "localhost:4000/clients" get request
// it also may receive two parameters lng y lat:
// localhost:4000/api/clients?lng=39.9643928&lat=-4.8250243
// get client list from the db
router.get('/clients', function(req, res, next){
  console.log('GET /clients request');
  console.log('lng = ' + req.query.lng);
  console.log('lat = ' + req.query.lat);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  if ((req.query.lng != null) && (req.query.lat != null)) {
    console.log('lng != null AND lat != null');
    ClientModel.geoNear(
      {type: 'Point', coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
      {maxDistance: 3000, spherical: true} // 3000 meters = 3 km
    ).then(function(listClients){
      res.send(listClients);
    }).catch(next);

  } else {

    console.log('lng == null OR lat == null');
    ClientModel.find({}).then(function(listClients){
      res.send(listClients);
    }).catch(next);

  };

});

// add a new client to the db
router.post('/clients', function(req, res, next){
  console.log('POST /clients request');
  //var newClient = new ClientModel(req.body);
  //newClient.save();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  ClientModel.create(req.body).then(function(newClient){
    res.send(newClient);
  }).catch(next);

});

// update a client in the db
router.put('/clients/:id', function(req, res, next){
  console.log('PUT /clients request');
  console.log('params: id = ' + req.params.id);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  ClientModel.findByIdAndUpdate({_id: req.params.id},req.body).then(function(updatedClient){
    ClientModel.findOne({_id: req.params.id}).then(function(updatedClient){
      res.send(updatedClient);
    }).catch(next);
  }).catch(next);
});

// delete a client in the db
router.delete('/clients/:id', function(req, res, next){
  console.log('DELETE /clients request');
  console.log('params: id = ' + req.params.id);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  ClientModel.findByIdAndRemove({_id: req.params.id}).then(function(deletedClient){
    res.send(deletedClient);
  }).catch(next);
});

module.exports = router;
