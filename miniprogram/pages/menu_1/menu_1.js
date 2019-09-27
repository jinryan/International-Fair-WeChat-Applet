// miniprogram/pages/menu_1/menu_1.js

const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    name: '',
    imageNames: [],
    loadImages: 1,
  },






  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {

    // If you want to download the image beforehand, figure out a way, I don't know how to. Below is my attempt
    // wx.getStorage({
    //   key: 'https://bluepiglet30.github.io/IFfilehost/American0.png',
    //   success: function (res) {
    //     console.log("success")
    //     console.log(res)
    //   },
    //   fail: function (res) {
    //     console.log("fail")
    //     console.log(res)
    //   }
    // })


    // Back to important stuff

    this.setData({
      imageNames: app.globalData.imageNames,
      name: app.globalData.menu_name,
    })

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },


})