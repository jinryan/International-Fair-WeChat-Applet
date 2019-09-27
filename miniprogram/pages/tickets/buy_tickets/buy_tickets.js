const app = getApp()

Page({
  data: {
    msg_show: false,
    tenTicket: 10,
    twentyTicket: 20,
    fiftyTicket: 50,
    hundredTicket: 100,
  },
  update: function (price) {
    var $this = this
    var transferNum = parseInt(price.currentTarget.dataset.tkt)
    var ticketPrice = 1
    app.globalData.myEaglebuck += parseInt(price.currentTarget.dataset.tkt)
    this.setData({
      myEaglebuck: app.globalData.myEaglebuck,
    })
    console.log("in update")

    wx.cloud.callFunction({
      name: "update",
      data: {
        _id: app.globalData.ID,
        eaglebuck: app.globalData.myEaglebuck,
        field: "test"
      },
      success: (res) => {
        console.log("success update")
        wx.cloud.callFunction({
          name: "pullstuff",
          data: {
            field: "purchase",
            _id: "1",
          },
          success: (res) => {
            console.log(res.result.data[0].eaglebuck)
            transferNum = transferNum * ticketPrice + parseInt(res.result.data[0].eaglebuck)
            wx.cloud.callFunction({
              name: "update",
              data: {
                field: "purchase",
                _id: "1",
                eaglebuck: transferNum,
              },
              success: (res) => {
                console.log("updated")

              }
            })


          },
        })

      }
    })



    app.globalData.showTransfer = false

    wx.reLaunch({
      url: '/pages/tickets/confirmation/confirmation',
    })

  },

  updateTest: function (event){
    var $this = this;
    console.log(event.currentTarget.dataset.Ticket)
  }
})