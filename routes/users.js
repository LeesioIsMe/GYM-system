var express = require('express');
var router = express.Router();
var md5 = require("md5");
var getPages = require("../module/common").getPages;
var dateFormat = require("../module/common").dateFormat;
var pool = require("../module/mysql").pool;

var accountPattern = /^1[34578]\d{9}$/;
var passwordPattern = /^(\w){6,18}$/

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/tologin", function (req, res, next) {
  res.render("login", { title: "向上健身俱乐部-VIP登录" })
})
router.get("/toregister", function (req, res, next) {
  res.render("register", { title: "向上健身俱乐部-VIP注册" })
})

router.get("/tospace/:userId", function (req, res, next) {
  var userId = req.params.userId;
  res.render("space", { title: "向上健身俱乐部-个人中心", userId });
})

router.get("/tovipmanage/:pageSize/:pageNow", function (req, res, next) {
  var user = req.cookies.user;
  if (!user) {
    res.redirect("/users/tologin");
    return;
  }
  var pageSize = req.params.pageSize - 0;
  var pageNow = req.params.pageNow - 0;
  console.log(pageSize)
  console.log(pageNow)
  pool.query({
    sql: "select count(id) count from user where type != 0"
  }, (err, counts) => {
    console.log("111111111111111111111111111")
    if (err) { throw err; res.send({ code: 201, message: "没有数据" }); return; }

    var num = counts[0].count;
    var totalPage = num % pageSize == 0 ? (num / pageSize) : (num / pageSize) + 1;
    var pages = getPages(pageNow, totalPage);

   // 默认不显示客服
    pool.query({
      sql: "select id,name,account,phone,status,logo,teach,createTime from user where type != 0 order by createTime desc limit ?,?",
      values: [(pageNow - 1) * pageSize, pageSize]
    }, (err, results) => {
      if (err) {
        throw err;
        res.send({
          code: 201,
          message: "操作失败",
        })
        return;
      }
      pool.query({
        sql: "select id,name,logo,createTime,alt from teachs order by createTime desc"
      }, (err, teachs) => {
        if (err) {
          throw err;
          res.send({
            code: 201,
            message: "操作失败"
          })
          return;
        }
        console.log(pageNow)
        // 格式化日期返回到客户端
        results.map(function (v, i) {
          return v.createTime = dateFormat(v.createTime, "yyyy-MM-dd hh:mm:ss")
        })
        res.render("vipmanage", {
          title: "向上健身俱乐部-会员管理",
          nav: "vipmanage",
          users: results,
          pages,
          pageNow,
          pageSize,
          teachs
        })
      })
    })
  })
})

router.post("/register", function (req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  if (!account || !password) {
    layer.msg("请填写完整后提交");
    return;
  }
  if (!accountPattern.test(account)) {
    layer.msg("您输入的手机号有误，请重新输入");
    return;
  }
  if (!passwordPattern.test(password)) {
    layer.msg("密码格式错误！（请输入6-18位字母、数字、下划线组成的字符串）");
    return;
  }
  password = md5(password);
  var date = new Date();
  var id = Date.now() + "ACOUNT" + account;
  createTime = dateFormat(date, "yyyy-MM-dd hh:mm:ss");
  pool.query({
    sql: "select id from user where account = ?",
    values: [account]
  }, (err, results) => {
    if (err) {
      throw err;
      res.send({
        code: 201,
        message: "操作失败"
      })
      return;
    } else if (results.length > 0) {
      res.send({
        code: 201,
        message: "此账号已注册"
      })
      return;
    } else {
      pool.query({
        sql: "insert into user(id,account,password,createTime,updateTime) values(?,?,?,?,?)",
        values: [id, account, password, createTime, createTime]
      }, (err, result) => {
        if (err) {
          throw err;
          res.send({
            code: 201,
            message: "操作失败"
          })
          return;
        }
        console.log(result);
        res.send({
          code: 200,
          message: "注册成功"
        })
      })
    }
  })

})
router.post("/login", function (req, res, next) {
  var account = req.body.account;
  var password = req.body.password;
  var remember = req.body.remember;
  if (!account || !password) {
    res.send({ code: 201, message: "用户名或密码不能为空" })
    return;
  }
  if (!accountPattern.test(account)) {
    res.send({ code: 201, message: "您输入的手机号有误，请重新输入" });
    return;
  }
  if (!passwordPattern.test(password)) {
    res.send({ code: 201, message: "密码格式错误！（请输入6-18位字母、数字、下划线组成的字符串）" });
    return;
  }
  password = md5(password);
  pool.query({
    sql: "select id,name,account,type,password,phone,teach,createTime,logo from user where account = ?",
    values: [account]
  }, (err, results) => {
    if (err) {
      throw err;
      res.send({
        code: 201,
        message: "操作失败"
      })
      return;
    } else if (results.length == 0) {
      res.send({
        code: 201,
        message: "您还没有注册，请先注册"
      })
      return;
    } else {
      if (results[0].password != password) {
        res.send({
          code: 201,
          message: "用户名或密码错误"
        })
        return;
      }
      res.send({
        code: 200,
        message: "登录成功",
        user: results[0]
      })
    }
  })

})

router.post("/getUser/:userId?", function (req, res, next) {
  var user = req.cookies.user;
  if (!user) {
    res.redirect("/users/tologin");
    return;
  }
  var id = req.params.userId || req.body.id;
  console.log(id)
  pool.query({
    sql: "select u.id,u.name,u.account,u.phone,u.status,u.teach,u.logo,u.createTime,t.id tid,t.logo tlogo from teachs t left join user u on u.tid = t.id where u.id = ?",
    values: [id]
  }, (err, results) => {
    if (err) {
      throw err;
      res.send({
        code: 201,
        message: "操作失败"
      })
      return;
    }
    console.log(results)
    res.send({
      code: 200,
      message: "查询用户详细信息",
      info: results[0]
    })
  })
})

router.post("/addUser", (req, res, next) => {
  var user = req.cookies.user;
  if (!user) {
    res.redirect("/users/tologin");
    return;
  }

  var account = req.body.account;
  var password = req.body.password;
  var name = req.body.name || "无";
  var phone = req.body.phone || "无";
  var status = req.body.status || 2;
  var tid = req.body.teach || "无";
  var date = new Date();
  var id = Date.now() + "ACOUNT" + account;
  createTime = dateFormat(date, "yyyy-MM-dd hh:mm:ss");
  // console.log(createTime);

  if (!account || !password) {
    res.send({ code: 201, message: "用户名或密码不能为空" })
    return;
  }
  if (!accountPattern.test(account)) {
    res.send({ code: 201, message: "您输入的用户账号有误，请重新输入" });
    return;
  }
  if (!passwordPattern.test(password)) {
    res.send({ code: 201, message: "密码格式错误！（请输入6-18位字母、数字、下划线组成的字符串）" });
    return;
  }
  password = md5(password);
  pool.query({
    sql: "select id from user where account = ?",
    values: [account]
  }, (err, results) => {
    if (err) {
      throw err;
      res.send({
        code: 201,
        message: "操作失败"
      })
      return;
    } else if (results.length > 0) {
      res.send({
        code: 201,
        message: "此账号已注册"
      })
      return;
    } else {
      pool.query("select name from teachs where id = " + tid, (err, teach) => {
        if (err) {
          throw err;
          res.send({
            code: 201,
            message: "操作失败"
          })
          return;
        }
        pool.query({
          sql: "insert into user(id,name,account,phone,password,status,tid,teach,createTime,updateTime) values(?,?,?,?,?,?,?,?,?,?)",
          values: [id, name, account, phone, password, status, tid, teach[0].name, createTime, createTime]
        }, (err, results) => {
          if (err) {
            throw err;
            res.send({
              code: 201,
              message: "操作失败"
            })
            return;
          }
          console.log(results)
          res.send({
            code: 200,
            message: "添加成功"
          })
        })
      })
    }
  })
})

router.post("/deleteUser", (req, res, next) => {
  var user = req.cookies.user;
  if (!user) {
    res.redirect("/users/tologin");
    return;
  }
  var id = req.body.id;
  var idGroup = req.body.idGroup;
  if (id) {
    pool.query({
      sql: "delete from user where id = ?",
      values: [id]
    }, (err, results) => {
      if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }

      res.send({
        code: 200,
        message: "删除成功"
      });

      return;
    })

  }
  if (idGroup) {
    idGroup = idGroup.split(",");
    pool.query({
      sql: "delete from user where id in (?)",
      values: [idGroup]
    }, (err, results) => {
      if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }

      res.send({
        code: 200,
        message: "删除成功"
      });

      return;
    })
  }
})

router.post("/editUser", (req, res, next) => {
  var user = req.cookies.user;
  if (!user) {
    res.redirect("/users/tologin");
    return;
  }
  var account = req.body.account;
  var password = req.body.password;
  var name = req.body.name || "无";
  var phone = req.body.phone || "无";
  var status = req.body.status - 0 || 0;
  var tid = req.body.teach || "无";
  var date = new Date();

  if (!account || !password) {
    res.send({ code: 201, message: "用户名或密码不能为空" })
    return;
  }
  if (!accountPattern.test(account)) {
    res.send({ code: 201, message: "您输入的手机号有误，请重新输入" });
    return;
  }
  if (!passwordPattern.test(password)) {
    res.send({ code: 201, message: "密码格式错误！（请输入6-18位字母、数字、下划线组成的字符串）" });
    return;
  }

  updateTime = dateFormat(date, "yyyy-MM-dd hh:mm:ss");
  password = md5(password);

  pool.query("select name from teachs where id = " + tid, (err, teach) => {
    if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }

    pool.query({
      sql: "update user set password = ?,name = ?,phone = ?, status = ?, tid = ?, teach = ?, updateTime = ? where account = ?",
      values: [password, name, phone, status, tid, teach[0].name, updateTime, account]
    }, (err, results) => {
      if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }

      res.send({
        code: 200,
        message: "修改成功"
      })
    })
  })

})

router.post("/search", (req, res, next) => {
  var keywordsName = req.body.keywordsName || "";
  var keywordsAccount = req.body.keywordsAccount || "";
  var keywordsTeach = req.body.keywordsTeach || "";
  var pageSize = req.body.pageSize - 0;
  var pageNow = req.body.pageNow - 0;

  var where = "where name like '%" + keywordsName + "%' and account like '%" + keywordsAccount + "%' and teach like '%" + keywordsTeach + "%'";
  console.log(where)
  pool.query({
    sql: "select count(id) count from user " + where,
  }, (err, counts) => {
    if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }

    var num = counts[0].count;
    var totalPage = num % pageSize == 0 ? (num / pageSize) : (num / pageSize) + 1;
    var pages = getPages(pageNow, totalPage);

    pool.query({
      sql: "select id,name,account,phone,status,logo,teach,createTime from user " + where + " order by createTime desc limit ?,?",
      values: [(pageNow - 1) * pageSize, pageSize]
    }, (err, results) => {
      if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }

      if (results.length == 0) {
        res.send({
          code: 200,
          message: "没有数据"
        })
        return;
      }

      res.send({
        code: 200,
        message: "成功",
        users: results,
        pages,
        pageNow,
        pageSize
      })
    })
  })

})

module.exports = router;
