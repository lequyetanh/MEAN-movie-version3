let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userModelSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  like: Array,
  love: Array,
  password: String,
  watchLater: Array,
  favorite: Array,
  avatar: String,
},{
   collection: 'users'
})
module.exports = mongoose.model('user', userModelSchema);
