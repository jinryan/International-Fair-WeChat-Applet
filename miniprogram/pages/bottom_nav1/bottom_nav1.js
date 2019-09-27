const app = getApp()
Page({
  /**
   * Page initial data
   */
  data: {
    x: 30,
    y: 30,
    width: 100,
    height: 100,
    posX:0,
    posY:0,
    location: "hi",
    top: 0,
    left: 0,
    //stuff for coords
    mapx: 0,
    mapy: 0,
    screenW: 0,
    screenH: 0,
    newx: 0,
    newy: 0,
    deltaX: 0,
    deltaY: 0,
    dX: 0,
    dY: 0,
    angle: 0,
    scale: 1,
    changeX: 0,
    changeY: 0,
    offsetX: 0,
    offsetY: 0,
    one: app.globalData.one,
    two: app.globalData.two,
    three: app.globalData.three,
    four: app.globalData.four,
    five: app.globalData.five,
    hidden: false,
    popup_hidden: true,
    more: true,
    cont: true,
    toView: 'red',
    scrollTop: 100,
    popup_name: '',
    popup_description: "sample text here",

    direction: "",
    objectArray:[],
    nav_height: app.globalData.nav_height,
    easter_egg: app.globalData.easter_egg,
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
  },

  onChange: function (e) {
    console.log(e.detail)
    this.setData({
      changeX: e.detail.x,
      changeY: e.detail.y,
    })
    // console.log(this.data.scale)
    if (e.detail.x < -515 && this.data.easter_egg) {
      this.setData({
        map_hidden: true,
      })
    }
  },

  hide: function () {
    this.setData({
      map_hidden: false,
    })
  },

  onScale: function (e) {
    this.setData({
      changeX: e.detail.x,
      changeY: e.detail.y,
      scale: e.detail.scale
    })
  },
  
  coords: function (e) {
    if (true) {
      var context = wx.createCanvasContext('popupCanvas')
      this.setData({
        hidden: false,
        mapx: Math.round(e.touches[0].pageX),
        mapy: Math.round(e.touches[0].pageY),
        newx: Math.round((e.touches[0].pageX-this.data.changeX-this.data.posX+this.data.offsetX)/this.data.scale*2775/500),
        newy: Math.round((e.touches[0].pageY - this.data.changeY - this.data.posY + this.data.offsetY-80)/this.data.scale*2775/500),
      })
      // console.log("coordinates: ")
      // console.log(this.data.newx)
      // console.log(this.data.newy)
      wx.setNavigationBarTitle({
        title: 'coordinates: (' + this.data.newx + ", " + this.data.newy + ")",
      })

      if (true) {
        
        var found = false
        for (var i = 0; i < this.data.objectArray.length; i++) {
          if (this.data.newx >= this.data.objectArray[i]['xmin'] &&
            this.data.newx <= this.data.objectArray[i]['xmax'] &&
            this.data.newy >= this.data.objectArray[i]['ymin'] &&
            this.data.newy <= this.data.objectArray[i]['ymax']) {

            found = true
            if (this.data.objectArray[i]['name'] == 'Cafeteria') {
              this.setData({
                popup_hidden: true,

              })
              wx.navigateTo({
                url: '/pages/bottom_nav1/cafeteria/cafeteria',
              })
            }
            else {
              this.setData({
                popup_hidden: false,
                cont: false,
                popup_name: this.data.objectArray[i]['name'],
                popup_description: this.data.objectArray[i]['description']
            })
            }
          }
        }
        if (!found) {
          this.setData({
            popup_hidden: true,
          })
        }
      }
      this.setData({
        more: true
      })
    }
  },
  onLoad: function () {
    console.log("page loaded")
    this.setData({
      easter_egg: app.globalData.easter_egg,
    })
    wx.cloud.callFunction({
      name: "pullstuff",
      data: {
        field: "getLocations"
      },
      fail: (res) => {
        console.log(res)
      },

      success: (res) => {
        var objectArray = res.result.data;
        this.setData({
          objectArray: objectArray
        })
        console.log(this.data.objectArray)
      },

    })
    wx.getSystemInfo({
      success: res => {
        this.setData({
          one: app.globalData.one,
          two: app.globalData.two,
          three: app.globalData.three,
          four: app.globalData.four,
          five: app.globalData.five,
          screenW: res.screenWidth,
          screenH: res.screenHeight,
          top: (res.screenHeight-80-100-80)/2.5 + 100 + 80,
          left: (res.screenWidth)/(1.5),
        })
        this.setData({
          posX: -this.data.screenW/2+this.data.left+250,
          posY: -(this.data.screenH-100-80-80)/2+this.data.top + 250,
        })
        this.setData({
          offsetX: this.data.posX-this.data.left,
          offsetY: this.data.posY-this.data.top,
        })
        // console.log("screenW: " + this.data.screenW.toString())
        // console.log("screenH: " + this.data.screenH.toString())
      },
    })
    // console.log("posx: " + this.data.posX.toString())
    // console.log("posy: " + this.data.posY.toString())
    // console.log("top:" + this.data.top.toString())
    // console.log("left:" + this.data.left.toString())
    // console.log("offsetX: " + this.data.offsetX)
    // console.log("offsetY: " + this.data.offsetY)
  },
  close_popup: function () {
    this.setData({
      popup_hidden: true,
      cont: true,
      more: false,
    })
  },
})