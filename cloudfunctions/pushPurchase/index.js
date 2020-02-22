// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const c = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("I'm getting to the cloud function!")
  const wxContext = cloud.getWXContext()
  return await c.collection("purchases").add({
    data: {
      amount: event.amount,
      ticketprice: event.ticketprice,
      userID: event.userID,
      _id: event._id
    }
  })
}