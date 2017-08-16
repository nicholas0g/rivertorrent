var express = require('express');
var router = express.Router();
var request=require('request');
router.get('/:filtro/:pg',function(req,res,next){
  var page=parseInt(req.params['pg']);
  var standard=['rating','trending','name','year'];
  var url='http://demo.nicholasgiordano.it/trapi/movies/'+page+'?sort='+req.params['filtro'];
  if(standard.indexOf(req.params['filtro'])==-1) url='http://demo.nicholasgiordano.it/trapi/movie/'+page+'?sort=rating&genre='+req.params['filtro'];
  request.get(url,function(err,response,body){
    var payload;
    try{
    payload=JSON.parse(body);
    request.get('http://demo.nicholasgiordano.it/trapi/movies/',function(err,resp,data){
      var prima,dopo;
      var totale=JSON.parse(data).length;
      if(page==1) prima=1;
      else prima=page-1
      if(page==totale) dopo=totale;
      else dopo=page+1;
      var righe=[];
      var n=0;
      for(var i=0;i<13;i++){
        righe[i]=[];
        for(var j=0;j<4;j++){
          righe[i].push(payload[n])
          n++;
        }
      }
      res.render('film_page',{ora:page,totale:totale,prima:prima,dopo:dopo,righe:righe,tipo:req.params['filtro']});
    })
    }catch(err){
      res.render('oos');
    }
  });
})
router.post('/ricerca',function(req,res,next){
  var page=1;
  var chiave=req.body.nome.replace(" ","+")
  var url='http://demo.nicholasgiordano.it/trapi/movies/1?keywords='+chiave;
  request.get(url,function(err,response,body){
    var payload=JSON.parse(body);
    request.get('http://demo.nicholasgiordano.it/trapi/movies/',function(err,resp,data){
      var prima,dopo;
      var totale=JSON.parse(data).length;
      if(page==1) prima=1;
      else prima=page-1
      if(page==totale) dopo=totale;
      else dopo=page+1;
      var righe=[];
      var n=0;
      for(var i=0;i<13;i++){
        righe[i]=[];
        for(var j=0;j<4;j++){
          righe[i].push(payload[n])
          n++;
        }
      }
      res.render('film_page',{ora:page,totale:totale,prima:prima,dopo:dopo,righe:righe,tipo:'trending'});
    })
  });
})

router.get('/info/:id/al',function(req,res,next){
  var id=req.params['id'];
  request.get('http://demo.nicholasgiordano.it/trapi/movie/'+id,function(err,resp,body){
    var payload=JSON.parse(body);
    res.render('film',{dati:payload})
  })
});
module.exports = router;
