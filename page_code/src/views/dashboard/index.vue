<template>
  <div class="dashboard">
    <div class="bannerBg">
      <div style="width: 1440px;margin: 0 auto;padding: 0 80px;">
        <el-carousel height="560px" ref="nop">
          <el-carousel-item v-for="item in carouselData" :key="item.id" :class="'carousel' + item.id">
            <div class="carouselItem" :style="'background-image: url(' + item.path + ')'">
              <div class='carouselContent'>
                <p class="title1">{{ item.title }}</p>
                <p class="title2">{{ item.title1 }}</p>
                <span @click="jump(item.jumpPath)">{{ item.btn }}</span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div style="background: #fafafa;">
      <fastFunction />
      <hotNews />
      <typicalTask />
      <scienceKit />
      <scientificData />
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
      ]
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

<style lang="scss" scoped>
::v-deep .el-carousel__indicators--horizontal {
    position: absolute;
    bottom: 5px;
    text-align: right;
    .el-carousel__indicator--horizontal button {
        width: 20px;    
        height: 4px;
        background: rgba(255, 255, 255, .8);
        border-radius: 10px;
    }

    .el-carousel__indicator--horizontal.is-active button {
        width: 60px;      
        height: 4px;
        background:#fff;
        border-radius: 10px;
    }
}
.dashboard {
  height: 100%;
  .bannerBg {
    height: 560px;
    background: linear-gradient( 180deg, #DEEAFF 0%, #DEEAFF 18%, rgba(250,250,250,1) 100%);
    margin: 0 auto;
  }
  .carouselItem {
    width: 1440px;
    height: 560px;
    margin: 0 auto;
    position: relative;
    border-radius: 10px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .carouselContent {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 105;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: center;
      .title1 {
        margin-top: 187px;
        font-size: 40px;
        font-family: Helvetica Neue-Bold, Helvetica Neue;
        font-weight: bold;
        color: #FFFFFF;
      }
      .title2 {
        font-size: 20px;
        font-family: Helvetica Neue-Bold, Helvetica Neue;
        color: #FFFFFF;
        margin-top: 10px;
      }
      span {
        display: inline-block;
        font-size: 20px;
        border: 2px solid #fff;
        border-radius: 7px;
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