<template>
  <div class="fastFunction">
    <div class="title">科学数据</div>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="jump(item)"
      >
        <div class="body">
          <div class="header">
            <img :src="images.data" alt="" />
            <div class="type">{{ item.type }}</div>
          </div>
          <div class="itemTitle">{{ item.title }}</div>
          <div class="itemTime">{{ item.time }}</div>
        </div>
        <div class="footer">
          <div class="tagList">
            <div class="tag" v-for="(item2, index2) in item.tag" :key="index2">
              {{ item2 }}
            </div>
          </div>
          <img :src="images.download" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/exportImage";
export default {
  data() {
    return {
      images: images,
      list: [
        {
          id: 1,
          title: "尼亚克磁性航空地球物理调查数据",
          type: "电磁",
          time: "2024-04-11 12:23:04 更新",
          tag: ["公共数据库"],
          link: "http://aisccc.cn/database/data-details?id=62",
        },
        {
          id: 2,
          title: "qm9 (DFT, 003xxx.tar)",
          type: "材料",
          time: "2024-04-02 12:25:12 更新",
          tag: ["公共数据库"],
          link: "http://aisccc.cn/database/data-details?id=59",
        },
        {
          id: 3,
          title: "3D Maxwell Equation",
          type: "PDE",
          time: "2024-04-01 16:40:35 更新",
          tag: ["原创", "公共数据库"],
          link: "http://aisccc.cn/database/data-details?id=55",
        },
      ],
    };
  },
  methods: {
    jump(item) {
      window.open(item.link);
    },
  },
};
</script>

<style lang="scss" scoped>
.fastFunction {
  position: relative;
  z-index: 2;
  width: 352px;
  .title {
    font-weight: bold;
    font-size: 24px;
    color: #262626;
  }
  .content {
    margin-top: 20px;
    .item {
      flex: 1;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
      width: 352px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 16px;
      .body {
        width: 352px;
        padding: 20px 16px;
        .header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          img {
            width: 40px;
            height: 40px;
          }
          .type {
            width: 60px;
            height: 28px;
            background: #e1e2e6;
            border-radius: 8px;
            text-align: center;
            font-size: 14px;
            line-height: 28px;
            color: rgba(38, 38, 38, 0.6);
          }
        }
        .itemTitle {
          font-weight: bold;
          font-size: 16px;
          margin-top: 16px;
        }
        .itemTime {
          font-size: 12px;
          margin-top: 8px;
          color: rgba(38, 38, 38, 0.6);
        }
      }
      .footer {
        width: 352px;
        height: 60px;
        background: #fafafa;
        border-radius: 0 0 16px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 16px;
        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .tagList {
          display: flex;
          .tag {
            border-radius: 16px;
            border: 1px solid #6e91fa;
            font-size: 12px;
            color: #587dff;
            padding: 4px 18px;
            margin-right: 10px;
          }
        }
      }
    }
    .item:hover {
      .itemTitle {
        color: #2954ff;
      }
    }
  }
}
</style>
