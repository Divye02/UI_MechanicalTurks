var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
      console.log(req.body);
      var data = req.body;
      res.send(data);
});



module.exports = router;
