"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
	  id: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.TEXT     
  }
  , {
    timestamps: false
	}
  );
  // create tables
  User.sync()
	.then(function(){
		console.log('table created');
	});
  return User;
};