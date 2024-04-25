<template>
  <div class="scientificMissionMore">
    <div class="scientificMissionMoreHeader">
      <div style="width: 1200px; margin: 0 auto">
        <div class="title">{{ categoryName }}</div>
        <div class="msg">{{ subjectIntro }}</div>
      </div>
    </div>
    <div class="body">
      <div style="width: 1280px; margin: 0 auto">
        <div class="bodyItem">
          <div class="header">
            <div class="title">{{ scienceList.name }}</div>
            <div
                class="more"
                @click="$router.push({ path: '/scientificMission' })"
            >
              折叠
              <img :src="images.moreRight" alt=""/>
            </div>
          </div>
          <div class="content">
            <div
                class="contentItem"
                v-for="(item, index) in scienceList.childList"
                :key="index"
                @click="jumpDetail(item.id)"
            >
              <div class="img">
                <img :src="item.image" alt=""/>
              </div>
              <div class="boxBody">
                <div class="title">{{ item.title }}</div>
                <div class="msg">{{ item.short_description }}</div>
                <div class="tag">
                  <div class="type">{{ item.domain ? item.domain.name : ''  }}</div>
                  <div class="algorithm">{{ item.contributor }}</div>
                </div>
              </div>
            </div>
            <!--  css 样式补位           -->
            <div v-if="scienceList.childList && scienceList.childList.length > 1 && scienceList.childList.length % 4 !== 0" class="contentItem"
                 v-for="count of 4 - scienceList.childList.length % 4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {getScienceDomainIntro, getScienceListByCategory} from "@/api/api";

export default {
  data() {
    return {
      images: images,
      scienceList: {
        childList: []
      },
      categoryName: '',
      domainInfoList: []
    };
  },
  computed: {
    subjectIntro() {
      const findItem = this.domainInfoList.find(item => item.name === this.categoryName)
      return findItem ? findItem.intro : ''
    }
  },
  activated() {
    this.categoryName = this.$route.params.name
    this._getMoreInfo()
    this._getDomainList()
  },
  components: {},
  methods: {
    async _getMoreInfo() {
      const list = await getScienceListByCategory({domain: this.categoryName})
      const scienceList = {
        name: list[0].domain.name,
        flag: true,
        childList: list
      }
      this.scienceList = scienceList
    },
    async _getDomainList() {
      this.domainInfoList = await getScienceDomainIntro()
    },
    jumpDetail(id) {
      this.$router.push({path: `/scientificMissionDetail/${id}`});
    },
  },
};
</script>

<style lang="scss" scoped>
.scientificMissionMore {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;

  .scientificMissionMoreHeader {
    width: 100%;
    margin: 0 auto;
    height: 250px;
    background: linear-gradient(
            180deg,
            #deeaff 0%,
            #deeaff 18%,
            rgba(222, 234, 255, 0) 100%
    );

    .title {
      font-weight: bold;
      font-size: 40px;
      color: #2954ff;
      text-align: center;
      padding-top: 60px;
    }

    .msg {
      font-weight: 400;
      font-size: 18px;
      color: #262626;
      margin-top: 12px;
    }
  }

  .body {
    width: 1440px;
    margin: 0 auto;
    background: #fafafa;
    margin-top: 40px;

    .bodyItem {
      .header {
        border-bottom: 1px solid #e1e2e6;
        padding-bottom: 2px;
        display: flex;
        justify-content: space-between;

        .title {
          font-weight: bold;
          font-size: 16px;
          color: #262626;
          padding-bottom: 10px;
        }

        .more {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #587dff;
          cursor: pointer;

          img {
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
      border-radius: 16px;
      justify-content: space-between;

      .contentItem {
        width: 290px;
        height: 320px;
        margin: 0 0 30px 0;
        cursor: pointer;

        .img {
          width: 290px;
          height: 160px;
          background: linear-gradient(180deg, #9cb9ff 0%, #deeaff 100%);
          border-radius: 16px 16px 0px 0px;

          img {
            width: 250px;
            height: 139px;
            border-radius: 8px 8px 0px 0px;
            margin: 20px 20px 0 20px;
          }
        }

        .boxBody {
          width: 290px;
          height: 160px;
          padding: 15px 20px;
          background: #fff;
          border-radius: 0px 0px 16px 16px;

          .title {
            font-weight: bold;
            font-size: 16px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
          }

          .msg {
            font-size: 12px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin-top: 8px;
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
        }
      }
    }
  }
}
</style>
