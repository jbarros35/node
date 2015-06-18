//express
var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt    = require('jsonwebtoken');

// INIT QUOTES
// get all BlogNews
router.get('/', function(req, res) {
	models.BlogNews.findAll({limit:10}).then(function(blognews) {
		res.json(blognews);
    });		 
});

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
	var secret = require('./routes/security');
    // verifies secret and checks exp
    jwt.verify(token, secret.key, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
		console.log('token validated');
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

// get BlogNews
router.get('/:id', function(req, res) {
	models.BlogNews.findById(req.params.id).then(function(blognews) {        
		res.json(blognews);
      });
});
// create blog
router.post('/', function(req, res) {
	var quote = models.BlogNews.build();
	quote.updateAttributes({
		author: req.body.author,
		message: req.body.message, 
		active: req.body.active,
		imageurl: req.body.imageurl,
		postdate: req.body.postdate,
		title: req.body.title,
		shortdescription: req.body.shortdescription,
		text: req.body.text
	});

  res.json(quote);
});
// delete quote
router.delete('/:id', function(req, res) {
	models.BlogNews.findById(req.params.id).then(function(blognews){
		if (blognews) {
			blognews.destroy({ force: true }).then(function(result){
				res.json('ok');
			});
		} else {
			res.json('quote not exists')
		}		
	});
});
// update quote
router.put('/:id', function(req, res) {
	models.BlogNews.findById(req.params.id).then(function(blognews){
		if (blognews) {
			blognews.updateAttributes({
				author: req.body.author,
				message: req.body.message, 
				active: req.body.active,
				imageurl: req.body.imageurl,
				postdate: req.body.postdate,
				title: req.body.title,
				shortdescription: req.body.shortdescription,
				text: req.body.text
				}
			).then(function(result){				
				res.json('update ok');
			});
		} else {
			res.json('blognews not exists')
		}		
	});
});
module.exports = router;