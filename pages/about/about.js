let app = getApp()
Page({
  data: {
    fullPickerPaddingTop: app.globalData.statusBarHeight + 45
  },
  returnToHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})