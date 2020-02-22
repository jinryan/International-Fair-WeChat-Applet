// miniprogram/pages/bottom_nav2/Club_info/Club_info.js
const app = getApp()
const db = wx.cloud.database()

var pullNum = 5;
Page({
  onReady: function (){
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  data: {
    nav_height: app.globalData.nav_height,
    clubData: [],
    boothName: "",
    loaded: true,
    clubTransaction: [],
    boothID: "",
    boothEagleBucks: 0,
    pullNum: 5,
    qrData: "",
    showQR: false,
    refunding: false,
    src: "/resources/notif.mp3",
    useableHeight: app.globalData.useableHeight,
    refunded: false,

    comfirmRefund: false,

  },

  logout: function () {
    app.globalData.boothUser = ''
    app.globalData.boothHidden = true
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  showQR: function () {
    // const db = wx.cloud.database()
    // const watcher = db.collection('transaction').doc().watch({
    //   onChange: function (snapshot) {
    //     console.log('snapshot', snapshot)
    //   },
    //   onError: function (err) {
    //     console.error('the watch closed because of error', err)
    //   }
    // })
    var myThis = this;
    this.setData({
      showQR: !this.data.showQR,
    })
  },
  comfirm: function(){
    this.setData({
      comfirmRefund: true
    })
  },
  refunded: function(){
    this.setData({
      refunding: false
    })
    wx.redirectTo({
      url: '/pages/bottom_nav2/Club_info/Club_info',
    })
  },


  pullMore: function () {
    app.globalData.pullNum += 5
    wx.redirectTo({
      url: '/pages/bottom_nav2/Club_info/Club_info',
    })
  },

  refund: function (input) {
    var myThis = this;
    var refunding = myThis.data.refunding
    console.log(refunding)
    if (!refunding) {
      this.setData({
        refunding: true
      })
      var number = input.currentTarget.dataset.idx
      console.log(number)
      var key = this.data.clubTransaction[number].key
      var id = this.data.clubTransaction[number]._id
      var transferedEaglebucks = this.data.clubTransaction[number].eaglebuck
      wx.cloud.callFunction({
        name: "pullstuff",
        data: {
          _id: id,
          field: "transaction"
        },
        success: (res) =>{
          console.log(res)
          console.log("FUCK^^")
      if(res.result.data.length != 0){
        wx.cloud.callFunction({
          name: "deleteEntry",
          data: {
            _id: id,
            field: "transaction",
          },
          success: (res) => {
      wx.cloud.callFunction({
        name: "refund",
        data: {
          boothName: myThis.data.boothName,
          // key: key,
          // eaglebuck: transferedEaglebucks,
          field: "boothData",
        },
        success: (res) => {
          console.log(res)
          console.log("in call function success")
          console.log("transfered number of eaglebucks: " + transferedEaglebucks)
          console.log("old booth Eaglebucks : " + res.result.data[0].eaglebuck)
          var newBoothEB = res.result.data[0].eaglebuck - transferedEaglebucks
          console.log("new booth Eaglebucks : " + newBoothEB)
          console.log("boothID : " + res.result.data[0]._id)

          myThis.setData({
            boothID: res.result.data[0]._id,
          })

          wx.cloud.callFunction({
            name: "update",
            data: {
              _id: myThis.data.boothUser,
              eaglebuck: newBoothEB,
              field: "boothData"
            },
            success: (res) => {
              console.log("successful removed " + transferedEaglebucks + " from club account")


              wx.cloud.callFunction({
                name: "pullstuff",
                data: {
                  _id: key,
                  field: "test"
                },

                success: (res) => {
                  console.log("pulled from the refund user")
                  console.log("user has " + res.result.data[0].eaglebuck + " eb")
                  var newUserEB = res.result.data[0].eaglebuck + transferedEaglebucks
                  console.log("new user eb: " + newUserEB)
                  console.log("key of user" + key)
                  wx.cloud.callFunction({
                    name: "update",
                    data: {
                      _id: key,
                      eaglebuck: newUserEB,
                      field: "test"
                    },
                    success: (res) => {

                      
                          app.globalData.pullNum = 5;
                          var myThis = this;
                          this.setData({
                            boothUser: app.globalData.boothUser,
                            loaded: true
                          })
                          console.log(this.data.boothUser)

                          wx.cloud.init()
                          wx.cloud.callFunction({
                            name: "pullstuff",
                            data: {
                              field: "boothData",
                              _id: this.data.boothUser,
                            },

                            fail: (res) => {
                              console.log(res.result)
                            },
                            success: (res) => {
                              myThis.setData({
                                clubData: res.result.data,
                              })

                              console.log("pulled this club's info: ")
                              console.log(myThis.data.clubData)


                              myThis.setData({
                                boothName: myThis.data.clubData[0]._id,
                                boothEagleBucks: myThis.data.clubData[0].eaglebuck,
                              })
                              console.log("booth name is: " + myThis.data.boothName)


                              wx.cloud.callFunction({
                                name: "pullTransaction",
                                data: {
                                  boothName: myThis.data.boothName,
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
                                    clubTransaction: res.result.data,
                                  })
                                  console.log("success pulled tranasactions  :")
                                  console.log(myThis.data.clubTransaction)
                                  this.setData({
                                    refunding: false
                                  })
                                  console.log("Finished refunding")
                                },
                              })
                            },
                          })

                        }
                      })




                }

              })

            }

          })

            }
          })
          }
        })

          }else {
            console.log("already Refunded")
        this.setData({
          refunded: true,
          refunding: false

        })
          }

        }
      })
    } else {
      console.log("already refunding")
    }
  },


  onLoad: function (options) {
    const db = wx.cloud.database()
    const watcher = db.collection('transaction').watch({
      onChange: function (snapshot) {
        console.log('snapshot', snapshot)
      },
      onError: function (err) {
        console.error('the watch closed because of error', err)
      }
    })
    console.log("Watcher started")

    var myThis = this;
    this.setData({
      boothUser: app.globalData.boothUser,
      loaded: true,
      refunding: false,
      useableHeight: app.globalData.useableHeight,
      qrData: app.globalData.boothUser,
    })
    console.log(this.data.boothUser)

    wx.cloud.init()
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "boothData",
        _id: this.data.boothUser,
      },

      fail: (res) => {
        console.log(res.result)
      },
      success: (res) => {
        myThis.setData({
          clubData: res.result.data,
        })

        console.log("pulled this club's info: ")
        console.log(myThis.data.clubData)


        myThis.setData({
          boothName: myThis.data.clubData[0]._id,
          boothEagleBucks: myThis.data.clubData[0].eaglebuck,
        })
        console.log("booth name is: " + myThis.data.boothName)


        wx.cloud.callFunction({
          name: "pullTransaction",
          data: {
            boothName: myThis.data.boothName,
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
              clubTransaction: res.result.data,
            })
            console.log("success pulled tranasactions  :")

            console.log(myThis.data.clubTransaction)
            console.log("in onReady")
          },
        })
      },
    })
  },
  onPullDownRefresh: function () {
    app.globalData.pullNum = 5;
    var myThis = this;
    this.setData({
      boothUser: app.globalData.boothUser,
      loaded: true
    })
    console.log(this.data.boothUser)
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "boothData",
        _id: this.data.boothUser,
      },

      fail: (res) => {
        console.log(res.result)
      },
      success: (res) => {
        myThis.setData({
          clubData: res.result.data,
        })

        console.log("pulled this club's info: ")
        console.log(myThis.data.clubData)


        myThis.setData({
          boothName: myThis.data.clubData[0]._id,
          boothEagleBucks: myThis.data.clubData[0].eaglebuck,
        })
        console.log("booth name is: " + myThis.data.boothName)


        wx.cloud.callFunction({
          name: "pullTransaction",
          data: {
            boothName: myThis.data.boothName,
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
              clubTransaction: res.result.data,
            })
            console.log("success pulled tranasactions  :")

            console.log(myThis.data.clubTransaction)
          },
        })
      },
    })
    wx.stopPullDownRefresh()
  },
  
  test: function(){
    this.audioCtx.play()
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
  }
















})