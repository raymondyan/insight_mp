App({
  onLaunch: function () {
    let scope = this;
    wx.getSystemInfo({
      success: function (res) {
        scope.globalData.statusBarHeight = res.statusBarHeight || res.statusbarHeight
        scope.globalData.windowHeight = res.windowHeight
        scope.globalData.isIPhoneX = res.model.indexOf("iPhone X") != -1
      }
    })
    wx.login({
      success: res => {
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  wxRequest: function (url, method, data) {
    var that = this;
    that.checkNetworkStatus();
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        header: {
          'content-type': 'application/json',
        },
        data: data,
        success: function (res) {
          resolve(res);
        },
        fail: function (e) {
          reject(e);
        }
      })
    });
  },
  checkNetworkStatus: function () {
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType === 'none') {
          wx.showModal({
            content: '当前无法访问网络，请将手机连至无线互联网或者运营商网络',
            showCancel: false,
            confirmText: "了解",
            confirmColor: '#00adef',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    topHeight: 40
  }
})