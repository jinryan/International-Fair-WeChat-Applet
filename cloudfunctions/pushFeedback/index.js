// 云函数入口文件
const cloud = require('wx-server-sdk')
console.log("Call me")
cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("I'm getting to the cloud function!")
  const wxContext = cloud.getWXContext()
  return await db.collection("feedback").add({
    data: {
      _id: event.nickname,
      feedback: event.feedback,
      // nickname: "test",
      // feedback: "test",
    }
  })
}