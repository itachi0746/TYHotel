<template>
  <div class="index-box">
    <div class="main">
      <img src="../assets/n.png" alt="">
      <div class="main-box">
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
          <div class="btn-container" @click="clickSign">
            <span>签 到</span>
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
    clickSign () {
      utils.toast(this, '', 'loading')
      let posObj = utils.getLocation()
      // todo 判断经纬度对象是否为空
      let theData = {
        ActivityId: this.id,
        latitude: posObj.lat + '',
        longitude: posObj.lng + ''
      }
      postData('/SignInActivity', theData).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.showLayer = true
      })
    },
    clickMyAct () {
      window.GoToPage('', 'myActivity.html', {})
    },
    clickMyAlbum () {
      window.GoToPage('', 'album.html', {})
    },
    clickMyPrize () {
      window.GoToPage('', 'myPrize.html', {})
    }
  },
  mounted () {

  },
  created () {
    const params = utils.getUrlParams()
    this.id = params.activityid
    if (!this.id) {
      utils.toast(this, '未知活动', 'fail')
      return
    }
    utils.toast(this, '', 'loading')
    postData('/ActivityInfo', {'ActivityId': this.id}).then((res) => {
      console.log(res)
      utils.toast(this, '', 'clear')
      this.ruleDetail = res.Data.CMA1_CONTENT
      this.logoUrl = res.Data.CMA1_LOGO_URL
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main {
    width: 100%;
    img {
      width: 100%;
      /*height: 100%;*/
    }
  }

  .main-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
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
    img {
      height: 100%;
    }
  }

  .fill {
    height: 584px;
  }

  .btn-box {
    height: 96px;
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
    background-color: #FC4929;
  }

  .font-box {
    background-color: #FDF4E2;
    border-radius: 20px;
    width: 690px;
    /*height: 1000px;*/
    @include borderBox();
    padding: 50px 34px;

    /deep/ * {
      padding: 0;
      margin: 0;
    }
    /deep/ img {
      max-width: 100%;
    }
    /deep/ p {
      font-size: .8rem;
      /*line-height: 20px;*/
      font-family: "Microsoft Yahei", Arial, sans-serif;

    }
    /deep/ span {
      font-size: .8rem;
      /*line-height: 24px;*/
      font-family: "Microsoft Yahei", Arial, sans-serif;

    }
    /deep/ h1,h2,h3,h4,h5,h6 {
      /*font-family: "PT Sans","SF UI Display", ".PingFang SC","PingFang SC", "Neue Haas Grotesk Text Pro", "Arial Nova", "Segoe UI", "Microsoft YaHei", "Microsoft JhengHei", "Helvetica Neue", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "Hiragino Sans GB", sans-serif;*/
      text-rendering:optimizelegibility;margin-bottom:1em;font-weight:bold; line-height: 1.2rem;
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
</style>
