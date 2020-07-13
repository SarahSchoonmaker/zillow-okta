var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.userContext) {
    res.render('index.pug', { title: 'Okta Zillow', user: req.userContext });
  } else {
    res.render('login.pug', { title: 'Okta Zillow' })
  }
});



module.exports = router;
