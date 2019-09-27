//index.js
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

  return year + month + day + hour + min;
}
var x = false
function generateID() {
  return ('_' + Math.random().toString(36).substr(2, 25));
}
Page({

  data: {
    markers: [
      {
        iconPath: '/images/Puxi.png',
        latitude: 31.205100,
        longitude: 121.280384,
        width: 430,
        height: 430,
        anchor: { x: 0.5, y: 0.5 },
        rotate: -31,
        zIndex: 6,
        alpha: 1,
      },
    ],

    useableHeight: 0,
    languagePreference: 0,
    nav_height: app.globalData.nav_height,
    asdfasdf: false,
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    x: 0,
    content: 'nothing',
    requestResult: '',
    cropT: 400,
    cropL: 400,
    one: app.globalData.one,
    two: app.globalData.two,
    three: app.globalData.three,
    four: app.globalData.four,
    five: app.globalData.five,
    expand1: false,
    expand2: false,
    expand3: false,
    ticket: "/images/ticket.png",
    myEaglebuck: app.globalData.myEaglebuck,
    found: 0,
    foundOne: 1,
    latitude: app.globalData.latitude,
    longitude: app.globalData.longitude,
    languagePreferece: 0,
    slide: 1,
    // latitude: 31.204967,
    // longitude: 121.280464,
    show_tutorial: app.globalData.show_tutorial,
    nextEvent: {},
    announcementMessage: "",
    coords: [
      { id: 1, lat: 31.204534, long: 121.283491 },
      { id: 2, lat: 31.207158, long: 121.280999 },
      { id: 3, lat: 31.205401, long: 121.277437 },
      { id: 4, lat: 31.202414, long: 121.279798 },
    ],
    scheduleSlide: 0,
    tutorialSlides: [{ id: 0, color: "red" },
    { id: 1, color: "blue" },

    { id: 2, color: "green" },
    { id: 3, color: "orange" },
    { id: 4, color: "yellow" },
    { id: 5, color: 4206963 }
    ],
  },




  easterEgg: function () {
    app.globalData.easter_egg = true
    console.log(app.globalData.easter_egg)
  },

  easterEgg2: function () {
    app.globalData.easter_egg2 = true
    console.log(app.globalData.easter_egg2)
  },

  toSettings: function () {
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  },

  buy_tickets: function () {
    wx.navigateTo({
      url: '/pages/bottom_nav2/bottom_nav2',
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

  tutorial: function () {
    wx.setStorage({
      key: 'show_tutorial',
      data: false,
      success: (res) => {
        console.log("Tutorial")
      }
    })
    app.globalData.show_tutorial = false
    wx.reLaunch({
      url: "/pages/index/index"
    })
  },

  click_button: function () {
    if (!this.data.expand1) {
      this.setData({
        expand1: true,
      })
    }
    else {
      this.setData({
        expand1: false,
      })
    }
  },

  click_button2: function () {
    if (!this.data.expand2) {
      this.setData({
        expand2: true,
      })
    }
    else {
      this.setData({
        expand2: false,
      })
    }
  },

  click_button3: function () {
    if (!this.data.expand3) {
      this.setData({
        expand3: true,
      })
    }
    else {
      this.setData({
        expand3: false,
      })
    }
  },
  pullUserEaglebucks: function () {
    wx.cloud.init()
    var myThis = this
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
        console.log("within success")
        console.log(res)
        console.log(retInfo)

        app.globalData.myEaglebuck = retInfo.eaglebuck
        console.log(retInfo.username + " has " + retInfo.eaglebuck + " Eaglebucks")
        myThis.setData({
          myEaglebuck: app.globalData.myEaglebuck,
        })
      },
    })
  },
  onLoad: function () {
    wx.cloud.init()
    var myThis = this
    app.globalData.time = parseInt(getDateTime(), 10)
    this.setData({
      time: app.globalData.time,
      show_tutorial: app.globalData.show_tutorial,
    })

    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "announcement",
      },
      fail: (res) => {
        console.log(res)
      },
      success: (res) => {
        var message = res.result.data[0].message
        myThis.setData({
          announcementMessage: message
        })
        console.log(message)
      }
    })

    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "schedule",
      },
      fail: (res) => {
        console.log(res)
      },
      success: (res) => {

        console.log("in schedule pull success")
        var nextEvent = [];
        var scheduleArray = res.result.data;
        app.globalData.schedule = scheduleArray;
        console.log(app.globalData.schedule)
        console.log("original schedule")
        for (var i = 0; i < scheduleArray.length; i++) {
          if (scheduleArray[i].time >= 1345) {
            nextEvent.push(scheduleArray[i]);
          };
        }
        console.log("cut off schedule")
        console.log(nextEvent)

        var nextEvent2 = [];
        for (var i = 0; i < nextEvent.length; i++) {
          if (nextEvent[i].time < 1345 + 200) {
            nextEvent2.push(nextEvent[i]);
          };
        }
        console.log("final schedule")
        console.log(nextEvent2)
        console.log("finished with schedule: ")
        myThis.setData({
          nextEvent: nextEvent2,
          numEvents: nextEvent2.length,
        })
        console.log(myThis.data.nextEvent)
        console.log("asdfasfdasfdsaf")
        console.log(myThis.data.nextEvent.length)
      },

    }),

      wx.getStorage({
        key: 'languagePreference',
        success: (res) => {
          console.log(res.data)
          console.log("in success of get storage for language")
          app.globalData.languagePreference = res.data
          this.setData({
            languagePreference: app.globalData.languagePreference
          })
          console.log("Language Preference: " + this.data.languagePreference)
        },
        fail: (res) => {
          console.log("fail")
        }
      })

    console.log("in onload")
    if (!wx.cloud) {
      wx.reLaunch({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    wx.getSystemInfo({
      success: res => {
        this.setData({
          myEaglebuck: app.globalData.myEaglebuck,
          screenW: res.screenWidth,
          screenH: res.screenHeight,
        })
        console.log(this.data.screenW)
        console.log(res.SDKVersion)
      },
    })

    // 获取用户信息
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
              var myThis = this
              console.log("user name : " + this.data.userInfo.nickName)
              wx.getStorage({
                key: 'key',
                success(res) {
                  console.log("id key exists:")
                  app.globalData.ID = res.data
                  console.log(app.globalData.ID)
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
                      console.log("within success")
                      console.log(res)
                      console.log(retInfo)

                      app.globalData.myEaglebuck = retInfo.eaglebuck
                      console.log(retInfo.username + " has " + retInfo.eaglebuck + " Eaglebucks")
                      myThis.setData({
                        myEaglebuck: app.globalData.myEaglebuck,
                      })
                    },
                  })
                },
                fail(res) {
                  app.globalData.ID = generateID()
                  wx.cloud.init()
                  console.log(app.globalData.ID)
                  console.log(myThis.data.userInfo.nickName)
                  wx.setStorage({
                    key: "key",
                    data: app.globalData.ID,
                    success: () => {

                      console.log('uniqe id key generated+ about to push new user entry')
                      console.log("username" + myThis.data.userInfo.nickName)

                      wx.cloud.callFunction({
                        name: "pushstuff",
                        data: {
                          eaglebuck: app.globalData.myEaglebuck,
                          username: myThis.data.userInfo.nickName,
                          _id: app.globalData.ID
                        },
                        success: (res) => {
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
                              console.log("within success")
                              console.log(res)
                              console.log(retInfo)

                              app.globalData.myEaglebuck = retInfo.eaglebuck
                              console.log(retInfo.username + " has " + retInfo.eaglebuck + " Eaglebucks")
                              myThis.setData({
                                myEaglebuck: app.globalData.myEaglebuck,
                              })
                            },
                          })
                        },

                      })

                    }
                  })
                },

              })
            }
          })
        }
      }
    })

    wx.getLocation({
      type: 'gcj02',
      fail(res) {
        console.log("fail")
      },
      success: res => {
        console.log("success!")
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.speed)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        // this.data.markers[1].latitude = res.latitude
        // this.data.markers[1].longitude = res.longitude
      },
    })

    // this.mapCtx = wx.createMapContext('myMap')
    // // const ctx = wx.createCanvasContext('map_preview')
    // // //ctx.drawImage('/images/Puxi.png', -500, -500, 1000, 1000)
    // // ctx.arc(this.data.screenW/2, this.data.screenW/3, 10, 0, 2*Math.PI)
    // // ctx.draw()
    // this.mapCtx.moveToLocation()
    // // wx.openLocation({
    // //   latitude: this.data.latitude,
    // //   longitude: this.data.longitude,
    // // })
    console.log(this.data.numEvents)
  },



  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },



  onReady: function () {


    // this.mapCtx.moveToLocation()
    // if (myEaglebuck < 50) {
    //   this.setData({
    //     ticket: "/images/ticket.png"
    //   })
    // }
    // else if (myEaglebuck < 100) {
    //   this.setData({
    //     ticket: "/images/home.png"
    //   })
    // }
    // else {
    //   this.setData({
    //     ticket: "/images/food.png"
    //   })
    // }
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.reLaunch({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.reLaunch({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
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

            wx.reLaunch({
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


  spend_tickets: function () {
    wx.navigateTo({
      url: '/pages/tickets/spend_tickets/spend_tickets',
    })
  },

})