//express
var express = require('express');
var router = express.Router();
var models = require('../models');

// INIT QUOTES
// get all BlogNews
router.get('/', function(req, res) {
	models.BlogNews.findAll({limit:10}).then(function(blognews) {        
		res.json(blognews);
    });		 
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
	models.Quotes.findById(req.params.id).then(function(blognews){
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
				console.log(result);
				res.json('update ok');
			});
		} else {
			res.json('blognews not exists')
		}		
	});
});
module.exports = router;