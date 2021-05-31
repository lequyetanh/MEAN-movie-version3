let express = require('express');
let app = express();
let movieRoute = express.Router();
let movieModel = require('../model/MovieModel');

let cors = require('cors');
// movieRoute.use(cors({
//   origin: [
//     "*"
//   ],
//   credentials: true
// }));

movieRoute.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  next();
});

// Get all movie
movieRoute.route('/').get((req, res) => {
  movieModel.find().sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});

movieRoute.route('/get40phimle').get((req, res) => {
  movieModel.find().limit(40).sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});

movieRoute.route('/get4samemovie/:genre').get((req, res) => {
  movieModel.find({
    genre: req.params.genre
  }).limit(4).sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});

movieRoute.route('/get15phim').get((req, res) => {
  movieModel.find().limit(15).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});


movieRoute.route('/update/:id').put((req, res, next) => {
  $old = movieModel.find({
    id: req.params.id
  });
  movieModel.updateOne($old, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      // console.log(error)
    } else {
      res.json(data)
      // console.log('Data updated successfully')
    }
  })
});

// Get 8 movie bộ
movieRoute.route('/get12phimbo').get((req, res) => {
  movieModel.find({
    category: "phim bộ"
  }).sort({
    id: -1
  }).limit(12).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});

movieRoute.route('/get18phimhoathinh').get((req, res) => {
  movieModel.find({
    genre: "Hoạt Hình"
  }).sort({
    id: -1
  }).limit(18).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});

movieRoute.route('/get18phimmoi').get((req, res) => {
  movieModel.find().sort({
    id: -1
  }).limit(18).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.json(data)
    }
  })
});

// Get 8 movie lẻ
movieRoute.route('/get12phimle').get((req, res) => {
  movieModel.find({
    category: "phim lẻ"
  }).sort({
    id: -1
  }).limit(12).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

movieRoute.route('/get6phimchieurap').get((req, res) => {
  movieModel.find({
    IMDb: {
      $gt: 1
    }
  }).sort({
    id: -1
  }).limit(6).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get 10 movie bộ xem nhiều nhất
movieRoute.route('/get10phimbo').get((req, res) => {
  movieModel.find({
    category: "phim bộ"
  }).sort({
    views: -1
  }).limit(10).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

movieRoute.route('/get10phimchieurap').get((req, res) => {
  movieModel.find({
    IMDb: {
      $gt: 1
    }
  }).sort({
    views: -1
  }).limit(10).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

movieRoute.route('/get10phimsapchieu').get((req, res) => {
  movieModel.find().sort({
    release_year: -1
  }).limit(10).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get 10 movie lẻ xem nhiều nhất
movieRoute.route('/get10phimle').get((req, res) => {
  movieModel.find({
    category: "phim lẻ"
  }).sort({
    views: -1
  }).limit(10).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// create movie
movieRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  movieModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Delete movie
movieRoute.route('/delete/:id').delete((req, res, next) => {
  // console.log("movie delete");
  movieModel.deleteOne({
    id: req.params.id
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.send(data)
      // console.log("success delete");
    }
  })
})

// Get one movie
movieRoute.route('/detailmovie/:id').get((req, res) => {
  movieModel.find({
    id: req.params.id
  }).sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

movieRoute.route('/detailmovie/samemovie/:release_year').get((req, res) => {
  movieModel.find({
    release_year: req.params.release_year
  }).limit(8).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})


// search one movie
movieRoute.route('/:name').get((req, res) => {
  // console.log(req.params.name);
  let name = req.params.name;
  // movieModel.find({name:{ $regex: `${name}.*`}}).sort({id: -1}).exec(function(error, data) {
  movieModel.find({
    name: {
      $regex: `${name}gi`
    }
  }).sort({
    id: -1
  }).exec(function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})

movieRoute.route('/get6phimtuongtu/:category').get((req, res) => {
  // console.log(req.params.name);
  let category = req.params.category;
  // movieModel.find({name:{ $regex: `${name}.*`}}).sort({id: -1}).exec(function(error, data) {
  movieModel.find({
    category: category
  }).sort({
    id: -1
  }).limit(6).exec(function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.send(data);
    }
  })
})

// get genre movie
movieRoute.route('/type/:typeName').get((req, res) => {
  if (req.params.typeName == 'phim chiếu rạp') {
    movieModel.find({
      IMDb: {
        $gt: 1
      }
    }).sort({
      id: -1
    }).exec((error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
  } else {
    if (req.params.typeName == 'phim mới') {
      movieModel.find().sort({
        id: -1
      }).exec((error, data) => {
        if (error) {
          return next(error)
        } else {
          return res.json(data)
        }
      })
    } else {
      movieModel.find({
        $or: [{
            genre: req.params.typeName
          },
          {
            country: req.params.typeName
          },
          {
            category: req.params.typeName
          },
        ]
      }).sort({
        id: -1
      }).exec(function (err, data) {
        return res.send(data);
      })
    }
  }
})

movieRoute.route('/type/:typeName/2019').get((req, res) => {
  movieModel.find({
    category: req.params.typeName,
    release_year: "2019"
  }).sort({
    id: -1
  }).exec(function (err, data) {
    // console.log("data");
    res.send(data);
  })
})

// get theater
movieRoute.route('/theater').get((req, res) => {
  movieModel.find({
    theater: true
  }).sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.send(data)
    }
  })
})

module.exports = movieRoute;