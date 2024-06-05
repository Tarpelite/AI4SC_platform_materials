<template>
  <div class="typicalTask">
    <div class="title">典型任务</div>
    <div class="content" ref="list">
      <div class="item" v-for="(item,index) in list" :key="index" @click="jumpDetail(item)">
        <div class="text">
          <div class="titleChild">{{ item.title }}</div>
          <div class="msg"> {{ item.short_description }}</div>
        </div>
        <img :src="item.image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage'
import { getScienceList } from '@/api/api';

export default {
  data() {
    return {
      list: [],
      percentage: 0,
      imageList: images
    }
  },
  created() {
    this._getScienceList()
  },
  methods: {
    async _getScienceList() {
      const scList = await getScienceList()
      this.list = scList.filter(item => item.is_banner).slice(0, 8)
    },
    jumpDetail(item) {
      this.$router.push({ path: `/scientificMissionDetail/${ item.id }` });
    }
  }
};
</script>

<style lang="scss" scoped>
.typicalTask {
  position: relative;
  z-index: 2;
  width: 352px;
  padding-bottom: 40px;

  .title {
    font-weight: bold;
    font-size: 24px;
    color: #262626;
    padding-top: 50px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .item {
      width: 352px;
      height: 142px;
      background: linear-gradient(#deeaff 0%, #9cb9ff 100%);
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .text {
        width: 177px;

        .titleChild {
          font-weight: bold;
          font-size: 16px;
          line-height: 25px;
          color: #262626;
          width: 177px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 50px; /* 假设每行大约27px高度 */
        }

        .msg {
          font-size: 14px;
          color: rgba(38, 38, 38, 0.9);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          margin-top: 8px;
          min-height: 50px; /* 假设每行大约21px高度 */
        }
      }

      img {
        width: 140px;
        height: 118px;
        border-radius: 16px;
      }
    }

    .item:hover {
      background: linear-gradient(180deg, #587DFF 0%, #9D2EFF 100%);
      box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.24);

      .titleChild {
        color: #fff;
      }

      img {
        border-radius: 10px;
      }

      .msg {
        color: #fff;
      }
    }
  }

  .right {
    position: absolute;
    right: 10px;
    top: 240px;
    cursor: pointer;

    img {
      width: 60px;
      height: 60px;
    }
  }

  .left {
    position: absolute;
    left: 10px;
    top: 240px;
    cursor: pointer;

    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
