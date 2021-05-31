let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let countryModelSchema = new Schema({
  id:Number,
  name:String
},{
  collection: 'countries'
})
module.exports = mongoose.model('country', countryModelSchema);
