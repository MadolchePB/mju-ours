const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const cache = require('apicache').middleware

const app = express()

const userRouter = require('./router/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
})) // body parser
app.use(express.json()) // 解析 json 格式
app.use(express.urlencoded({
  extended: false
})) // 设置请求的扩张名
app.use(cookieParser('secret')) // 加密 cookie
app.use(express.static(path.join(__dirname, 'public/static'))) // 开放静态资源目录
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200))) // cache

// 解决跨域
app.all('*', function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*")
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'Content-type')
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.header('Access-Control-Max-Age', 1728000); //预请求缓存20天
  next()
})


// 路由请求
app.get('/api', (req, res) => {
  res.send('<h1>这是首页</h1>')
})
app.use('/api/user', userRouter)

// 错误
app.use((req, res, next) => {
  next(createError(404))
})

// 处理错误中间件
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send('出错了404')
})

// 开放端口
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`)
})