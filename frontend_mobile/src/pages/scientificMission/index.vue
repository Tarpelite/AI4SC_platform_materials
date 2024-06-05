<template>
  <div class="scientificMission">
    <div class="bannerBg"></div>
    <div class="banner clearfix">
      <swiper :options="swiperOption" ref="mySwiper" class="buaa-swiper index-banner">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in carouselData" class="buua-swiper-slide cursor">
          <div class="carouselItem">
            <div>
              <div class="title">{{ item.title }}</div>
              <div class="msg">{{ item.title }}</div>
            </div>
            <div class="relative">
              <img v-lazy="item.img" alt=""/>
              <div class="detail buaa-swiper-link" @click="jumpDetail(item)">了解详情</div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="screen">
      <div class="scientificField">
        <div class="title">科学领域</div>
        <div class="scientificFieldTag">
          <div class="scientificFieldTagItem" v-for="(item, index) in tagList" :key="index" :class="item.flag ? 'choosescientificField' : ''" @click="screenScientificField(index)">
            <img :src="images.check" alt="" v-if="item.flag"/> {{ item.name }}
          </div>
        </div>
      </div>
      <div class="contributingParty">
        <div class="title">贡献方</div>
        <div class="contributingPartyTag">
          <div class="contributingPartyTagItem" v-for="(item, index) in tagList1" :key="index" @click="contributeFilterChange(index)" :class="item.flag ? 'chooseContributingParty' : ''">
            {{ item.name }}
          </div>
        </div>
      </div>
      <!--      <div class="more">更多筛选<img :src="images.up" alt=""/></div>-->
    </div>
    <div class="body">
      <div v-if="item.childList && item.childList.length" class="bodyItem" v-for="(item, index) in screenList" :key="index">
        <div class="header">
          <div class="title">{{ item.name }}</div>
          <div class="more" @click="jump(`/scientificMissionMore/${item.name}`, { name: name })">
            更多 <img :src="images.moreRight" alt=""/>
          </div>
        </div>
        <div class="content">
          <div class="contentItem" v-for="(item1, index1) in item.childList" v-if="item.flag" :key="index1" @click="jumpDetail(item1.id)">
            <div class="img">
              <img v-lazy="item1.image" alt=""/>
            </div>
            <div class="boxBody">
              <div class="title">{{ item1.title }}</div>
              <div class="msg">{{ item1.short_description }}</div>
              <div class="tag">
                <div class="type">{{ item1.domain.name }}</div>
                <div class="algorithm">{{ item1.contributor }}</div>
              </div>
              <div class="btns">
                <div class="btnsImg" v-if="item1.notebook_link">
                  <img :src="images.link" alt="" @click.stop="winOpen(item1.notebook_link)"/>
                </div>
                <div class="btnsImg" v-if="item1.introduction_link">
                  <img :src="images.homeLink" alt="" @click.stop="winOpen(item1.introduction_link)"/>
                </div>
                <div class="btnsImg" v-if="item1.repository_link">
                  <img :src="images.codeRepository" alt="" @click.stop="winOpen(item1.repository_link)"/>
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
import images from '@/utils/exportImage';
import { getScienceList } from '@/api/api';

export default {
  data() {
    return {
      swiperOption: {
        // swiper options 所有的配置同swiper官方api配置
        // autoplay: 3000,
        slidesPerView: 1,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        onClick: (e, el) => {
          if (el.srcElement.classList.contains('buaa-swiper-link')) {
            this.jump(this.carouselData[e.clickedIndex])
          }
        }
      },
      images: images,
      carouselData: [
        {
          id: 90,
          title: '深度学习求解Euler_Beam问题',
          msg: '利用深度学习技术对Euler Beam理论进行模拟，提高工程力学问题的求解效率。',
          img: 'https://cnai4s.com/media/science_tasks_images/media/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E6%B1%82%E8%A7%A3Euler_Beam%E9%97%AE%E9%A2%98_FWQcYrj.jpg'
        },
        {
          id: 123,
          title: 'FourCastNet',
          msg: '基于深度学习的天气预报模型，通过自适应傅里叶神经算子高效预测气象变量，如风速和降水。',
          img: 'https://cnai4s.com/media/science_tasks_images/media/FourCastNet_GArmFvp.jpg'
        },
        {
          id: 129,
          title: '东方.御风',
          msg: '在航空航天领域，通过AI模型优化飞机气动设计，提升飞机性能和环保性。',
          img: 'https://cnai4s.com/media/science_tasks_images/media/%E4%B8%9C%E6%96%B9.%E5%BE%A1%E9%A3%8E_cSsh1ez.jpg'
        },
        {
          id: 168,
          title: 'CTEFNet: 基于 CNN 与迁移学习的厄尔尼诺预测模型',
          msg: 'CTEFNet结合卷积神经网络和迁移学习，通过时间序列分析提升厄尔尼诺现象的预测时长，为气候变化研究提供高精度的预测工具。。',
          img: 'https://cnai4s.com/media/science_tasks_images/media/CTEFNet_%E5%9F%BA%E4%BA%8E_CNN_%E4%B8%8E%E8%BF%81%E7%A7%BB%E5%AD%A6%E4%B9%A0%E7%9A%84%E5%8E%84%E5%B0%94%E5%B0%BC%E8%AF%BA%E9%A2%84%E6%B5%8B%E6%A8%A1%E5%9E%8B_4zStDzF.jpg'
        },
        {
          id: 169,
          title: 'DEM-SRNet: 全球3弧秒（90m）海陆高分辨率数字高程模型',
          msg: 'DEM-SRNet应用深度残差网络对地面DEM数据进行预训练，显著提升全球数字高程模型的分辨率，为地理科学研究和环境监测提供更为精确的地形数据。',
          img: 'https://cnai4s.com/media/science_tasks_images/media/DEM-SRNet_%E5%85%A8%E7%90%833%E5%BC%A7%E7%A7%9290m%E6%B5%B7%E9%99%86%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87%E6%95%B0%E5%AD%97%E9%AB%98%E7%A8%8B%E6%A8%A1%E5%9E%8B_8JGHw8X.jpg'
        },
        {
          id: 172,
          title: 'Phiflow playground - Kolmogorov流模拟',
          msg: '应用PhiFlow流体库对Kolmogorov流进行仿真，用户可以通过上传的方式指定初始压力场',
          img: 'https://cnai4s.com/media/science_tasks_images/media/Phiflow_playground_-_Kolmogorov%E6%B5%81%E6%A8%A1%E6%8B%9F_Aka7pPe.jpg'
        }
      ],
      scienceList: [],
      tagList: [],
      tagList1: [],
      contributingPartyIndex: 0
    };
  },
  computed: {
    screenList() {
      const arr = this.tagList.filter((item) => item.flag).map(item => item.id);
      const contributeTagList = this.tagList1.filter((item) => item.flag).map(item => item.name)
      const remainScList = JSON.parse(JSON.stringify(this.scienceList.filter(item => arr.includes(item.id))))
      remainScList.forEach(item => {
        item.childList = item.childList.filter(inner => contributeTagList.includes(inner.contributor)).slice(0, 8)
      })
      return remainScList
    }
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
      this.$router.push({ path: jumpPath, query: data });
    },
    jumpDetail(id) {
      this.$router.push({ path: `/scientificMissionDetail/${ id }` });
    },
    winOpen(link) {
      window.open(link)
    },
    screenChildList(list) {
      let arr = [];
      this.tagList1.filter((item) => item.flag).map((item) => {
        arr.push(item.name);
      });
      let listArr = [];
      list.map((item) => {
        if (arr.includes(item.contributor)) {
          listArr.push(item);
        }
      });
      return listArr;
    }
  }
};
</script>

<style lang="scss">

.scientificMission {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;
  padding: 0 16px;
  .buaa-swiper {
    .swiper-pagination {
      .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.3);
      }

      .swiper-pagination-bullet-active {
        background: #fff;
      }
    }
  }
  .index-banner {
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px;
    background: linear-gradient(180deg, #DEEAFF 0%, #DEEAFF 18%, rgba(250, 250, 250, 1) 100%);
  }
  .carouselItem {
    width: 356px;
    height: 350px;
    margin: 0 auto;
    position: relative;
    padding: 20px 16px;
    background: linear-gradient(135deg, #587DFF 0%, #9D2EFF 100%);
    border-radius: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      width: 326px;
      font-weight: bold;
      font-size: 20px;
      color: #fff;
      line-height: 26px;
      margin-bottom: 12px;
    }

    .msg {
      width: 326px;
      font-weight: 500;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      line-height: 18px;
      font-style: normal;
      text-transform: none;
      margin-bottom: 30px;
    }

    .detail {
      width: 80px;
      height: 26px;
      background: #587DFF;
      border-radius: 14px;
      font-weight: 400;
      font-size: 12px;
      color: #FFFFFF;
      line-height: 26px;
      font-style: normal;
      text-align: center;
      text-transform: none;
      position: absolute;
      left: 123px;
      bottom: 30px;
    }

    img {
      width: 326px;
      height: 180px;
      border-radius: 8px;
    }
  }
  .banner {
    position: relative;
    z-index: 2;
    width: 356px;
    height: 390px;
    box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    margin-bottom: 40px;
  }
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
  .screen {
    width: 356px;
    height: 198px;
    background: #ffffff;
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    padding: 12px 12px;
    position: relative;
    z-index: 2;

    .scientificField {
      .title {
        width: 60px;
        font-weight: bold;
        font-size: 14px;
        line-height: 26px;
        margin-bottom: 8px;
      }

      .scientificFieldTag {
        margin-top: 12px;
        display: flex;
        flex-wrap: wrap;

        .scientificFieldTagItem {
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          color: #262626;
          background: #f1f2f5;
          padding: 0 6px;
          border-radius: 14px;
          margin: 0 5px 6px 0;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;

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
      margin-top: 14px;

      .title {
        width: 60px;
        font-weight: bold;
        font-size: 14px;
        line-height: 26px;
        margin-bottom: 8px;
      }

      .contributingPartyTag {
        margin-top: 12px;
        display: flex;

        .contributingPartyTagItem {
          font-size: 14px;
          color: #262626;
          background: #f1f2f5;
          padding: 0 6px;
          border-radius: 14px;
          margin-right: 8px;
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
      bottom: 24px;
      cursor: pointer;

      img {
        width: 16px;
        height: 16px;
      }
    }
  }

  .body {
    width: 356px;
    margin-top: 40px;
    position: relative;
    z-index: 2;

    .bodyItem {
      .header {
        border-bottom: 1px solid #e1e2e6;
        padding-bottom: 2px;
        display: flex;
        justify-content: space-between;

        .title {
          font-weight: bold;
          font-size: 20px;
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
        width: 171px;
        height: 258px;
        margin-bottom: 16px;
        .img {
          width: 171px;
          height: 108px;
          background: linear-gradient(180deg, #9cb9ff 0%, #deeaff 100%);
          border-radius: 12px 12px 0px 0px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          img {
            width: 155px;
            height: 99px;
            border-radius: 4px 4px 0px 0px;
          }
        }

        .boxBody {
          width: 171px;
          height: 150px;
          padding: 12px 8px;
          background: #fff;
          border-radius: 0px 0px 12px 12px;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);

          .title {
            font-weight: bold;
            font-size: 14px;
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
            margin-top: 8px;

            .type {
              background: #587dff;
              border-radius: 14px;
              color: #ffffff;
              padding: 2px 6px;
              margin-right: 5px;
            }

            .algorithm {
              background: #ffffff;
              border: 1px solid #587dff;
              border-radius: 14px;
              color: #587dff;
              padding: 2px 6px;
            }
          }

          .btns {
            display: flex;
            margin-top: 10px;

            .btnsImg {
              width: 24px;
              height: 24px;
              background: rgba(222, 234, 255, 0.6);
              border-radius: 8px 8px 8px 8px;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 8px;
              img {
                width: 18px;
                height: 18px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
