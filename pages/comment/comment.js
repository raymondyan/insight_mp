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
      nickName: options.userName,
      avatarUrl: options.avatar
    })
    scope.queryArticle(options.id)
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
  commentInputing: function (e) {
    this.setData({
      comment: e.detail.value
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
    let scope = this;
    var data = scope.data;
    let nickName = data.nickName;
    let avatarUrl = data.avatarUrl;
    let comment = data.comment;
    if (!comment) {
      return 0
    }
    let articleId = data.articleId;
    wx.showLoading({
      title: '提交评论中',
      mask: true
    })
    wx.request({
      url: postComment(),
      method: 'POST',
      data: 'author_name=' + nickName + '&author_url=' + avatarUrl + '&author_email=wxapp@wechat.qq.com&content=' + comment + '&post=' + articleId,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.hasOwnProperty('author_name')) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            mask: true
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'success',
            duration: 2000,
            mask: true
          })
        }
      }
    })
  }
  
})