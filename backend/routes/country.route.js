let express = require('express');
let countryRoute = express.Router();
let countryModel = require('../model/CountryModel');


countryRoute.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  next();
});

// Get all category
countryRoute.route('/').get((req, res) => {
  countryModel.find().sort({id: 1}).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
});

module.exports = countryRoute;

