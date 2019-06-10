<template>
  <div class="album">
    <div ref="header" class="header">
      <van-nav-bar
        title="我的奖品"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right=""
      />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="img-box" class="img-box" ref="img-box">
      <!--<div class="img-box" ref="img-box">-->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul ref="img-ul" class="img-ul">
            <li class="img-li" ref="img-li" v-for="(item,index) in list" :key="index">
              <div class="li-box" :style="{backgroundImage: imgObj[item.CMF8_PRIZE_TYPE]}">
                <div class="li-box-inner">
                  <div class="li-box-left">
                    <div class="money-box">
                      <i class="rmb">￥</i>
                      <span class="money">{{item.CMF3_VALUE}}</span>
                    </div>
                  </div>
                  <div class="li-box-right">
                    <div class="li-box-right-inner">
                      <div class="prize-name">{{item.CMF3_PRIZE_NAME}}</div>
                      <div class="prize-time">获奖日期：{{utils.handleTime(item.CMF3_SEND_TIME)}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      <!--</div>-->

    </van-pull-refresh>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'

export default {
  data () {
    return {
      id: null, // 活动id
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      imgObj: { // 不同奖品类型对应不同背景图
        'CMF801': require('../assets/hongbao.png'),
        'CMF802': require('../assets/quan.png'),
        'CMF803': require('../assets/other.png')
      }
    }
  },
  components: {},
  mounted () {
//    setTimeout(() => {
//      this.setImgBoxHeight()
//    }, 300)
    this.setImgBoxHeight2()
  },
  created () {
    const params = utils.getUrlParams()
    this.id = params.activityid
    if (!this.id) {
      utils.toast(this, '未知活动', 'fail')
      return
    }
    utils.toast(this, '', 'loading')
    postData('/MyActivityPrizes', {ActivityId: this.id}).then((res) => {
      console.log(res)
      utils.toast(this, '', 'clear')
      this.list = res.Data.IList
    })
  },
  methods: {
    /**
     * @method 设置滚动容器的高度
     */
    setImgBoxHeight () {
      let windowHeight = utils.getClientHeight()
      let headerHeight = this.$refs.header.offsetHeight
      console.log(`windowHeight: ${windowHeight}, headerHeight: ${headerHeight}`)
//      this.$refs['img-box'].style.height = (windowHeight - headerHeight) + 'px'
      let imgBox = document.getElementById('img-box')
      imgBox.style.height = (windowHeight - headerHeight) + 'px'
    },
    setImgBoxHeight2 () {
      let windowHeight = document.body.clientHeight;
      let headerHeight = this.$refs.header.offsetHeight
      console.log(`windowHeight: ${windowHeight}, headerHeight: ${headerHeight}`)
//      this.$refs['img-box'].style.height = (windowHeight - headerHeight) + 'px'
      let imgBox = document.getElementById('img-box')
      imgBox.style.height = (windowHeight - headerHeight) + 'px'
    },
    onLoad () {
      // 异步更新数据
//      setTimeout(() => {
//        for (let i = 0; i < 10; i++) {
//          this.list.push(this.list.length + 1)
//        }
//        // 加载状态结束
//        this.loading = false
//
//        // 数据全部加载完成
//        if (this.list.length >= 40) {
//          this.finished = true
//        }
//      }, 500)
    },
    onClickLeft () {
      window.history.back()
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .album {
    width: 100%;
    height: 100%;
  }

  .header {
    position: relative;
  }

  .uploader-box {
    position: absolute;
    right: 0.75rem;
    top: 12px;
    z-index: 1;
  }

  .img-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
    background-color: #F3EBE1;
  }

  .img-ul {
    /*display: flex;*/
    overflow: hidden;
    li {
      width: 100%;
      @include borderBox();
      padding: 30px 25px 0;
    }
  }
  .li-box {
    height: 220px;
    background: url("../assets/hongbao.png") no-repeat;
    background-size: 100% 100%;
  }
  .li-box-inner {
    padding: 15px;
    display: flex;
    height: 100%;
    @include borderBox()
  }
  .li-box-left {
    width: 186px;
    height: 100%;
    position: relative;
    color: #333;
    @include defaultFlex;
  }
  .li-box-right {
    flex: 1;
  }
  .li-box-right-inner {
    height: 100%;
    padding: 45px 50px;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include borderBox()
  }
  .prize-name {
    font-size: 36px;
    font-weight: bold;
  }
  .prize-time {
    font-size: 28px;
  }
  .rmb {
    position: absolute;
    top: -10px;
    left: -15px;
    font-size: 30px;
  }
  .money {
    font-size: 66px;
  }
  .money-box {
    position: relative;
    margin-left: 20px;
  }
</style>
