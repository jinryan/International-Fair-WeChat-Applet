// miniprogram/pages/language.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  English: function () {
    app.globalData.languagePreference = 0

    wx.setStorage({
      key: 'languagePreference',
      data: app.globalData.languagePreference,
      success: (res) => {
        console.log("Language Set Success")
      }
    })

    wx.reLaunch({
      url: "/pages/index/index"
    })
  },

  Chinese: function () {
    app.globalData.languagePreference = 1
    console.log(app.globalData.languagePreference)

    wx.setStorage({
      key: 'languagePreference',
      data: app.globalData.languagePreference,
      success: (res) => {
        console.log("Language Set Success")
      }
    })
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },

  Korean: function () {
    app.globalData.languagePreference = 2
    wx.setStorage({
      key: 'languagePreference',
      data: app.globalData.languagePreference,
      success: (res) => {
        console.log("Language Set Success")
      }
    })
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },
  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {

  // },

  // /**
  //  * 生命周期函数--监听页面初次渲染完成
  //  */
  // onReady: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面显示
  //  */
  // onShow: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面隐藏
  //  */
  // onHide: function () {

  // },

  // /**
  //  * 生命周期函数--监听页面卸载
  //  */
  // onUnload: function () {

  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {

  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {

  // },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})