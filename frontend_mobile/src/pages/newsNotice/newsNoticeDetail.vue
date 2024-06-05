<template>
  <div class="bg">
    <div class="newsNoticeDetail">
      <div class="content">
        <div class="header">
          <div class="title"><span class="back-notify" @click="$router.back()">新闻通知</span> / {{ detailInfo.category }}
          </div>
          <div class="btns">
            <div class="share" @click="shareUrl">
              <img :src="images.share" alt=""/>
              <span>分享</span>
            </div>
            <div class="collect" @click="collectNews">
              <img :src="isCollected ? images.collected :images.collect" alt=""/>
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
          <div class="btn" @click="loadNews(contextObj.previous_news.id)">
            <img :src="images.left1" alt=""/>
            上一篇
          </div>
          <div class="text">
            {{ contextObj.previous_news.title }}
          </div>
        </div>
        <div class="next">
          <div class="btn" style="justify-content: flex-end" @click="loadNews(contextObj.next_news.id)">
            下一篇
            <img :src="images.right1" alt=""/>
          </div>
          <div class="text">
            {{ contextObj.next_news.title }}
          </div>
        </div>
      </div>
      <div class="more">更多相关新闻</div>
      <div class="moreList">
        <div class="moreItem" v-for="(item, index) in moreList" :key="index" @click="loadNews(item.id)">
          <img :src="item.image" alt=""/>
          <div class="body">
            <div class="title">{{ item.title }}</div>
            <div class="type">{{ item.category }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/exportImage";
import {collectNews, getNewsDetail, getRelatedNews, getRelatedNewsContent, getUserInfo, recordHistory} from "@/api/api";
import VueMarkdown from 'vue-markdown'

export default {
  data() {
    return {
      images: images,
      moreList: [],
      detailInfo: {},
      isCollected: false,
      contextObj: {
        previous_news: {},
        next_news: {}
      }
    };
  },
  activated() {
    this.id = this.$route.params.id
    this.loadNews()
  },
  components: {
    'VueMarkdown': VueMarkdown
  },
  methods: {
    shareUrl() {
      const url = window.location.href.toString();
      let finIndex = url.split('').lastIndexOf('/');
      let finalUrl = url.substr(0, finIndex + 1) + this.id;
      const inputElement = document.createElement("input");
      inputElement.value = finalUrl;
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand("copy");
      document.body.removeChild(inputElement);
      this.$toast('已复制到粘贴板');
    },
    loadNews(id) {
      this.id = id ? id : this.$route.params.id
      this._getDetail()
      this._getRelatedNews()
      this._getRelatedNewsContent()
      this._recordHistory()
      this._getCollectInfo()
      if(id) {
        this.$nextTick(() => {
          window.scrollTo(0, 0); // 滚动到页面的左上角
        })
      }
    },
    async _getCollectInfo() {
      const result = await getUserInfo()
      if(result) {
        this.isCollected = result.favorite_news && result.favorite_news.indexOf(Number(this.id)) !== -1
      }
    },
    async collectNews() {
      const result = await collectNews(this.id)
      if(result) {
        if(!this.isCollected) {
          this.isCollected = true
          this.$toast('收藏成功')
        } else {
          this.isCollected = false
          this.$toast('取消收藏成功')
        }
      }
    },
    async _recordHistory() {
      const params = {
        user: sessionStorage.getItem('user_id'),
        content_type: 'news',
        object_id: this.id
      }
      await recordHistory(params)
    },
    async _getDetail() {
      this.detailInfo = {}
      this.detailInfo = await getNewsDetail(this.id)
    },
    async _getRelatedNews() {
      this.moreList = []
      this.moreList = await getRelatedNews(this.id)
    },
    async _getRelatedNewsContent() {
      this.contextObj = await getRelatedNewsContent(this.id)
    }
  },
};
</script>

<style lang="scss">
.bg {
  width: 390px;
  background: #fafafa;
}

.newsNoticeDetail {
  width: 390px;
  padding: 0 16px;
  .content {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e1e2e6;
      font-size: 12px;
      height: 40px;
      margin-top: 4px;
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
          img {
            width: 18px;
            height: 18px;
            margin-right: 2px;
          }
        }
      }
    }

    .md-body {
      width: 356px;
      margin-top: 20px;

      img {
        width: 356px;
        margin: 40px 0;
      }

      h1 {
        font-weight: bold;
        font-size: 20px;
        color: #262626;
        margin-bottom: 16px;
      }
      h2 {
        font-weight: bold;
        font-size: 18px;
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
    width: 356px;
    height: 140px;
    background: #fff;
    font-size: 14px;
    padding: 30px 20px;
    box-shadow: 0 3px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
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
      font-size: 14px;
      color: #262626;
      font-weight: 500;
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
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
    font-size: 20px;
    color: #262626;
    text-align: center;
    margin-top: 40px;
  }

  .moreList {
    width: 356px;

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
          font-size: 14px;
          color: #262626;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }

        .type {
          color: #587dff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
