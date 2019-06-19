// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
const domain = 'http://mockjs.com' // 定义默认域名，随便写
let dataObj = { // 默认返回对象
  Data: null,
  Success: true
}
let pool = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*()[]'
}
let prizeType = ['CMF801', 'CMF802', 'CMF803'] // 奖品type

// const code = 200 // 返回的状态码
// mock一组数据
const produceNewsData = function () {
  let articles = []
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(`${domain}/ActivityInfo`, produceNewsData)

const produceActivities = function () {
  let acts = []
  for (let i = 0; i < 10; i++) {
    let actObj = {
      CMA1_ID: Random.string(), // 随机字符串
      CMA1_SPONSOR: Random.csentence(4, 8), //  Random.csentence( min, max )
      CMA1_IMG_URL: Random.dataImage('300x300', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      CMA1_START_DATE: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      CMA1_ADDRESS: Random.city(true)
    }
    acts.push(actObj)
  }
  dataObj.Data = acts
  return dataObj
}
Mock.mock(`${domain}/MyActivitys`, produceActivities)

const produceImgs = function () {
  let dayArr = []
  for (let i = 0; i < 10; i++) {
    let imgArr = []
    for (let j = 0; j < 6; j++) {
      let imgObj = {
        CMA7_ID: Random.string(), // 随机字符串
        CMA7_FILE_URL: Random.dataImage('300x300', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
        CMA7_CRT_TIME: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      }
      imgArr.push(imgObj)
    }
    let actObj = {
      CMA7_CRT_TIME: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      imgArray: imgArr
    }
    dayArr.push(actObj)
  }
  dataObj.Data = dayArr
  dataObj.pageIndex = 1
  dataObj.pageCount = 10
  return dataObj
}
Mock.mock(`${domain}/ActivityImages`, produceImgs)

const producePrizes = function () {
  let dataArr = []
  for (let i = 0; i < 10; i++) {
    let actObj = {
      CMF3_SEND_TIME: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      CMF3_PRIZE_NAME: Random.csentence(4, 8), //  Random.csentence( min, max )
      CMF3_VALUE: Random.integer(1, 999),
      CMF3_PRIZE_TYPE: prizeType[Math.floor(Math.random() * 3)]
    }
    dataArr.push(actObj)
  }
  dataObj.Data = dataArr
  dataObj.pageIndex = 1
  dataObj.pageCount = 10
  return dataObj
}
Mock.mock(`${domain}/MyActivityPrizes`, producePrizes)
