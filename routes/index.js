var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Linkality' });
});

router.get('/plugin', function(req, res, next) {
  console.log(req.query.pop);
  res.render('plugin', { plugin: {title: 'Linkality', content:"inside"} });
});


module.exports = router;
