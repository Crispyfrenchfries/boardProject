var express = require('express');
var router = express.Router();
var db = require('../db/db');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/list/:page', function(req, res){
  var page = req.params.page;
  db.query(`SELECT * FROM post`,function(err,result){
    res.render('post/page', {post:result, page:page, length:result.length-1, page_num:5,title:'글 목록'});
  });
});

router.get('/contents/', function(req, res){
  db.query(`SELECT * FROM post`, function(err1, posts){
    db.query(`SELECT * FROM post WHERE index_post=?`,[req.query.id],function(err2, post){
      res.render('post/post',{title:'글 내용',list:posts, post:post})
    });
  })
});

router.get('/update',function(req,res){
  db.query(`SELECT * FROM post WHERE index_post=?`,[req.query.id],function(err,post){
    res.render('post/post_update',{title:'글 수정', post:post})
  });
});

router.post('/update_process',function(req,res){
  var body = req.body;
  var title = body.title;
  var description = body.description;
  db.query(`UPDATE post SET title=?, description=?, user_id=1 WHERE index_post=?`,[title,description,body.index],function(err,result){
    res.writeHead(302, {location:`/post/contents?id=${body.index}`});
    res.end('');
  });
});

router.post('/delete_process', function(req,res){
  var body = req.body;
  db.query(`DELETE FROM post WHERE index_post=?`,[body.id],function(err, result){
    res.writeHead(302, {location:`/`});
    res.end('success');
  });
});

router.get('/create', function(req,res){
  res.render('post/post_create',{title:'글 생성'});
});

router.post('/create_process', function(req,res){
  var body = req.body;
  var title = body.title;
  var description = body.description;
  db.query(`
  INSERT INTO post (title, description,  datetime, user_id) VALUES(?,?,NOW(),?)
  `,[title,description,1],function(err,result){
    console.log(result.insertId);
    res.writeHead(302, {location:`/post/contents?id=${result.insertId}`});
    res.end('success');
  });
});
module.exports = router;