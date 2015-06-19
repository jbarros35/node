var express = require('express');
var models = require('../models');
var jwt    = require('jsonwebtoken');
var secret = require('./security');
var router = express.Router();

/* GET users listing. */
// route to return all users (GET http://localhost:8080/api/users)
router.get('/', function(req, res) {
    res.json({name: 'NickCerminara', 
    password: 'password',
    admin: true });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
	
	models.User.findOne({
		where:{
			email:req.body.email,password:req.body.password
		}
	}).then(function(user){
		if (user) {
			// if user is found and password is right
			// create a token
			var token = jwt.sign(user, secret.key, {
			  expiresInMinutes: 1440 // expires in 24 hours
			});
			// persist token state
			user.updateAttributes({token:token}).then(function(result){
				// return the information including token as JSON
				res.json({
				  success: true,
				  message: 'Enjoy your token!',
				  token: token
				});
			});
			
		} else {
			res.json({ success: false, message: 'Authentication failed. Wrong password.' });	
		}
    });
	
});

router.get('/me', secret.ensureAuthorized, function(req, res) {
    models.User.findOne({token: req.token})
		.then(function(user) {
        if (!user) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: {
					id:user.id,
					email:user.email
				}
            });
        }
		});
});

module.exports = router;
