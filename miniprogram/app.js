//app.js
function generateID() {
  return ('_' + Math.random().toString(36).substr(2, 25));
}

// var footer = page.documentElement.querySelector('footer')
var models = ["iPhone X", "iPhone XR", "iPhone XS Max", "iPhone X Max", "iPhone XS"]
App({
  globalData: {
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
    imageNames: [],
  },

  onLaunch: function () {
    // 展示本地存储能力
    // page.style.setProperty('--bg-color', '#333333')
    var maxIndex = 4 // VERY IMPORTANT: EDIT THIS BASED ON HOW MANY IMAGES THERE ARE
    for (var i = 1; i <= maxIndex; i++) {
      this.globalData.imageNames.push("https://bluepiglet30.github.io/IFfilehost/" + 'American' + i + ".png")
    }

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

// // //LOAD FONTS
// wx.loadFontFace({
//   family: 'SAS',
//   source: 'src("/fonts/SASfontwip.ttf/")',
//   success: console.log,
// })

// wx.loadFontFace({
//   family: 'CB',
//   source: 'src("/fonts/circular-bold WIP.otf/")',
//   success: console.log,
// })

// wx.loadFontFace({
//   family: 'CBI',
//   source: 'url("https://bluepiglet30.github.io/IFfilehost/circular-bold-italic WIP.otf")',
//   success: console.log,
// })

// wx.loadFontFace({
//   family: 'COI',
//   source: 'url("https://bluepiglet30.github.io/IFfilehost/circular-book-italic WIP.otf")',
//   success: console.log,
// })

// wx.loadFontFace({
//   family: 'CSB',
//   source: 'url("https://bluepiglet30.github.io/IFfilehost/CircularStd-Black WIP.otf")',
//   success: console.log,
// })

// wx.loadFontFace({
//   family: 'CSO',
//   source: 'url("https://bluepiglet30.github.io/IFfilehost/CircularStd-Book WIP.otf")',
//   success: console.log,
// })

// wx.loadFontFace({
//   family: 'CSM',
//   source: 'url("https://bluepiglet30.github.io/IFfilehost/CircularStd-Medium WIP.otf")',
//   success: console.log,
// })

// wx.loadFontFace({
//   family: 'CSI',
//   source: 'url("https://bluepiglet30.github.io/IFfilehost/CircularStd-MediumItalic WIP.otf")',
//   success: console.log,
// })