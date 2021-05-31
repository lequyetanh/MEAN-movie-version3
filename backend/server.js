let express = require('express');
var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let path = require('path');
const mongoose = require('mongoose');
let database = require('./database/db');
const session = require('express-session');
const jwt = require('jsonwebtoken');
let cors = require('cors');
let app = express();
app.use(cookieParser());
let router = express.Router();
const multer = require('multer');


// app.use(cors({
//   origin: [
//     "https://lequyetanh.github.io"
//   ],
//   credentials: true
// }));

const http = require('http');
const ngrok = require('ngrok');



app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  next();
});

const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.json());


const port = 4000;
app.listen(process.env.PORT || port, (err) => {
  if (err) return 
  // console.log(`Something bad happened: ${err}`);
  // console.log(`Node.js server listening on ${port}`);
});


// ===========================================================

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
    console.log('Database sucessfully connected')
  },
  error => {
    console.log('Database could not connected: ' + error)
  }
)


app.use(express.json({
  extended: false
}));

let movie = require('./data/movie1');
let movieModel = require('./model/MovieModel');
// movieModel.create(movie);
let movieRoute = require('./routes/movie.route');
app.use('/movie', movieRoute);

let category = require('./data/category');
let categoryModel = require('./model/CategoryModel');
// categoryModel.create(category);
let categoryRoute = require('./routes/category.route');
app.use('/category', categoryRoute);

let country = require('./data/country');
let countryModel = require('./model/CountryModel');
// countryModel.create(country);
let countryRoute = require('./routes/country.route');
app.use('/country', countryRoute);

let user = require('./data/user');
let userModel = require('./model/UserModel');
// userModel.create(user);
let userRoute = require('./routes/user.route');
app.use('/user', userRoute);


// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
