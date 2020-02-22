// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
c = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await c.collection(event.field).where({
    boothName: event.boothName
  })
  // console.log(event.num)
    .limit(parseInt(event.num))
    .orderBy('time', 'desc')
    .get()
}