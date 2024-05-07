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
      <div v-if="list.length % 4 > 0" class="item-empty" v-for="(item,index) in 4 - list.length % 4"></div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/js/exportImage'
import {getScienceList} from "@/api/api";

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
      this.list = scList.filter(item=> item.is_banner).slice(0,8)
    },
    increase() {
      this.percentage += 30;
      if(this.percentage > 30) {
        this.percentage = 30;
      } else {
        this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
      }
    },
    decrease() {
      this.percentage -= 30;
      if(this.percentage < 0) {
        this.percentage = 0;
      } else {
        this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
      }
    },
    jumpDetail(item) {
      this.$router.push({path: `/scientificMissionDetail/${item.id}`});
    }
  }
};
</script>

<style lang="scss" scoped>
.typicalTask {
  position: relative;
  width: 1440px;
  margin: 0 auto;
  padding: 0 80px;

  .title {
    font-weight: bold;
    font-size: 40px;
    color: #262626;
    padding-top: 50px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    transform: translateX(0px);
    transition-property: transform;
    transition-duration: 2s;
    justify-content: space-between;
    .mr24 {
      margin-right: 24px;
    }
    .item-empty {
      width: 296px;
      height: 420px;
    }
    .item {
      width: 296px;
      height: 420px;
      background: linear-gradient(#DEEAFF 0%, #9CB9FF 100%);
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      margin-bottom: 32px;
      .text {
        width: 256px;
        .titleChild {
          font-weight: bold;
          font-size: 24px;
          color: #262626;
          width: 256px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .msg {
          font-size: 14px;
          color: #262626;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          margin-top: 10px;
        }
      }

      img {
        width: 260px;
        height: 200px;
        border-radius: 10px;
      }
    }

    .item:hover {
      background: linear-gradient(180deg, #587DFF 0%, #9D2EFF 100%);

      .titleChild {
        color: #fff;
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
