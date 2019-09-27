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
    posX: 0,
    posY: 0,
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

    hidden: false,
    popup_hidden: true,
    do_more_shit: true,
    cont: true,
    popup_name: '',
    toView: 'red',
    scrollTop: 100,
    page_to_go: false,
    direction: "",

    objectArray: [
      { id: 1, name: 'Singapore/Malaysia', xmin: 2756, ymin: 734, xmax: 3279, ymax: 907 },
      { id: 2, name: 'USA', xmin: 3121, ymin: 1125, xmax: 3302, ymax: 1302 },
      { id: 3, name: 'Korea', xmin: 3121, ymin: 1479, xmax: 3302, ymax: 1826 },
      { id: 4, name: 'China', xmin: 3121, ymin: 1861, xmax: 3302, ymax: 2167 },
      { id: 4.1, name: 'China', xmin: 2741, ymin: 2006, xmax: 3078, ymax: 2167 },
      { id: 5, name: 'Japan', xmin: 2079, ymin: 2006, xmax: 2441, ymax: 2167 },
      { id: 6, name: 'Canada', xmin: 1616, ymin: 2006, xmax: 2015, ymax: 2167 },
      { id: 7, name: 'India', xmin: 1429, ymin: 1729, xmax: 1582, ymax: 2004 },
      { id: 8, name: 'Taiwan', xmin: 1171, ymin: 1482, xmax: 1345, ymax: 2167 },
      { id: 8.1, name: 'Taiwan', xmin: 666, ymin: 1530, xmax: 1111, ymax: 1756 },
      { id: 9, name: 'Europe', xmin: 666, ymin: 1955, xmax: 1111, ymax: 2167 },
      { id: 10, name: 'Latin American', xmin: 63, ymin: 951, xmax: 232, ymax: 1499 },
      { id: 11, name: 'HK', xmin: 346, ymin: 741, xmax: 500, ymax: 891 },
      { id: 11.1, name: 'HK', xmin: 704, ymin: 741, xmax: 859, ymax: 891 },
      { id: 100, name: "Ticket Booth", xmin: 2105, ymin: 1261, xmax: 2599, ymax: 1595},
      { id: 100.1, name: "Ticket Booth", xmin: 43, ymin: 1509, xmax: 423, ymax: 1820 },
    ],

  },

  onChange: function (e) {
    console.log(e.detail)
    this.setData({
      changeX: e.detail.x,
      changeY: e.detail.y,
    })
    console.log(this.data.scale)
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

  to_tickets: function () {
    wx.reLaunch({
      url: '/pages/bottom_nav2/bottom_nav2',
    })
    app.globalData.one = 'ffffff'
    app.globalData.two = 'C94731'
    app.globalData.three = 'ffffff'
    app.globalData.four = 'ffffff'
    app.globalData.five = 'ffffff'
  },
  coords: function (e) {
    if (this.data.cont) {
      var context = wx.createCanvasContext('popupCanvas')
      this.setData({
        hidden: false,
        mapx: Math.round(e.touches[0].pageX),
        mapy: Math.round(e.touches[0].pageY),
        newx: Math.round((e.touches[0].pageX - this.data.changeX - this.data.posX + this.data.offsetX) / this.data.scale * 3350 / 755),
        newy: Math.round((e.touches[0].pageY - this.data.changeY - this.data.posY + this.data.offsetY - 80 + 77) / this.data.scale * 2218 / 500),
      })
      console.log("coordinates: ")
      console.log(this.data.newx)
      console.log(this.data.newy)
      wx.setNavigationBarTitle({
        title: 'coordinates: (' + this.data.newx + ", " + this.data.newy + ")",
      })

      if (this.data.do_more_shit) {
        var found = false
        for (var i = 0; i < this.data.objectArray.length; i++) {
          var obj = this.data.objectArray[i]
          if (this.data.newx >= obj['xmin'] &&
            this.data.newx <= obj['xmax'] &&
            this.data.newy >= obj['ymin'] &&
            this.data.newy <= obj['ymax']) {
            
            if(obj['id']<12){
              app.globalData.menu_name = obj['name']
              wx.navigateTo({
                url: '/pages/menu_1/menu_1',
              })
            }
            else if(obj['id']>= 100){
              this.setData({
                popup_hidden: false,
              })
              var context = wx.createCanvasContext('popupCanvas')
              context.setStrokeStyle("#00ff00")
              //context.translate(0.5,0.5)
              context.setLineWidth(5)
              context.setFillStyle('white')
              context.fillRect(0, 0, 600, 600)
              context.stroke()
              context.setFillStyle('black')
              context.setFontSize(10)
              context.fillText(obj['name'], 0, 100)
              context.fillText('You can buy tickets here, or on this applet!', 0, 120)
              context.draw()
              console.log('hi')
              found = true
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
        do_more_shit: true
      })
    }
  },
  onLoad: function () {
    console.log("page loaded")
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenW: res.screenWidth,
          screenH: res.screenHeight,
          top: (res.screenHeight - 80 - 100 - 80) / 2.5 + 100 + 80,
          left: (res.screenWidth) / (1.5),
          page_to_go: false,
        })
        this.setData({
          posX: -this.data.screenW / 2 + this.data.left + 755/2,
          posY: -(this.data.screenH - 100 - 80 - 80) / 2 + this.data.top + 150,
        })
        this.setData({
          offsetX: this.data.posX - this.data.left,
          offsetY: this.data.posY - this.data.top,
        })
        console.log("screenW: " + this.data.screenW.toString())
        console.log("screenH: " + this.data.screenH.toString())
      },
    })
    console.log("posx: " + this.data.posX.toString())
    console.log("posy: " + this.data.posY.toString())
    console.log("top:" + this.data.top.toString())
    console.log("left:" + this.data.left.toString())
    console.log("offsetX: " + this.data.offsetX)
    console.log("offsetY: " + this.data.offsetY)
  },
  close_popup: function () {
    this.setData({
      popup_hidden: true,
      cont: true,
      do_more_shit: false,
    })
  },
})