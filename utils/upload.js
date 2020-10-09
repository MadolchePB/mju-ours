/**
 * @description 文件上传
 * @author codergoo
 */

const multer = require('multer')

// 配置上传文件对象
const uploadOptions = multer({
  dest: './public/uploads',
  limits: {
    fieldSize: 1024 * 1024 * 20
  }
})

module.exports = uploadOptions
