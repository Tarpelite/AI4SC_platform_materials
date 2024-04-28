<template>
  <div class="hotNews">
    <div class="title">热点新闻</div>
    <div class="content" ref="list">
      <div
        class="item mr24"
        v-for="(item, index) in list"
        :key="index"
        @click="jumpDetail(item)"
      >
        <div class="itemImg">
            <img :src="item.image" alt="" />
        </div>
        <div class="msg">
          <div class="text">{{ item.description }}</div>
        </div>
      </div>
    </div>
    <div class="left" @click="decrease">
      <img :src="imageList.left" alt="" />
    </div>
    <div class="right" @click="increase">
      <img :src="imageList.right" alt="" />
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {getNewsList} from "@/api/api";
import {formatDate} from "@/utils/date";
export default {
  data() {
    return {
      list: [],
      percentage: 0,
      imageList: images,
    };
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
      this.list = newsList.filter(item=> item.is_recommended);;
    },
    increase() {
      this.percentage += 75;
      if (this.percentage > 150) {
        this.percentage = 150;
      } else {
        this.$refs.list.style.transform =
          "translateX(" + this.percentage * -9 + "px)";
      }
    },
    decrease() {
      this.percentage -= 75;
      if (this.percentage < 0) {
        this.percentage = 0;
      } else {
        this.$refs.list.style.transform =
          "translateX(" + this.percentage * -9 + "px)";
      }
    },
    jumpDetail(item) {
      this.$router.push({ path: `/newsNoticeDetail/${item.id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.hotNews {
  position: relative;
  overflow: hidden;
  width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  .title {
    font-weight: bold;
    font-size: 40px;
    color: #262626;
    padding-top: 50px;
  }
  .content {
    display: flex;
    width: auto;
    margin-top: 20px;
    transform: translateX(0px);
    transition-property: transform;
    transition-duration: 2s;
    padding-bottom: 15px;
    .mr24 {
      margin-right: 24px;
    }
    .item {
      width: 360px;
      height: 320px;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      .itemImg {
        width: 360px;
        height: 180px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 20px 20px 0 0;
        }
      }
      .msg {
        padding: 20px 20px;
        .text {
          font-weight: bold;
          font-size: 16px;
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
      .text {
        color: #2954ff;
      }
    }
  }
  .right {
    position: absolute;
    right: 10px;
    top: 240px;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .left {
    position: absolute;
    left: 10px;
    top: 240px;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
