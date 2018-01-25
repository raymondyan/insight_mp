const app = getApp()
const { getRecentPost } = require('../../utils/api');
const { findCategoryNameByIds, categories } = require('../../utils/categories');
const R = require('../../utils/ramda.js');
const { formatTime } = require('../../utils/util')
const codeTransformation = require('../../wxParser/codeTransformation');
let pageTitle = "Insights"

Page({
  data: {
    articleList: [],
    isLoading: true,
    isFixedToTop: false,
    hideLayer: -1,
    pageNum: 1,
    animationOfCategoryPicker: {},
  },
  onLoad: function () {
    let scope = this
    scope.recentPost(scope.data.pageNum)
    var quickCategories = categories.slice(0, 5)
    let fullPickerHeight = (90 + Math.ceil(categories.length / 3) * 48) * -1
    scope.setData({
      pageNum: scope.data.pageNum + 1,
      catetories: categories,
      quickCategories: quickCategories, 
      translateH: fullPickerHeight,
      topHeight: fullPickerHeight
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
    if (O.scrollTop > 160.5) {
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
          items.simpleExcerpt = codeTransformation.transform(item.excerpt.rendered.replace(/<[^>]+>/g, "").replace("\n", ""))
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
  callFullPicker: function () {
    let scope = this
    var animation = wx.createAnimation({
      duration: 350,
      timingFunction: 'ease-in-out',
    })
    this.animation = animation

    let height = scope.data.translateH * -1
    let isHideLayer = scope.data.hideLayer * -1

    scope.setData({
      translateH: height,
      hideLayer: isHideLayer
    })
    animation.translateY(height).step()

    this.setData({
      animationDataOfLightChange: animation.export()
    })
  },
  closeFullPicker: function () {
    this.callFullPicker()
  },
  onReachBottom: function () {
    let scope = this;
    scope.setData({
      isLoading: true
    })
    scope.recentPost(scope.data.pageNum)
    scope.setData({
      pageNum: scope.data.pageNum + 1
    })
  },
  goToArticle: function(e){
    wx.navigateTo({
      url: '../article/article?aid=' + e.currentTarget.id
    })
  },
  goToCategoryPage: function (e) {
    wx.navigateTo({
      url: '../categoryPage/categoryPage?cid=' + e.currentTarget.id
    })
    if (this.data.hideLayer === 1){
      this.callFullPicker()    
    }
  },
  setNav: function (title) {
    this.setData({
      navTitle: title
    })
  }
})
