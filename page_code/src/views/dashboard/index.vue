<template>
  <div class="dashboard">
    <div class="bannerBg">
      <div style="width: 1280px;margin: 0 auto; position: relative">
<!--        <el-carousel height="600px" ref="nop" indicator-position="outside">-->
<!--          <el-carousel-item v-for="item in carouselData" :key="item.id" :class="'carousel' + item.id">-->

<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
        <swiper :options="swiperOption" ref="mySwiper" class="buaa-swiper">
          <!-- slides -->
          <swiper-slide v-for="(item, index) in carouselData" class="buua-swiper-slide cursor">
            <div class="carouselItem" :style="'background-image: url(' + item.path + ')'">
              <div class="carouselContent">
                <p class="title1">{{ item.title }}</p>
                <p class="title2">{{ item.title1 }}</p>
                <span @click="jump(item.jumpPath)">{{ item.btn }}</span>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev">
            <img :src="images.left" alt=""/>
          </div>
          <div class="swiper-button-next" slot="button-next">
            <img :src="images.right" alt=""/>
          </div>
        </swiper>
      </div>
    </div>
    <div style="background: #FAFAFA;">
      <fastFunction/>
      <hotNews/>
      <typicalTask/>
      <scienceKit/>
      <scientificData/>
    </div>
  </div>
</template>

<script>
import images from '@/utils/js/exportImage'
import fastFunction from './components/fastFunction.vue'
import hotNews from './components/hotNews.vue'
import typicalTask from './components/typicalTask.vue'
import scienceKit from './components/scienceKit.vue'
import scientificData from './components/scientificData.vue'

export default {
  data() {
    return {
      images: images,
      carouselData: [
        {
          id: 1,
          path: images.banner1,
          title: '北京航空航天大学举办首届“人工智能科学计算学术研讨会”',
          title1: '鄂维南院士、卢宇彤主任、吴文峻教授等发表AI for Science前沿观点',
          btn: '了解更多',
          jumpPath: ''
        },
        {
          id: 2,
          path: images.banner2,
          title: 'CNCC | 从“计算”迈向“智算”新范式，科学智算平台技术前沿探讨',
          title1: '2023年10月26日~28日 辽宁·沈阳新世界博览馆',
          btn: '了解更多',
          jumpPath: ''
        },
        {
          id: 3,
          path: images.banner3,
          title: '2023 年“大湾区杯”粤港澳 AI for Science 科技竞赛',
          title1: '广东省计算数学学会主办，百度、华为、北航、浙大、中山大学、Datawhale等共同协办',
          btn: '报名参赛',
          jumpPath: ''
        },
      ],
      swiperOption: {
        // swiper options 所有的配置同swiper官方api配置
        // autoplay: 3000,
        slidesPerView: 1,
        autoHeight: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        onClick: (e) => {
          this.jumpDetail(this.list[e.clickedIndex])
        },
      }
    }
  },
  components: {
    fastFunction,
    hotNews,
    typicalTask,
    scienceKit,
    scientificData
  },
  methods: {
    // 上一张
    prev() {
      this.$refs.nop.prev();
    },
    // 下一张
    next() {
      this.$refs.nop.next();
    },
    jump(jumpPath) {
      this.$router.push({path: jumpPath})
    }
  }
};
</script>

<style lang="scss">
.cursor {
  cursor: pointer;
}
.el-carousel__indicators--outside {
  position: absolute;
  bottom: 5px;
  text-align: right;

  .el-carousel__indicator {
    button {
      width: 20px;
      height: 4px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
    &.is-active {
      button {
        width: 60px;
        height: 4px;
        background: #2954FF;
        border-radius: 10px;
      }
    }
  }
}

.dashboard {
  height: 100%;

  .bannerBg {
    height: 560px;
    background: linear-gradient(180deg, #DEEAFF 0%, #DEEAFF 18%, rgba(250, 250, 250, 1) 100%);
    margin: 0 auto;
  }

  .carouselItem {
    width: 100%;
    height: 560px;
    margin: 0 auto;
    position: relative;
    border-radius: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .carouselContent {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 105;
      width: 100%;
      height: 180px;
      border-radius: 20px;

      .title1 {
        width: 1280px;
        height: 120px;
        line-height: 120px;
        background-color: rgba(0,0,0, 0.5);
        border-radius: 0;
        padding: 0 40px;
        font-size: 40px;
        font-family: Helvetica Neue-Bold, Helvetica Neue;
        font-weight: bold;
        color: #FFFFFF;
        overflow: hidden;
        word-wrap: break-word;
      }

      .title2 {
        font-size: 20px;
        height: 60px;
        line-height: 60px;
        background-color: rgba(0,0,0, 0.7);
        padding: 0 40px;
        border-radius: 0px 0px 20px 20px;
        font-family: Helvetica Neue-Bold, Helvetica Neue;
        color: #FFFFFF;
      }

      span {
        display: inline-block;
        font-size: 20px;
        border: 2px solid #fff;
        border-radius: 20px;
        color: #fff;
        background-color: transparent;
        padding: 5px 10px;
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
}

.tooltipContent {
  img {
    display: block;
    width: 98px;
    height: 98px;
  }
}
</style>
