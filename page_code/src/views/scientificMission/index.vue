<template>
  <div class="scientificMission">
    <div class="bannerBg">
      <div class="banner">
        <el-carousel height="400px" ref="nop">
          <el-carousel-item
              v-for="item in carouselData"
              :key="item.id"
              :class="'carousel' + item.id">
            <div class="carouselItem">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="msg">{{ item.msg }}</div>
                <div class="detail" @click="jumpDetail(item.id)">了解详情</div>
              </div>
              <div class="right">
                <img :src="item.img" alt=""/>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div style="height: 80px"></div>
    <div class="screen">
      <div class="scientificField">
        <div class="title">科学领域</div>
        <div class="scientificFieldTag">
          <div
              class="scientificFieldTagItem"
              v-for="(item, index) in tagList"
              :key="index"
              :class="item.flag ? 'choosescientificField' : ''"
              @click="screenScientificField(index)"
          >
            <img :src="images.check" alt="" v-if="item.flag"/>
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="contributingParty">
        <div class="title">贡献方</div>
        <div class="contributingPartyTag">
          <div
              class="contributingPartyTagItem"
              v-for="(item, index) in tagList1"
              :key="index"
              @click="contributeFilterChange(index)"
              :class="item.flag ? 'chooseContributingParty' : ''"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="more" :class="isFilterMore ? 'drop-down' : '' " @click="isFilterMore = !isFilterMore">更多筛选<img :src="images.up" alt=""/></div>
      </div>
      <div class="more-filter" v-if="isFilterMore">
        <div class="more-filter-item" :class="item.select ? 'select' : ''" v-for="(item, index) in moreFilter" @click="moreFilterClick(item)">
          <div class="item-filter-left">
            <img v-if="!item.select" :src="images.btnCircle" alt=""/>
            <img v-if="item.select" :src="images.btnCircleSelect" alt=""/>
          </div>
          <div class="item-filter-right">
            <div class="item-filter-title">{{ item.title }}</div>
            <div class="item-filter-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div style="max-width: 1440px; min-width: 900px; margin: 0 auto">
        <div v-if="item.childList && item.childList.length" class="bodyItem" v-for="(item, index) in screenList" :key="index">
          <div class="header">
            <div class="title">{{ item.name }}</div>
            <div class="more" @click="jump(`/scientificMissionMore/${item.name}`, { name: name })">
              更多
              <img :src="images.moreRight" alt=""/>
            </div>
          </div>
          <div class="content">
            <div
                class="contentItem"
                v-for="(item1, index1) in item.childList"
                v-if="item.flag"
                :key="index1"
                @click="jumpDetail(item1.id)">
              <div class="img">
                <img v-lazy="item1.image" alt=""/>
              </div>
              <div class="boxBody">
                <div class="title">{{ item1.title }}</div>
                <div class="msg">{{ item1.short_description }}</div>
                <div class="tag justify-between">
                  <div class="flex item-center">
                    <div class="type">{{ item1.domain.name }}</div>
                    <div class="algorithm">{{ item1.contributor }}</div>
                  </div>
                  <div class="sci-collect">
                    <span>1298</span>
                    <img :src="images.collectStarSelect" alt="">
                  </div>
                </div>
                <div class="btns">
                  <div class="btnsImg" v-if="item1.notebook_link">
                    <img
                        :src="images.link"
                        alt=""
                        @click.stop="winOpen(item1.notebook_link)"
                    />
                  </div>
                  <div class="btnsImg" v-if="item1.introduction_link">
                    <img
                        :src="images.homeLink"
                        alt=""
                        @click.stop="winOpen(item1.introduction_link)"
                    />
                  </div>
                  <div class="btnsImg" v-if="item1.repository_link">
                    <img
                        :src="images.codeRepository"
                        alt=""
                        @click.stop="winOpen(item1.repository_link)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!--  css 样式补位           -->
            <div v-if="item.childList.length > 1 && item.childList.length % 4 !== 0"  class="contentItem"
                  v-for="count of 4 - item.childList.length % 4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {getScienceList} from "@/api/api";

export default {
  data() {
    return {
      images: images,
      carouselData: [
        {
          id: 90,
          title: "深度学习求解Euler_Beam问题",
          msg: "利用深度学习技术对Euler Beam理论进行模拟，提高工程力学问题的求解效率。",
          img: "https://pic.imgdb.cn/item/6612a2a768eb9357136ce477.png",
        },
        {
          id: 123,
          title: "FourCastNet",
          msg: "基于深度学习的天气预报模型，通过自适应傅里叶神经算子高效预测气象变量，如风速和降水。",
          img: "https://pic.imgdb.cn/item/6612b4c468eb9357138150b6.png",
        },
        {
          id: 129,
          title: "东方.御风",
          msg: "在航空航天领域，通过AI模型优化飞机气动设计，提升飞机性能和环保性。",
          img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbb5a.png",
        },
        {
          id: 168,
          title: "CTEFNet: 基于 CNN 与迁移学习的厄尔尼诺预测模型",
          msg: "CTEFNet结合卷积神经网络和迁移学习，通过时间序列分析提升厄尔尼诺现象的预测时长，为气候变化研究提供高精度的预测工具。。",
          img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbc9f.png",
        },
        {
          id: 169,
          title: "DEM-SRNet: 全球3弧秒（90m）海陆高分辨率数字高程模型",
          msg: "DEM-SRNet应用深度残差网络对地面DEM数据进行预训练，显著提升全球数字高程模型的分辨率，为地理科学研究和环境监测提供更为精确的地形数据。",
          img: "https://pic.imgdb.cn/item/6612d7e168eb935713bd2d60.png",
        },
        {
          id: 172,
          title: "Phiflow playground - Kolmogorov流模拟",
          msg: "应用PhiFlow流体库对Kolmogorov流进行仿真，用户可以通过上传的方式指定初始压力场",
          img: "https://pic.imgdb.cn/item/6612dbd768eb935713c2cc1c.png",
        },
      ],
      moreFilter: [
        {title: '有代码仓库', desc: '提供模型源代码，可在本地运行', select: false, id: 1, key: 'notebook_link'},
        {title: '可在线运行', desc: '可以直接在浏览器中进行模型推理', select: false, id: 2, key: 'introduction_link'},
        {title: '可在线修改', desc: '可以直接在浏览器中编辑代码，训练模型', select: false, id: 3, key: 'repository_link'},
      ],
      isFilterMore: false,
      scienceList: [],
      tagList: [],
      tagList1: [],
      contributingPartyIndex: 0,
    };
  },
  computed: {
    screenList() {
      const arr = this.tagList.filter((item) => item.flag).map(item => item.id);
      const contributeTagList = this.tagList1.filter((item) => item.flag).map(item => item.name)
      const remainScList = JSON.parse(JSON.stringify(this.scienceList.filter(item => arr.includes(item.id))))
      const moreFilterList = this.moreFilter.filter(item=> item.select).map(item=> item.key)
      if(moreFilterList.length) {
        remainScList.forEach(item => {
          item.childList = item.childList.filter(inner => {
            let flag = contributeTagList.includes(inner.contributor)
            for(let keyItem of moreFilterList) {
              flag = flag &&  inner[keyItem]
            }
            return flag
          })
        })
      } else {
        remainScList.forEach(item => {
          item.childList = item.childList.filter(inner => contributeTagList.includes(inner.contributor))
        })
      }
      return remainScList
    },
  },
  created() {
    this._getScienceList()
  },
  components: {},
  methods: {
    async _getScienceList() {
      const scList = await getScienceList()
      const scienceCaSet = new Set();
      const contributeSet = new Set()
      scList.forEach((item) => {
        item.contrubutorFlag = true;
        scienceCaSet.add(item.domain.name);
        contributeSet.add(item.contributor);
      });

      const scienceList = []
      const tagList1 = []
      Array.from(scienceCaSet).forEach((item, index) => {
        scienceList.push({
          name: item,
          id: index,
          flag: true
        })
      })
      Array.from(contributeSet).forEach((item, index) => {
        tagList1.push({
          name: item,
          flag: true
        })
      })
      this.tagList1 = tagList1
      this.tagList = JSON.parse(JSON.stringify(scienceList))
      scienceList.forEach(item => {
        item.childList = scList.filter(j => j.domain.name === item.name)
      })
      this.scienceList = scienceList
    },
    contributeFilterChange(index) {
      const temp = this.tagList1[index];
      temp.flag = !temp.flag;
      this.$set(this.tagList1, index, temp);
    },
    moreFilterClick(item) {
      let flag = !item.select
      this.$set(item, 'select', flag)

    },
    screenScientificField(index) {
      // const curFlag = item.flag
      // let index = this.scienceList.findIndex(inner => inner.name === item.name);
      // const flagItem = this.scienceList[index];
      // flagItem.flag === !curFlag;
      // this.$set(this.scienceList, index, flagItem);
      const temp = this.tagList[index];
      temp.flag = !temp.flag;
      this.$set(this.tagList, index, temp);
    },
    jump(jumpPath, data) {
      this.$router.push({path: jumpPath, query: data});
    },
    jumpDetail(id) {
      this.$router.push({path: `/scientificMissionDetail/${id}`});
    },
    winOpen(link) {
      window.open(link)
    },
    screenChildList(list) {
      let arr = [];
      this.tagList1
          .filter((item) => item.flag)
          .map((item) => {
            arr.push(item.name);
          });
      let listArr = [];
      list.map((item) => {
        if(arr.includes(item.contributor)) {
          listArr.push(item);
        }
      });
      return listArr;
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
    background: #fff;
    border-radius: 10px;
  }
}

.scientificMission {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;

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
    // padding: 0 40px;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
  }

  .carouselItem {
    width: 1280px;
    height: 400px;
    padding: 40px 60px;
    display: flex;
    background: linear-gradient(135deg, #587dff 0%, #9d2eff 100%);

    .right {
      width: 400px;

      img {
        width: 400px;
        height: 280px;
        border-radius: 12px 12px 12px 12px;
      }
    }

    .left {
      width: 680px;
      margin-right: 80px;
      position: relative;

      .title {
        font-weight: bold;
        font-size: 40px;
        color: #ffffff;
        margin-top: 30px;
      }

      .msg {
        font-size: 16px;
        color: #ffffff;
        margin-top: 10px;
      }

      .detail {
        width: 80px;
        background: #ffffff;
        border-radius: 14px 14px 14px 14px;
        font-size: 12px;
        color: #2954ff;
        padding: 5px 0;
        text-align: center;
        position: absolute;
        bottom: 0;
        cursor: pointer;
      }
    }
  }

  .screen {
    width: 1280px;
    background: #ffffff;
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
    margin: 0 auto;
    padding: 24px;
    position: relative;
    transition: height .5s ease;
    .scientificField {
      .scientificFieldTag {
        margin-top: 12px;
        display: flex;

        .scientificFieldTagItem {
          font-size: 14px;
          color: #262626;
          background: #f1f2f5;
          padding: 4px 12px;
          border-radius: 14px 14px 14px 14px;
          margin-right: 15px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }

        .choosescientificField {
          background: #587dff;
          color: #fff;
        }
      }
    }

    .contributingParty {
      margin-top: 20px;
      position: relative;
      .contributingPartyTag {
        margin-top: 12px;
        display: flex;

        .contributingPartyTagItem {
          font-size: 14px;
          color: #262626;
          background: #f1f2f5;
          padding: 4px 12px;
          border-radius: 14px 14px 14px 14px;
          margin-right: 15px;
          cursor: pointer;
        }

        .chooseContributingParty {
          border: 1px solid #587dff;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          color: #587dff;
        }
      }
    }


    .more {
      background: #deeaff;
      border-radius: 14px 14px 14px 14px;
      padding: 7px 0;
      font-size: 12px;
      color: #2954ff;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      position: absolute;
      right: 24px;
      bottom: 0;
      cursor: pointer;
      &.drop-down {
        img {
          transform: rotate(180deg);
        }
      }
      img {
        transition: all 0.5s ease;
        width: 16px;
        height: 16px;
      }
    }
  }
  .more-filter {
    display: flex;
    margin-top: 16px;
    .more-filter-item {
      height: 46px;
      background: #F1F2F5;
      border-radius: 8px 8px 8px 8px;
      font-family: Helvetica Neue, Helvetica Neue;
      font-weight: 400;
      font-size: 12px;
      color: #262626;
      text-align: left;
      display: flex;
      padding: 4px 18px 4px 6px;
      margin-right: 16px;
      cursor: pointer;
      &.select {
        border: 1px solid #587DFF;
      }
      .item-filter-left {
        margin-right: 3px;
        img {
          transform: translateY(2px);
          width: 16px;
          height: 16px;
        }
      }
      .item-filter-right {
        .item-filter-title {
          width: 70px;
          height: 20px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 400;
          font-size: 14px;
          color: #262626;
          font-style: normal;
          text-transform: none;
        }
        .item-filter-desc {
          height: 17px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 400;
          font-size: 12px;
          color: rgba(38, 38, 38, 0.6);
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }
  .body {
    width: 1280px;
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
          font-size: 28px;
          color: #2954ff;
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
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);

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
          .justify-between {
            justify-content: space-between;
          }
          .tag {
            display: flex;
            font-size: 12px;
            margin-top: 8px;

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
            .sci-collect {
              display: flex;
              align-items: center;
              span {
                font-family: Helvetica Neue, Helvetica Neue;
                font-size: 12px;
                color: rgba(38, 38, 38, 0.4);
              }
              img {
                width: 20px;
                height: 20px;
              }
            }
          }

          .btns {
            display: flex;
            margin-top: 10px;

            .btnsImg {
              width: 28px;
              height: 28px;
              margin-right: 10px;
              background: rgba(222, 234, 255, 0.6);
              border-radius: 8px 8px 8px 8px;
              cursor: pointer;
              text-align: center;

              img {
                width: 20px;
                height: 20px;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
