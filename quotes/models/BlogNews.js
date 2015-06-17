"use strict";
/*
CREATE TABLE blognews
(
  newid serial NOT NULL,
  active boolean,
  imageurl character varying(255),
  postdate timestamp without time zone,
  title character varying(255),
  shortdescription character varying(255),
  text character varying(255),
  CONSTRAINT blognews_pkey PRIMARY KEY (newid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE blognews
  OWNER TO postgres;*/
  
module.exports = function(sequelize, DataTypes) {
  var BlogNews = sequelize.define("blognews", {
	  newid: {
		type:DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
		author: DataTypes.STRING,
		message: DataTypes.TEXT, 
		active: DataTypes.BOOLEAN,
		imageurl: DataTypes.STRING,
		postdate: DataTypes.DATE,
		title: DataTypes.STRING,
		shortdescription: DataTypes.STRING,
		text: DataTypes.TEXT	 
  }
  , {
    timestamps: false
	}
  );
  // create tables
  BlogNews.sync()
	.then(function(){
		console.log('table created');
	});
  return BlogNews;
};