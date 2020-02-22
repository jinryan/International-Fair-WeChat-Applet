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
  return hour + ":" + min + ":" + sec;
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
    msg_show2: false,
    transfering: false,
    key: "",
    otherUserEaglebuck: 0,
    transferBoothName: "",
    transferUsername: "",
    avatarUrl: '/images/user_unlogin.png',
    userInfo: {},
    aspect_rat: 0.0,
    paying: false,
    useableHeight: app.globalData.useableHeight,
    max_transaction: 99999999999999,
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

  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
        })
        console.log(res.userInfo)
      }
    }),


      wx.getSystemInfo({
        success: res => {
          this.setData({
            aspect_rat: res.screenHeight / res.screenWidth,
            paying: false
          })
          console.log(this.data.aspect_rat)
        },
      }),
      this.setData({
        max_transaction: app.globalData.max_transaction
      })
    if (app.globalData.max_transaction == "Unlimited") {
      this.setData({
        max_transaction: 999999999999
      })
    }

  },

  onReady: function () {

    var myThis = this
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log("the qr code says: " + res.result)
        if(res.result.charAt(0) == '_'){
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
                errorPage("you scanned an invalid qr code") 

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
              field: "boothData"
            },
            fail: (res) => {
              console.log(res)
            },
            success: (res) => {
              try{
                var retInfo = res.result.data[0]
                console.log(retInfo._id)
                myThis.setData({
                  transferBoothName: retInfo._id
                })

              }catch (err){
                console.log(err)
                errorPage("you scanned an invalid qr code") 
              }
            },
          })
          }
      },
    })
  },


  update: function (price) {
    console.log("AM I PAYING?")
    console.log(this.data.paying)
    if (!this.data.paying) {
      var myThis = this;
      this.setData({
        paying: true
      })
      if (app.globalData.myEaglebuck >= parseInt(price.detail.value.number) && parseInt(price.detail.value.number) > 0 && parseInt(price.detail.value.number) <= this.data.max_transaction) {
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
            field: "boothData"
          },
          fail: (res) => {
            console.log(res)
          },
          success: (res) => {
            var retInfo = res.result.data[0]
            var boothEaglebucks2 = retInfo.eaglebuck
            console.log(retInfo._id)
            boothEaglebucks2 += parseInt(price.detail.value.number)

            myThis.setData({
              boothEaglebucks: boothEaglebucks2,
              boothName: retInfo._id
            })

            console.log(myThis.data.boothName)
            app.globalData.booth = myThis.data.boothName
            console.log(app.globalData.booth)

            wx.cloud.callFunction({
              name: "update",
              data: {
                _id: this.data.qrData,
                eaglebuck: this.data.boothEaglebucks,
                field: "boothData"
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
          msg_show2: false,
          paying: false,
        })
      }
      else if (parseInt(price.detail.value.number)>this.data.max_transaction){
        this.setData({
          msg_show: false,
          msg_show1: false,
          msg_show2: true,
          paying: false,
        })
      }
      else {
        this.setData({
          msg_show1: true,
          msg_show: false,
          msg_show2: false,
          paying: false,
        })
      }
    } else {
      console.log("already transferring")
    }

  },



  transfer: function (price) {

    console.log("AM I PAYING?")
    console.log(this.data.paying)
    console.log(price)
    if(!this.data.paying){
      this.setData({
        paying: true
      })
      if (app.globalData.myEaglebuck >= parseInt(price.detail.value.number) && parseInt(price.detail.value.number) > 0 && parseInt(price.detail.value.number) <= this.data.max_transaction) {
      var myThis = this
      wx.cloud.init()
      if (app.globalData.myEaglebuck >= parseInt(price.detail.value.number)) {
        app.globalData.myEaglebuck -= parseInt(price.detail.value.number)
      }
      else {
        this.setData({
          msg_show: true,
        })
      }

        console.log("old eagle bucks: " + app.globalData.myEaglebuck)
        console.log("person transfering acc" + app.globalData.ID)
        console.log("person recieving acc" + myThis.data.key)
        console.log("transfering amount" + parseInt(price.detail.value.number))
        console.log("begin transfering to user below")

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
              myThis.data.otherUserEaglebuck += parseInt(price.detail.value.number)
              console.log(myThis.data.otherUserEaglebuck)
              wx.cloud.callFunction({
                name: "update",
                data: {
                  _id: myThis.data.key,
                  field: "test",
                  eaglebuck: myThis.data.otherUserEaglebuck,
                },
                success: (res) => {
                  wx.cloud.callFunction({
                    name: "pushTransferTransaction",
                    data: {
                      transferFrom: app.globalData.ID,
                      transferTo: myThis.data.key,
                      eaglebuck: parseInt(price.detail.value.number),
                      time: getDateTime(),
                    },
                  })
                  console.log("finished transfer")
                  app.globalData.showTransfer = true
                  wx.reLaunch({
                    url: '/pages/tickets/confirmation/confirmation',
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
      }else{
        this.setData({
          msg_show: false,
          msg_show1: true,
          msg_show2: false,
          paying: false,
        })
      }
    }else{
      console.log("already transferring")
    }
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