function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  var dateArray = [year, month, day]
  return dateArray[0] + '年' + dateArray[1] + '月' + dateArray[2] + '日'
}


function hommizationTime(date) {
  var dateTimeStamp = new Date(date).getTime();
  var result;
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue >= 0) {
    //非法操作
    //alert("结束日期不能小于开始日期！");
  }
  var yearC = diffValue / (365 * day)
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  if (yearC >= 1) {
    result = "" + parseInt(yearC) + "年前";
  }
  else if (monthC >= 1) {
    result = "" + parseInt(monthC) + "个月前";
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚发表";
  return result;
}

module.exports = {
  formatTime: formatTime,
  hommizationTime: hommizationTime
}