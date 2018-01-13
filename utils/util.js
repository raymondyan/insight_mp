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

module.exports = {
  formatTime: formatTime
}