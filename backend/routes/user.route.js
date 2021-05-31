let express = require('express');
let userRoute = express.Router();
var userModel = require('../model/UserModel');
let cors = require('cors');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
userRoute.use(cookieParser());
userRoute.use(cors({
  origin: [
    "*"
  ],
  credentials: true
}));


// userRoute.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
//   res.setHeader('Access-Control-Allow-Credentials', true); // If needed
//   next();
// });

// Get all User
userRoute.route('/').get((req, res) => {
  userModel.find().sort({
    id: -1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


userRoute.route('/login').get((req, res, next) => {

});

let checkLogin = (req, res, next) => {
  var token = req.headers['authorization'];
  // console.log(token);
  try {
    // console.log(req.Cookies.token);
    // var token = req.Cookies.token;
    var data = jwt.verify(token, "secret");
    // console.log("token verify: " + data.name);
    userModel.findOne({
      name: data.name
    }).then(user => {
      // console.log(user);
      if (user) {
        req.data = user;
        next()
      }
    })
  } catch (error) {
    // console.log("email or password incorrect")
    return res.send({
      loggedIn: false
    })
  }
}

let checkAdmin = (req, res, next) => {
  if (req.data.name == 'Lê Quyết Anh') {
    return res.send({
      user: req.data,
      loggedIn: req.data.name
    })
  } else {
    // console.log("You have not permission")
    return res.send({
      loggedIn: false
    });
  }
}

userRoute.route('/checkUser').get(checkLogin, (req, res) => {
  return res.send({
    user: req.data,
    loggedIn: req.data.name
  });
});

userRoute.route('/checkAdmin').get(checkLogin, checkAdmin, (req, res) => {

});

userRoute.route('/login').post((req, res, next) => {
  // console.log("login")
  let email = req.body.email;
  let password = req.body.password;

  // console.log(req.body);

  userModel.findOne({
    email: email,
    password: password,
  }).exec((error, data) => {
    if (error) {
      console.log("error");
      return next(error);
    } else {
      // console.log(data);
      let token = jwt.sign({
        name: data.name
      }, "secret", (error, token) => {
        // console.log("token sign: " + token)
        res.send({
          token: token,
          loggedIn: data.name
        })
      })
    }
  })
});

userRoute.route('/loginWithSocial').post((req, res, next) => {
    console.log(req.body.email)
    let email = req.body.email;

    // console.log(email);

    userModel.findOne({
      email: email
    }).exec((error, data) => {
      if (error) {
        console.log("error");
        return next(error);
      } else {
        // console.log(data);
        let token = jwt.sign({
          name: data.name
        }, "secret", (error, token) => {
          // console.log("token sign: " + token)
          res.send({
            token: token,
            loggedIn: data.name
          })
        })
      }
    })
  });

userRoute.route('/logout').get((req, res) => {
  var token = req.headers['authorization'];
  res.send({
    token: token,
    loggedIn: false
  })
});



userRoute.route('/detailUser/:id').get((req, res) => {
  userModel.find({
    id: req.params.id
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

userRoute.route('/detailUser/name/:name').get((req, res) => {
  userModel.find({
    name: req.params.name
  }).exec((error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.send(data)
    }
  })
})

userRoute.route('/create').post((req, res, next) => {
    // console.log(req.body);
    userModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

userRoute.route('/favorite').get((req, res) => {
  // console.log("favorite: " + req.session.user);
  userModel.find({
    email: req.session.user
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      // console.log(data);
    }
  })
});

userRoute.route('/admin').get((req, res) => {
  // console.log("favorite: " + req.session.user);
  if (req.session.user == "lequyetanh@gmail.com") {
    res.send({
      admin: true
    })
  } else {
    res.send({
      admin: false
    })
  }
});

userRoute.route('/all').get((req, res) => {
  userModel.find().sort({
    id: 1
  }).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      // console.log(data);
    }
  })
});

userRoute.route('/update/:id').put((req, res, next) => {

  $old = userModel.find({
    id: req.params.id
  });
  // console.log($old);
  // console.log(req.body);
  userModel.updateOne($old, {
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
})

userRoute.route('/addFriend/:id').put((req, res, next) => {
  $old = userModel.find({
    id: req.params.id
  });
  userModel.updateOne($old, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})


userRoute.route('/update/:id/avatar').put((req, res, next) => {
  req.session.newAvatar = req.body.avatar;
  $old = userModel.find({
    id: req.params.id
  });
  // console.log($old);
  // console.log(req.body);
  userModel.updateOne($old, {
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
})

userRoute.route('/create').post((req, res, next) => {
  // console.log(req.body);
  userModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

userRoute.route('/delete/:id').delete((req, res, next) => {
  // console.log("movie delete");
  userModel.deleteOne({
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

module.exports = userRoute;
