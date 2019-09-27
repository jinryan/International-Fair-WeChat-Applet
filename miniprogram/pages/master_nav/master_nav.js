// miniprogram/pages/master_nav/master_nav.js
const app = getApp()
Page({
  data: {
    screenH: 0,
    nav_height: 50,
  },
  onLoad: function () {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenH: res.screenHeight,
          nav_height: app.globalData.nav_height,
        })
        console.log(screenH)
      },
    })
  },
})