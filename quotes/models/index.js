var Sequelize = require('sequelize');
var config    = require('../config');  // we use node-config to handle environments

// initialize database connection
var sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password, {
	  dialect: 'postgres',  
	  host: config.database.host,
	  port: config.database.port,
	  autoIncrement: true,
	  omitNull: true	  
  ,
  pool: {
    max: 15,
    min: 0,
    idle: 10000
  },
});

// load models
var models = [
  'Quotes', 'BlogNews' 
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships

// export connection
module.exports.sequelize = sequelize;