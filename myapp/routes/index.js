var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query(`SELECT *FROM post`, function(err, posts){       res.render('index',{ title: '게시판',sub_title:'홈 화면',posts:posts});
  });
});



module.exports = router;
