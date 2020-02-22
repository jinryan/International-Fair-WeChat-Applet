// miniprogram/pages/settings/feedback/feedback.js
Page({
  /**
   * Page initial data
   */
  data: {
    sent: false,
    feedback: ' ',
  },

  onLoad: function () {
    var myThis = this;
    myThis.setData({
      sent: false
    })
  },


  onPullDownRefresh: function () {
    var myThis = this;
    myThis.setData({
      sent: false
    })
    wx.stopPullDownRefresh()
  },


  home: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  storeFeedback: function(e){
    this.setData({
      feedback: e.detail.value
    })
  },

  submitFeedback: function () {
    var myThis = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        // console.log(userInfo.nickName)
        myThis.setData({
          nickName: userInfo.nickName,
        })
        // console.log(myThis.data.nickName)
        wx.cloud.callFunction({
          name: "pushFeedback",
          data: {
            nickname: myThis.data.nickName,
            feedback: myThis.data.feedback,
          },
          success: function () {
            console.log("Success")
            console.log(myThis.data.feedback)
          },
          fail: function () {
            console.log(myThis.data.feedback)
            console.error
          }
        })
        myThis.setData({
          sent: true
        })
      }
    })
  },
  pushFeedback: function (feedback){
    console.log(feedback.detail.value.number)
    var myThis = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        // console.log(userInfo.nickName)
        myThis.setData({
          nickName: userInfo.nickName,
        })
        // console.log(myThis.data.nickName)
        wx.cloud.callFunction({
          name: "pushFeedback",
          data: {
            nickname: myThis.data.nickName,
            feedback: feedback.detail.value.number,
            // nickname: "test",
            // feedback: "test",
          },
          success: function () {
            console.log("Success")
            console.log(myThis.data.feedback)
          },
          fail: function(){
            console.log(myThis.data.feedback)
            console.error
          }
        })
        myThis.setData({
          sent: true
        })
      }
    })
  }
})