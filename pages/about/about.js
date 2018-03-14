let app = getApp()
Page({
  data: {
    paddingTop: app.globalData.statusBarHeight + 45
  },
  returnToHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})