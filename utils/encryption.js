/**
 * @description 数值加密
 * @author codergoo
 */

const crypto = require('crypto')

// 加密方法
module.exports = function encryption(value, sercet) {
  // 获取需要加密的密码
  let key = value + sercet // 加密内容 + 秘钥值
  // 使用的加密算法
  const sf = crypto.createHash('md5')
  // 对字符串进行加密，加密的二进制文件以字符串形式输出
  key = sf.update(key).digest('hex')
  // 返回加密
  return key
}
