<template>
  <div class="scientificMissionDetail">
    <div class="content">
      <div class="header">
        <div class="title"><span class="renwu" @click="$router.back()">科学任务</span> / {{ detailInfo.title }}</div>
        <div class="btns">
          <img class="btnsImg" :src="isCollected ? images.collected :images.collect" alt="收藏" @click="bindCollect"/>
          <img class="btnsImg" :src="images.link" alt="" @click="jump(detailInfo.notebook_link)"/>
          <img class="btnsImg" :src="images.homeLink" alt="" @click="jump(detailInfo.introduction_link)"/>
          <img class="btnsImg" :src="images.codeRepository" alt="" @click="jump(detailInfo.repository_link)"/>
          <div class="back" @click="$router.back()">
            <img :src="images.back" class="backImg" alt=""/>
            <span>返回</span>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="bodyLeft">
          <div class="title">{{ detailInfo.title }}</div>
          <div class="tag">
            <div class="type">{{ detailInfo.domain ? detailInfo.domain.name : '' }}</div>
            <div class="algorithm">{{ detailInfo.contributor }}</div>
          </div>
          <div class="md-body" v-if="detailInfo.detailed_description">
            <vue-markdown>{{ detailInfo.detailed_description }}</vue-markdown>
          </div>
        </div>
        <div class="bodyRight">
          <div class="tryOnline">
            <div class="title">在线尝试</div>
            <div class="immediateExecution" @click="jump(detailInfo.notebook_link)">
              <img :src="images.action" alt=""/>
              立即执行
            </div>
          </div>
          <div class="relevantPapers" v-if="detailInfo.papers">
            <div class="title">相关论文</div>
            <template v-if="detailInfo.papers.length > 0">
              <div class="relevantPapersText" @click="jump(detailInfo.papers[0].doi)">
                {{ detailInfo.papers[0].title }}
              </div>
            </template>
            <template v-if="detailInfo.papers.length > 1">
              <div class="relevantPapersText" @click="jump(detailInfo.papers[1].doi)">
                {{ detailInfo.papers[1].title }}
              </div>
            </template>
          </div>
          <div class="scientificMission">
            <div class="title">类似科学任务</div>
            <div
                class="scientificMissionBox"
                v-for="(item, index) in likenessList"
                :key="index"
                @click="loadScience(item.id)"
            >
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
import images from "@/utils/js/exportImage";
import {collectScience, getRelatedScienceList, getScienceDetail, getUserInfo, recordHistory} from "@/api/api";

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
      if(id) {
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
      if(result) {
        this.isCollected = result.favorite_tasks && result.favorite_tasks.indexOf(Number(this.id)) !== -1
      }
    },
    async _getDetail() {
      this.detailInfo = {}
      this.detailInfo = await getScienceDetail(this.id)
    },
    async bindCollect() {
      const result = await collectScience(this.id)
      if(result) {
        if(!this.isCollected) {
          this.isCollected = true
          this.$notify.success('收藏成功')
        } else {
          this.isCollected = false
          this.$notify.success('取消收藏成功')
        }
      }
    },
    jump(link) {
      if(link.startsWith("http")) {
        window.open(link);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.scientificMissionDetail {
  width: 1440px;
  margin-top: 20px;
  background: #fafafa;
  margin: 0 auto;

  .content {
    padding: 40px 80px;

    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e1e2e6;
      padding-bottom: 8px;

      .title {
        color: #587dff;

        .renwu {
          cursor: pointer;
        }
      }

      .btns {
        display: flex;

        .btnsImg {
          width: 20px;
          height: 20px;
          margin-right: 22px;
          cursor: pointer;
        }

        .back {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #587dff;

          .backImg {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }
      }
    }

    .body {
      display: flex;
      padding-top: 48px;

      .bodyLeft {
        width: 840px;
        margin-right: 80px;

        .title {
          font-weight: bold;
          font-size: 32px;
          color: #262626;
        }

        .tag {
          display: flex;
          font-size: 12px;
          margin-top: 24px;

          .type {
            background: #587dff;
            border-radius: 14px 14px 14px 14px;
            color: #ffffff;
            padding: 2px 8px;
            margin-right: 5px;
          }

          .algorithm {
            background: #ffffff;
            border: 1px solid #587dff;
            border-radius: 14px 14px 14px 14px;
            color: #587dff;
            padding: 2px 8px;
          }
        }

        .text {
          margin-top: 20px;
          line-height: 25px;
          color: #262626;
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
      }

      .bodyRight {
        width: 360px;

        .title {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
        }

        .tryOnline {
          width: 360px;
          height: 100px;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;

          .immediateExecution {
            width: 320px;
            height: 36px;
            background: #587dff;
            border-radius: 8px 8px 8px 8px;
            opacity: 0.8;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-top: 6px;
            cursor: pointer;

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

          .relevantPapersText {
            cursor: pointer;
            width: 320px;
            height: 60px;
            background: #f2f7ff;
            border-radius: 12px 12px 12px 12px;
            padding: 12px 15px;
            font-size: 14px;
            line-height: 20px;
            margin-top: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
          }
        }

        .scientificMission {
          margin-top: 24px;
          width: 360px;
          height: 418px;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;

          .scientificMissionBox {
            margin-top: 12px;
            padding: 6px;
            display: flex;
            align-items: center;
            background: #f2f7ff;
            border-radius: 12px 12px 12px 12px;
            cursor: pointer;

            img {
              width: 48px;
              height: 48px;
              margin-right: 15px;
            }

            .text {
              font-weight: 500;
              font-size: 14px;
              color: #262626;
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
