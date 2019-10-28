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
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul ref="img-ul" class="img-ul">
          <li class="img-li" ref="img-li" v-for="(item,index) in list" :key="index">
            <div class="li-box" :style="{backgroundImage: `url(${imgObj[item.CMF3_PRIZE_TYPE]})`}">
              <div class="li-box-inner">
                <div class="li-box-left">
                  <!--<div class="money-box">-->
                    <!--<i class="rmb">￥</i>-->
                    <!--<span class="money">{{item.CMF3_VALUE}}</span>-->
                  <!--</div>-->
                  <img :src="logoObj[item.CMF3_PRIZE_TYPE]" alt="" v-if="!item.CMF3_IMG_1">
                  <img :src="item.CMF3_IMG_1" alt="" v-else>

                </div>
                <div class="li-box-right">
                  <div class="li-box-right-inner">
                    <div class="prize-name">{{item.CMF3_PRIZE_NAME}}</div>
                    <div class="BIZ_NAME">{{item.BIZ_NAME}}</div>
                    <div class="prize-time">获奖日期：{{item.CMF3_CRT_TIME}}</div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'

export default {
  data () {
    return {
      id: null, // 活动id
      list: null,
      loading: false,
      finished: false,
      isLoading: false,
      pageIndex: 1, // 当前页
      pageCount: null, // 总页数
      imgObj: { // 不同奖品类型对应不同背景图
        'CMF801': require('../assets/hongbao.png'), // 红包
        'CMF802': require('../assets/quan.png'), // 券
        'CMF803': require('../assets/other.png') // 其他
      },
      logoObj: { // 不同奖品类型对应不同logo
        'CMF801': require('../assets/k.png'), // 红包
        'CMF802': require('../assets/m.png'), // 券
        'CMF803': require('../assets/n.png') // 其他
      }
    }
  },
  components: {},
  mounted () {
    utils.hasSetRem(this.setImgBoxHeight2)
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
//    this.id = params.activityid || '17006a8988dc41efadb3a76236ecd493'
    this.getData()
  },
  methods: {
    /**
     * @method 设置滚动容器的高度
     */
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
      this.loading = false
//
//        // 数据全部加载完成
//        if (this.list.length >= 40) {
//          this.finished = true
//        }
//      }, 500)
//      if (this.pageCount === this.pageIndex) { // 加载完全部了
//        this.finished = true
//        this.loading = false
//        return
//      }
//      this.pageIndex++
//      this.getData()
    },
    onClickLeft () {
      window.history.back()
    },
    onRefresh () {
//      setTimeout(() => {
//        this.$toast('刷新成功')
//        this.isLoading = false
//      }, 500)
//      this.pageIndex = 1
//      this.pageCount = null
//      this.list = null
//      this.getData()
    },
    /**
     * 获取数据
     */
    getData () {
      const theData = {
        ActivityId: this.id,
        PageIndex: this.pageIndex
      }
      utils.toast(this, '', 'loading')
      postData('/MyActivityPrizes', theData).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
//        this.pageCount = res.PageCount
//        this.pageIndex = res.PageIndex
//        this.loading = false
//        this.isLoading = false
//        this.list = this.list === null ? res.Data : this.list.concat(res.Data)
        this.list = res.Data

        for (let item of this.list) {
          utils.formatObj(item, false)
        }
      })
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
      padding: 20px 25px 0;
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
    img {
      width: 140px;
      height: 140px;
    }
  }
  .li-box-right {
    flex: 1;
  }
  .li-box-right-inner {
    height: 100%;
    padding: 30px 50px;
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
    left: -20px;
    font-size: 30px;
  }
  .money {
    font-size: 66px;
  }
  .money-box {
    position: relative;
    margin-left: 20px;
  }
  .BIZ_NAME {
    font-size: 28px;
  }
</style>
