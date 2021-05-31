let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieModelSchema = new Schema({

  id: Number,
  name: String,
  category:String,
  rate: Number,
  name_image: String,
  vice_name_image:Array,
  real_name:String,
  content:Array,
  status:String,
  IMDb: Number,
  IMDb_vote: Number,
  director:String,
  actor:[String],
  genre: [String],
  country:[String],
  run_time: Number,
  views:Number,
  release_year: Number,
  comment: Array,
  tags:[String],
  rate_vote: Number,
  hrefLink: String,
  trailer: String,
  movie: Array,
},{
   collection: 'movies'
})
module.exports = mongoose.model('movie', movieModelSchema);
