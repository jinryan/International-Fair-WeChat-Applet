// miniprogram/pages/bottom_nav5/bottom_nav5.js
const app = getApp()
Page({

  data: {
    nav_height: app.globalData.nav_height,
  },
  onLoad: function(){
    this.setData({
      one: app.globalData.one,
      two: app.globalData.two,
      three: app.globalData.three,
      four: app.globalData.four,
      five: app.globalData.five,
    })
  },
  onPullDownRefresh: function(){
    this.setData({
      one: app.globalData.one,
      two: app.globalData.two,
      three: app.globalData.three,
      four: app.globalData.four,
      five: app.globalData.five,
    })
    wx.stopPullDownRefresh()
  },

  bottom_nav1: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav1/bottom_nav1',
    })
    app.globalData.one = 'C94731'
    app.globalData.two = 'ffffff'
    app.globalData.three = 'ffffff'
    app.globalData.four = 'ffffff'
    app.globalData.five = 'ffffff'
  },

  bottom_nav2: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav2/bottom_nav2',
    })
    app.globalData.one = 'ffffff'
    app.globalData.two = 'C94731'
    app.globalData.three = 'ffffff'
    app.globalData.four = 'ffffff'
    app.globalData.five = 'ffffff'
  },

  bottom_nav3: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })
    app.globalData.one = 'ffffff'
    app.globalData.two = 'ffffff'
    app.globalData.three = 'C94731'
    app.globalData.four = 'ffffff'
    app.globalData.five = 'ffffff'
  },

  bottom_nav4: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav4/bottom_nav4',
    })
    app.globalData.one = 'ffffff'
    app.globalData.two = 'ffffff'
    app.globalData.three = 'ffffff'
    app.globalData.four = 'C94731'
    app.globalData.five = 'ffffff'
  },

  bottom_nav5: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav5/bottom_nav5',
    })
    app.globalData.one = 'ffffff'
    app.globalData.two = 'ffffff'
    app.globalData.three = 'ffffff'
    app.globalData.four = 'ffffff'
    app.globalData.five = 'C94731'
  },

  menu: function () {
    wx.navigateTo({
      url: '/pages/bottom_nav5/menu/menu',
    })

  },

  toGame: function () {
    wx.navigateTo({
      url: '/pages/bottom_nav5/games/games',
    })
  },
  
  toSponsors: function(){
    wx.navigateTo({
      url: '/pages/settings/sponsors/sponsors',
    })    
  },

  toVendor: function () {
    wx.navigateTo({
      url: '/pages/bottom_nav5/vendors/vendors',
    })
  },
  toSettings: function () {
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  }
})