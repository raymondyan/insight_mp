const app = getApp()
const { getRecentPost } = require('../../utils/api');
const { findCategoryNameByIds, categories } = require('../../utils/categories');
const R = require('../../utils/ramda.js');
const { formatTime } = require('../../utils/util')
const codeTransformation = require('../../wxParser/codeTransformation');
Page({
  data: {
    pageNum: 1,
  },

  onLoad: function (options) {
    let scope = this
    // scope.setNav("")
    // scope.recentPost(scope.data.pageNum)
    // var quickCategories = categories.slice(0, 5)
    // let fullPickerHeight = (30 + Math.ceil(categories.length / 3) * 48) * -1
    scope.setData({
      pageNum: scope.data.pageNum + 1,
      // catetories: categories,
      // quickCategories: quickCategories,
      // translateH: fullPickerHeight,
      // topHeight: fullPickerHeight
    })
  },
  loadPost: function (pageNum) {
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
  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})