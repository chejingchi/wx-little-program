var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    array:['1','2'],
    yylist:[]
  },
  detmyyy:function(e){
    console.log(e.currentTarget.id);
    wx.showModal({
      title: '确认取消？',
      content: '',
      success: function (res) {

        if (res.confirm) {
          //根据FID取消我的预约
          var url = util.baseUrl + '/yyxx/delMyyyByFid';
          wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: e.currentTarget.id,
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 1000
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '../index/index'
                })
              }, 1000);
            }
          });
        }
      }
    })
    
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    //查询我的预约
    var url = util.baseUrl+'/yyxx/queryByHyxm';
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: that.data.userInfo.nickName,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          yylist: res.data.data
        })
      }

    });
  }
})