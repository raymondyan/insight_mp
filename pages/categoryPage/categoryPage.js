const app = getApp()
const { getArticleByCategoryId } = require('../../utils/api');
const { findCategoryNameById, findCategoryNameByIds, categories } = require('../../utils/categories');
const R = require('../../utils/ramda.js');
const { formatTime } = require('../../utils/util')
const codeTransformation = require('../../wxParser/codeTransformation');
Page({
  data: {
    pageNum: 1,
    articleList: [],
    isLoading: true,
    isAllLoaded: false,
    fullPickerPaddingTop: app.globalData.statusBarHeight + 45
  },
  onLoad: function (options) {
    let scope = this
    let categoryId = options.cid
    let categoryName = findCategoryNameById(categoryId)
    scope.setData({
      categoryId: categoryId,
      categoryName: categoryName
    })
    scope.loadPost(scope.data.pageNum)
    scope.setData({
      pageNum: scope.data.pageNum + 1,
      categoryId: categoryId
    })
  },
  loadPost: function (pageNum) {
    let scope = this;
    let categoryId = scope.data.categoryId
    let shouldNotLoad = scope.data.isAllLoaded
    if (!shouldNotLoad){
      scope.setData({
        isLoading: true
      })
      app.wxRequest(getArticleByCategoryId(categoryId, pageNum), 'GET').then((res) => {
        if (res.statusCode === 200 && res.data) {
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
        } else {
          scope.setData({
            isAllLoaded: true,
            isLoading: false
          })
        }
      });
    }
    
  },
  onPageScroll: function (O) {
    let scope = this;
    let topHeight = app.globalData.topHeight;
    if (O.scrollTop > topHeight) {
      scope.setNav(scope.data.categoryName)
    } else {
      scope.setNav("")
    }
  },
  onReachBottom: function () {
    let scope = this;
    scope.loadPost(scope.data.pageNum)
    scope.setData({
      pageNum: scope.data.pageNum + 1
    })
  }, 
  
  goToArticle: function (e) {
    wx.navigateTo({
      url: '../article/article?aid=' + e.currentTarget.id
    })
  },
  returnToHome: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  setNav: function (title) {
    this.setData({
      navTitle: title
    })
  }
})