<template>
  <div class="body_content">
    <footer class="">
      <div class="footerList w1440">
        <div class="contentList">
          <div v-for="item in detailList" :key="item.id" class="contentItem">
            <p class="itemTitle">{{ item.title }}</p>
            <div>
              <p
                v-for="val in item.children"
                :key="val.id"
                @click="itemClick(val)"
                :class="[
                  'childrenTitle',
                ]"
              >
              <span>
                {{ val.title }}
              </span>
              </p>
            </div>
          </div>
        </div>
        <div class="describe">
          <div class="describe_msg">
            <p>咨询电话</p>
            <p>010-62150576</p>
          </div>
          <div class="describe_msg">
            <p>咨询邮箱</p>
            <p>xiaorh@rhzz.com.cn</p>
          </div>
          <div class="qrcode">
            <img src="../../utils/image/qrcode.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="filings">
        <div>
          <img src="../../utils/image/footerLogo.png" alt="" />
          <p>
            京ICP备18036750号-1 Copright©2017-2023 RuiHang . All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: [
        {
          id: 1,
          title: "产品体系",
          children: [
            {
              id: 0,
              title: "睿防 - 数据安全产品",
              path: "/products_info",
              type: "Rifens",
            },
            {
              id: 9,
              title: "睿巡 - 边界安全产品",
              path: "/products_info",
              type: "Rinspector",
            },
            {
              id: 11,
              title: "睿察 - 工控安全产品",
              path: "/products_info",
              type: "Ritect",
            },
            {
              id: 12,
              title: "睿知 - 管理平台产品",
              path: "/products_info",
              type: "Rilize",
            },
            {
              id: 13,
              title: "睿训 - 培训演练产品",
              path: "/products_info",
              type: "Rehearsal",
            },
          ],
        },
        {
          id: 2,
          title: "解决方案",
          children: [
            {
              id: 21,
              title: "电力行业解决方案",
              path: "/solution/electric",
            },
            {
              id: 22,
              title: "电信行业解决方案",
              path: "/solution/telecom",
            },
            {
              id: 23,
              title: "关键制造行业解决方案",
              path: "/solution/pivotal",
            },
            {
              id: 24,
              title: "智慧校园信息安全解决方案",
              path: "/solution/campus",
            },
          ],
        },
        {
          id: 3,
          title: "关于我们",
          children: [
            {
              id: 31,
              title: "公司简介",
              path: "/we",
            },
            {
              id: 32,
              title: "联系我们",
              path: "/lxwm",
            },
            {
              id: 33,
              title: "招贤纳士",
              path: "/zwzp",
            },
          ],
        },
      ],
    };
  },
  methods: {
    itemClick(val) {
      if (val.type) {
        if (val.id == this.$route.query.productsId) return;
        this.$router.push({
          path: val.path,
          query: {
            type: val.type,
            productsId: val.id,
          },
        });
      } else {
        this.$router.push(val.path).catch((err) => err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  height: 500px;

  .footerList {
    padding: 80px 140px 80px 160px;
    display: flex;

    .contentList {
      display: flex;

      .contentItem {
        margin-right: 60px;

        p {
          width: 200px;
        }

        .itemTitle {
          font-size: 16px;
          font-family: Helvetica Neue-Medium, Helvetica Neue;
          font-weight: 500;
          color: #21373d;
          margin-bottom: 24px;
        }

        .childrenTitle {
          font-size: 14px;
          font-family: Helvetica Neue-Medium, Helvetica Neue;
          font-weight: 500;
          color: #74787a;
          margin-bottom: 21px;
         
        }

        // .childrenTitle:hover {
        //   color: #e02d36;
        // }
        .activeColor {
          color: #e02d36;
        }
        span {
            cursor: pointer;
        }
        span:hover {
          color: #e02d36;
        }
      }
    }

    .describe {
      width: 320px;
      height: 240px;
      background: #f5f5f5;
      border-radius: 2px 2px 2px 2px;
      padding: 17px 0 0 40px;

      .describe_msg {
        margin-bottom: 16px;
        p:first-child {
          font-size: 14px;
          font-family: Helvetica Neue-Medium, Helvetica Neue;
          font-weight: 500;
          color: #74787a;
        }

        p:last-child {
          font-size: 16px;
          font-family: Helvetica Neue-Medium, Helvetica Neue;
          font-weight: 500;
          color: #21373d;
        }
      }

      .qrcode {
        margin-top: 12px;

        img {
          display: block;
          width: 100px;
          height: 100px;
        }
      }
    }
  }

  .filings {
    width: 100%;
    height: 100px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      display: flex;
      align-items: center;

      img {
        display: block;
        width: 98px;
        height: 24px;
        margin-right: 30px;
      }

      p {
        font-size: 12px;
        font-family: Helvetica Neue-Regular, Helvetica Neue;
        font-weight: 400;
        color: #74787a;
      }
    }
  }
}
</style>