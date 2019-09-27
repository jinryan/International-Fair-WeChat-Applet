// miniprogram/pages/bottom_nav2/bottom_nav2.js
const app = getApp()

function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return hour + min;
}

function getBarronTime() {

  var date = new Date();

  var hour = date.getHours();

  return hour;
}

const gra = function (min, max) {
  return Math.random() * (max - min) + min;
}

const init = function () {
  let items = document.querySelectorAll('section');
  for (let i = 0; i < items.length; i++) {
    items[i].style.background = randomColor({ luminosity: 'light' });
  }
  cssScrollSnapPolyfill()
}

Page({
  data: {
    nav_height: app.globalData.nav_height,
    addTime: 100,
    barron: false,
  },
  
  onLoad: function () {
    app.globalData.time = parseInt(getDateTime(),10)
    this.setData({
      one: app.globalData.one,
      two: app.globalData.two,
      three: app.globalData.three,
      four: app.globalData.four,
      five: app.globalData.five,
      time: app.globalData.time,
    })
    console.log(this.data.time)

    var myThis = this
    if(parseInt(getBarronTime()) < 5){
      myThis.setData({
        barron: true
      })
    }else{
      myThis.setData({
        barron: false
      })
    }

    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "schedule"
      },
      fail: (res) => {
        console.log(res)
      },

      success: (res) => {
        var scheduleArray = res.result.data;
        app.globalData.schedule = scheduleArray;
        console.log(app.globalData.schedule)

        this.setData({
          scheduleArray: app.globalData.schedule
        })
      },

    })
  },

  onReady: function () {
    
  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {
    app.globalData.time = parseInt(getDateTime(), 10)

    this.setData({
      one: app.globalData.one,
      two: app.globalData.two,
      three: app.globalData.three,
      four: app.globalData.four,
      five: app.globalData.five,
      time: app.globalData.time,
    })

    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "schedule"
      },
      fail: (res) => {
        console.log(res)
      },

      success: (res) => {
        var scheduleArray = res.result.data;
        app.globalData.schedule = scheduleArray;
        console.log(app.globalData.schedule)

        this.setData({
          scheduleArray: app.globalData.schedule
        })
      },

    })
  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  bye: function () {
    var myThis = this
    myThis.setData({
      barron: false
    })
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
  
})

