var express = require("express");

var router = express.Router();
var pool = require("../module/mysql").pool;
router.get("/toteam", (req, res) => {
    // var userId = req.params.userId || "";
    // console.log(userId)
    res.render("team", { title: "向上健身俱乐部-师资团队", nav: "team" });
})

router.get("/getTeachs", (req, res, next) => {
    var pageSize = req.query.pageSize - 0;
    var pageNow = req.query.pageNow - 0;

    var limit = " limit ?,? ";
    if( !pageSize || !pageNow){
        limit = ""
    }
    pool.query({
        sql: "select id,name,logo,createTime,alt from teachs order by createTime desc" + limit,
        values: [(pageNow - 1) * pageSize, pageSize]
    }, (err, results) => {
        if(err){
            throw err;
            res.send({
                code:201,
                message:"操作失败"
            })
            return;
        }
        res.send({
            code:200,
            message:"成功",
            teachs:results
        })
    })
})

module.exports = router;