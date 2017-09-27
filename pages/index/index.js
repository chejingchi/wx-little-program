//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  gotoYyPage: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //前往我的预约页面
  gotoMyyyPage: function(){
    wx.navigateTo({
      url: '../myyy/myyy'
    })
  },
  onLoad: function () {
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
