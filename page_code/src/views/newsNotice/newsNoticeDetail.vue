<template>
  <div class="bg">
    <div class="newsNoticeDetail">
      <div class="content">
        <div class="header">
          <div class="title"><span class="back-notify" @click="$router.back()">新闻通知</span> / {{ detailInfo.category }}</div>
          <div class="btns">
            <div class="share">
              <img :src="images.share" alt=""/>
              <span>分享</span>
            </div>
            <div class="collect">
              <img :src="images.collect" alt=""/>
              <span>收藏</span>
            </div>
            <div class="back" @click="$router.back()">
              <img :src="images.back" alt=""/>
              <span>返回</span>
            </div>
          </div>
        </div>
        <div class="md-body" v-if="detailInfo.detailed_markdown">
          <vue-markdown>{{ detailInfo.detailed_markdown }}</vue-markdown>
        </div>
      </div>
      <div class="paging">
        <div class="previous">
          <div class="btn">
            <img :src="images.left1" alt=""/>
            上一篇
          </div>
          <div class="text">
            AI4Science的基石：几何图神经网络，最全综述来了！人大高瓴联合腾讯AI
            lab、清华、斯坦…
          </div>
        </div>
        <div class="next">
          <div class="btn" style="justify-content: flex-end">
            下一篇
            <img :src="images.right1" alt=""/>
          </div>
          <div class="text">
            用基于结构的突变偏好进行蛋白质设计，加州大学、MIT、哈佛医学院团队开发了一种无监督…
          </div>
        </div>
      </div>
      <div class="more">更多相关新闻</div>
      <div class="moreList">
        <div class="moreItem" v-for="(item, index) in moreList" :key="index" @click="LinkDetail">
          <img :src="item.image" alt=""/>
          <div class="body">
            <div class="title">{{ item.title }}</div>
            <div class="type">{{ item.category }}</div>
          </div>
        </div>
      </div>
      <div style="height: 50px"></div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {getNewsDetail, getRelatedNews} from "@/api/api";
import VueMarkdown from 'vue-markdown'

export default {
  data() {
    return {
      images: images,
      moreList: [],
      detailInfo: {}
    };
  },
  created() {
    this.id = this.$route.params.id
    this._getDetail()
    this._getRelatedNews()
  },
  components: {
    'vue-markdown': VueMarkdown
  },
  methods: {
    async _getDetail() {
      let detailData = await getNewsDetail(this.id)
      this.detailInfo = detailData
      console.log('detailData', detailData)
    },
    async _getRelatedNews() {
      let moreList = await getRelatedNews(this.id)
      this.moreList = moreList
    }
  },
};
</script>

<style lang="scss">
.bg {
  width: 100%;
  background: #fafafa;
}

.newsNoticeDetail {
  width: 1440px;
  margin: 0 auto;

  .content {
    padding: 40px 320px;

    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e1e2e6;
      padding-bottom: 8px;

      .title {
        color: #587dff;
      }

      .btns {
        display: flex;

        .share {
          margin-right: 15px;
        }

        .collect {
          margin-right: 15px;
        }

        div {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          img {
            width: 20px;
            height: 20px;
            margin-right: 2px;
          }
        }
      }
    }

    .md-body {
      width: 800px;
      margin-top: 40px;

      img {
        width: 800px;
        margin: 40px 0;
      }

      h1 {
        font-weight: bold;
        font-size: 32px;
        color: #262626;
        margin-bottom: 16px;
      }

      p {
        line-height: 24px;
        font-weight: 400;
        font-size: 16px;
        color: #262626;
        margin-bottom: 16px;
      }

      .info {
        margin-top: 15px;

        .reship {
          background: rgba(194, 214, 255, 0.8);
          border-radius: 14px 14px 14px 14px;
          color: #262626;
          font-size: 12px;
          padding: 2px 8px;
          margin-right: 16px;
        }
      }

      .blue {
        color: #2954ff;
      }

      .textTile {
        font-weight: bold;
        font-size: 24px;
        color: #262626;
        text-align: center;
        margin: 40px 0;
      }

      .textLink {
        margin-top: 20px;

        a:link {
          color: #2954ff;
        }
      }
    }
  }

  .paging {
    width: 100%;
    height: 140px;
    width: 800px;
    margin: 0 auto;
    padding: 30px 20px;
    background: #ffffff;
    box-shadow: 0px 3px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 12px 12px 12px 12px;
    display: flex;

    .previous {
      flex: 1;
      border-right: 1px solid #e1e2e6;
      padding-right: 40px;
      cursor: pointer;
    }

    .next {
      flex: 1;
      padding-left: 40px;
      cursor: pointer;
    }

    .text {
      font-size: 16px;
      color: #262626;
      font-weight: 500;
      margin-top: 10px;
    }

    .btn {
      display: flex;
      align-items: center;
      color: #587dff;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }

  .more {
    font-weight: bold;
    font-size: 24px;
    color: #262626;
    text-align: center;
    margin-top: 40px;
  }

  .moreList {
    width: 800px;
    margin: 0 auto;

    .moreItem {
      margin-top: 30px;
      padding: 10px;
      display: flex;
      cursor: pointer;

      img {
        width: 140px;
        height: 100px;
        border-radius: 8px;
        margin-right: 16px;
      }

      .body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px 0;

        .title {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
        }

        .type {
          color: #587dff;
        }
      }
    }

    .moreItem:hover {
      background: #ffffff;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16px 16px 16px 16px;

      .title {
        color: #2954ff;
      }
    }
  }
}
</style>
