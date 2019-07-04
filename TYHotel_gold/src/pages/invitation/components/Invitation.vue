<template>
  <div class="main">
    <div class="logo-box">
      <div class="logo-container">
        <img :src="resData.CMA1_LOGO_URL" alt="" v-if="resData">
      </div>
    </div>
    <div class="title-box">
      <!--<img src="../assets/yaoqinghan.png" alt="">-->
    </div>
    <div class="btm">
      <div class="btm-font">{{resData.CMA1_START_DATE}}</div>
      <div class="btm-font btm-font-h">
        <i class="line"></i>
        抽奖活动
        <i class="line"></i>
      </div>
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
    if (process.env.NODE_ENV === 'development') { // 测试用id
      this.id = '5b8158d60c2d448c8d03591df66c30c9'
    } else {
      // 生产环境下的id
      this.id = params.activityid
      if (!this.id) {
        utils.toast(this, '未知活动', 'fail')
        return
      }
    }
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 100%;
    background: #e53e44;
    @include borderBox();
    position: relative;
  }
  .main {
    background: url("../assets/c.png") no-repeat;
    background-size: 100% 100%;
  }
  .title-box {
    /*margin: 67px auto 0;*/
    text-align: center;
    height: 674px;
    img {
      width: 296px;
    }
  }
  .logo-box {
    height: 148px;
    width: 100%;
    position: relative;
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
  .btm {
    margin: 40px auto 0;
  }
  .btm-font {
    color: #EDD4AF;
    font-size: 30px;
    margin-top: 20px;
    text-align: center;
  }
  .btm-font2 {
    font-size: 26px;
  }
  .action-box-con {
    padding: 58px 215px 0;
  }
  .action-box {
    margin: 0 auto;
    width: 271px;
    height: 86px;
    background: url("../assets/b.png") no-repeat;
    background-size: 100% 100%;
    font-size: 32px;
    font-weight: bold;
    @include defaultFlex;
    color: #333;
  }
  .line {
    width: 43px;
    height: 2px;
    background-color: #EDD4AF;
    margin: 5px 10px 0;
  }
  .btm-font-h {
    @include defaultFlex;
    font-weight: bold;
    font-size: 36px;
  }
</style>
