// miniprogram/pages/bottom_nav2/Club_info/Club_info.js
const app = getApp()
const db = wx.cloud.database()

var pullNum = 5;
Page({
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  data: {
    clubData: [],
    boothName: "",
    loaded: true,
    userTransaction: [],
    boothID: "",
    boothEagleBucks: 0,
    qrData: "",
    showQR: false,
    refunding: false,
    src: "/resources/notif.mp3",
    useableHeight: app.globalData.useableHeight,
    avatarUrl: '/images/user_unlogin.png',
    userInfo: {},
    logged: false
  },

  logout: function () {
    app.globalData.boothUser = ''
    app.globalData.boothHidden = true
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  showQR: function () {
    const db = wx.cloud.database()
    const watcher = db.collection('transaction').doc().watch({
      onChange: function (snapshot) {
        console.log('snapshot', snapshot)
      },
      onError: function (err) {
        console.error('the watch closed because of error', err)
      }
    })
    var myThis = this;
    this.setData({
      showQR: !this.data.showQR,
    })
  },


  pullMore: function () {
    app.globalData.pullNum += 5
    wx.redirectTo({
      url: '/pages/UserHistory/UserHistory',
    })
  },

  onLoad: function (options) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
                console.log(this.data.userInfo)
              }
            })
          }
        }
      })
    var myThis = this;
    this.setData({
      boothUser: app.globalData.boothUser,
      loaded: true,
      refunding: false,
      useableHeight: app.globalData.useableHeight,
    })
    wx.cloud.init()
    console.log(app.globalData.pullNum)
        wx.cloud.callFunction({
          name: "pullUserTransaction",
          data: {
            userKey: app.globalData.ID,
            field: "transaction",
            num: parseInt(app.globalData.pullNum),
          },
          fail: (res) => {
            console.log("fail")
            console.log(res)
          },
          success: (res) => {
            console.log(res)

            myThis.setData({
              userTransaction: res.result.data,
            })
            console.log("success pulled tranasactions  :")

            console.log(myThis.data.userTransaction)
          },
        })
  },

  onGetUserInfo: function (e) {
    console.log('user info gotten')
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
    console.log(this.data)
  },
})