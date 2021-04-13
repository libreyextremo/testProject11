const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and model
const ClientModelSchema = new Schema({
  company_nif: String,
  company_name: String,
  company_type: String,
  company_num_employees: Number,
  company_balance: Number,
  company_cnae: Number,
  company_address: String,
  company_phone: String,
  company_city: String,
  company_state: String,
  company_postal_code: Number,
  company_country: String,
  company_email: String,
  company_year_of_creation: Number,
  company_isActive: Boolean,
  company_picture: String
});

// set relation between ClientModelSchema and clientmodel
const ClientModel = mongoose.model('clientmodel', ClientModelSchema);

module.exports = ClientModel;
