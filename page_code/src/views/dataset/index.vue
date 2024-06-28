<template>
  <div class="buaa-data">
    <div class="bannerBg"></div>
    <div style="z-index: 2; position: relative;">
      <h2>数据集</h2>
      <div class="summarize-wrapper">
        <div class="summarize-item" v-for="(item, index) in datasetList"
             :key="index">
          <div class="sum-title">{{ item.title }}</div>
          <div class="sum-num">{{ item.num }}</div>
        </div>
      </div>
      <div class="dataset-content">
        <div
            class="contentItem"
            v-for="(item, index1) in dataList"
            :key="index1"
            @click="jumpDetail(item.id)">
          <div class="img">
            <img v-lazy="item.dataset_pic" alt=""/>
          </div>
          <div class="boxBody">
            <div class="title">{{ item.dataset_title }}</div>
            <div class="tag">
              <div class="type">{{ item.type_name }}</div>
              <div class="algorithm" v-if="item.labels">{{ item.labels }}</div>
            </div>
            <div class="dataset-amount">
              <div class="dataset-amount-item">
                <img :src="images.dataset_icon" alt="">
                <span>数据量</span>
                <span class="num">{{ formatNum(item.num) }}</span>
              </div>
            </div>
            <div class="btns clearfix">
              <div class="btnsImg eye">
                <img :src="images.eye" alt=""/>
                <span>{{ item.total_read }}</span>
              </div>
              <div class="btnsImg">
                <img :src="images.download" alt=""/>
                <span>{{ item.total_download }}</span>
              </div>
              <div class="btnsImg collect-right">
                <span>{{ item.total_favorites }}</span>
                <img :src="images.collected" alt=""/>
              </div>
            </div>
            <div class="group-wrapper">
              <img :src="images.iconCommunity" alt="">
              <div class="intro">
                <p>{{ item.owner_user_name }}</p>
                <p>{{ timeConvert(item.update_time) }}</p>
              </div>
            </div>
          </div>
        </div>
        <!--  css 样式补位           -->
        <div v-if="dataList.length > 1 && dataList.length % 4 !== 0" class="contentItem"
             v-for="count of 4 - dataList.length % 4"></div>
      </div>
    </div>

  </div>
</template>

<script>
import {getDatasetList} from "@/api/api";
import images from "@/utils/js/exportImage";

export default {
  name: "index",
  data() {
    return {
      images,
      datasetList: [
        {title: '社区用户', num: 104705},
        {title: '科学数据', num: 2543795},
        {title: '科学任务', num: 86},
        {title: '任务小组', num: 86},
        {title: '数据总量', num: '254w+'},
        {title: '公共数据集', num: 86},
      ],
      dataList: []
    }
  },
  mounted() {
    this._getDatasetList()
  },
  methods: {
    async _getDatasetList() {
      let result = await getDatasetList()
      this.dataList = result
    },
    formatNum(num) {
      if(num >= 10000) {
        return (num / 10000).toFixed(1) + '万+'
      }
      return num
    },
    jumpDetail(id) {
      window.open('http://aisccc.cn/database/data-details?id=' + id)
    },
    timeConvert(time) {
      const now = time ? new Date(time) : new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      var minute1 = ''
      var second1 = ''
      if(minute < 10) {
        minute1 = "0" + minute
      } else {
        minute1 = minute
      }
      if(second < 10) {
        second1 = "0" + second
      } else {
        second1 = second
      }
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute1 + ':' + second1
    }
  }
}
</script>

<style scoped lang="scss">
.buaa-data {
  width: 1280px;
  margin: 0 auto;

  .bannerBg {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    height: 600px;
    background: linear-gradient(180deg, #DEEAFF 0%, #DEEAFF 18%, rgba(222, 234, 255, 0) 100%);
    margin: 0 auto;

    z-index: 1;
  }

  h2 {
    font-family: Helvetica Neue, Helvetica Neue;
    font-weight: bold;
    font-size: 28px;
    color: #262626;
    height: 88px;
    line-height: 88px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .summarize-wrapper {
    width: 100%;
    height: 120px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .summarize-item {
      text-align: center;
      flex: 1;
      height: 64px;
      border-right: 1px solid #E1E2E6;

      .sum-title {
        font-weight: 500;
        font-size: 16px;
        color: rgba(38, 38, 38, 0.8);
      }

      .sum-num {
        margin-top: 6px;
        width: 210px;
        height: 38px;
        font-weight: 500;
        font-size: 32px;
        color: rgba(38, 38, 38, 0.8);
      }
    }
  }

  .dataset-content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    border-radius: 16px;
    justify-content: space-between;

    .contentItem {
      width: 296px;
      margin: 0 0 30px 0;
      cursor: pointer;

      &:hover {
        .img {
          background: linear-gradient(180deg, #587DFF 0%, #9D2EFF 100%);
        }
      }

      .img {
        width: 296px;
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
        width: 296px;
        padding-top: 13px;
        background: #fff;
        border-radius: 0px 0px 16px 16px;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);

        .title {
          padding: 0 20px;
          font-weight: bold;
          font-size: 16px;
          color: #262626;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          line-height: 24px;
        }

        .msg {
          padding: 0 20px;
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
          margin-top: 12px;
          padding: 0 20px;

          .type {
            background: rgba(88, 125, 255, 0.8);
            border-radius: 14px 14px 14px 14px;
            color: #ffffff;
            padding: 2px 9px;
            margin-right: 5px;
          }

          .algorithm {
            background: #ffffff;
            border: 1px solid rgba(88, 125, 255, 0.8);
            border-radius: 14px 14px 14px 14px;
            color: rgba(88, 125, 255, 0.8);
            padding: 2px 9px;
          }
        }

        .dataset-amount {
          display: flex;
          margin-top: 30px;
          padding: 0 20px;

          .dataset-amount-item {
            padding: 6px 12px;
            height: 32px;
            background: #DEEAFF;
            border-radius: 8px 8px 8px 8px;
            opacity: 0.8;
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            color: #2954FF;

            img {
              width: 20px;
              height: 20px;
              margin-right: 6px;
            }

            .num {
              font-family: Helvetica Neue, Helvetica Neue;
              font-weight: bold;
              font-size: 14px;
              color: #2954FF;
              margin-left: 4px;
            }
          }
        }

        .btns {
          margin-top: 10px;
          opacity: 0.6;
          padding: 0 20px;

          .btnsImg {
            float: left;
            display: flex;
            align-items: center;
            height: 28px;
            margin-right: 10px;
            cursor: pointer;
            text-align: center;

            &.collect-right {
              float: right;

              img {
                margin-right: 0;
                margin-left: 4px;
              }
            }

            img {
              width: 18px;
              height: 18px;
              margin-right: 4px;
            }

            .eye {
              width: 24px;
              height: 24px;
            }

            span {
              color: #262626;
              font-size: 14px;
            }
          }
        }

        .group-wrapper {
          display: flex;
          height: 56px;
          color: rgba(38, 38, 38, 0.6);
          padding: 10px 20px;
          font-size: 12px;
          background-color: #FAFAFA;

          .intro {
            line-height: 20px;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
