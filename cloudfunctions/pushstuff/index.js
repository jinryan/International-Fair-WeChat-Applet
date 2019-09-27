// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const c = cloud.database(); 

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("I'm getting to the cloud function!")
  const wxContext = cloud.getWXContext()
  return await c.collection("test").add({
    data: {
      username: event.username,
      eaglebuck: event.eaglebuck,
      _id: event._id
    }
  })
}