<template>
  <div class="newsNotice" ref="noticePage">
    <div class="banner clearfix">
      <swiper :options="swiperOption" ref="mySwiper" class="buaa-swiper index-banner">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in carouselData" class="buua-swiper-slide cursor">
          <div class="carouselItem">
            <div class="title">{{ item.title }}</div>
            <div class="msg">{{ item.title }}</div>
            <div class="relative">
              <img v-lazy="item.img" alt=""/>
              <div class="detail buaa-swiper-link" @click="jumpDetail(item)">了解详情</div>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="bannerBg"></div>
    <div class="hot-news">
      <div class="header">
        <div>热门动态</div>
        <div class="refresh" @click="changeHotNewsList">
          <img :src="images.refresh" alt=""/> 换一换
        </div>
      </div>
      <div class="hotNewsBody">
        <div class="hotNewsItem" v-for="(item, index) in hotNewsList" :key="index" @click="jumpDetail(item)">
          <div class="relative" style="height: 100px;">
            <img v-lazy="item.image" alt=""/>
            <div class="ranking">{{ index + 1 }}</div>
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="type">{{ item.domain ? item.domain.name : '' }}</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="tab">
        <div class="tabItem" :class="active == index ? 'active' : ''" v-for="(item, index) in tabList" :key="index" @click="tabClick(item, index)">
          {{ item }}
        </div>
      </div>
      <div class="content" ref="myScrollbar" id="scrollContainer">
        <div class="contentItem" v-for="(item, index) in cloneContentList" :key="index" @click="jumpDetail(item)">
          <div class="ItemLeft">
            <div class="title">{{ item.title }}</div>
            <div class="bottom">
              <div class="type">{{ item.category }}</div>
              <div class="time">{{ item.publishDate }}</div>
            </div>
            <div class="souce">{{ item.source }}</div>
          </div>
          <div class="ItemRight">
            <img v-lazy="item.image" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import { changeHotNewsList, getNewsHotList, getNewsList } from '@/api/api';
import { formatDate } from '@/utils/date';

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
          id: 1,
          title: 'GPT-4驱动的机器人化学家登Nature，自主设计反应并执行复杂实验',
          msg: '卡内基梅隆大学研究团队创建Coscientist，基于GPT-4的智能代理，可以自主设计并执行化学实验，已发表于《Nature》。',
          img: 'https://pic.imgdb.cn/item/65ef03af9f345e8d03b89732.png'
        },
        {
          id: 2,
          title: '北京航空航天大学举办首届“人工智能科学计算学术研讨会”',
          msg: '北航联合其他八家单位举办首届“人工智能科学计算研讨会”。会议提议成立科学智算研究联盟，促进人工智能与科学深度结合，加速科学发现与技术创新。',
          img: 'https://pic.imgdb.cn/item/65ef08599f345e8d03e41a72.png'
        },
        {
          id: 3,
          title: '首届“大湾区杯”粤港澳 AI for Science科技竞赛颁奖典礼隆重举行',
          msg: '首届“大湾区杯”粤港澳AI for Science科技竞赛于2023年11月18日在广东韶关举行，此次大赛共有近千名青年学子参与，最终产生80支获奖队伍。大赛旨在推动AI技术在科研领域的应用与发展。',
          img: 'https://pic.imgdb.cn/item/65ef08df9f345e8d03e86d28.png'
        }
      ],
      tabList: [],
      active: 0,
      contentList: [],
      hotNewsList: [],
      cloneContentList: [],
      noMore: false, // 搜索结果无的展示
      keyWordsCoursesList: [], // 关键词返回的全部课程
      currentPage: 1, // 当前页
      pageSize: 12, // 一页12条
      total: '',
      loading: true, // 组件loading的展示
      isLoading: true, // 加载中，loading图标
      finishLoding: false // 加载完成，显示已经没有更多了
    };
  },
  created() {
    this._getNewsList()
    this._getHotList()
  },
  mounted() {
    window.addEventListener('scroll', this.throttle(this.scrollFn, 500));
  },
  destroyed() {
    window.removeEventListener('scroll', this.throttle(), false);
  },
  methods: {
    async _getNewsList() {
      const newsList = await getNewsList()
      let arr = ['推荐'];
      newsList.map((item) => {
        arr.push(item.category);
      });
      newsList.forEach(item => {
        item.publishDate = item.publish_date ? formatDate(new Date(item.publish_date), 'yyyy-MM-dd') : item.publish_date
      })
      this.tabList = Array.from(new Set(arr));
      this.contentList = newsList;
      this.cloneContentList = newsList.filter(item => item.is_recommended);
    },
    // 滚动触底加载
    scrollFn() {
      let clientHeight = document.documentElement.clientHeight - 18; //可视区域
      let scrollHeight = document.body.scrollHeight; // 滚动文档高度
      let scrollTop = parseInt(document.documentElement.scrollTop); // 已滚动的高度
      let height = 300;
      if (
        scrollTop + clientHeight >= scrollHeight - height &&
        scrollHeight != 0
      ) {
        console.log('到底了');
        //window.removeEventListener("scroll", this.throttle(), false);
      } else {
        return false;
      }
    },
    throttle(fn, wait) {
      // 封装函数进行节流
      var timer = null;
      return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
          timer = setTimeout(function () {
            fn.apply(context, args);
            timer = null;
          }, wait);
        }
      };
    },
    async _getHotList() {
      this.hotNewsList = await getNewsHotList()
    },
    async changeHotNewsList() {
      this.hotNewsList = await changeHotNewsList()
    },
    jump(jumpPath) {
      this.$router.push({ path: jumpPath });
    },
    jumpDetail(item) {
      this.$router.push({ path: `/newsNoticeDetail/${ item.id }` });
    },
    tabClick(tag, index) {
      console.log('tag', tag)
      this.active = index;
      if (tag == '推荐') {
        this.cloneContentList = this.contentList.filter(item => item.is_recommended);
      } else {
        this.cloneContentList = [];
        this.cloneContentList = this.contentList.filter(
          (item) => item.category == tag
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.newsNotice {
  height: 100%;
  padding: 16px;

  .index-banner {
    z-index: 10;
    background: linear-gradient(180deg, #DEEAFF 0%, #DEEAFF 18%, rgba(250, 250, 250, 1) 100%);
  }

  .carouselItem {
    width: 356px;
    height: 330px;
    margin: 0 auto;
    position: relative;
    padding: 20px 16px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    .title {
      width: 326px;
      height: 80px;
      font-weight: bold;
      font-size: 20px;
      color: #262626;
      line-height: 26px;
      margin-bottom: 8px;
    }

    .msg {
      width: 326px;
      font-weight: 500;
      font-size: 12px;
      color: #2954FF;
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
    }
  }

  .banner {
    position: relative;
    z-index: 2;
    width: 350px;
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

  .tab {
    overflow-x: scroll;
    white-space: nowrap;
    display: flex;

    .tabItem {
      text-align: left;
      margin-right: 24px;
      font-weight: bold;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.65);
    }

    .active {
      color: #2954ff;
    }
  }

  .hot-news {
    position: relative;
    z-index: 3;
    margin-bottom: 35px;
    width: 356px;
    overflow-x: scroll;

    .header {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.65);
      margin-bottom: 16px;

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
          margin-right: 6px;
        }
      }
    }

    .hotNewsBody {
      display: flex;
      position: relative;

      .hotNewsItem {
        background: #fff;
        margin-right: 16px;
        height: 200px;
        border-radius: 8px;

        img {
          width: 160px;
          height: 100px;
          border-radius: 8px 8px 0 0;
        }

        .ranking {
          width: 20px;
          height: 20px;
          top: 0;
          left: 0;
          font-size: 12px;
          position: absolute;
          background: url("../../assets/image/ranking.png");
          background-size: 100% 100%;
          color: #fff;
          text-align: center;
        }

        .title {
          width: 160px;
          height: 60px;
          padding: 10px;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #262626;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }

        .type {
          font-size: 12px;
          color: #587dff;
          padding: 10px 10px 0 10px;
        }
      }
    }
  }

  .body {
    width: 356px;
    position: relative;
    z-index: 2;
    padding: 0 16px;

    .content {
      .contentItem {
        background: #FFFFFF;
        border-radius: 12px;
        padding: 12px;
        display: flex;
        justify-content: space-between;
        margin-top: 24px;

        .ItemLeft {
          width: 188px;

          .title {
            font-weight: 500;
            font-size: 14px;
            color: #262626;
          }

          .bottom {
            display: flex;
            font-size: 12px;
            margin-top: 8px;

            .type {
              color: #587dff;
              margin-right: 12px;
            }
          }

          .souce {
            margin-top: 4px;
            font-size: 12px;
          }
        }

        .ItemRight {
          img {
            width: 136px;
            height: 108px;
            border-radius: 12px;
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
}
</style>
