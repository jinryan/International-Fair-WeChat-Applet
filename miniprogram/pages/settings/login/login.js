// miniprogram/pages/settings/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userValue: '',
    passValue: '',
    passData: [],
    errorHidden: true,
    correctLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.boothUser = '',
    this.setData({
      userValue: '',
      passValue: '',
    })
  },

  onPullDownRefresh: function () {
    app.globalData.boothUser = '',
      this.setData({
        userValue: '',
        passValue: '',
      })
      wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
  submit: function(){
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "boothData",
        _id: this.data.userValue,
      },
      fail: (res) => {
        console.log(res)
      },
      success: (res) => {
        var passData = res.result.data
        this.setData({
          passData: passData
        })
        if(this.data.passData[0] == undefined){
          this.setData({
            errorHidden: false
          })
        }else{
          console.log(this.data.passValue)
          console.log(passData)
          console.log("THIS IS THE BOOLEAN")
          var loggedIn = this.data.passValue == this.data.passData[0].password
          console.log(loggedIn)
          if (loggedIn){
            console.log("Correct Login")
            this.setData({
              correctLogin: true
            })
            wx.navigateTo({
              url: '/pages/bottom_nav2/Club_info/Club_info',
            })
            console.log("Booth user")
            app.globalData.boothUser = this.data.userValue
            app.globalData.boothHidden = false
            console.log(app.globalData.boothUser)

          } else{
              this.setData({
                errorHidden: false
              })
          }
        }
      }
    })
  },

    // for (var i = 0; i < this.data.passData.length; i++){
    //   if(this.data.userValue==i){
    //     if(this.data.passValue==this.data.passData[i]){
    //       console.log('correct login bro')
    //       this.setData({
    //         correctLogin: true,
    //       })
    //       wx.navigateTo({
    //         url: '/pages/bottom_nav2/Club_info/Club_info',
    //       })
    //       app.globalData.boothUser = this.data.userValue
    //       app.globalData.boothHidden = false
    //     }
    //   }
    // }
    //   if(!this.data.correctLogin){
    //     this.setData({
    //       errorHidden: false
    //     })
    //     app.globalData.boothHidden = true
    //   }
    // },

  bindUserInput: function (e) {
    this.setData({
      userValue: e.detail.value
    })
    console.log(this.data.userValue)
  },

  bindPassInput: function (e) {
    this.setData({
      passValue: e.detail.value
    })
  }

})