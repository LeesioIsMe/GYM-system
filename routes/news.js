var express = require("express");
var router = express.Router();
var pool = require("../module/mysql").pool;
var getPages = require("../module/common").getPages;

var multer = require("multer")
var path = require("path");

var imgPath = "";
// console.log(path.join(path.resolve(__dirname + "/../public"),"/upload/logo"))
var storage = multer.diskStorage({
    destination: path.join(path.resolve(__dirname + "/../public"), "/upload/news-logo"),
    filename: function (req, file, callback) {
        var extendName = file.originalname.substr(file.originalname.lastIndexOf("."));
        var nameSpace = [".jpg", ".jepg", ".png", ".webp"];
        if (nameSpace.indexOf(extendName) == -1) {
            callback(new Error("图片格式错误"));
            return;
        }
        var newFileName = Date.now() + "-" + req.cookies.account + "-" + file.originalname;
        imgPath = "/upload/news-logo/" + newFileName;
        callback(null, newFileName);
    }
})
var upload = multer({ storage: storage });

router.get("/tonews", (req, res) => {
    // var userId = req.params.userId || "";
    // console.log(userId)
    res.render("news", { title: "向上健身俱乐部-新闻中心", nav: "news" });
})

router.get("/tonewsdetail/:newsId", (req, res, next) => {
    var newsId = req.params.newsId;
    pool.query({
        sql: "select id,title from news where id = ?",
        values: [newsId]
    }, (err, results) => {
        if (err) { res.render("error"); return; }
        res.render("newsdetail", { title: results[0].title, nav: "news", newsId });
    })

})

router.get("/topost", (req, res, next) => {
    var user = req.cookies.user;
    if (!user) {
        res.send({
            code: 201,
            message: "未登陆",
        })
        return;
    }
    res.render("postNews", { title: "向上健身俱乐部-发布通知", nav: "news" })
})

router.get("/getNews", (req, res, next) => {
    var pageNow = req.query.pageNow - 0;
    var pageSize = req.query.pageSize - 0;
    pool.query({
        sql: "select n.id,n.title,n.uid,n.createTime,n.imgPath,u.name from news n left join user u on n.uid = u.id order by n.createTime desc limit ?,?",
        values: [(pageNow - 1) * pageSize, pageSize]
    }, (err, results) => {
        if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }
        if (results.length == 0) {
            res.send({ code: 200, message: "数据为空" })
            return;
        }
        res.send({
            code: 200,
            message: "成功",
            news: results
        })
    })
})

router.get("/getPages", (req, res, next) => {
    var keywords = req.query.keywords || "";
    var pageSize = req.query.pageSize - 0;
    var pageNow = req.query.pageNow - 0;
    var where = "where title like '%" + keywords + "%'";
    pool.query({
        sql: "select count(id) count from news " + where,
    }, (err, counts) => {
        // console.log(counts)
        // console.log("---------------------------")
        if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }
        var totalCount = counts[0].count
        var maxPage = totalCount % pageSize == 0 ? totalCount / pageSize : (totalCount / pageSize) + 1
        var pages = getPages(pageNow, maxPage);
        res.send({
            code: 200,
            message: "分页",
            pages,
            pageNow
        })
    })
})

router.get("/getNewsDetail", (req, res, next) => {
    var newsId = req.query.newsId;
    if (!newsId) {
        res.send({
            code: 201,
            message: "数据不存在"
        })
        return;
    }
    pool.query({
        sql: "select n.id,n.title,n.uid,n.imgPath,n.content,n.createTime,u.name,u.logo,u.account,u.status from news n left join user u on n.uid = u.id where n.id = ?",
        values: [newsId]
    }, (err, results) => {
        if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; }
        if (results.length == 0) {
            res.send({ code: 200, message: "数据为空" })
            return;
        }
        res.send({
            code: 200,
            message: "成功",
            newsDetail: results[0]
        })
    })
})
router.post("/uploadImg", upload.single("file"), (req, res, next) => {
    var user = req.cookies.user;
    if (!user) {
        res.send({
            code: 201,
            message: "未登陆"
        })
        return;
    }
    console.log(imgPath + "----------------");
    res.send({
        code: 200,
        message: "上传成功",
        imgPath
    })
})
router.post("/postNews", (req, res, next) => {
    var userId = req.body.userId;
    var title = req.body.title;
    var substract = req.body.substract;
    var content = req.body.content;
    var imgPath = req.body.imgPath;

    var createTime = new Date();
    var id = Date.now() + userId;

    pool.query({
        sql: "insert into news(id,uid,title,substract,content,imgPath,createTime) values(?,?,?,?,?,?,?)",
        values: [id, userId, title, substract, content, imgPath, createTime]
    }, (err, results) => {
        if (err) { throw err; res.send({ code: 201, message: "操作失败" }); return; };

        res.send({
            code: 200,
            message: "发布成功"
        })
    })
})

module.exports = router;