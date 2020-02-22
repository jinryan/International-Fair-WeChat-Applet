// miniprogram/pages/menu_1/menu_1.js

const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    index: 0,
    imageNames: [],
    loadImages: 1,
    menuArray: [],
    currentMenu: [],
    name: '',
    popup_hidden: true,
    popup_name: "",
    popup_description: "",
    indexx: 0,
  },


  popup: function (id) {
    var ind = id.currentTarget.dataset.index
    this.setData({
      popup_hidden: false,
      popup_name: this.data.currentMenu[ind]['name'],
      // popup_description: this.data.currentMenu[ind]['description'],
      indexx: ind,
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {


    this.setData({
      menuArray: app.globalData.menuArray,
      index: app.globalData.menu_name,
    })
    this.setData({
      currentMenu: this.data.menuArray[this.data.index].items,
      name: this.data.menuArray[this.data.index]._id.toLowerCase(),
    })
    console.log(this.data.name)
    console.log(this.data.currentMenu)
  },
closePopup: function(){
  this.setData({
    popup_hidden:true,
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

    this.setData({
      menuArray: app.globalData.menuArray,
      index: app.globalData.menu_name,
    })
    this.setData({
      currentMenu: this.data.menuArray[this.data.index].items,
      name: this.data.menuArray[this.data.index]._id.toLowerCase(),
    })
    console.log(this.data.menuArray)
    console.log(this.data.currentMenu)
    wx.stopPullDownRefresh()
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