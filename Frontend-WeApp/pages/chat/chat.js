//获取应用实例
const app = getApp()

var message = '';

var text = '';

var user = {};

Page({
  data: {
    message: '',
    text: text
  },
  bindChange: function (e) {
    message = e.detail.value
  },
  //事件处理函数
  add: function (e) {
    websocket.send(user.nickName + " : " + message);
  },

  onLoad: function () {

    var that = this


    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      user = userInfo;

      websocket.connect(user, function (res) {
        text = res.data + "\n" + text;
        that.setData({
          text: text
        });
      })
    })
  }
})

// wx.request({
//   url: 'http://127.0.0.1:8080/query_user',
//   data: {
//     goodsname: JSON.stringify(inputTyping)  //将数据格式转为JSON

//   },
//   method: "POST",
//   header: {
//     'content-type': 'application/x-www-form-urlencoded'
//   },
//   success: function (res) {
//     console.log(res.data);

//   }
// });