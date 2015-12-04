var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('dbui', 'postgres', 'postgres', {dialect: 'postgres', port: 5432});
var Bbinfo = require('../models/bbInfo');
/* POST bbinfo listing. */
router.post('/', function(req, res, next) {
      console.log(req.body);
      var data = req.body;
      res.send(data);
       Bbinfo.create({istext: data["isItText"], text: data["Text"], pageno: data["FontSize"], keywords: data["keywords"], bbcoordinates: data["position"]}).then(function(data){
	res.send(data);
});
});



module.exports = router;
