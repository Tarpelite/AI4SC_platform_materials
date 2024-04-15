<template>
  <div class="body_content">
    <footer class="">
      <div class="footerbox">
        <div class="logo">
          <div class="logoTitle">
            <img :src="images.AI4SC" alt="" />
          </div>
          <div class="img">
            <img :src="images.footerLogo" alt="" />
          </div>
        </div>
        <div class="friendlyLink">
          <div class="friendlyLinkTitle">友情链接</div>
          <div class="friendlyLinkBody">
            <div
              class="bodyItem"
              v-for="(item, index) in friendlyLinkList"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="community">
          <div class="communityTitle">社区</div>
          <div class="communityBody">
            <div
              class="bodyItem"
              v-for="(item, index) in communityList"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="information">
          <div class="informationTitle">网站信息</div>
          <div class="informationBody">
            <div
              class="bodyItem"
              v-for="(item, index) in informationList"
              :key="index"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">
        版权所有：科学智算共性平台 京ICP备18020905号-2
        <span class="email">联系邮箱：cnai4s2023@gmail.com</span>
      </div>
    </footer>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
export default {
  data() {
    return {
      images: images,
      friendlyLinkList: [
        {
          name: "科技部",
          link: "",
        },
        {
          name: "中山大学",
          link: "",
        },
        {
          name: "百度飞桨",
          link: "",
        },
        {
          name: "工信部",
          link: "",
        },
        {
          name: "北京大学",
          link: "",
        },
        {
          name: "华为昇思",
          link: "",
        },
        {
          name: "北京航空航天大学",
          link: "",
        },
        {
          name: "华中科技大学",
          link: "",
        },
        {
          name: "中科可控",
          link: "",
        },
        {
          name: "浙江大学",
          link: "",
        },
        {
          name: "之江实验室",
          link: "",
        },
      ],
      communityList: [
        {
          name: "理事会",
          link: "",
        },
        {
          name: "技术委员会",
          link: "",
        },
        {
          name: "加入共性平台",
          link: "",
        },
      ],
      informationList: [
        {
          name: "社区动态",
          link: "",
        },
        {
          name: "成员动态",
          link: "",
        },
        {
          name: "行业资讯",
          link: "",
        },
      ],
    };
  },
  methods: {
    itemClick(val) {},
  },
};
</script>

<style lang="scss" scoped>
footer {
  height: 400px;
  background: #3959cc;
  .footerbox {
    width: 1280px;
    margin: 0 auto;
    display: flex;
    padding-top: 87px;
    .logo {
      width: 120px;
      margin-right: 120px;
      .logoTitle {
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        padding-bottom: 5px;
        img {
          width: 72px;
          height: 20px;
        }
      }
      .img {
        margin-top: 15px;
        img {
          width: 72px;
          height: 72px;
        }
      }
    }
    .friendlyLink {
      width: 440px;
      margin-right: 120px;
      .friendlyLinkTitle {
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        padding-bottom: 5px;
        font-weight: bold;
        font-size: 18px;
        color: #ffffff;
      }
      .friendlyLinkBody {
        margin-top: 7px;
        display: flex;
        flex-wrap: wrap;
        .bodyItem {
          width: 33.33%;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          margin-top: 8px;
          cursor: pointer;
        }
      }
    }
    .community {
      width: 120px;
      margin-right: 120px;
      .communityTitle {
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        padding-bottom: 5px;
        font-weight: bold;
        font-size: 18px;
        color: #ffffff;
      }
      .communityBody {
        margin-top: 7px;
        .bodyItem {
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          margin-top: 8px;
          cursor: pointer;
        }
      }
    }
    .information {
      width: 120px;
      .informationTitle {
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        padding-bottom: 5px;
        font-weight: bold;
        font-size: 18px;
        color: #ffffff;
      }
      .informationBody {
        margin-top: 7px;
        .bodyItem {
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          margin-top: 8px;
          cursor: pointer;
        }
      }
    }
  }
  .copyright {
    margin-top: 100px;
    text-align: center;
    font-weight: 400;
font-size: 16px;
color: #FFFFFF;
.email {
  margin-left: 60px;
}
  }
}
</style>