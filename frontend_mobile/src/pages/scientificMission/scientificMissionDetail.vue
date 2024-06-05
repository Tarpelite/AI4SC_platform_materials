<template>
  <div class="scientificMissionDetail">
    <div class="content">
      <div class="header">
        <div class="title"><span class="renwu" @click="$router.back()">科学任务</span> / <span class="router-title">{{ detailInfo.title }}</span></div>
        <div class="btns">
          <img class="btnsImg" :src="isCollected ? images.collected :images.collect" alt="收藏" @click="bindCollect"/>
          <img class="btnsImg" v-if="detailInfo.notebook_link" :src="images.link" alt="" @click="jump(detailInfo.notebook_link)"/>
          <img class="btnsImg" v-if="detailInfo.introduction_link" :src="images.homeLink" alt="" @click="jump(detailInfo.introduction_link)"/>
          <img class="btnsImg" v-if="detailInfo.repository_link" :src="images.codeRepository" alt="" @click="jump(detailInfo.repository_link)"/>
          <div class="back" @click="$router.back()">
            <img :src="images.back" class="backImg" alt=""/> <span>返回</span>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="title">{{ detailInfo.title }}</div>
        <div class="tag">
          <div class="type">{{ detailInfo.domain ? detailInfo.domain.name : '' }}</div>
          <div class="algorithm">{{ detailInfo.contributor }}</div>
        </div>
        <div class="md-body" v-if="detailInfo.detailed_description">
          <vue-markdown>{{ detailInfo.detailed_description }}</vue-markdown>
        </div>
        <div class="bodyTry">
          <div class="tryOnline" v-if="detailInfo.notebook_link">
            <div class="title">在线尝试</div>
            <div class="immediateExecution" @click="jump(detailInfo.notebook_link)">
              <img :src="images.action" alt=""/> 立即执行
            </div>
          </div>
          <div class="tryOnline" v-else>
            <div class="title">在线尝试</div>
            <div class="immediateExecution disabled">
              敬请期待
            </div>
          </div>
          <div class="relevantPapers" v-if="detailInfo.papers">
            <div class="title">相关论文</div>
            <template v-if="detailInfo.papers.length > 0">
              <div class="relevant-wrapper" @click="jump(detailInfo.papers[0].doi)">
                <div class="relevantPapersText">
                  {{ detailInfo.papers[0].title }}
                </div>
              </div>
            </template>
            <template v-if="detailInfo.papers.length > 1">
              <div class="relevant-wrapper" @click="jump(detailInfo.papers[1].doi)">
                <div class="relevantPapersText">
                  {{ detailInfo.papers[1].title }}
                </div>
              </div>
            </template>
          </div>
          <div class="scientificMission">
            <div class="title">类似科学任务</div>
            <div class="scientificMissionBox" v-for="(item, index) in likenessList" :key="index" @click="loadScience(item.id)">
              <img :src="item.image" alt=""/>
              <div class="text">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import { collectScience, getRelatedScienceList, getScienceDetail, getUserInfo, recordHistory } from '@/api/api';

export default {
  data() {
    return {
      isCollected: false,
      images: images,
      moreList: [],
      likenessList: [],
      detailInfo: {}
    };
  },
  activated() {
    this.loadScience()
  },
  components: {},
  methods: {
    loadScience(id) {
      this.id = id ? id : this.$route.params.id
      this._getDetail()
      this._getRelatedScienceList()
      this._recordHistory()
      this._getCollectInfo()
      if (id) {
        this.$nextTick(() => {
          window.scrollTo(0, 0); // 滚动到页面的左上角
        })
      }
    },
    async _recordHistory() {
      const params = {
        user: sessionStorage.getItem('user_id'),
        content_type: 'sciencetask',
        object_id: this.id
      }
      await recordHistory(params)
    },
    async _getRelatedScienceList() {
      this.likenessList = {}
      this.likenessList = await getRelatedScienceList()
    },
    async _getCollectInfo() {
      const result = await getUserInfo()
      if (result) {
        this.isCollected = result.favorite_tasks && result.favorite_tasks.indexOf(Number(this.id)) !== -1
      }
    },
    async _getDetail() {
      this.detailInfo = {}
      this.detailInfo = await getScienceDetail(this.id)
    },
    async bindCollect() {
      const result = await collectScience(this.id)
      if (result) {
        if (!this.isCollected) {
          this.isCollected = true
          this.$toast('收藏成功')
        } else {
          this.isCollected = false
          this.$toast('取消收藏成功')
        }
      }
    },
    jump(link) {
      if (link.startsWith('http')) {
        window.open(link);
      }
    }
  }
};
</script>

<style lang="scss">
.scientificMissionDetail {
  width: 390px;
  background: #fafafa;

  .content {
    padding: 0 16px;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e1e2e6;
      height: 40px;
      padding-top: 10px;
      .title {
        color: #587dff;
        font-size: 12px;
        height: 16px;
        width: 190px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
      }

      .btns {
        display: flex;
        .btnsImg {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
        .back {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #587dff;
          font-size: 12px;
          width: 50px;
          .backImg {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }
      }
    }

    .body {
      padding-top: 24px;
      .title {
        font-weight: bold;
        font-size: 24px;
        color: #262626;
      }

      .tag {
        display: flex;
        font-size: 12px;
        margin-top: 24px;

        .type {
          background: #587dff;
          border-radius: 14px;
          color: #fff;
          padding: 2px 8px;
          margin-right: 5px;
        }

        .algorithm {
          background: #fff;
          border: 1px solid #587dff;
          border-radius: 14px;
          color: #587dff;
          padding: 2px 8px;
        }
      }

      .text {
        line-height: 25px;
        color: #262626;
        font-size: 14px;
      }

      .experience {
        width: 840px;
        height: 320px;
        background: #deeaff;
        border-radius: 16px 16px 16px 16px;
        padding: 20px;
        margin-top: 25px;

        .experienceTitle {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
        }

        .experienceBody {
          width: 800px;
          background: #f2f7ff;
          border-radius: 8px 8px 8px 8px;
          margin-top: 10px;
          padding: 10px;
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
      .bodyTry {
        width: 360px;

        .title {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
        }

        .tryOnline {
          width: 360px;
          height: 100px;
          background: #fff;
          box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;

          .immediateExecution {
            width: 318px;
            height: 36px;
            background: rgba(88, 125, 255, 0.8);
            border-radius: 8px 8px 8px 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-top: 6px;
            cursor: pointer;
            font-size: 14px;

            &.disabled {
              color: #587dff;
              background: #f2f7ff;
            }

            img {
              width: 16px;
              height: 16px;
              margin-right: 8px;
            }
          }
        }

        .relevantPapers {
          margin-top: 24px;
          width: 360px;
          height: 202px;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;

          .relevant-wrapper {
            padding: 12px 15px;
            border-radius: 12px 12px 12px 12px;
            background: #f2f7ff;
            width: 320px;
            height: 60px;
            cursor: pointer;
            margin-top: 12px;
          }

          .relevantPapersText {
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .scientificMission {
          margin-top: 24px;
          width: 360px;
          height: 418px;
          background: #fff;
          box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;

          .scientificMissionBox {
            height: 60px;
            display: flex;
            padding: 6px;
            align-items: center;
            font-size: 14px;
            margin-bottom: 12px;
            background: #f2f7ff;
            border-radius: 12px 12px 12px 12px;
            cursor: pointer;

            img {
              border-radius: 8px;
              width: 48px;
              height: 48px;
              margin-right: 15px;
            }

            .text {
              font-weight: 500;
              font-size: 14px;
              color: #262626;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
            }
          }

          .scientificMissionBox:hover {
            .text {
              color: #2954ff;
            }
          }
        }
      }
    }
  }
}
</style>
