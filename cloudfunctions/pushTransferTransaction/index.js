// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const c = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await c.collection("userTransactions").add({
    data: {
      transferFrom: event.transferFrom,
      transferTo: event.transferTo,
      eaglebuck: event.eaglebuck,
      time: event.time,
    }
  })
}