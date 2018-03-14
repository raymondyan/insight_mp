const app = getApp()
const { formatTime } = require('../../utils/util')
const codeTransformation = require('../../wxParser/codeTransformation');
const { getTags, searchPosts } = require('../../utils/api');

const sensitiveWords = [
  "区块链",
  "比特币",
  "币",
  "比特",
  "虚拟货币",
  "虚拟交易",
  "BitCoin"
]

Page({

  data: {
    inputToTop: app.globalData.statusBarHeight + 60,
    bgHeight: app.globalData.statusBarHeight + 85,
    searchIconTop: app.globalData.statusBarHeight + 73,
    contentTop: app.globalData.statusBarHeight + 130,
    scrollHeight: app.globalData.windowHeight - 130 - app.globalData.statusBarHeight
  },

  onLoad: function (options) {
    let scope = this;
    app.wxRequest(getTags(), 'GET').then((res) => {
      if (res.data) {
        scope.setData({
          tags: res.data
        })
      }
    });
  },

  search: function (e) {
    this.searchArticle(this.data.keyword)
  },

  updateKeyword: function (e) {
    let keyword = e.detail.value;
    this.setData({
      keyword: keyword
    })
    if(keyword.length == 0){
      this.setData({
        articles: []
      })
    }
  },

  quickSearchTag: function (e) {
    let tag = e.currentTarget.dataset.tag
    this.setData({
      keyword: tag
    })
    this.searchArticle(tag)
  },
  returnToHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  searchArticle: function (keyword) {
    let scope = this;
    var hasSensitiveWord = false
    sensitiveWords.forEach(
      function hexie(word){
        if (keyword.indexOf(word) != -1){
          hasSensitiveWord = true
        }
      }
    )

    if (hasSensitiveWord){
      wx.showModal({
        title: '提示',
        content: '包含微信小程序尚不支持的业务关键词',
        showCancel: false
      })
      return 0
    }
    
    if (keyword) {
      app.wxRequest(searchPosts(keyword), 'GET').then((res) => {
        if (res.data) {
          let articleList = (res.data).map(function (item) {
            var items = {}
            items.id = item.id
            items.title = {
              rendered: codeTransformation.transform(item.title.rendered)
            }
            items.date = formatTime(new Date(item.date))
            items.author_name = item.author_name
            return items
          })
          scope.setData({
            articles: articleList,
            scrollToTop: 0
          });
        }
      });
    }
  }
})