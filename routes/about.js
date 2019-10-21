var express = require("express");

var router = express.Router();

router.get("/toabout", (req, res) => {
    // var userId = req.params.userId || "";
    // console.log(userId)
    res.render("about",{title:"向上健身俱乐部-关于我们",nav:"about"});
})




module.exports = router;