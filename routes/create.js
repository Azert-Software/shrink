var express = require('express');
var validUrl = require('valid-url');
var models  = require('../models');
var router = express.Router();

router.post('/create', function(req, res) {
  var url = req.body.url;

  if (validUrl.isWebUri(url)){
    var shortUrl = createReference();

    var today = new Date();
       models.Urls.create(
         {
           reference:shortUrl,
           url:url,
           hits:0,
           dateAdded:today
         }
       ).success(function(){
         res.render("home",{
           providedUrl:url,
           short:"http://" + req.headers.host + "/" + shortUrl
         });
       });
   } else {
       console.log('Not a URI');
       res.render("home",{
         message:"Url provided, " + url + " is not a valid url, ensure it matches the format http://www.domain.com, http://www.domain.co.uk etc.",
         providedUrl:url
       })
   }
});

function createReference(){

  var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l']
  var epoch = new Date().getTime().toString().split("");

  var reference = "";

  for(var i = 0;i < epoch.length;i++){
    reference += alpha[epoch[i]];
  }

  return reference;
}

module.exports = router;
