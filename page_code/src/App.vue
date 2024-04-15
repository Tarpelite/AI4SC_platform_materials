<template>
  <div id="app">
    <div class="menuCard" ref="menu" v-if="userInfo">
      <div class="el-menu-i">
        <div class="left">
          <div class="logo">
            <a @click="$router.push('/dashboard')"
              ><img :src="logoPng" width="202"
            /></a>
          </div>
          <div class="search">
            <img src="@/utils/image/search.png" alt="" />
            <input type="text" placeholder="输入关键词搜索…" />
          </div>
        </div>
        <div class="right">
          <div class="menuItem">
            <div
              v-for="(item, index) in routerList"
              :key="index"
              class="hoverItem"
              :class="item.path == activeIndex ? 'active' : ''"
              @click="jump(item.path, item.type)"
            >
              {{ item.name }}
            </div>
          </div>
          <img
            class="userAvatar"
            @click="jump('/userInfo', '')"
            :src="user"
            alt=""
          />
        </div>
      </div>
    </div>

    <div :class="userInfo ? 'body_content' : ''" ref="body_content">
      <transition name="fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- <div style="background-color: #f5f5f5;"> -->
    <footerVue v-if="userInfo"></footerVue>
    <!-- </div> -->
  </div>
</template>
<script>
import routers from "@/router";
import footerVue from "@/views/footer";
import images from "@/utils/js/exportImage";
export default {
  data() {
    return {
      activeIndex: "/dashboard",
      path: "",
      routerList: [
        {
          name: "智算平台",
          path: "/dashboard",
        },
        {
          name: "新闻通知",
          path: "/newsNotice",
        },
        {
          name: "科学任务",
          path: "/scientificMission",
        },
        {
          name: "智算套件",
          path: "/smartKit",
        },
        {
          name: "数据资源",
          path: "http://aisccc.cn/database",
          type: "without",
        },
        {
          name: "智算评测",
          path: "http://aisccc.cn/evaluating_",
          type: "without",
        },
        {
          name: "协作社区",
          path: "http://aisccc.cn/",
          type: "without",
        },
        {
          name: "运⾏情况",
          path: "/operationCondition",
        },
      ],
      logoPng: images.logo,
      user: images.user,
      textColor: "#000",
      productFlag: false,
      programmeFlag: false,
      productData: [
        {
          img1: images.item_rf,
          img2: images.item_rf1,
          leftTitle: "睿防 Rifens",
          flag: true,
          rightTitle: "数据安全产品",
          children: [
            {
              title: "识别评估",
              children: [
                {
                  type: "Rifens",
                  label: "数据安全风险评估系统",
                  productsId: 0,
                },
                { type: "Rifens", label: "数据安全治理系统", productsId: 1 },
              ],
            },
            {
              title: "监测审计",
              children: [
                { type: "Rifens", label: "数据库安全审计系统", productsId: 2 },
              ],
            },
            {
              title: "共享防护",
              children: [
                { type: "Rifens", label: "数据库透明加密系统", productsId: 3 },
                { type: "Rifens", label: "数据传输加密系统", productsId: 4 },
                { type: "Rifens", label: "数据静态脱敏系统", productsId: 5 },
              ],
            },
            {
              title: "运营管理",
              children: [
                { type: "Rifens", label: "数据安全运维系统", productsId: 6 },
                { type: "Rifens", label: "数据中台", productsId: 7 },
                { type: "Rifens", label: "数据安全管控平台", productsId: 8 },
              ],
            },
          ],
        },
        {
          img1: images.item_rx,
          img2: images.item_rx1,
          leftTitle: "睿巡 Rinspector",
          flag: false,
          rightTitle: "边界安全产品",
          children: [
            {
              title: "边界防护",
              children: [
                { type: "Rinspector", label: "5G安全接入网关", productsId: 9 },
              ],
            },
            {
              title: "边界加固",
              children: [
                {
                  type: "Rinspector",
                  label: "网络边界安全巡逻系统",
                  productsId: 10,
                },
              ],
            },
          ],
        },
        {
          img1: images.item_rc,
          img2: images.item_rc1,
          leftTitle: "睿察 Ritect",
          flag: false,
          rightTitle: "工控安全产品",
          children: [
            {
              title: "网络监测",
              children: [
                {
                  type: "Ritect",
                  label: "工业网络异常监测系统",
                  productsId: 11,
                },
              ],
            },
            {
              title: "网络审计",
              children: [
                {
                  type: "Ritect",
                  label: "工业安全综合审计系统",
                  productsId: 12,
                },
              ],
            },
          ],
        },
        {
          img1: images.item_rz,
          img2: images.item_rz1,
          leftTitle: "睿知 Rilize",
          flag: false,
          rightTitle: "管理平台产品",
          children: [
            {
              title: "管理平台",
              children: [
                {
                  type: "Rilize",
                  label: "工业互联网监测与态势感知平台",
                  productsId: 13,
                },
              ],
            },
          ],
        },
        {
          img1: images.item_rs,
          img2: images.item_rs1,
          leftTitle: "睿训 Rehearsal",
          flag: false,
          rightTitle: "培训演练产品",
          children: [
            {
              title: "培训演练",
              children: [
                {
                  type: "Rehearsal",
                  label: "工业互联网安全实训平台",
                  productsId: 14,
                },
              ],
            },
          ],
        },
      ],
      productList: {
        rightTitle: "数据安全产品",
        children: [
          {
            title: "识别评估",
            children: [
              {
                type: "Rifens",
                label: "数据安全风险评估系统",
                productsId: 0,
              },
              { type: "Rifens", label: "数据安全治理系统", productsId: 1 },
            ],
          },
          {
            title: "监测审计",
            children: [
              { type: "Rifens", label: "数据库安全审计系统", productsId: 2 },
            ],
          },
          {
            title: "共享防护",
            children: [
              { type: "Rifens", label: "数据库透明加密系统", productsId: 3 },
              { type: "Rifens", label: "数据传输加密系统", productsId: 4 },
              { type: "Rifens", label: "数据静态脱敏系统", productsId: 5 },
            ],
          },
          {
            title: "运营管理",
            children: [
              { type: "Rifens", label: "数据安全运维系统", productsId: 6 },
              { type: "Rifens", label: "数据中台", productsId: 7 },
              { type: "Rifens", label: "数据安全管控平台", productsId: 8 },
            ],
          },
        ],
      },
      programmeData: [
        {
          title: "电力行业解决方案",
          className: "",
          img: images.programme_item1,
          content: "国家电网一体化安全防护方案",
          path: "/solution/electric",
        },
        {
          title: "电信行业解决方案",
          className: "",
          img: images.programme_item2,
          content: "5G+工业互联网+物联网安全解决方案",
          path: "/solution/telecom",
        },
        {
          title: "关键制造行业解决方案",
          className: "",
          img: images.programme_item3,
          content: "工业互联网监测与态势感知平台",
          path: "/solution/pivotal",
        },
        {
          title: "教育行业解决方案",
          className: "",
          img: images.programme_item4,
          content: "智慧校园信息安全解决方案",
          path: "/solution/campus",
        },
      ],
      userInfo: null,
    };
  },
  components: {
    footerVue,
  },
  watch: {
    $route: function (to, from) {
      this.userInfo = sessionStorage.getItem("info");
      if (!this.userInfo) {
        this.$router.push({ path: "/login" });
      }
    },
  },
  computed: {
    activeProduct() {
      return this.$route.query.productsId;
    },
  },
  methods: {
    jump(Path, type) {
      if (type == "without") {
        window.open(Path);
      } else {
        this.activeIndex = Path;
        this.$router.push({ path: Path });
      }
    },
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("info");
    if (!this.userInfo) {
      this.$router.push({ path: "/login" });
    }
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.routers = routers.options.routes;
    // this.handleSelect('/dashboard', '')
  },
};
</script>

<style>
body,
html {
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  padding: 0;
  margin: 0 auto;
  position: relative;
}

h1,
h2,
h3,
h4,
p {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.menuCard {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 100;
  background: rgba(222, 234, 255, 0.94);
}

.body_content {
  margin-top: 80px;
}

.el-menu-i {
  display: flex;
  align-items: center;
  padding: 0 40px;
  height: 80px;
  width: 1440px;
  margin: 0 auto;
  transition-duration: 1s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
  }
  .right {
    display: flex;
  }
  .search {
    background: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    padding: 5px;
    img {
      width: 24px;
      height: 24px;
    }
    input {
      border: 0;
      outline: 0;
      border-radius: 20px;
    }
    input::placeholder {
      font-size: 14px;
    }
  }
  .logo {
    margin-right: 60px;
    img {
      width: 114px;
      height: 36px;
    }
  }
  .userAvatar {
    width: 36px;
    height: 36px;
  }
  .menuItem {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-wrap: nowrap;
    div {
      margin-right: 32px;
      font-size: 14px;
    }
    .hoverItem:hover {
      color: #2954ff;
      border-bottom: 2px solid #2954ff;
      padding-bottom: 5px;
      height: 20px;
    }
    .active {
      color: #2954ff;
      border-bottom: 2px solid #2954ff;
      padding-bottom: 5px;
      height: 20px;
    }
  }

  // .is-active,
  // .is-opened {
  //   border-bottom-color: transparent !important;
  //   background: transparent !important;
  // }

  // .el-submenu__title {
  //   position: relative;
  // }
}

// .el-menu-i:hover {
//   background: #fff;
// }

.el-menu.el-menu--horizontal {
  border-bottom: 0px solid !important;
}

.product {
  position: relative;
}

.productList {
  position: absolute;
  left: -508px;
  top: 69px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  width: 1440px;
  height: 340px;
  // display: flex;
  z-index: 1040;
  overflow: hidden;

  .productLeft {
    width: 300px;
    padding-top: 50px;
    padding-left: 96px;
    float: left;

    border-right: 1px solid #d9d9d9;

    .leftItem {
      display: flex;
      align-items: center;
      margin-bottom: 24px;

      img {
        display: block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
      }

      span {
        font-size: 14px;
        font-family: Helvetica Neue-Medium, Helvetica Neue;
        font-weight: 500;
        color: #21373d;
      }
    }
  }

  .productRight {
    padding-left: 60px;
    width: 1120px;
    float: left;

    h2 {
      margin-bottom: 13px;
      margin-top: 36px;
      font-size: 20px;
      font-family: Helvetica Neue-Medium, Helvetica Neue;
      font-weight: 500;
      color: #21373d;
    }

    > div {
      display: flex;

      > div {
        width: 200px;
        margin-right: 60px;

        .rightTitle {
          padding-bottom: 8px;
          border-bottom: 1px solid #d9d9d9;
          margin-bottom: 30px;
          font-size: 14px;
          font-family: Helvetica Neue-Medium, Helvetica Neue;
          font-weight: 500;
          color: #74787a;
        }

        > div {
          p {
            margin-bottom: 34px;
            font-size: 16px;
            font-family: Helvetica Neue-Medium, Helvetica Neue;
            font-weight: 700;
            color: #21373d;

            &:hover {
              color: #e02d36;
            }
          }
        }
      }
    }
  }
}

.is-active {
  color: rgba(224, 45, 54, 1) !important;
}

.programme {
  position: relative;

  .programmeList {
    position: absolute;
    left: -611px;
    top: 69px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.16);
    width: 1440px;
    height: 240px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1040;

    p:first-child {
      font-size: 14px;
      font-family: Helvetica Neue-Medium, Helvetica Neue;
      font-weight: 500;
      color: #74787a;
      margin-bottom: 8px;
    }

    img {
      display: block;
      width: 160px;
      height: 60px;
      margin-bottom: 16px;
    }

    p:last-child {
      font-size: 16px;
      font-family: Helvetica Neue-Bold, Helvetica Neue;
      font-weight: bold;
      color: #21373d;
    }

    p:last-child:hover {
      color: #e02d36;
    }
  }

  .programme-active {
    p:last-child {
      color: #e02d36;
    }
  }
}
</style>
