var express = require('express');
var router = express.Router();
var request=require('request');
router.get('/',function(req,res,next){
  request.get('https://tv-v2.api-fetch.website/status',function(err,response,body){
    var payload={'status':'N/A','totalMovies':'N/A','totalShows':'N/A'};
    try{
      var payload=JSON.parse(body);
    }
    catch(err){
      
    }
    res.render('index',{status:payload['status'],film:payload['totalMovies'],serie:payload['totalShows']});
  });
});
module.exports = router;
