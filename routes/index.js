var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set internal DB variable
  var db = req.db;

  // Get form values relying on name attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //Set collection
  var collection = db.get('usercollection');

  //Submit to DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      //If it fails return error
      res.send("There was a problem adding the information to the database");
    }
    else {
      //Send to success page
      res.redirect("userlist");
    }
  });
});

module.exports = router;
