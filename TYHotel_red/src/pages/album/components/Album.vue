<template>
  <div class="album">
    <div ref="header" class="header">
      <van-nav-bar
        title="活动相册"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right=""
      />
      <div v-show="false" class="uploader-box" ref="uploader-box">
        <van-uploader :after-read="onRead" id="uploader-box">
          <van-icon name="photograph"/>
        </van-uploader>
      </div>
    </div>
    <div class="btn-box" ref="btnBox">
      <div class="btn" @click="onClickRight">
        <img src="../assets/camera2.png" alt="">
        <span>上传照片</span>
      </div>
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
              <div class="li-top">
                <img src="../assets/camera.png" alt="">
                <span>{{item.CMA7_CRT_TIME}}</span>
              </div>
              <div class="li-img-box">
                <van-row>
                  <van-col span="8" v-for="(img,index) in item.imgArray" :key="index">
                    <div class="col-box">
                      <img @click="clickImgLi(img.CMA7_FILE_URL)" v-lazy="img.CMA7_FILE_URL">
                    </div>
                  </van-col>
                </van-row>
              </div>
            </li>
          </ul>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'
import { ImagePreview } from 'vant'

export default {
  data () {
    return {
      id: null, // 活动id
      list: null,
      loading: false,
      finished: false,
      liHeight: null,
      isLoading: false,
      pageIndex: 1, // 当前页
      pageCount: null // 总页数
    }
  },
  components: {},
  mounted () {
    this.setImgBoxHeight2()
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
      let btnHeight = this.$refs.btnBox.offsetHeight
      let imgBox = document.getElementById('img-box')
      imgBox.style.height = (windowHeight - headerHeight - btnHeight) + 'px'
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
      if (this.pageCount === this.pageIndex) { // 加载完全部了
        this.finished = true
        this.loading = false
        return
      }
      this.pageIndex++
      this.getData()
    },
    /**
     * 点击图片Li
     * @param src 图片地址 数组
     */
    clickImgLi (src) {
      ImagePreview([src])
    },
    onClickLeft () {
      window.history.back()
    },
    onClickRight () {
      document.getElementById('uploader-box').click()
    },
    onRead (data) {
      utils.toast(this, '', 'loading')

      console.log(data)
      const theData = {
        Name: data.file.name,
        Data: data.content
      }
      let form = utils.createFormData2(theData)
      postData('/UploadActivityImages', form).then((res) => {
        console.log(res)
        utils.toast(this, '上传成功')
      })
    },
    onRefresh () {
      this.pageIndex = 1
      this.pageCount = null
      this.list = null
      this.getData()
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
      postData('/ActivityImages', theData).then((res) => {
        console.log(res)
        this.loading = false
        utils.toast(this, '', 'clear')
        this.pageCount = res.PageCount
        this.pageIndex = res.PageIndex
        this.loading = false
        this.isLoading = false
        this.list = this.list === null ? res.Data.Models : this.list.concat(res.Data.Models)

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
    background-color: $bgColor;
    width: 100%;
    /*height: 100%;*/
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
  }

  .img-ul {
    /*display: flex;*/
    overflow: hidden;
    li {
      padding: 0 20px;
    }
  }
  .btn-box {
    padding: 36px 196px;
    @include defaultFlex;
    img {
      width: 47px;
      position: absolute;
      top: 23px;
      left: 40px;
    }
  }
  .btn {
    position: relative;
    width: 357px;
    height: 86px;
    background-color: $mainColor;
    border-radius: 43px;
    @include defaultFlex;
    color: #ffffff;
    font-size: 30px;
  }
  .li-img-box {
    padding: 40px 0;
    img {
      width: 100%;
    }
  }
  .li-top {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 28px;
    padding-left: 10px;
    img {
      width: 50px;
      margin-right: 30px;
    }
  }
  .col-box {
    width: 100%;
    text-align: center;
    padding: 0 10px 20px;
    @include borderBox();
    /*margin-bottom: 0.25rem;*/
  }
</style>
