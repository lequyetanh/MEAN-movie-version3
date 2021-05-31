let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categoryModelSchema = new Schema({
  id:Number,
  name:String
},{
  collection: 'categories'
})
module.exports = mongoose.model('category', categoryModelSchema);
