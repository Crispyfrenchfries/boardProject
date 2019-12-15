var express = require('express');
var router = express.Router();
var db = require('../db/db');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/join', function(req, res, next) {
  res.render('user_join', {title:'회원가입',});
});

router.post('/join_process', function(req,res){
  var body = req.body;
  var id = body.id;
  var pwd = body.pwd;
  var name = body.name;
  db.query(`
  INSERT INTO user (id,name,pwd) VALUES(?,?,?)`,[id,name,pwd],function(err, result){
    console.log(result);
    res.writeHead(302,{location:`/`});
    res.end('');
  }); 
});

module.exports = router;