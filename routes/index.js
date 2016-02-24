var express = require('express');
var router = express.Router();
var models  = require('../models');
var urls = models.Urls;

/* GET home page. */
router.get('/:reference', function(req, res, next) {
  var urlReference = req.params.reference;

  console.log('searching')
  var url = urls.findOne({
    where:{
      reference:urlReference
    }
  }).then(function(foundUrl){
    if(foundUrl == null)
    {
      res.render("error",{message:"The short url provided" + urlReference + "has not been found"});
      return;
    }

      var hits = foundUrl.hits;
      hits = hits + 1;

      urls.update({
        hits:hits},{
        where:{
          reference:urlReference
        }
      });
    res.redirect(foundUrl.url);
  });


//  res.redirect(url.url);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;
