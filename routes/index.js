var express = require('express');
var Client = require('node-rest-client').Client;
var fs = require("fs");
var guid=require('guid');
var router = express.Router();
var client = new Client();
var ejs = require('ejs');

function test(){
    fs.readFile('../views/index.html','utf-8',function(err,data){

        var data = ejs.render('index');
    });

}

//test();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isLogin){


      res.render('index');
  }
  else
    res.redirect('/login');
});

router.get('/reporth5', function(req, res, next) {
        res.render('reporth5');
});


module.exports = router;
