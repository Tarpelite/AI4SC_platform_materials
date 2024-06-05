<template>
  <div class="fastFunction">
    <div class="f-title">快速功能</div>
    <div class="content">
      <div class="item" @click="jump(item.link)" v-for="(item, index) in list" :key="index">
        <img :src="item.img" alt=""/>
        <div class="title">{{ item.title }}</div>
        <div class="msg">{{ item.msg }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title: '个人中心',
          msg: '用户基本资料、历史记录等',
          img: images.personage,
          link: '/userInfo'
        },
        {
          id: 2,
          title: '科学任务',
          msg: '任务介绍、官方代码、运行Demo等',
          img: images.quest,
          link: '/scientificMission'
        },
        {
          id: 3,
          title: '智算套件',
          msg: '套件介绍、官方仓库、使用指南等',
          img: images.kit,
          link: '/smartKit'
        },
        {
          id: 4,
          title: '运行情况',
          msg: '算力分布，关键节点，服务监控等',
          img: images.operation,
          link: '/operationCondition'
        }
      ]
    };
  },
  methods: {
    jump(link) {
      this.$router.push({ path: link });
    }
  }
};
</script>

<style lang="scss" scoped>
.fastFunction {
  position: relative;
  z-index: 2;
  width: 356px;
  margin: 0 auto;

  .f-title {
    font-weight: bold;
    font-size: 24px;
    color: #262626;
    padding-top: 40px;
  }

  .content {
    width: 352px;
    height: 400px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
    .item {
      border-radius: 16px;
      background-color: #fafafa;
      width: 171px;
      height: 180px;
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
      padding: 16px 20px;

      img {
        width: 48px;
        height: 48px;
      }

      .title {
        font-weight: bold;
        font-size: 16px;
        color: #262626;
        margin-top: 16px;
      }

      .msg {
        font-size: 12px;
        color: #262626;
        opacity: 0.6;
        margin-top: 5px;
      }
    }
  }
}
</style>
