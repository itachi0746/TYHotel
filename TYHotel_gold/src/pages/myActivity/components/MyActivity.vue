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
    <van-pull-refresh v-model="isLoading" disabled @refresh="onRefresh" id="img-box" class="img-box" ref="img-box">

        <ul ref="img-ul" class="img-ul">
          <li class="img-li" ref="img-li" v-for="item in list" :key="item">
            <div class="li-box">
              <div class="li-img-box">
                <img :src="item.CMA1_IMG_URL" alt="" class="li-img">
                <!--<img src="../assets/coin.png" alt="" class="li-img">-->
              </div>
              <div class="li-mid">
                <div class="li-mid-top">{{item.CMA1_TITLE}}</div>
                <div class="li-mid-btm">
                  <p>{{item.CMA1_START_DATE}}</p>
                  <p>{{item.CMA1_ADDRESS}}</p>
                </div>
              </div>
              <div class="li-action">
                <div class="li-btn" @click="clickCheck(item.CMA1_ID)">查 看</div>
              </div>
            </div>
          </li>
        </ul>

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
      liHeight: null,
      isLoading: false

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
     * param id 活动id
     */
    clickCheck (id) {
      window.GoToPage('', 'index.html', {activityid: id})
    },
    /**
     * 获取数据
     */
    getData () {
      utils.toast(this, '', 'loading')
      postData('/MyActivitys', {'ActivityId': this.id}).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
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
    /*background-color: #250659;*/
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
    background-color: #443A3B;
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
    padding: 11px 13px;
    /*border-bottom: 1px solid #E95B3E;*/
    display: flex;
    background: url("../assets/i.png") no-repeat;
    background-size: 100% 100%;
  }
  .li-img-box {
    border: 5px solid #fff;
    border-radius: 10px;
    /*background-color: #fff;*/
    margin-right: 20px;
    max-height: 190px;
    min-width: 190px;
    @include borderBox()
  }
  .li-img {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    /*border: 1px solid #fff;*/
  }
  .li-mid {
    flex: 1;
    color: #fff;
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
    /*background-color: #FFDA33;*/
    background: url("../assets/k.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 6px;
    color: #161616;
    font-size: 26px;
    margin-right: 20px;
    @include defaultFlex;
  }
  .li-mid-top {
    font-size: 32px;
    margin-bottom: 20px;
    margin-top: 15px;
  }
  .li-mid-btm {
    font-size: 26px;
    p:nth-child(2) {
      margin-top: 19px;
    }
  }
</style>
