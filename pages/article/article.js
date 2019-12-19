let app = getApp();
let wxParser = require('../../wxParser/index');
const { getComment, getArticle, getUser, getRelatedCategories, getArticleThumb } = require('../../utils/api');
const { getAvatarUrl } = require('../../utils/avatar');
const { formatTime } = require('../../utils/util')
const { structureComments } = require('../../utils/comment');
const codeTransformation = require('../../wxParser/codeTransformation');

Page({
  data: {
    animationDataOfLightChange: {},
    translateH: 95 + (app.globalData.isIPhoneX ? 34 : 0),
    showLoading: true,
    hideLayer: 1,
    canvasheight: 0,
    statusBarBackgroundHeight: app.globalData.statusBarHeight,
    isPhoneX: app.globalData.isIPhoneX,
    safeZoneBottom: app.globalData.safeZoneBottom,
    isAndroid: app.globalData.isAndroid,
    defaultThumb: "https://dynamic.thoughtworks.com/homepage/background_image-64d5209f7ec217f9e95e17ed99b44278.png"
  },
  onPageScroll: function (O) {
    let scope = this;
    let topHeight = scope.data.thumbUrl ? scope.data.thumbHeight : 280;
    if (O.scrollTop > topHeight) {
      scope.setData({
        statusBarBg: true
      })
    } else {
      scope.setData({
        statusBarBg: false
      })
    }
  },
  onLoad: function (options) {
    const scope = this;
    if (options.scene) {
      scope.setData({
        articleId: parseInt(options.scene),
        isFromShare: true
      });
    } else {
      scope.setData({
        articleId: parseInt(options.aid),
        isFromShare: options.share || false
      });
    }

    wx.setNavigationBarTitle({
      title: '',
    });

    scope.getArticle(scope.data.articleId);
    wx.getScreenBrightness({
      success: function (res) {
        scope.setData({
          screenLight: res.value,
          sliderValue: res.value * 100
        })
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        scope.setData({
          thumbHeight: res.windowHeight - 40 - app.globalData.safeZoneBottom,
          fullWindowHeight: res.windowHeight
        })
      }
    });
  },

  getArticle: function (aid) {
    let scope = this;
    app.wxRequest(getComment(aid), 'GET').then((res) => {
      scope.setData({
        comment_number: res.data.length,
        comments: structureComments(res.data)
      })
    });
    app.wxRequest(getArticle(aid), 'GET').then((res) => {
      if (res.data) {
        scope.getAuthor(res.data.author);
        scope.getCategory(res.data.categories);
        scope.getThumb(res.data.featured_media);
        scope.parseArticle(res.data.content.rendered);
        scope.parseSummary(res.data.excerpt.rendered)
        scope.setData({
          title: codeTransformation.transform(res.data.title.rendered)
        })
        wx.reportAnalytics('open_an_article', {
          article_title: codeTransformation.transform(res.data.title.rendered),
          time: formatTime(new Date(), 3),
        });
      } else {
        resolve();
      }
    });
  },

  getAuthor: function (authorId) {
    let scope = this;
    app.wxRequest(getUser(authorId), 'GET').then((res) => {
      if (res.data) {
        scope.setData({
          author: res.data,
          authorAvatar: getAvatarUrl(res.data.slug)
        })
      } else {
        resolve();
      }
    });
  },

  getCategory: function (categoryIds) {
    let scope = this;
    app.wxRequest(getRelatedCategories(categoryIds.join(',')), 'GET').then((res) => {
      if (res.data) {
        scope.setData({
          categories: res.data.map(function (item) {
            return item.name
          }).join(', ')
        })
      } else {
        resolve();
      }
    });
  },

  getThumb: function (mediaId) {
    let scope = this;
    app.wxRequest(getArticleThumb(mediaId), 'GET').then((res) => {
      if (res.data) {
        scope.setData({
          thumbUrl: res.data.source_url,
          showLoading: false
        })
      } else {
        resolve();
      }
    });
  },

  parseArticle: function (html) {
    let scope = this;
    html = scope.cleanHtml(html);
    wxParser.parse({
      bind: 'richText',
      html: html,
      target: scope,
      enablePreviewImage: true
    });
  },

  parseSummary: function (summarytext) {
    const summary = codeTransformation.transform(summarytext.replace(/<[^>]+>/g, "").replace("\n", ""))
    const ctx = wx.createCanvasContext('articlePost')
    const charList = summary.split("");
    let summaries = []
    let tempElement = ""
    charList.forEach((element, index) => {
      tempElement += element;
      if (ctx.measureText(tempElement).width > 190) {
        summaries.push(tempElement)
        tempElement = ""
      }
    });
    if (tempElement.length > 0) {
      summaries.push(tempElement)
    }
    this.setData({
      summaries
    })
  },

  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  goHome: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  cleanHtml: function (html) {
    return html.replace('<hr />', '')
  },


  goToComment: function (e) {
    if (e.detail.errMsg === "getUserInfo:fail auth deny") {
      wx.showToast({
        title: '请重新授权后发表评论',
        icon: 'none',
        duration: 2000
      })
    }
    const userName = e.detail.userInfo.nickName;
    const avatar = e.detail.userInfo.avatarUrl
    let scope = this;
    wx.navigateTo({
      url: '../comment/comment?id=' + scope.data.articleId + '&userName=' + userName + '&avatar=' + avatar,
    })
  },
  jumpToComment: function () {
    wx.createSelectorQuery().select('#article_zone').fields({
      size: true,
    }, function (res) {
      wx.pageScrollTo({
        scrollTop: res.height,
        duration: 300
      })
    }).exec()
  },
  onShareAppMessage: function (res) {
    let title = this.data.title;
    let path = '/pages/article/article?aid=' + this.data.articleId + "&share=true";
    let imageUrl = this.data.thumbUrl || '';
    return {
      title: title,
      path: path,
      imageUrl: imageUrl
    }
  },

  callActions: function () {
    const scope = this;
    wx.showActionSheet({
      itemList: ['生成文章海报', '复制页面路径'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            wx.showLoading({
              title: '海报生成中',
              mask: true
            })
            scope.generatePoster();
            break;
          case 1:
            wx.setClipboardData({
              data: '/pages/article/article?aid=' + scope.data.articleId + "&share=true",
            })
            break;
          default:
            break;
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  generatePoster: function () {
    const scope = this;
    const qrcode = this.data.qrcode;
    const thumbnail = this.data.thumbUrl ? this.data.thumbUrl : this.data.defaultThumb;
    const articleTitle = this.data.title;
    let qrCodeTempUrl, thumbnailTempUrl, thumbWidth, thumbHeight;
    const params = {
      scene: scope.data.articleId,
      page: 'pages/article/article',
      width: 250
    }
    wx.BaaS.getWXACode('wxacodeunlimit', params, true, 'qrcode').then(res => {
      wx.downloadFile({
        url: res.download_url,
        success: function (res) {
          if (res.statusCode === 200) {
            qrCodeTempUrl = res.tempFilePath.replace('http:/', '');
            wx.downloadFile({
              url: thumbnail,
              success: function (res) {
                if (res.statusCode === 200) {
                  thumbnailTempUrl = res.tempFilePath.replace('http:/', '');
                  wx.getImageInfo({
                    src: res.tempFilePath,
                    success: function (res) {
                      const ctx = wx.createCanvasContext('articlePost')

                      const thumbRatio = res.height / res.width
                      const thumbHeight = Math.round(570 * thumbRatio);
                      const summaries = scope.data.summaries;
                      const title = `${scope.data.author.name} 《${scope.data.title}》`;
                      scope.setData({
                        canvasheight: thumbHeight + 35 * summaries.length + 400
                      })
                      ctx.fillStyle = "#fff";
                      ctx.fillRect(0, 0, 600, thumbHeight + 35 * summaries.length + 400);
                      ctx.drawImage(thumbnailTempUrl, 15, 15, 570, thumbHeight)
                      ctx.drawImage('../../img/quote.png', 22, thumbHeight + 40, 52, 30)
                      summaries.forEach((element, index) => {
                        ctx.setFillStyle("#000");
                        ctx.setFontSize(22);
                        ctx.fillText(element, 80, thumbHeight + 100 + index * 35);
                      })
                      ctx.drawImage('../../img/quote_close.png', 516, thumbHeight + 35 * summaries.length + 75, 51, 33)
                      ctx.save()
                      ctx.setFillStyle("#777");
                      ctx.setTextAlign('center');
                      ctx.setFontSize(18);
                      ctx.fillText(title, 300, thumbHeight + 35 * summaries.length + 170)
                      ctx.restore()
                      ctx.drawImage(qrCodeTempUrl, 230, thumbHeight + 35 * summaries.length + 220, 140, 140)
                      ctx.draw()
                      setTimeout(
                        function () {
                          wx.canvasToTempFilePath({
                            canvasId: 'articlePost',
                            fileType: 'jpg',
                            success: function (res) {
                              scope.setData({
                                canvasHidden: true,
                              });
                              wx.saveFile({
                                tempFilePath: res.tempFilePath,
                                success: function (res) {
                                  wx.saveImageToPhotosAlbum({
                                    filePath: res.savedFilePath,
                                    success(res) {
                                      wx.hideToast()
                                      wx.showToast({
                                        title: '保存成功',
                                        icon: 'success',
                                        duration: 800
                                      })
                                    },
                                    fail(res) {

                                      wx.showToast({
                                        title: '保存失败',
                                        icon: 'fail',
                                        duration: 800
                                      })
                                    }
                                  })
                                  setTimeout(function () {
                                    wx.previewImage({
                                      current: res.savedFilePath,
                                      urls: [res.savedFilePath]
                                    })
                                  }, 800)
                                }
                              })
                            }
                          })
                        }, 1200
                      )
                    }
                  })
                }
              }
            })
          }
        }
      })



    }).catch(err => {
      console.log(err)
    })




  },
});

