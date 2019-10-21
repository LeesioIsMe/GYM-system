
// 获取窗口高度、滚动条滚动距离
var clientHeight = document.documentElement.clientHeight;
window.onscroll = function () {
    var scrollTop = $(window).scrollTop();
    // console.log(scrollTop)
    var pageHeight = $(document).height();
    scrollTop > 300 ? $(".scroll").addClass("show").removeClass("hidden") : $(".scroll").addClass("hidden").removeClass("show");
    if (scrollTop > 300) {
        // $(".scroll").slideDown();
    } else if (scrollTop > pageHeight - 300 - clientHeight) {
        // $(".scroll").slideUp();
    }
}

// 定义会到顶部的函数
function scrollToTop() {
    $("body,html").animate({ scrollTop: 0 }, 1000);
}

function checkLogin() {
    var user = $.cookie("user");
    if (user) {
        return true;
    } else {
        return false;
    }
}

function logout() {
    $.cookie("user", "", { expires: -1, path: "/" });
    $.cookie("account", "", { expires: -1, path: "/" });
    location.reload();
}

template.defaults.imports.dateFormat = function (date, format) {

    if (typeof date === "string") {
        var mts = date.match(/(\/Date\((\d+)\)\/)/);
        if (mts && mts.length >= 3) {
            date = parseInt(mts[2]);
        }
    }
    date = new Date(date);
    if (!date || date.toUTCString() == "Invalid Date") {
        return "";
    }

    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };


    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};
