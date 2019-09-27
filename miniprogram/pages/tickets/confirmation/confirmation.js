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
  return day + ":" + hour + ":" + min + ":" + sec;
}

Page({  

  data: {
    myEaglebuck: app.globalData.myEaglebuck,
    transferAmount: app.globalData.transferAmount,
    booth: app.globalData.booth,
    showTransfer: app.globalData.showTransfer
  },

  onLoad: function () {
    var myThis = this
    console.log(app.globalData.booth)

    this.setData({
      myEaglebuck: app.globalData.myEaglebuck,
      transferAmount: app.globalData.transferAmount,
      booth: app.globalData.booth,
      showTransfer: app.globalData.showTransfer,
      curTime: getDateTime(),
    })
    
    wx.cloud.init()
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        _id: app.globalData.ID,
        field: "test"
      },
      fail: (res) => {
        console.log("ID do not match")
      },
      success: (res) => {
        var retInfo = res.result.data[0]
        console.log(res)
        console.log(retInfo)
        app.globalData.myEaglebuck = retInfo.eaglebuck
        myThis.setData({
          myEaglebuck: app.globalData.myEaglebuck,
        })
        console.log(retInfo.username + " has " + retInfo.eaglebuck + " Eaglebucks")
      },
    })
    return
  },

  tickets: function () {
    wx.redirectTo({
      url: "/pages/bottom_nav2/bottom_nav2",
    })
  },
})