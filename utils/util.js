function formatTime(date, type = 1) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const addZero = (num) => num < 10 ? '0' + num : num;
  const dateArray = [year, month, day, hour, minute, second];
  if (type === 2 ) {
    return dateArray[3] + ':' + addZero(dateArray[4])
  } else if( type === 3) {
    return dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2] + ' ' + dateArray[3] + ':' + dateArray[4] + ':' + dateArray[5]
  } else {
    return dateArray[0] + '年' + dateArray[1] + '月' + dateArray[2] + '日'
  }
}


function hommizationTime(date) {
  const dateTimeStamp = new Date(date).getTime();
  let result;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  if (diffValue >= 0) {
    //非法操作
    //alert("结束日期不能小于开始日期！");
  }
  const yearC = diffValue / (365 * day);
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;

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

function remove_emoji(str) {
  return unescape(escape(str).replace(/\%uD.{3}/g, ''));
}

module.exports = {
  formatTime: formatTime,
  hommizationTime: hommizationTime,
  remove_emoji: remove_emoji
};