<template>
  <div class="album">
    <div ref="header" class="header">
      <van-nav-bar
        title="我的历史活动记录"
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
            <li class="img-li" ref="img-li" v-for="item in list" :key="item">
              <div class="li-box">
                <img src="../assets/coin.png" alt="" class="li-img">
                <div class="li-mid">
                  <div class="li-mid-top">名字</div>
                  <div class="li-mid-btm">
                    <p>2019-5-16</p>
                    <p>广州海珠区海港大道117号</p>
                  </div>
                </div>
                <div class="li-action">
                  <div class="li-btn" @click="clickCheck">查 看</div>
                </div>
              </div>
              <!--<img src="../assets/coin.png" @click="clickImgLi" v-lazy="require('../assets/coin.png')">-->
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
      liHeight: null,
      isLoading: false
    }
  },
  components: {},
  mounted () {
    console.log(utils, postData)

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
    postData('/MyActivitys', {'ActivityId': this.id}).then((res) => {
      console.log(res)
      utils.toast(this, '', 'clear')
      this.theDate = res.Data.CMA1_START_DATE
      this.address = res.Data.CMA1_ADDRESS
      this.logoUrl = res.Data.CMA1_LOGO_URL
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
      let windowHeight = document.body.clientHeight
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
    },
    /**
     * 点击查看
     */
    clickCheck () {

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
      padding: 0px 25px;
    }
  }
  .li-box {
    padding: 20px 0;
    border-bottom: 1px solid #E95B3E;
    display: flex;
  }
  .li-img {
    width: 186px;
    height: 186px;
    margin-right: 20px;
  }
  .li-mid {
    flex: 1;
    color: #333;
    p {
      padding: 0;
      margin: 0;
    }
  }
  .li-action {
    padding-top: 94px;
  }
  .li-btn {
    width: 112px;
    height: 60px;
    background-color: #E95B3E;
    border-radius: 6px;
    color: #ffffff;
    font-size: 26px;
    @include defaultFlex;
  }
  .li-mid-top {
    font-size: 32px;
    margin-bottom: 20px;
    margin-top: 15px;  }
  .li-mid-btm {
    font-size: 26px;
    p:nth-child(2) {
      margin-top: 19px;
    }
  }
</style>
