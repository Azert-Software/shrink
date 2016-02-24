var express = require('express');
var router = express.Router();
var validator = require('validator');
var models  = require('../models');
var urls = models.Urls;

router.get('/stats/view',function(req,res,next){
    res.render("stats");
});

router.post('/stats/view', function(req, res,next) {
    var ref = escape(req.body.reference);

    if(!ref.length){
      res.render("stats",{message:"Provide a reference before submitting."})
      return;
    }

    var url = urls.findOne({
      where:{
        reference:ref
      }
    }).then(function(foundUrl){
      if(foundUrl == null)
      {
        res.render("stats",{message:"The short url provided" + ref + "has not been found"});
        return;
      }

      var hits = foundUrl.hits;

      res.render("stats",
      {
        posted:true,
        hits:hits
      });
    });
});

module.exports = router;
