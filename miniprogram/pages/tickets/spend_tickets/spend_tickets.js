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
  return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

function errorPage(message) {
  app.globalData.errorMessage = message
  wx.reLaunch({
    url: '/pages/Error/Error',
  })
}

Page({


  data: {
    myEaglebuck: app.globalData.myEaglebuck,
    qrData: "",
    scanned: false,
    boothEaglebucks: 0,
    boothName: "",
    time: "",
    nickName: "",
    msg_show: false,
    msg_show1: false,
    transfering: false,
    key: "",
    otherUserEaglebuck: 0,
    transferBoothName: "",
    transferUsername: "",
    avatarUrl: '/images/user_unlogin.png',
    userInfo: {},
    aspect_rat: 0.0,
  },

  // scan: function () {
  //   var myThis = this
  //   wx.scanCode({
  //     onlyFromCamera: true,
  //     success(res) {
  //       console.log("the qr code says: " + res.result)
  //       myThis.setData({
  //         qrData: res.result,
  //         scanned: true
  //       })
  //     }
  //   })
  // },

  onLoad: function(){
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
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          aspect_rat: res.screenHeight/res.screenWidth
        })
        console.log(this.data.aspect_rat)
      },
    })
  },

  
  onReady: function () {
    var myThis = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("the qr code says: " + res.result)
        if(res.result.length>1){
          myThis.setData({
            key: res.result,
            transfering: true
          })
          console.log("the qr code says: " + res.result)
          console.log("scanned user qrcode")
          wx.cloud.callFunction({
            name: "pullstuff",
            data: {
              _id: myThis.data.key,
              field: "test",
            },
            success: (res) => {
              try{
              console.log(res.result.data[0].username)
              myThis.setData({
                transferUsername: res.result.data[0].username
              })
              } catch (err){
                console.log("scanned incorrect")
                errorPage("you scanned incorrect")

              }
            },
          })


        }else{
          myThis.setData({
            qrData: res.result,
            scanned: true
          })
          console.log("scanned booth qrcode")

          wx.cloud.callFunction({
            name: "pullstuff",
            data: {
              _id: myThis.data.qrData,
              field: "booths"
            },
            fail: (res) => {
              console.log(res)
            },
            success: (res) => {
              try{
                var retInfo = res.result.data[0]
                console.log(retInfo.boothName)
                myThis.setData({
                  transferBoothName: retInfo.boothName
                })  
              }catch (err){
                console.log(err.message())
              }
            },
          })
          }
      },
    })
  },


  update: function (price) {
    var myThis = this;

    if (app.globalData.myEaglebuck >= parseInt(price.detail.value.number) && parseInt(price.detail.value.number) > 0) {
      app.globalData.myEaglebuck -= parseInt(price.detail.value.number)
      app.globalData.transferAmount = parseInt(price.detail.value.number)
      this.setData({
        myEaglebuck: app.globalData.myEaglebuck,
      })
      wx.cloud.callFunction({
        name: "update",
        data: {
          _id: app.globalData.ID,
          eaglebuck: app.globalData.myEaglebuck,
          field: "test"
        },
      })

      wx.cloud.callFunction({
        name: "pullstuff",
        data: {
          _id: myThis.data.qrData,
          field: "booths"
        },
        fail: (res) => {
          console.log(res)
        },
        success: (res) => {
          var retInfo = res.result.data[0]
          var boothEaglebucks2 = retInfo.eaglebuck
          console.log(retInfo.boothName)
          boothEaglebucks2 += parseInt(price.detail.value.number)

          myThis.setData({
            boothEaglebucks: boothEaglebucks2,
            boothName: retInfo.boothName
          })

          console.log(myThis.data.boothName)
          app.globalData.booth = myThis.data.boothName
          console.log(app.globalData.booth)

          wx.cloud.callFunction({
            name: "update",
            data: {
              _id: this.data.qrData,
              eaglebuck: this.data.boothEaglebucks,
              field: "booths"
            },
            success: (res) => {
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  console.log(userInfo.nickName)
                  myThis.setData({
                    nickName: userInfo.nickName,
                  })

                  wx.cloud.callFunction({
                    name: "pushTransaction",
                    data: {
                      key: app.globalData.ID,
                      username: myThis.data.nickName,
                      eaglebuck: app.globalData.transferAmount,
                      time: getDateTime(),
                      boothName: myThis.data.boothName
                    },
                  })
                  app.globalData.showTransfer = true
                  wx.reLaunch({
                    url: '/pages/tickets/confirmation/confirmation',
                  })
                }
              })

            }



          })

        },
      })
    }

    else if (parseInt(price.detail.value.number) > app.globalData.myEaglebuck) {
      this.setData({
        msg_show: true,
        msg_show1: false,
      })
    }

    else {
      this.setData({
        msg_show1: true,
        msg_show: false,
      })
    }

  },



  transfer: function (number) {
    var myThis = this
    wx.cloud.init()
    console.log("old eagle bucks: " + app.globalData.myEaglebuck)

    if (app.globalData.myEaglebuck >= parseInt(number.detail.value.number)) {
      app.globalData.myEaglebuck -= parseInt(number.detail.value.number)
    }
    else {
      this.setData({
        msg_show: true,
      })
    }

    console.log("new eagle bucks: " + app.globalData.myEaglebuck)

    wx.cloud.callFunction({
      name: "update",
      data: {
        _id: app.globalData.ID,
        eaglebuck: app.globalData.myEaglebuck,
        field: "test"
      },
      success: (res) => {
        console.log("updated user sending's eaglebucks")
        wx.cloud.callFunction({
          name: "pullstuff",
          data: {
            _id: myThis.data.key,
            field: "test",
          },
          success: (res) => {
            console.log("pulled user transfered to eagle bucks: ")
            myThis.data.otherUserEaglebuck = res.result.data[0].eaglebuck
            console.log(myThis.data.otherUserEaglebuck)
            myThis.data.otherUserEaglebuck += parseInt(number.detail.value.number)
            console.log(myThis.data.otherUserEaglebuck)
            wx.cloud.callFunction({
              name: "update",
              data: {
                _id: myThis.data.key,
                field: "test",
                eaglebuck: myThis.data.otherUserEaglebuck,
              },
              success: (res) => {
                console.log("finished transfer")
                wx.reLaunch({
                  url: '/pages/bottom_nav2/bottom_nav2',
                })
                app.globalData.one = 'ffffff'
                app.globalData.two = 'C94731'
                app.globalData.three = 'ffffff'
                app.globalData.four = 'ffffff'
                app.globalData.five = 'ffffff'
              }
            })

          }
        })
      }

    })
  },







  bottom_nav1: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav1/bottom_nav1',
    })
  },
  bottom_nav2: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav2/bottom_nav2',
    })
  },
  bottom_nav3: function () {
    wx.reLaunch({
      url: '/pages/index/index',
    })

  },
  bottom_nav4: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav4/bottom_nav4',
    })

  },
  bottom_nav5: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav5/bottom_nav5',
    })
  },
})