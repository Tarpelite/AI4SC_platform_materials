<template>
  <div class="scientificMissionMore">
    <div class="bannerBg"></div>
    <div class="scientificMissionMoreHeader">
      <div class="title">{{ categoryName }}</div>
      <div class="msg">{{ subjectIntro }}</div>
    </div>
    <div class="body">
      <div class="bodyItem">
        <div class="header">
          <div class="title">模型列表</div>
          <div class="more" @click="$router.push({ path: '/scientificMission' })">
            折叠 <img :src="images.moreRight" alt=""/>
          </div>
        </div>
        <div class="content">
          <div class="contentItem" v-for="(item, index) in scienceList.childList" :key="index" @click="jumpDetail(item.id)">
            <div class="img">
              <img :src="item.image" alt=""/>
            </div>
            <div class="boxBody">
              <div class="title">{{ item.title }}</div>
              <div class="msg">{{ item.short_description }}</div>
              <div class="tag">
                <div class="type">{{ item.domain ? item.domain.name : '' }}</div>
                <div class="algorithm">{{ item.contributor }}</div>
              </div>
            </div>
          </div>
          <!--  css 样式补位           -->
          <div v-if="scienceList.childList && scienceList.childList.length > 1 && scienceList.childList.length % 4 !== 0" class="contentItem" v-for="count of 4 - scienceList.childList.length % 4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import { getScienceDomainIntro, getScienceListByCategory } from '@/api/api';

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
      const list = await getScienceListByCategory({ domain: this.categoryName })
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
      this.$router.push({ path: `/scientificMissionDetail/${ id }` });
    }
  }
};
</script>

<style lang="scss" scoped>
.scientificMissionMore {
  padding: 0 16px;
  margin-top: 20px;
  background: #fafafa;

  .bannerBg {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    height: 240px;
    background: linear-gradient(180deg, #DEEAFF 0%, #DEEAFF 18%, rgba(250, 250, 250, 1) 100%);
    margin: 0 auto;
    z-index: 1;
  }
  .scientificMissionMoreHeader {
    width: 356px;
    margin: 0 auto;
    position: relative;
    z-index: 3;

    .title {
      font-weight: bold;
      font-size: 24px;
      color: #2954ff;
      text-align: center;
      padding-top: 20px;
    }

    .msg {
      font-weight: 400;
      font-size: 14px;
      color: #262626;
      margin-top: 12px;
    }
  }

  .body {
    width: 356px;
    background: #fafafa;
    margin-top: 40px;

    .bodyItem {
      .header {
        font-size: 16px;
        font-weight: 500;
        height: 40px;
        color: #262626;
        border-bottom: 1px solid #e1e2e6;
        padding-bottom: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 3;
        .title {
          font-weight: bold;
          font-size: 16px;
          color: #262626;
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
            transform: rotateY(180deg);
            margin-left: 7px;
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
      position: relative;
      z-index: 2;
      .contentItem {
        width: 171px;
        margin-bottom: 16px;
        .img {
          width: 171px;
          height: 108px;
          background: linear-gradient(180deg, #9cb9ff 0%, #deeaff 100%);
          border-radius: 16px 16px 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 155px;
            height: 99px;
            border-radius: 8px 8px 0 0;
          }
        }
        .boxBody {
          position: relative;
          z-index: 2;
          width: 171px;
          padding: 12px 8px;
          background: #fff;
          border-radius: 0 0 16px 16px;

          .title {
            width: 160px;
            height: 20px;
            font-weight: bold;
            font-size: 14px;
            color: #262626;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
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
            margin-top: 4px;
          }

          .tag {
            display: flex;
            font-size: 12px;
            margin-top: 22px;

            .type {
              background: #587dff;
              border-radius: 14px 14px 14px 14px;
              color: #fff;
              padding: 2px 8px;
              margin-right: 5px;
            }

            .algorithm {
              background: #fff;
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
