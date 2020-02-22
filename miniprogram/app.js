//app.js
function generateID() {
  return ('_' + Math.random().toString(36).substr(2, 25));
}

// var footer = page.documentElement.querySelector('footer')
var models = ["iPhone X", "iPhone XR", "iPhone XS Max", "iPhone X Max", "iPhone XS"]
App({
  globalData: {
    loggedIn: false,
    boothUser: '',
    boothHidden: true,
    languagePreference: 0,
    userInfo: "",
    myEaglebuck: 0,
    ID: "not set",
    tansferAmount: 0,
    booth: "",
    showTransfer: false,
    one: 'ffffff',
    two: 'ffffff',
    three: 'C94731',
    four: 'ffffff',
    five: 'ffffff',
    clubData: [],
    easter_egg: false,
    latitude: 0,
    longitude: 0,
    menu_name: '',
    phone_model: '',
    nav_height: 50,
    dark_mode: false,
    show_tutorial: true,
    max_transaction: 999999999999999,
    bgc: '#f6f6f6',
    nav_bgc: 'white',
    latitude: 0,
    longitude: 0,
    useableHeight: 0,
    menuArray: [],
    pullNum: 5,
    raffleArray: [],
    locArray: [],
    gameArray: [],
    vendorArray: [],
    centerX: 0,
    centerY: 0,
    pin_hidden: true,
  },

  onLaunch: function () {
    wx.cloud.init()
    wx.getUserInfo({
      success: res => {
        this.globalData.loggedIn = true
      }
    })

    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "menu"
      },
      fail: (res) => {
        console.log(res)
      },

      success: (res) => {
        var menuArray = res.result.data;
        this.globalData.menuArray = menuArray;
        console.log(this.globalData.menuArray)
      },
    })

    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "raffle"
      },
      fail: (res) => {
        console.log(res)
      },

      success: (res) => {
        var raffleArray = res.result.data;
        this.globalData.raffleArray = raffleArray;
        console.log(this.globalData.raffleArray)
      },
    })

    wx.cloud.callFunction({
      name: "pullLocations",
      fail: (res) => {
        console.log(res)
      },

      success: (res) => {
        var locArray = res.result.data;
        this.globalData.locArray = locArray;
        console.log(this.globalData.locArray)

        for (var i = 0; i < locArray.length; i++) {
          // console.log(locArray[i]['_id'])
          if (locArray[i]['_id'].substr(0, 1) == "G") {
            this.globalData.gameArray.push(locArray[i])
          }
          else if (locArray[i]['_id'].substr(0, 1) == "V" || locArray[i]['_id'].substr(0, 1) == "S" || locArray[i]['_id'].substr(0, 1) == "A") {
            this.globalData.vendorArray.push(locArray[i])
          }
        }
        console.log("game:")
        console.log(this.globalData.gameArray)
        console.log("vendor:")
        console.log(this.globalData.vendorArray)
      },
    })

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: res => {
        this.globalData.phone_model = res.model
        this.globalData.useableHeight = res.safeArea.height - 80
        console.log(res.model)
      },
    })
    // if (models.indexOf(this.globalData.phone_model) >= 0) {
    //   this.globalData.nav_height = 70
    // }
    for (var i = 0; i < models.length; i++) {
      // console.log(models[i])
      if (this.globalData.phone_model.indexOf(models[i]) >= 0) {
        this.globalData.nav_height = 70
      }
    }
    wx.getLocation({
      success: res => {
        console.log("success asdf")
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.speed)
        this.globalData.latitude = res.latitude
        this.globalData.longitude = res.longitude
      }
    })
    this.globalData.pullNum = 5;
  },

  storage: function () {
    this.globalData.ID = generateID()
    console.log(this.globalData.ID)
    wx.setStorage({
      key: "key",
      data: this.globalData.ID,
      success: () => {
        console.log('uniqe id key generated')
        this.push()
      }
    })
  },
  push: function () {
    wx.cloud.callFunction({
      name: "pushstuff",
      data: {
        eaglebuck: this.globalData.myEaglebuck,
        username: this.globalData.userInfo,
        _id: this.globalData.ID
      },
      fail: function () {
        console.log("already exists")
      }
    })
  },
  pull: function (arg) {
    console.log("within the pull function " + this.globalData.ID)
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        _id: this.globalData.ID,
        field: "test"
      },
      fail: (res) => {
        console.log(res)
      },
      success: (res) => {
        var retInfo = res.result.data[0]
        console.log(retInfo)
        this.globalData.myEaglebuck = retInfo.eaglebuck
        console.log(retInfo.username + " has " + retInfo.eaglebuck + " Eaglebucks")
      },
    })
  },
  update: function () {

  }

})