<template>
  <div class="menuCard" ref="menu">
    <div class="left flex items-center justify-between">
      <div class="logo" @click="$router.push('/dashboard')">
        <img :src="logoPng" width="202"/>
      </div>
    </div>
    <div class="right">
      <img class="icon-search" :src="search" alt="" @click="jump('/search', '')"/>
      <img class="icon-more" :src="more" alt="" @click="showMenu = !showMenu"/>
      <div class="menuItem" v-if="showMenu">
        <div v-for="(item, index) in routerList" :key="index" class="hoverItem" :class="item.path == activeIndex ? 'active' : ''" @click="jump(item.path, item.type)">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <img class="userAvatar" @click="jump('/userInfo', '')" :src="user" alt=""/>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import { mapGetters } from 'vuex'
import { logout } from '@/api/api'

export default {
  watch: {
    $route: function (to, from) {
      let findItem = this.routerList.find(item=> item.path === to.path)
      if(findItem != null) {
        this.activeIndex = findItem.path
      }
    }
  },
  data() {
    return {
      logoPng: images.logo,
      search: images.search,
      user: images.user,
      more: images.more,
      activeIndex: "/dashboard",
      path: "",
      showMenu: false,
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
    }
  },
  computed: {
    ...mapGetters(['realName'])
  },
  methods: {
    jump(Path, type) {
      this.showMenu = false;
      if(type == "without") {
        window.open(Path);
      } else {
        this.activeIndex = Path;
        this.$router.push({path: Path});
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.menuCard {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 100;
  padding: 0 20px;
  background: rgba(222, 234, 255, 0.94);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    height: 100%;

    .logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      img {
        width: 100px;
        height: 32px;
      }
    }
  }

  .right {
    display: flex;
    height: 100%;
    align-items: center;

    .icon-more {
      width: 24px;
      height: 24px;
      margin-left: 12px;
    }

    .userAvatar {
      margin-left: 12px;
      width: 32px;
      height: 32px;
    }

    .icon-search {
      width: 24px;
      height: 24px;
      margin-left: 12px;
    }
  }

  .menuItem {
    position: fixed;
    top: 60px;
    right: 32px;
    text-wrap: nowrap;
    width: 200px;
    height: 380px;
    background-color: #fff;
    box-shadow: 0px 2px 16px 1px rgba(0,0,0,0.08);
    border-radius: 12px 12px 12px 12px;
    padding: 32px 0;
    div {
      height: 25px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }

    .hoverItem {
      height: 25px;
      line-height: 25px;
      margin-top: 17px;
      font-weight: 500;
      text-align: center;
      &:first-child {
        margin-top: 0;
      }
    }

    .active {
      span {
        color: #2954ff;
        border-bottom: 2px solid #2954ff;
        height: 25px;
        line-height: 25px;
        font-weight: 500;
      }
    }
  }
}
</style>
