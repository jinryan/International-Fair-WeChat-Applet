// pages/tickets/transfer/transfer.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    key: "not set",
    otherUserEaglebuck: 0,
    msg_show: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  transfer: function (key) {
    this.data.key = key.detail.value.key;
    console.log(this.data.key)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  update: function (number) {
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

})