const mocha = require('mocha');
const assert = require('assert');
const ClientModel = require('../models/client_model.ns');

//describe client model tests
describe('Client collection tests', function(){

  //tests
  it('hello world test', function(){
    assert('hello world' === 'hello world');
  });

  // saving a record in client collection
  it('Saving a record in client collection', function(done) {

    var clientRecord = new ClientModel({
      company_nif: 'A04113630',
      company_name: 'Elico S.L.',
      company_type: 'Professional services',
      company_num_employees: 10,
      company_balance: 3040,
      company_cnae: 4001,
      company_address: '20, Francisco Quevedo Street',
      company_phone: '+34925909080',
      company_city: 'Talavera',
      company_state: 'Toledo',
      company_postal_code: 45600,
      company_country: 'Spain',
      company_email: 'maindirector@elico.com',
      company_year_of_creation: 1998,
      company_isActive: true,
      company_picture: ''
    });

    clientRecord.save().then(function () {
      assert(clientRecord.isNew === false);
      done();
    });

  });

});
