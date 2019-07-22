<template>
  <div class="index-box">
    <div class="main">
      <!--<img src="../assets/n.png" alt="">-->

      <!--<img src="../assets/n.png" alt="" v-if="!theBgImg">-->
      <!--<img :src="theBgImg" alt="" v-else>-->
      <div class="main-box">
        <img class="main-bg" src="../assets/n.png" alt="" v-if="!theBgImg">
        <img class="main-bg" :src="theBgImg" alt="" v-else>

        <div class="logo-box">
          <div class="logo-container">
            <img :src="logoUrl" alt="" v-if="logoUrl">
          </div>
        </div>
        <div class="title-box">
          <img src="../assets/i.png" alt="">
        </div>
        <div class="fill"></div>
        <div class="btn-box">
          <div class="btn-container" @click="clickSign" v-if="!isSigned">
            <span>签 到</span>
          </div>
          <div class="btn-container van-button--disabled" v-else>
            <span>您已签到</span>
          </div>
        </div>
        <div class="rule-box">
          <div class="rule-title">
            <i class="coin coin1"></i>
            <i class="coin coin2"></i>
            <span>活动规则</span>
            <i class="coin coin2"></i>
            <i class="coin coin1"></i>
          </div>
        </div>
        <div class="btm-box">
          <div class="font-box" v-html="ruleDetail">
          </div>
          <div class="action-box">
            <div class="action-btn" @click="clickMyAct">我的历史活动记录</div>
            <div class="action-btn" @click="clickMyAlbum">活动相册</div>
            <div class="action-btn" @click="clickMyPrize">我的奖品</div>
          </div>
        </div>
      </div>
    </div>
    <!--背景-->
    <div class="bg"></div>
    <!--弹窗-->
    <div class="layer" @touchmove.prevent="" v-if="showLayer">
      <div class="layer-box">
        <img src="../assets/j.png" alt="">
        <span>签到成功!</span>
      </div>
      <div class="close" @click="clickClose">
        <img src="../assets/cha.png" alt="">
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
      showLayer: false,
      logoUrl: null, // 酒店logo图片
      ruleDetail: null, // 活动规则说明
      isSigned: false, // 是否已签到
      theBgImg: null // 背景图片
    }
  },
  components: {},
  methods: {
    /**
     * 点击关闭
     */
    clickClose () {
      this.showLayer = false
    },
    /**
     * 点击签到
     */
    async clickSign () {
      utils.toast(this, '', 'loading')
      let posObj = await utils.weichatLatAndLon()
      let theData = {
        ActivityId: this.id,
        latitude: posObj.lat + '',
        longitude: posObj.lng + ''
      }
      postData('/SignInActivity', theData).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.showLayer = true
        this.isSigned = true
      })
    },
    clickMyAct () {
      window.GoToPage('', 'myActivity.html', {'activityId': this.id})
    },
    clickMyAlbum () {
      window.GoToPage('', 'album.html', {'activityId': this.id})
    },
    clickMyPrize () {
      window.GoToPage('', 'myPrize.html', {'activityId': this.id})
    },
    getData () {
      utils.toast(this, '', 'loading')
      const url = '/ActivityInfo'
      postData(url, {'ActivityId': this.id}).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.ruleDetail = res.Data.CMA1_CONTENT
        this.logoUrl = res.Data.CMA1_LOGO_URL
        this.theBgImg = res.Data.CMA1_IMG_URL
        if (res.Data.CMA1_TITLE) {
          document.title = res.Data.CMA1_TITLE
        }
        this.getSignStatus()
      })
    },
    /**
     * 获取签到状态
     */
    getSignStatus () {
      utils.toast(this, '', 'loading')
      const url = '/GetSignStatus'
      postData(url, {'ActivityId': this.id}).then((res) => {
        console.log(res)
        this.isSigned = res.Data
        utils.toast(this, '', 'clear')
      })
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
    position: relative;
    &>img {
      width: 100%;
      height: 1334px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      /*height: 100%;*/
    }
  }

  .main-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #FC4929;

  }

  .btm {
    background-color: #FC4929;
    width: 100%;
    height: 500px;
    position: relative;
    top: 500px;
    left: 0;
  }

  .logo-box {
    height: 118px;
    width: 100%;
    position: relative;
  }

  .logo-container {
    width: 321px;
    height: 76px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("../assets/a.png") no-repeat;
    background-size: 100% 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .title-box {
    text-align: center;
    height: 292px;
    position: relative;
    img {
      height: 100%;
    }
  }

  .fill {
    height: 584px;
  }

  .btn-box {
    height: 96px;
    position: relative;
  }

  .btn-container {
    margin: 0 auto;
    width: 374px;
    height: 96px;
    background: url("../assets/f.png") no-repeat;
    background-size: contain;
    /*line-height: 96px;*/
    /*text-align: center;*/
    color: #ffffff;
    font-size: 34px;
    font-weight: bold;
    @include defaultFlex;
    span {
      /*letter-spacing: 25px;*/
    }
  }

  .rule-box {
    margin-top: 60px;
    color: #ffffff;
    font-size: 34px;
    font-weight: bold;
    position: relative;
  }

  .coin {
    background: url("../assets/g.png") no-repeat;
    background-size: contain;
    /*margin: 0 10px;*/
  }

  .coin1 {
    width: 23px;
    height: 23px;
  }

  .coin2 {
    width: 32px;
    height: 32px;
  }

  .rule-title {
    margin: 0 auto;
    width: 285px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .btm-box {
    padding: 40px 30px;
    position: relative;
    /*background-color: #FC4929;*/
  }

  .font-box {
    background-color: #FDF4E2;
    border-radius: 20px;
    width: 690px;
    /*height: 1000px;*/
    @include borderBox();
    padding: 50px 34px;
    overflow-x: hidden;

    /deep/ * {
      padding: 0;
      margin: 0;
      font-size: 28px!important;
      color: #FB5114!important;
      background-color: transparent!important;

    }
    /deep/ img {
      max-width: 100%!important;
      /*max-height: 100%;*/
    }
  }

  .action-box {
    padding: 69px 0 51px;
  }

  .action-btn {
    margin: 0 auto;
    width: 402px;
    height: 124px;
    background: url("../assets/h.png") no-repeat;
    background-size: contain;
    line-height: 124px;
    text-align: center;
    color: #ffffff;
    font-weight: 600;
    font-size: 34px;
    margin-bottom: 10px;
  }

  .bg {
    height: 2000px;
    width: 100%;
    background-color: #FC4929;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .layer {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    @include defaultFlex;
  }

  .layer-box {
    width: 438px;
    height: 305px;
    margin-bottom: 200px;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      @include center;
      color: #EB5523;
      font-size: 40px;
      top: 48%;
    }
  }

  .close {
    width: 72px;
    height: 72px;
    @include center;
    top: 59%;
    img {
      width: 100%;
    }
  }
  .main-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1334px;

  }
</style>
