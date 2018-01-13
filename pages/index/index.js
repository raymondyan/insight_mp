const app = getApp()
const { getRecentPost } = require('../../utils/api');
const { findCategoryNameByIds } = require('../../utils/categories');
const R = require('../../utils/ramda.js');
const { formatTime } = require('../../utils/util')
const codeTransformation = require('../../wxParser/codeTransformation');
let pageTitle = "洞见 Insights"

Page({
  data: {
    articleList: [],
    isLoading: true,
    isFixedToTop: false,
    pageNum: 1
  },
  onLoad: function () {
    let scope = this
    scope.setNav("")
    scope.recentPost(scope.data.pageNum)
    scope.setData({
      pageNum: scope.data.pageNum + 1
    })
  },
  onPageScroll: function (O) {
    let scope = this;
    let topHeight = app.globalData.topHeight;
    if (O.scrollTop > topHeight) {
      scope.setNav(pageTitle)
    } else {
      scope.setNav("")
    }
    if (O.scrollTop > 160) {
      scope.setData({
        isFixedToTop: true
      })
    } else {
      scope.setData({
        isFixedToTop: false
      })
    }
  },
  recentPost: function (pageNum) {
    let scope = this;
    app.wxRequest(getRecentPost(pageNum), 'GET').then((res) => {
      if (res.data) {
        let articleList = (res.data).map(function (item) {
          var items = {}
          items.id = item.id
          items.title = {
            rendered: codeTransformation.transform(item.title.rendered)
          }
          items.simpleExcerpt = item.excerpt.rendered.replace(/<[^>]+>/g, "").replace("\n", "")
          items.date = formatTime(new Date(item.date))
          items.categoryName = findCategoryNameByIds(item.categories)
          items.featured_image_src = item.featured_image_src
          items.author_name = item.author_name
          return items
        })
        articleList = scope.data.articleList.concat(articleList)
        scope.setData({
          articleList: articleList,
          isLoading: false
        })
      }
    });
  },
  onReachBottom: function(){
    let scope = this;
    scope.setData({
      isLoading: true
    })
    scope.recentPost(scope.data.pageNum)
    scope.setData({
      pageNum: scope.data.pageNum + 1
    })
  },
  setNav: function (title) {
    wx.setNavigationBarTitle({
      title: title
    })
  }
})
