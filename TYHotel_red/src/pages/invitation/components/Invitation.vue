<template>
  <div class="main">
    <div class="logo-box">
      <div class="logo-container">
        <img :src="resData.CMA1_LOGO_URL" alt="" v-if="resData">
      </div>
    </div>
    <div class="main-box">
      <div class="fillter"></div>
      <div class="title-box">
        <div class="title-container">
          <img class="kuang" src="../assets/kuang.png" alt="">
          <div class="title-time">
            <i class="line"></i>
            {{resData.CMA1_START_DATE}}
            <i class="line"></i>
          </div>
          <div class="title-img">
            <img src="../assets/cc.png" alt="">
          </div>
          <div class="title-btn-box">
            <div class="title-btn">抽奖活动</div>
          </div>
        </div>
      </div>
      <div class="btm-box">
        <div class="btm">
          <div class="btm-icon">
            <img src="../assets/b.png" alt="">
          </div>
          <div class="btm-font">{{resData.CMA1_START_DATE}}</div>
          <div class="btm-font">{{resData.CMA1_SPONSOR}}</div>
          <div class="btm-font btm-font2">地址：{{resData.CMA1_ADDRESS}}</div>
        </div>
        <div class="action-box-con">
          <div class="action-box" @click="clickBtn" v-if="!isJoined">
            我要报名
          </div>
          <div class="action-box van-button--disabled" v-if="isJoined">
            您已报名
          </div>
          <div class="action-box mt20" @click="toIndex" v-if="isJoined">
            去主页
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'

export default {
  data () {
    return {
      id: null, // 活动id
      resData: null,
      isJoined: false // 是否已参加该活动
    }
  },
  methods: {
    /**
     * 点击报名
     */
    clickBtn () {
      utils.toast(this, '', 'loading')
      postData('/JoinInActivity', {'ActivityId': this.id}).then((res) => {
        console.log(res)
        utils.toast(this, '报名成功', 'success')
        this.isJoined = true
      })
    },
    getData () {
      utils.toast(this, '', 'loading')
      postData('/ActivityInfo', {'ActivityId': this.id}).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.resData = res.Data
        utils.formatObj(this.resData, false)
        this.getJoinStatus()
      })
    },
    /**
     * 获取参加状态
     */
    getJoinStatus () {
      utils.toast(this, '', 'loading')
      postData('/GetJoinStatus', {'ActivityId': this.id}).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.isJoined = res.Data
      })
    },
    /**
     * 去主页
     */
    toIndex () {
      window.GoToPage('', 'index.html', {'ActivityId': this.id})
    }
  },
  mounted () {
  },
  created () {
    const params = utils.getUrlParams()
//    if (process.env.NODE_ENV === 'development') { // 测试用id
//      this.id = '5b8158d60c2d448c8d03591df66c30c9'
//    } else {
//      // 生产环境下的id
//      this.id = params.activityid
//      if (!this.id) {
//        utils.toast(this, '未知活动', 'fail')
//        return
//      }
//    }
    this.id = params.activityid || '17006a8988dc41efadb3a76236ecd493'

    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main {
    width: 100%;
    min-height: 100%;
    background: #e53e44;
    color: #ffffff;
    padding: 25px;
    @include borderBox();
    position: relative;
  }
  .main-box {
    background: url("../assets/e.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    min-height: 1283px;
  }
  .title-container {
    position: relative;
    /*top: 162px;*/
    width: 100%;
    height: 500px;
    color: #ED9E38;
    &>img {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .title-box {
    padding: 0 25px;
    @include borderBox();

  }
  .logo-box {
    height: 118px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .logo-container {
    width: 321px;
    height: 76px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("../assets/bg.png") no-repeat;
    background-size: 100% 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title-time {
    padding-top: 82px;
    font-size: 30px;
    position: relative;
    @include defaultFlex;
    letter-spacing: 2px;
  }
  .line {
    width: 33px;
    height: 2px;
    background-color: #ED9E38;
    margin: 5px 10px 0;
  }
  .title-img {
    width: 421px;
    height: 162px;
    position: relative;
    margin: 46px auto 0;
    img {
      width: 100%;
    }
  }
  .title-btn-box {
    width: 425px;
    height: 58px;
    position: relative;
    margin: 55px auto 0;
    color: #ffffff;
    font-size: 32px;
    letter-spacing: 5px;
    font-weight: bold;
  }
  .title-btn {
    height: 100%;
    background-color: #C52B31;
    @include defaultFlex;

  }
  .fillter {
    height: 162px;
  }
  .btm {
    margin: 78px auto 0;
  }
  .btm-icon {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .btm-font {
    color: #ffffff;
    font-size: 36px;
    margin-top: 28px;
    text-align: center;
  }
  .btm-font2 {
    font-size: 30px;
  }
  .action-box-con {
    padding: 58px 215px 0;

  }
  .action-box {
    margin: 0 auto;
    width: 271px;
    height: 86px;
    background: url("../assets/a.png") no-repeat;
    background-size: 100% 100%;
    font-size: 32px;
    font-weight: bold;
    @include defaultFlex;
  }
  .btm-box {
    position: absolute;
    bottom: 40px;
    left: 0;
    width: 100%;
  }
</style>
