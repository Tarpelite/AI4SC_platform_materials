<template>
  <div class="hotNews">
    <div class="title">热点新闻</div>
    <div class="content">
      <div v-for="(item, index) in list" @click="jumpDetail(item)">
        <div class="item">
          <div class="msg">
            <div class="text">{{ item.description }}</div>
          </div>
          <div class="itemImg">
            <img :src="item.image" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import { getNewsList } from '@/api/api';
import { formatDate } from '@/utils/date';
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  data() {
    return {
      list: [],
      percentage: 0,
      imageList: images
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
      if (this.percentage > 150) {
        this.percentage = 150;
      } else {
        this.$refs.list.style.transform =
          'translateX(' + this.percentage * -9 + 'px)';
      }
    },
    jumpDetail(item) {
      this.$router.push({ path: `/newsNoticeDetail/${ item.id }` });
    }
  }
};
</script>

<style lang="scss">
.hotNews {
  position: relative;
  z-index: 2;
  width: 352px;

  .swiper-wrapper {
    margin: 20px;
  }

  .title {
    font-weight: bold;
    font-size: 24px;
    color: #262626;
    padding-top: 26px;
  }

  .content {
    margin-top: 20px;
    position: relative;

    .mr40 {
      margin-right: 40px;
    }

    .item {
      width: 352px;
      height: 132px;
      background-color: #fafafa;
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      .itemImg {
        width: 144px;
        height: 132px;
        background-color: white; /* 设置背景颜色为白色 */
        display: flex; /* 使用flex布局 */
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        border-radius: 0 16px 16px 0;

        img {
          width: 144px;
          height: 132px;
          // border-radius: 20px 20px 0 0;
          // height: auto; /* 设置高度为auto以保持图片原始比例 */
          object-fit: cover; /* 更改为cover确保图片完全覆盖容器，可能会裁剪 */
          border-radius: 0 16px 16px 0;
          background-color: white; /* 图片未覆盖部分的背景颜色 */
        }
      }

      .msg {
        // min-height: 100px; /* 设置最小高度保持描述部分高度一致 */
        padding: 20px 20px;
        background-color: #fafafa; /* 确保覆盖区域的背景色与.item背景色一致 */
        min-height: 60px; /* 调整高度以确保足够的覆盖 */
        overflow: hidden; /* 添加溢出隐藏 */
        border-radius: 16px 0 0 16px;
        .text {
          font-weight: bold;
          font-size: 14px;
          color: #262626;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
      }
    }

    .item:hover {
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.24);

      .text {
        color: #2954ff;
      }
    }
  }
}
</style>
