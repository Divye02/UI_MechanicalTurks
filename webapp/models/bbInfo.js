var Sequelize = require('sequelize');
var sequelize = new Sequelize('dbui', 'postgres', 'postgres', {dialect: 'postgres', port: 5432});
var bbInfo = sequelize.define('boundingbox', {
	istext: {
		type: Sequelize.BOOLEAN
	},
	text:{
		type: Sequelize.TEXT
	},
	pageno:{
		type: Sequelize.INTEGER
	},
	keywords:{
		type: Sequelize.ARRAY(Sequelize.TEXT) 
	},
	bbcoordinates:{
		type: Sequelize.ARRAY(Sequelize.INTEGER) 
	}	


	},

	{
	  freezeTableName: true // Model tableName will be the same as the model name
	});
module.exports = bbInfo;
