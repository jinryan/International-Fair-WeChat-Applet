const app = getApp()

Page({
  data: {
    ticketPrice: 0,
    msg_show: false,
    tenTicket: 10,
    twentyTicket: 20,
    fiftyTicket: 50,
    hundredTicket: 100,
    buying: false,
    transferNum: 0,
    useableHeight: app.globalData.useableHeight,
    orderid: "",
    money: 0,
  },

  onLoad: function(){
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "announcement",
        _id: "ticketPrice",
      },
      success: (res) => {
        console.log("Ticket Price")
        var ticketPrice = res.result.data[0].price
        this.setData({
          ticketPrice: ticketPrice
        })
      }
    })
    this.setData({
      buying: false,
    })
  },

  update: function (price) {
    var myThis = this
    if(!myThis.data.buying){
      myThis.setData({
        buying: true,
      })
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "announcement",
        _id: "ticketPrice",
      },
      success: (res) => {
        console.log("Ticket Price")
        var ticketPrice = res.result.data[0].price
        myThis.setData({
          ticketPrice: ticketPrice
        })
        // console.log(res.result.data[0].price)
        // console.log(myThis.data.ticketPrice)
        var that = this
        var transferNum = parseInt(price.currentTarget.dataset.tkt)
        that.setData({
          transferNum: transferNum,
          orderid: '_' + Math.random().toString(36).substr(2, 25),
          money: transferNum * 100 * ticketPrice
        })
        console.log("Final Ticket Price")
        console.log(ticketPrice)

        console.log('form发生了submit事件，携带数据为：', transferNum)

        wx.cloud.callFunction({

          name: "pay",

          data: {

            orderid: that.data.orderid,

            money: that.data.money,

          },

          success(res) {

            console.log("提交成功", res.result)

            that.pay(res.result)

          },

          fail(res) {

            console.log("提交失败", res)

          }

        })
      },
      fail: (res)=>{
        console.log(res)
        wx.reLaunch({
          url: '/pages/tickets/buy_tickets/buy_tickets'
        })
      }
    })
    }else{
      console.log("Already paying")
    }
  },

  updateTest: function (event){
    var $this = this;
    console.log(event.currentTarget.dataset.Ticket)
  },


  pay(payData) {
    var tThis = this

    if(app.globalData.ID == "not set"){
      wx.reLaunch({
        url: '/pages/bottom_nav2/bottom_nav2',
      })
    }else{
      wx.requestPayment({

        timeStamp: payData.timeStamp,

        nonceStr: payData.nonceStr,

        package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***

        signType: 'MD5',

        paySign: payData.paySign, //签名

        success(res) {

          console.log("支付成功", res)
          console.log(tThis)
          app.globalData.myEaglebuck += parseInt(tThis.data.transferNum)
          tThis.setData({
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
              console.log(tThis.data.ticketPrice)
              wx.cloud.callFunction({
                name: "pushPurchase",
                data: {
                  amount: tThis.data.money,
                  userID: app.globalData.ID,
                  _id: tThis.data.orderid,
                  ticketprice: tThis.data.ticketPrice
                },
                success: (res) => {
                  console.log(res)
                  tThis.setData({
                    buying: false,
                  })
                  app.globalData.showTransfer = false

                  wx.reLaunch({
                    url: '/pages/tickets/confirmation/confirmation',
                  })
                }
              })
            }
          })
        },

              // wx.cloud.callFunction({
              //   name: "pullstuff",
              //   data: {
              //     field: "purchase",
              //     _id: "1",
              //   },
              //   success: (res) => {
              //     console.log(res.result.data[0].eaglebuck)
              //     transferNum = transferNum + parseInt(res.result.data[0].eaglebuck)
              //     wx.cloud.callFunction({
              //       name: "update",
              //       data: {
              //         field: "purchase",
              //         _id: "1",
              //         eaglebuck: transferNum,
              //       },
              //       success: (res) => {
              //         console.log("updated")

              //       }
              //     })


          //       },
          //     })

          //   }
          // })


        // },

        fail(res) {

          console.log("支付失败", res)

        },

        complete(res) {
          console.log("支付完成", res)
          tThis.setData({
            buying: false,
          })
        }

      })

    }
  }

})






























// const app = getApp()

// Page({
//   data: {
//     msg_show: false,
//     tenTicket: 10,
//     twentyTicket: 20,
//     fiftyTicket: 50,
//     hundredTicket: 100,
//     buying: false,
//   },

//   onLoad: function(){
//     this.setData({
//       buying: false,
//     })
//   },

//   update: function (price) {
//     this.setData({
//       buying: true,
//     })
//     if(this.data.buying){
//       var $this = this
//       var transferNum = parseInt(price.currentTarget.dataset.tkt)
//       var ticketPrice = 1
//       // wx.login({
//       //   success: function (res) {
//       //     const code = res.code;
//       //     if (!code) {console.log}
//       //     wx.request({
//       //           url: 'https://yourwebsite/crate_order_and_pay',
//       //           method: 'POST',
//       //           data: {
//       //             code: code,
//       //             amount: '1.0',
//       //             product_name: 'Ticket',
//       //           },
//       //           success: function (data) {
//       //             wx.requestPayment({
//       //               ...data,
//       //               success: function (res) {}

//       //               })
//       //           }
//       //   })
//       app.globalData.myEaglebuck += parseInt(price.currentTarget.dataset.tkt)
//       this.setData({
//         myEaglebuck: app.globalData.myEaglebuck,
//       })
//       console.log("in update")

//       wx.cloud.callFunction({
//         name: "update",
//         data: {
//           _id: app.globalData.ID,
//           eaglebuck: app.globalData.myEaglebuck,
//           field: "test"
//         },
//         success: (res) => {
//           console.log("success update")
//           wx.cloud.callFunction({
//             name: "pullstuff",
//             data: {
//               field: "purchase",
//               _id: "1",
//             },
//             success: (res) => {
//               console.log(res.result.data[0].eaglebuck)
//               transferNum = transferNum + parseInt(res.result.data[0].eaglebuck)
//               wx.cloud.callFunction({
//                 name: "update",
//                 data: {
//                   field: "purchase",
//                   _id: "1",
//                   eaglebuck: transferNum,
//                 },
//                 success: (res) => {
//                   console.log("updated")

//                 }
//               })
//               this.setData({
//                 buying: false,
//               })
//             },
//           })

//         }
//       })



//       app.globalData.showTransfer = false

//       wx.reLaunch({
//         url: '/pages/tickets/confirmation/confirmation',
//       })
//     }else{
//       console.log("Already paying")
//     }
//   },

//   updateTest: function (event){
//     var $this = this;
//     console.log(event.currentTarget.dataset.Ticket)
//   }
// })











