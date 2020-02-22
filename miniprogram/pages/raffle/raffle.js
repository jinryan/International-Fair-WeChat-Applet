// miniprogram/pages/raffle/raffle.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    raffleArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      raffleArray: app.globalData.raffleArray,
    })
    console.log(this.data.raffleArray[0].time)
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
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "raffle"
      },
      fail: (res) => {
        console.log(res)
      },

      success: (res) => {
        var raffleArray = res.result.data
        app.globalData.raffleArray = raffleArray
        console.log("done")
      },
    })
    this.setData({
      raffleArray: app.globalData.raffleArray,
    })
    wx.stopPullDownRefresh()

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

  }
})