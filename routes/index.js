var express = require('express');
var router = express.Router();
var dateFormat = require("../module/common").dateFormat;
var pool = require("../module/mysql").pool;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: "向上健身俱乐部", nav: "index" });
});

router.get("/tocustomerservice/:targetType?", function (req, res, next) {
  var user = req.cookies.user;
  if (!user) {
    res.redirect("/users/tologin");
  }
  var targetType = req.params.targetType - 0;
  console.log(JSON.parse(user))
  var userType = JSON.parse(user).type;
  var date = new Date();
  var time = dateFormat(date, "yyyy-MM-dd hh:mm:ss");
  pool.query({
    sql: "select id,name,type,createTime from user where type = ?",
    values: [targetType]
  }, (err, results) => {
    if (err) { throw err; res.send({ code: 201, message: "操作错误" }); return; }

    res.render('customerService', { title: "在线客服", serviceName: "客服机器人", time: time, tips: "快打个招呼吧", users: results, userType });
  })
})

router.post("/postConversation", function (req, res, next) {
  var user = req.cookies.user;
  if (!user) {
    res.redirect("/users/tologin");
  }
  var date = new Date();
  var userId = JSON.parse(user).id;
  var content = req.body.content;
  var serviceId = req.body.serviceId;
  var fromId = req.body.fromId;
  var toId = req.body.toId;
  var id = Date.now() + userId + serviceId;
  pool.query({
    sql: "insert into conversation(id,userId,serviceId,content,fromId,toId,createTime) values(?,?,?,?,?,?,?)",
    values: [id, userId, serviceId, content, fromId, toId, date]
  }, (err, results) => {
    if (err) { throw err; res.send({ code: 201, message: "操作错误" }); return; }
    res.send({
      code: 200,
      message: "发送成功"
    })
  })
})

router.get("/getConversation", function (req, res, next) {
  var userId = req.query.userId;
  var serviceId = req.query.serviceId;
  var isLookMore = req.query.isLookMore - 0;
  var limit = "limit 0,4"
  if (isLookMore == 1) {
    limit = "";
  }
  pool.query({
    sql: "select c.id,c.userId,c.serviceId,c.content,c.fromId,c.toId,c.createTime,u.name uname,u.type from conversation c left join user u on c.fromId = u.id where (c.userId = ? and c.serviceId = ?) or (c.userId = ? and c.serviceId = ?) order by createTime desc " + limit,
    values: [userId, serviceId, serviceId, userId]
  }, (err, results) => {
    if (err) { throw err; res.send({ code: 201, message: "操作错误" }); return; }
    res.send({
      code: 200,
      message: "成功",
      conversation: results
    })
  })
})

module.exports = router;
