<template>
  <div class="newsNotice">
    <div class="bannerBg">
      <div style="height: 10px"></div>
      <div class="banner">
        <el-carousel height="400px" ref="nop">
          <el-carousel-item
              v-for="item in carouselData"
              :key="item.id"
              :class="'carousel' + item.id"
          >
            <div class="carouselItem">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="msg">{{ item.title }}</div>
                <div class="detail" @click="jumpDetail(item)">了解详情</div>
              </div>
              <div class="right">
                <img v-lazy="item.img" alt=""/>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div style="background: #fafafa">
      <div class="body">
        <div class="box">
          <div class="bodyLeft">
            <div class="tab">
              <div
                  class="tabItem"
                  :class="active == index ? 'active' : ''"
                  v-for="(item, index) in tabList"
                  :key="index"
                  @click="tabClick(item, index)"
              >
                {{ item }}
              </div>
            </div>
            <div class="content">
              <div
                  class="contentItem"
                  v-for="(item, index) in cloneContentList"
                  :key="index"
                  @click="jumpDetail(item)"
              >
                <div class="ItemLeft">
                  <div>
                    <div class="title">{{ item.title }}</div>
                    <div class="msg">{{ item.description }}</div>
                  </div>
                  <div class="bottom">
                    <div class="type">{{ item.category }}</div>
                    <div class="souce">{{ item.source }}</div>
                    <div class="time">{{ item.publishDate }}</div>
                  </div>
                </div>
                <div class="ItemRight">
                  <img v-lazy="item.image" alt=""/>
                </div>
              </div>
            </div>
          </div>
          <div class="bodyRight">
            <div class="header">
              <div>热门动态</div>
              <div class="refresh" @click="changeHotNewsList">
                <img :src="images.refresh" alt=""/>
                换一换
              </div>
            </div>
            <div class="hotNewsBody">
              <div
                  class="hotNewsItem"
                  v-for="(item, index) in hotNewsList"
                  :key="index"
                  @click="jumpDetail(item)"
              >
                <div class="ItemLeft">
                  <img v-lazy="item.image" alt=""/>
                  <div class="ranking">{{ index + 1 }}</div>
                </div>
                <div class="ItemRight">
                  <div class="title">{{ item.title }}</div>
                  <div class="type">{{ item.domain ? item.domain.name : '' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {changeHotNewsList, getNewsHotList, getNewsList} from "@/api/api";
import {formatDate} from "@/utils/date";

export default {
  data() {
    return {
      images: images,
      carouselData: [
        {
          id: 1,
          title: "GPT-4驱动的机器人化学家登Nature，自主设计反应并执行复杂实验",
          msg: "卡内基梅隆大学研究团队创建Coscientist，基于GPT-4的智能代理，可以自主设计并执行化学实验，已发表于《Nature》。",
          img: "https://cnai4s.com/media/news_images/media/GPT-4%E9%A9%B1%E5%8A%A8%E7%9A%84%E6%9C%BA%E5%99%A8%E4%BA%BA%E5%8C%96%E5%AD%A6%E5%AE%B6%E7%99%BBNature%E8%87%AA%E4%B8%BB%E8%AE%BE%E8%AE%A1%E5%8F%8D%E5%BA%94%E5%B9%B6%E6%89%A7%E8%A1%8C%E5%A4%8D%E6%9D%82%E5%AE%9E%E9%AA%8C_2tGsikN.jpg",
        },
        {
          id: 2,
          title: "北京航空航天大学举办首届“人工智能科学计算学术研讨会”",
          msg: "北航联合其他八家单位举办首届“人工智能科学计算研讨会”。会议提议成立科学智算研究联盟，促进人工智能与科学深度结合，加速科学发现与技术创新。",
          img: "https://cnai4s.com/media/news_images/media/%E5%8C%97%E4%BA%AC%E8%88%AA%E7%A9%BA%E8%88%AA%E5%A4%A9%E5%A4%A7%E5%AD%A6%E4%B8%BE%E5%8A%9E%E9%A6%96%E5%B1%8A%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E7%A7%91%E5%AD%A6%E8%AE%A1%E7%AE%97%E5%AD%A6%E6%9C%AF%E7%A0%94%E8%AE%A8%E4%BC%9A_12aq4AW.jpg",
        },
        {
          id: 3,
          title: "首届“大湾区杯”粤港澳 AI for Science科技竞赛颁奖典礼隆重举行",
          msg: "首届“大湾区杯”粤港澳AI for Science科技竞赛于2023年11月18日在广东韶关举行，此次大赛共有近千名青年学子参与，最终产生80支获奖队伍。大赛旨在推动AI技术在科研领域的应用与发展。",
          img: "https://cnai4s.com/media/news_images/media/%E9%A6%96%E5%B1%8A%E5%A4%A7%E6%B9%BE%E5%8C%BA%E6%9D%AF%E7%B2%A4%E6%B8%AF%E6%BE%B3_AI_for_Science%E7%A7%91%E6%8A%80%E7%AB%9E%E8%B5%9B%E9%A2%81%E5%A5%96%E5%85%B8%E7%A4%BC%E9%9A%86%E9%87%8D%E4%B8%BE%E8%A1%8C_l4hg4hn.jpg",
        },
      ],
      tabList: [],
      active: 0,
      contentList: [],
      hotNewsList: [],
      cloneContentList: []
    };
  },
  created() {
    this._getNewsList()
    this._getHotList()
  },
  methods: {
    async _getNewsList() {
      const newsList = await getNewsList()
      let arr = ["推荐"];
      newsList.map((item) => {
        arr.push(item.category);
      });
      newsList.forEach(item => {
        item.publishDate = item.publish_date ? formatDate(new Date(item.publish_date), 'yyyy-MM-dd') : item.publish_date
      })
      this.tabList = Array.from(new Set(arr));
      this.contentList = newsList;
      this.cloneContentList = newsList.filter(item=> item.is_recommended);;
    },
    async _getHotList() {
      this.hotNewsList = await getNewsHotList()
    },
    async changeHotNewsList() {
      this.hotNewsList =  await changeHotNewsList()
    },
    jump(jumpPath) {
      this.$router.push({path: jumpPath});
    },
    jumpDetail(item) {
      this.$router.push({path: `/newsNoticeDetail/${item.id}`});
    },
    tabClick(tag, index) {
      console.log('tag', tag)
      this.active = index;
      if(tag == "推荐") {
        this.cloneContentList = this.contentList.filter(item=> item.is_recommended);
      } else {
        this.cloneContentList = [];
        this.cloneContentList = this.contentList.filter(
            (item) => item.category == tag
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__indicators--horizontal {
  position: absolute;
  bottom: 5px;
  text-align: right;

  .el-carousel__indicator--horizontal button {
    width: 20px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .el-carousel__indicator--horizontal.is-active button {
    width: 60px;
    height: 4px;
    background: rgba(41, 84, 255, 1);
    border-radius: 10px;
  }
}

.newsNotice {
  height: 100%;
  margin-top: 20px;

  .bannerBg {
    padding: 0 40px 20px 40px;
    background: linear-gradient(
            180deg,
            #deeaff 0%,
            #deeaff 18%,
            rgba(250, 250, 250, 1) 100%
    );
    margin: 0 auto;
  }

  .banner {
    width: 1280px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
  }

  .carouselItem {
    width: 1280px;
    height: 400px;
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;

    .right {
      width: 400px;

      img {
        width: 400px;
        height: 280px;
      }
    }

    .left {
      width: 680px;
      margin-right: 80px;
      position: relative;

      .title {
        font-weight: bold;
        font-size: 40px;
        color: #262626;
        margin-top: 30px;
      }

      .msg {
        font-size: 16px;
        color: #2954ff;
        margin-top: 10px;
      }

      .detail {
        width: 80px;
        background: #587dff;
        border-radius: 14px 14px 14px 14px;
        font-size: 12px;
        color: #ffffff;
        padding: 5px 0;
        text-align: center;
        position: absolute;
        bottom: 0;
        cursor: pointer;
      }
    }
  }

  .body {
    width: 1280px;
    margin: 0 auto;
    padding: 0 40px;

    .box {
      max-width: 1440px;
      min-width: 900px;
      margin: 0 auto;
      display: flex;
      padding-bottom: 20px;

      .bodyLeft {
        max-width: 850px;
        min-width: 650px;

        .tab {
          display: flex;

          .tabItem {
            margin: 0 20px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            color: #000000;
          }

          .active {
            color: #2954ff;
          }
        }

        .content {
          .contentItem {
            cursor: pointer;
            padding: 10px;
            display: flex;
            margin-top: 24px;

            .ItemLeft {
              margin-right: 40px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .title {
                font-weight: 500;
                font-size: 18px;
                color: #262626;
              }

              .msg {
                font-weight: 400;
                font-size: 12px;
                color: #262626;
                margin-top: 8px;
              }

              .bottom {
                display: flex;
                font-size: 14px;

                .type {
                  color: #587dff;
                  margin-right: 15px;
                }

                .souce {
                  margin-right: 10px;
                }
              }
            }

            .ItemRight {
              img {
                width: 240px;
                height: 160px;
                border-radius: 12px 12px 12px 12px;
              }
            }
          }

          .contentItem:hover {
            background: #ffffff;
            box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
            border-radius: 16px 16px 16px 16px;

            .title {
              color: #2954ff;
            }
          }
        }
      }

      .bodyRight {
        max-width: 520px;
        min-width: 400px;
        margin-left: 130px;

        .header {
          display: flex;
          justify-content: space-between;

          .refresh {
            width: 90px;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;
            cursor: pointer;
            img {
              width: 16px;
              height: 16px;
              margin-right: 10px;
            }
          }
        }

        .hotNewsBody {
          .hotNewsItem {
            display: flex;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;

            .ItemLeft {
              position: relative;

              img {
                width: 140px;
                height: 100px;
                border-radius: 8px 8px 8px 8px;
              }

              .ranking {
                width: 20px;
                height: 20px;
                top: 0;
                left: 0;
                position: absolute;
                background: url("@/utils/image/ranking.png");
                background-size: 100% 100%;
                color: #fff;
                text-align: center;
              }
            }

            .ItemRight {
              margin-left: 15px;
              padding: 7px 0;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              .title {
                font-weight: 500;
                font-size: 16px;
                color: #262626;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
              }

              .type {
                font-size: 14px;
                color: #587dff;
              }
            }
          }

          .hotNewsItem:hover {
            background: #ffffff;
            box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
            border-radius: 16px 16px 16px 16px;

            .title {
              color: #2954ff;
            }
          }
        }
      }
    }
  }
}

.tooltipContent {
  img {
    display: block;
    width: 98px;
    height: 98px;
  }
}
</style>
