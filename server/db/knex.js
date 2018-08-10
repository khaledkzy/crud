const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment]; // environment === 'development' so basically where are getting the first item in the array.
module.exports = require('knex')(config)
