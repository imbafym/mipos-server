var getDateStr = function (dayCount) {
    if (null == dayCount) {
        dayCount = 0;
    }
    var dd = new Date();
    dd.setDate(dd.getDate() + dayCount);//设置日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}


module.exports = getDateStr
