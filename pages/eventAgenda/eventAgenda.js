Page({

  data: {
  
  },

  onLoad: function (options) {
    let scope = this;
    let tableID = 38329;
    let objects = { tableID };
    wx.BaaS.getRecordList(objects).then((res) => {
      scope.setData({
        event: res.data.objects,
      })
    }, (err) => {
      console.log(err);
    })
  },
})