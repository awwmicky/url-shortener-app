const env = process.env.NODE_ENV || 'development';
const key = require('../config/knexfile.js')[env];
const connection = require('knex')(key);
const { Model } = require('objection');
module.exports = { Model,connection };