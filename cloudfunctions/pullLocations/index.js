const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // Get the total number of the collection records first
  const countResult = await db.collection('getLocations').count()
  const total = countResult.total
  // Calculate in how many times you can get it
  const batchTimes = Math.ceil(total / 100)
  // Carry all the promise arrays with read
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('getLocations').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // Wait all
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}