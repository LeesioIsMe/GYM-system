var express = require("express");
var pool = require("../module/mysql").pool;
var router = express.Router();

router.get("/tocourse", (req, res) => {
    // var userId = req.params.userId || "";
    // console.log(userId)
    res.render("courses",{title:"向上健身俱乐部-课程介绍",nav:"courses"});
})
router.get("/tojoin", (req, res) => {
    var userId = req.query.userId;
    // console.log(userId)
    var courseId = req.query.courseId;
    console.log(userId)
    console.log(courseId);
    res.render("joinCourse",{title:"向上健身俱乐部-参加课程",nav:"courses",courseId,userId});
})

router.post("/joinCourse",(req,res)=>{
    var userId = req.body.userId;
    var courseId = req.body.courseId;
    var startTime = req.body.startTime;
    var endTime = req.body.endTime;
    if(!userId){
        res.redirect("/tologin");
        return;
    }
    if(!courseId){
        res.send({
            code:201,
            message:"系统错误"
        })
        return;
    }
    if(!startTime || !endTime){
        res.send({
            code:201,
            message:"请选择你的预约时间"
        })
        return;
    }
    pool.query({
        sql:"select id from user_course where userId = '?' and courseId = '?'",
        value:[userId,courseId]
    },(err,results)=>{
        if(err){
            res.send({
                code:201,
                message:"系统出错"
            })
            return;
        }
        if(results.length > 0){
            res.send({
                code:200,
                message:"您已经参加过此课程"
            })
            return;
        }
        var id = new Date().getMilliseconds() + userId + courseId;
        var createTime = new Date();
        pool.query({
            sql:"insert into user_course(id,userId,courseId,startTime,endTime,createTime) values(?,?,?,?,?,?)",
            values:[id,userId,courseId,startTime,endTime,createTime]
        },(err,result)=>{
            if(err){
                res.send({
                    code:201,
                    message:"系统出错"
                })
                throw err;
                return;
            }
            res.send({
                code:200,
                message:"感谢您参加此课程"
            })
        })
    })
})
router.get("/getCount",(req,res)=>{
    var id = req.query.id;
    console.log(id + "--------")
    pool.query({
        sql:"select count(id) count from user_course where courseId = ?",
        values:[id]
    },(err,results)=>{
        if(err){
            res.send({
                code:201,
                message:"系统出错"
            })
            throw err;
            return;
        }
        console.log(results)
        res.send({
            code:200,
            message:"成功",
            count:results[0].count
        })
    })
})
module.exports = router;