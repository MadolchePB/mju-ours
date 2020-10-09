const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
  res.json({
    success: true,
    code: 200,
    message: '登录操作'
  })
})

module.exports = router
