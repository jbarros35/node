//express
var express = require('express');
var router = express.Router();
var models = require('../models');

// INIT QUOTES
// get all quotes
router.get('/', function(req, res) {
	models.Quotes.findAll({limit:10}).then(function(quotes) {        
		res.json(quotes);
    });		 
});
// get quote
router.get('/:id', function(req, res) {
	models.Quotes.findById(req.params.id).then(function(quotes) {        
		res.json(quotes);
      });
});
// create quote
router.post('/', function(req, res) {
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('message')) {
	res.statusCode = 400;
	return res.send('Error 400: Post syntax incorrect.');
  }
	var quote = models.Quotes.build();
	quote.updateAttributes({
		author: req.body.author,
		message: req.body.message  
	});

  res.json(quote);
});
// delete quote
router.delete('/:id', function(req, res) {
	models.Quotes.findById(req.params.id).then(function(quote){
		if (quote) {
			quote.destroy({ force: true }).then(function(result){
				res.json('ok');
			});
		} else {
			res.json('quote not exists')
		}		
	});
});
// update quote
router.put('/:id', function(req, res) {
  if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('message')) {
	res.statusCode = 400;
	return res.send('Error 400: Post syntax incorrect.');
  }
	models.Quotes.findById(req.params.id).then(function(quote){
		if (quote) {
			quote.updateAttributes(
			{
				author:req.body.author,
				message:req.body.message
			}).then(function(result){
				console.log(result);
				res.json('update ok');
			});
		} else {
			res.json('quote not exists')
		}		
	});
});
module.exports = router;