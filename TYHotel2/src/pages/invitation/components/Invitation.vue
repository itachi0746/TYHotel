<template>
  <div class="main">
    <div class="logo-box">
      <div class="logo-container">
        <img :src="logoUrl" alt="" v-if="logoUrl">
      </div>
    </div>
    <div class="title-box">
      <img src="../assets/yaoqinghan.png" alt="">
    </div>
    <div class="btm">
      <div class="btm-font">{{theDate}}</div>
      <div class="btm-font btm-font-h">
        <i class="line"></i>
        抽奖活动
        <i class="line"></i>
      </div>
      <div class="btm-font">广州某某酒店</div>
      <div class="btm-font btm-font2">地址：{{address}}</div>
    </div>
    <div class="action-box-con">
      <div class="action-box" @click="clickBtn">
        我要报名
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
      logoUrl: null, // logo图片地址
      theDate: '9月5日10:00-18:00', // 日期
      address: '某城市某某大厦10楼会客厅', // 地址
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
      })
    }
  },
  mounted () {
  },
  created () {
//    const params = utils.getUrlParams()
//    this.id = params.activityid
//    if (!this.id) {
//      utils.toast(this, '未知活动', 'fail')
//      return
//    }
//    utils.toast(this, '', 'loading')
//    postData('/ActivityInfo', {'ActivityId': this.id}).then((res) => {
//      console.log(res)
//      utils.toast(this, '', 'clear')
//      this.theDate = res.Data.CMA1_START_DATE
//      this.address = res.Data.CMA1_ADDRESS
//      this.logoUrl = res.Data.CMA1_LOGO_URL
//    })
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
    margin: 67px auto 0;
    text-align: center;
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
    color: #B0D2EA;
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
