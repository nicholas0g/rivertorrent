var express = require('express');
var router = express.Router();
var request=require('request');
router.get('/',function(req,res,next){
  request.get('http://demo.nicholasgiordano.it/trapi/status',function(err,response,body){
    var payload={'status':'N/A','totalMovies':'N/A','totalShows':'N/A'};
    try{
      var payload=JSON.parse(body);
    }
    catch(err){
      
    }
    res.render('index',{status:payload['status'],film:payload['totalMovies'],serie:payload['totalShows']});
  });
});
router.get('/film/:pg',function(req,res,next){
  res.send('non disponibile')
})
module.exports = router;
