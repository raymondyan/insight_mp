let app = getApp()
const { remove_emoji } = require('../../utils/util');
const { getArticle, postComment } = require('../../utils/api');
const codeTransformation = require('../../wxParser/codeTransformation');

Page({
  data: {
    paddingTop: app.globalData.statusBarHeight + 45
  },
  onLoad: function (options) {
    let scope = this;
    scope.setData({
      articleId: parseInt(options.id),
    })
    scope.queryArticle(options.id)
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              scope.getUserInfo()
            },
            fail() {
              scope.reAuth()
            }
          })
        } else {
          scope.getUserInfo()
        }
      }
    })
  },
  getUserInfo: function () {
    let scope = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        scope.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        })
      }
    })
  },
  queryArticle: function (aid) {
    let scope = this;
    app.wxRequest(getArticle(aid), 'GET').then((res) => {
      if (res.data) {
        scope.setData({
          title: codeTransformation.transform(res.data.title.rendered)
        })
      } else {
        resolve();
      }
    });
  },
  reAuth: function () {
    let scope = this;
    wx.showModal({
      title: '提示',
      content: '我们获取不到您的昵称和头像，因此您当前无法评论，点击“授权”可以进入设置页面重新授权，点击取消放弃评论',
      confirmText: "授权",
      confirmColor: "#118eea",
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (!res.authSetting['scope.userInfo']) {
                scope.reAuth();
              } else {
                scope.getUserInfo()
              }
            }
          })
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  commentInputing: function (e) {
    this.setData({
      comment: remove_emoji(e.detail.value)
    })
  },
  returnToHome: function () {
    var comment = this.data.comment;
    if (comment) {
      wx.showModal({
        title: '提示',
        content: '现在取消的话您现有的评论将会丢失',
        confirmText: "放弃编辑",
        cancelText: "继续编辑",
        confirmColor: "#d9534f",
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  createComment: function () {
    var data = this.data;
    let nickName = data.nickName;
    let avatarUrl = data.avatarUrl;
    let comment = data.comment;
    if (!comment) {
      return 0
    }
    let articleId = data.articleId;
    app.wxRequest(postComment(remove_emoji(nickName), avatarUrl, comment, articleId), 'POST').then((res) => {
      if (res.statusCode === 201) {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          mask: true
        }),
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
      } else {
        resolve();
      }
    });
  }
})