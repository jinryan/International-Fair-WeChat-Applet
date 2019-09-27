// miniprogram/pages/bottom_nav2/bottom_nav2.js
const app = getApp()
var counter = 0;
var shat = false;
var date = new Date();
var hour = date.getHours();
var test_hour = 17;
function generateID() {
  return ('_' + Math.random().toString(36).substr(2, 25));
}

Page({

  data: {
    qrData: "",
    nav_height: app.globalData.nav_height,
    boothHidden: true,
    aspect_rat: 0.0,
    height: 0,
    width: 0,
    boothUser: '',
  },

  onLoad: function () {
    wx.cloud.init()
    this.setData({
      myEaglebuck: app.globalData.myEaglebuck,
      one: app.globalData.one,
      two: app.globalData.two,
      three: app.globalData.three,
      four: app.globalData.four,
      five: app.globalData.five,
      languagePreference: app.globalData.languagePreference,
      boothHidden: app.globalData.boothHidden,
      boothUser: app.globalData.boothUser,
    })
    console.log(this.data.boothHidden)

    wx.getSystemInfo({
      success: res => {
        this.setData({

          aspect_rat: res.safeArea.height / res.safeArea.width,
          height: res.safeArea.height - 80 - app.globalData.nav_height,
          width: res.safeArea.width,
        })
        console.log(this.data.aspect_rat)
      },
    })

  },
  onReady: function () {
    wx.cloud.init()
    console.log("within the pull function " + app.globalData.ID)
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        _id: app.globalData.ID,
        field: "test"
      },
      fail: (res) => {
        console.log(res)
      },
      success: (res) => {
        var retInfo = res.result.data[0]
        console.log(retInfo)
        app.globalData.myEaglebuck = retInfo.eaglebuck
        console.log(retInfo.username + " has " + retInfo.eaglebuck + " Eaglebucks")
        this.setData({
          myEaglebuck: app.globalData.myEaglebuck,
        })
      },
    })
  },
  //seperate button handling
  onGotUserInfo: function (e) {
    const app = getApp()
    app.globalData.userInfo = e.detail.userInfo.nickName
  },

  // clout: function () {
  //   if (counter == 0) {
  //     setTimeout(this.clout, 1500)
  //     counter++;
  //     return
  //   }
  //   wx.cloud.callFunction({
  //     name: "pushstuff",
  //     data: {
  //       eaglebuck: app.globalData.myEaglebuck,
  //       username: app.globalData.userInfo,
  //       _id: app.globalData.ID
  //     },
  //     fail: function () {
  //       console.log("already exists")
  //       return
  //     }
  //   })
  //   return
  // },


  // gucci: function () {
  //   wx.cloud.init()
  //   wx.cloud.callFunction({
  //     name: "pullstuff",
  //     data: {
  //       _id: app.globalData.ID,
  //       field: "test"
  //     },
  //     fail: (res) => {
  //       console.log("ID do not match")
  //     },
  //     success: (res) => {
  //       var retInfo = res.result.data[0]
  //       app.globalData.myEaglebuck = retInfo.eaglebuck
  //       this.setData({

  //         myEaglebuck: app.globalData.myEaglebuck,
  //       })
  //       console.log(retInfo.username + " has " + retInfo.eaglebuck + " Eaglebucks")
  //     },
  //   })
  //   return
  // },

  // update: function (price) {

  //   app.globalData.myEaglebuck += parseInt(price.detail.value.number)
  //   this.setData({
  //     myEaglebuck: app.globalData.myEaglebuck,
  //   })

  //   wx.cloud.callFunction({
  //     name: "update",
  //     data: {
  //       _id: app.globalData.ID,
  //       eaglebuck: app.globalData.myEaglebuck,
  //     },
  //   })
  // },

  setStorage: function () {
    wx.setStorage({
      key: "key",
      data: this.data.ID,
      success: function () {
        console.log('it workedddddddd')
      }
    })
  },

  getStorage: function () {
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log(res.data)
      }
    })
  },

  // scan: function(){
  //   var myThis = this
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success(res) {
  //       console.log("the qr code says: " + res.result)
  //       myThis.setData({
  //         qrData: res.result
  //       })
  //     }
  //   })

  // },

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

  buy_tickets: function () {
    wx.navigateTo({
      url: '/pages/tickets/buy_tickets/buy_tickets',
    })
  },

  testing: function () {
    if (hour < 17) {
      wx.navigateTo({
        url: '/pages/test_alarm/test_alarm',
      })
    }
    else if (hour > 16) {
      wx.navigateTo({
        url: '/pages/test_alarm/test_alarm2',
      })
    }
    app.globalData.one = 'ffffff'
    app.globalData.two = 'ffffff'
    app.globalData.three = 'ffffff'
    app.globalData.four = 'ffffff'
    app.globalData.five = 'ffffff'
  },

  club_info: function () {
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "booths"
      },
      fail: (res) => {
        console.log(res.result)
      },
      success: (res) => {
        app.globalData.clubData = res.result.data
        console.log("redirecting to club infopage")
        console.log(app.globalData.clubData)
        wx.navigateTo({
          url: '/pages/bottom_nav2/Club_info/Club_info',
        })
      },
    })
  },

  spend_tickets: function () {
    wx.navigateTo({
      url: '/pages/tickets/spend_tickets/spend_tickets',
    })
  },
  
  transfer: function () {
    wx.navigateTo({
      url: '/pages/tickets/transfer/transfer',
    })
  },
})