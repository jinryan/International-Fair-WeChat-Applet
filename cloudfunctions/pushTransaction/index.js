// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const c = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("I'm getting to the cloud function!")
  const wxContext = cloud.getWXContext()
  return await c.collection("transaction").add({
    data: {
      key: event.key,
      username: event.username,
      eaglebuck: event.eaglebuck,
      time: event.time,
      boothName: event.boothName
    }
  })
}