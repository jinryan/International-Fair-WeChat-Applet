//云开发实现支付

const cloud = require('wx-server-sdk')
cloud.init()
//1，引入支付的三方依赖
const tenpay = require('tenpay');
//2，配置支付信息
const config = {
  appid: 'wx81d97a529f25ec11',
  mchid: '1556444331',
  partnerKey: 'QWERTYUIOPasdfghjklzxcvbnm123456',
  notify_url: 'www.saschina.org',
  spbill_create_ip: '127.0.0.1'
};
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    orderid,
    money
  } = event;
  //3，初始化支付
  const api = tenpay.init(config);
  let result = await api.getPayParams({
    out_trade_no: orderid,
    body: 'Eaglebucks',
    total_fee: money, //订单金额(分),
    openid: wxContext.OPENID //付款用户的openid
  });

  return result;

}