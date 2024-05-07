<template>
  <div class="fastFunction">
    <div class="f-title">快速功能</div>
    <div class="content">
      <div
        class="item"
        @click="jump(item.link)"
        v-for="(item, index) in list"
        :key="index"
      >
        <img :src="item.img" alt="" />
        <div class="title">{{ item.title }}</div>
        <div class="msg">{{ item.msg }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title: "个人中心",
          msg: "用户基本资料、历史记录等",
          img: images.personage,
          link: "/userInfo",
        },
        {
          id: 2,
          title: "科学任务",
          msg: "任务介绍、官方代码、运行Demo等",
          img: images.quest,
          link: "/scientificMission",
        },
        {
          id: 3,
          title: "智算套件",
          msg: "套件介绍、官方仓库、使用指南等",
          img: images.kit,
          link: "/smartKit",
        },
        {
          id: 4,
          title: "运行情况",
          msg: "算力分布，关键节点，服务监控等",
          img: images.operation,
          link: "/operationCondition",
        },
      ],
    };
  },
  methods: {
    jump(link) {
      this.$router.push({ path: link });
    },
  },
};
</script>

<style lang="scss" scoped>
.fastFunction {
  position: relative;
  z-index: 2;
  width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  .f-title {
    font-weight: bold;
    font-size: 40px;
    color: #262626;
    padding-top: 60px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 15px;
    .mr24 {
      margin-right: 24px;
    }
    .item {
      border-radius: 20px;
      background-color: #FAFAFA;
      width: 300px;
      height: 240px;
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
      padding: 30px 32px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 2px 16px 1px rgba(0,0,0,0.24);
        .title {
          color: #2954FF;
        }
      }
      img {
        width: 60px;
        height: 60px;
      }
      .title {
        font-weight: bold;
        font-size: 24px;
        color: #262626;
        margin-top: 16px;
      }
      .msg {
        font-size: 14px;
        color: #262626;
        opacity: 0.6;
        margin-top: 5px;
      }
    }
  }
}
</style>
