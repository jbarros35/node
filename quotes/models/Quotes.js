"use strict";
module.exports = function(sequelize, DataTypes) {
  var Quotes = sequelize.define("quotes", {
	  id: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
     author: DataTypes.STRING,
	 message: DataTypes.TEXT  
  }
  , {
    timestamps: false
	}
  );
  // create tables
  Quotes.sync()
	.then(function(){
		console.log('table created');
	});
  return Quotes;
};