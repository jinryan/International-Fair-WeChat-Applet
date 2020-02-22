// miniprogram/pages/bottom_nav5/bottom_nav5.js
const app = getApp()
var x = false
Page({

  /**
   * Page initial data
   */
  data: {
    x: 0,
    nav_height: app.globalData.nav_height,
    menuArray: [],
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

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


  toMenu: function (name) {
    app.globalData.menu_name = name.currentTarget.dataset.nam
    wx.navigateTo({
      url: '/pages/menu_1/menu_1',
    })
  },

  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },

          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  onLoad: function () {
    this.setData({
      one: app.globalData.one,
      two: app.globalData.two,
      three: app.globalData.three,
      four: app.globalData.four,
      five: app.globalData.five,
      menuArray: app.globalData.menuArray,
    })
    console.log("menu page loaded")
    console.log(this.data.menuArray)
  },
  onPullDownRefresh: function(){
    this.setData({
      one: app.globalData.one,
      two: app.globalData.two,
      three: app.globalData.three,
      four: app.globalData.four,
      five: app.globalData.five,
      menuArray: app.globalData.menuArray,
    })
    console.log("menu page loaded")
    console.log(this.data.menuArray)
    wx.stopPullDownRefresh()
  },
})

