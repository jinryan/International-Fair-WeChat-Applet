// miniprogram/pages/bottom_nav5/vendors/vendors.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vendorArray: [],
    popup_hidden: true,
    popup_name: "",
    popup_description: "",
    centerX: 0,
    centerY: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vendorArray: app.globalData.vendorArray,
    })
    console.log(this.data.vendorArray)
  },

  popup: function (id) {
    var ind = id.currentTarget.dataset.index
    this.setData({
      popup_hidden: false,
      popup_name: this.data.vendorArray[ind]['name'],
      popup_description: this.data.vendorArray[ind]['description'],
      centerX: (this.data.vendorArray[ind]['x1'] + this.data.vendorArray[ind]['x2'] + this.data.vendorArray[ind]['x3'] + this.data.vendorArray[ind]['x4']) / 4,
      centerY: (this.data.vendorArray[ind]['y1'] + this.data.vendorArray[ind]['y2'] + this.data.vendorArray[ind]['y3'] + this.data.vendorArray[ind]['y4']) / 4,
    })
    console.log("centerx")
    console.log(this.data.centerX)
    console.log("centery")
    console.log(this.data.centerY)
  },

  closePopup: function () {
    this.setData({
      popup_hidden: true,
    })
  },

  toMap: function () {
    app.globalData.centerX = this.data.centerX
    app.globalData.centerY = this.data.centerY
    app.globalData.pin_hidden = false
    app.globalData.one = 'C94731'
    app.globalData.two = 'ffffff'
    app.globalData.three = 'ffffff'
    app.globalData.four = 'ffffff'
    app.globalData.five = 'ffffff'
    wx.navigateTo({
      url: '/pages/bottom_nav1/bottom_nav1',
    })
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
    this.setData({
      vendorArray: app.globalData.vendorArray,
    })
    console.log(this.data.vendorArray)
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