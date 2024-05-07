<template>
  <div class="hotNews">
    <div class="title">热点新闻</div>
    <div class="content">
      <swiper :options="swiperOption" ref="mySwiper" class="buaa-swiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in list" class="buua-swiper-slide">
          <div class="item">
            <div class="itemImg">
              <img :src="item.image" alt=""/>
            </div>
            <div class="msg">
              <div class="text">{{ item.description }}</div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev">
          <img :src="imageList.left" alt=""/>
        </div>
        <div class="swiper-button-next" slot="button-next">
          <img :src="imageList.right" alt=""/>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {getNewsList} from "@/api/api";
import {formatDate} from "@/utils/date";
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  data() {
    return {
      list: [],
      percentage: 0,
      imageList: images,
      swiperOption: {
        // swiper options 所有的配置同swiper官方api配置
        // autoplay: 3000,
        slidesPerView: 3,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        onClick: (e) => {
          this.jumpDetail(this.list[e.clickedIndex])
        },
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    this._getNewsList()
  },
  methods: {
    async _getNewsList() {
      const newsList = await getNewsList()
      newsList.forEach(item => {
        item.publishDate = item.publish_date ? formatDate(new Date(item.publish_date), 'yyyy-MM-dd') : item.publish_date
      })
      this.list = newsList.filter(item => item.is_recommended);

    },
    increase() {
      this.percentage += 75;
      if(this.percentage > 150) {
        this.percentage = 150;
      } else {
        this.$refs.list.style.transform =
            "translateX(" + this.percentage * -9 + "px)";
      }
    },
    slideClick(e) {
      console.log('e', e)
    },
    jumpDetail(item) {
      this.$router.push({path: `/newsNoticeDetail/${item.id}`});
    },
  },
};
</script>

<style lang="scss">
.hotNews {
  position: relative;
  z-index: 2;
  width: 1480px;
  margin: 0 auto;
  padding: 0 80px;
  .swiper-wrapper {
    margin: 20px;
  }
  .swiper-button-next {
    right: -46px;
  }
  .swiper-button-prev {
    left: -46px;
  }
  .title {
    font-weight: bold;
    font-size: 40px;
    color: #262626;
    padding-top: 50px;
    padding-left: 20px;
  }
  .content {
    margin-top: 20px;
    position: relative;

    .mr40 {
      margin-right: 40px;
    }

    .item {
      width: 400px;
      height: 320px;
      background-color: #FAFAFA;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 20px;
      cursor: pointer;
      
      .itemImg {
        width: 400px;
        height: 180px;
        background-color: white; /* 设置背景颜色为白色 */
        display: flex; /* 使用flex布局 */
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        border-radius: 20px 20px 0 0; /* 顶部左右圆角 */

        img {
          width: 100%;
          height: 100%;
          // border-radius: 20px 20px 0 0;
          object-fit: contain; /* 图片等比例缩放 */
          object-position: center; /* 图片居中显示 */
          border-radius: 20px 20px 0 0;
          background-color: white; /* 图片未覆盖部分的背景颜色 */
        }
      }

      .msg {
        min-height: 100px; /* 设置最小高度保持描述部分高度一致 */
        padding: 20px 20px;

        .text {
          font-weight: bold;
          font-size: 16px;
          color: #262626;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
      }
    }

    .item:hover {
      box-shadow: 0 2px 16px 1px rgba(0,0,0,0.24);
      .text {
        color: #2954ff;
      }
    }
  }
}
</style>
