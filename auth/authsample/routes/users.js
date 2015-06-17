var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var secret = require('./security');
/* GET users listing. */
// route to return all users (GET http://localhost:8080/api/users)
router.get('/', function(req, res) {
    res.json({name: 'NickCerminara', 
    password: 'password',
    admin: true });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
	
	// check if password matches
      if ('123456' != req.body.password && 'user' != req.body.username) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {	  
	  var user = {
			username:req.body.username,
			password:req.bodypassword
		};
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, secret.key, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
});

module.exports = router;
