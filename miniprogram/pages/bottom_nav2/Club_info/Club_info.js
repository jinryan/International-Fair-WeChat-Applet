// miniprogram/pages/bottom_nav2/Club_info/Club_info.js
const app = getApp()
var pullNum = 5;
Page({


  data: {
    clubData: [],
    boothName: "",
    loaded: true,
    clubTransaction: [],
    boothID: "",
    boothEagleBucks: -1,
    pullNum: 5,
  },

logout: function(){
  app.globalData.boothUser = ''
  app.globalData.boothHidden = true
  wx.reLaunch({
    url: '/pages/index/index'
  })
},

  reload: function(){
    app.globalData.pullNum = 5
    wx.reLaunch({
      url: '/pages/bottom_nav2/Club_info/Club_info',
    })  
  },

  pullMore: function(){
    app.globalData.pullNum += 5
    wx.redirectTo({
      url: '/pages/bottom_nav2/Club_info/Club_info',
    })  
  },

  pullTransaction: function (input) {
    var myThis = this;
    // var boothName = input.detail.value.boothName;
    var boothName = app.globalData.boothUser
    myThis.setData({
      boothName: input.detail.value.boothName,
    })
    console.log(boothName)
    wx.cloud.callFunction({
      name: "pullTransaction",
      data: {
        _id: boothName,
        field: "transaction",
        num: 5,
      },
      fail: (res) => {
        console.log("fail")

        console.log(res)
      },
      success: (res) => {

        myThis.setData({
          clubTransaction: res.result.data,
        })

        console.log(myThis.data.clubTransaction)
      },
    })
  },

  refund: function (input) {
    var myThis = this;
    var number = input.detail.value.number - 1
    console.log(number)
    var key = this.data.clubTransaction[number].key
    var transferedEaglebucks = this.data.clubTransaction[number].eaglebuck



    wx.cloud.callFunction({
      name: "refund",
      data: {
        boothName: myThis.data.boothName,
        key: key,
        eaglebuck: transferedEaglebucks,
        field: "booths",
      },
      success: (res) => {

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
            _id: this.data.boothID,
            eaglebuck: newBoothEB,
            field: "booths"
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
                    console.log('finished refund')
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



      }
    })
  },


  onLoad: function (options) {
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
            num: app.globalData.pullNum,

          },
          fail: (res) => {
            console.log("fail")
            console.log(res)
          },
          success: (res) => {
            myThis.setData({
              clubTransaction: res.result.data,
            })
            console.log(myThis.data.clubTransaction)
          },
        })
      },
    })
  },




















})