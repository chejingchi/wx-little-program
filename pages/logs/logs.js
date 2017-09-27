//logs.js
var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    array: [],
    objectArray: [],
    index: -1,
    date:'',
    startDate:'',
    endDate:'',
    array2: '',
    objectArray2: '',
    index2: -1
  },
  //选择教练
  pickerChangeForJl: function (e) {
    this.setData({
      index: e.detail.value
    }),
    //查询预约时间段
    this.queryYysj();
  },
  //选择日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    }),
      this.queryYysj();
  },
  queryYysj: function(){
      var that = this;
      //预约时间地址
      var url = util.baseUrl+'/yysj/queryYysjList';
      wx.request({
        url: url,
        data: {
          jlfid: that.data.objectArray[this.data.index].id,
          yyrq: this.data.date
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var dataValue = [];
          var dataShow = [];
          if (res.data.success) {
            console.log(res.data.data);
            for (var i = 0; i < res.data.data.length; i++) {
              var yysjObject = {};
              yysjObject.id = res.data.data[i].fid;
              yysjObject.name = res.data.data[i].yysj;

              dataValue[i] = yysjObject;

              dataShow[i] = res.data.data[i].yysj;
            }
            
            that.setData({ array2: dataShow });
            that.setData({ objectArray2: dataValue });
          }
        }

      });
  },
  //选择时间
  pickerChangeForSj: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    //预约时间不能为空
    if (e.detail.value.yysj==-1){
      wx.showToast({
        title: '请选择预约时间',
        icon: 'loading',
        duration: 1000
      })
      return;
    }
    wx.showModal({
      title: '确认预约？',
      content: '',
      success: function (res) {
        
        if (res.confirm) {
          //将选择框提交的下标转成字典表中的数据
          //教练字典
          e.detail.value.jlfid = that.data.objectArray[e.detail.value.jlfid].id;
          //预约时间字典
          e.detail.value.yysj = that.data.objectArray2[e.detail.value.yysj].id;
          //教练请求地址
          var url = util.baseUrl +'/yyxx/addYyxx';
          wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: e.detail.value,
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.showToast({
                title: res.data,
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
  formReset: function () {
    console.log('form发生了reset事件')
  },

  
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //教练请求地址
    var url = util.baseUrl +'/jlxx/queryJlList';
    
    wx.request({
    url: url, //仅为示例，并非真实的接口地址
    header: {
        'content-type': 'application/json'
      },
    success: function (res) {
      
      
      if(res.data.success){
        var dataValue = [];
        var dataShow = [];
        for (var i = 0; i < res.data.data.length;i++ ){
          var jlObject = {};
          jlObject.id = res.data.data[i].fid;
          jlObject.name = res.data.data[i].jlmc;

          dataValue[i] = jlObject;

          dataShow[i] = res.data.data[i].jlmc;
        }
        that.setData({ array: dataShow });
        that.setData({ objectArray: dataValue });
        }
      }
      
    });
    //初始化日期
    var d = new Date();
    var time = d.getFullYear() + '-' + ((d.getMonth() + 1).toString().length == 1 ? '0' + (d.getMonth() + 1):(d.getMonth()+1)) + '-' + (d.getDate().toString().length == 1 ? '0' + d.getDate() : d.getDate());
    
    that.setData({ date: time });
    that.setData({ startDate: time });
    //设置结束时间
    var d2 = new Date(d.getTime() + 7 * 24 * 60 * 60 * 1000);
    var endTime = d2.getFullYear() + '-' + ((d2.getMonth() + 1).toString().length == 1 ? '0' + (d2.getMonth() + 1) : (d2.getMonth() + 1)) + '-' + (d2.getDate().toString().length == 1 ? '0' + d2.getDate() : d2.getDate());
    that.setData({ endDate: endTime });
  }
})
