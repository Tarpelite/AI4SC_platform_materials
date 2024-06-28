<template>
  <div class="cal-frame">
    <div class="frame-left">
      <el-input class="buaa-cal-search" prefix-icon="el-icon-search" v-model="searchText" placeholder="输入"/>
      <el-menu
          default-active="2"
          :default-openeds="menuOpenList"
          :default-active="menuSelect"
          class="buaa-cla-menu"
          ref="calMenu">
        <el-submenu :index="menuItem.index" v-for="menuItem in filteredMenuItems">
          <template slot="title">
            <span class="first-menu-title">{{ menuItem.title }}</span>
          </template>
          <template v-if="menuItem.children_list && menuItem.children_list.length" v-for="item in menuItem.children_list">
            <el-submenu class="submenu2" v-if="item.children_list && item.children_list.length" :index="item.index">
              <template slot="title">{{ item.title }}</template>
              <el-menu-item v-for="innerItem in item.children_list" :index="innerItem.index" @click="menuClick(innerItem)">
                {{ innerItem.title }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.index" @click="menuClick(item)">
              <template v-if="item.children_list" slot="title"> {{ item.title }}</template>
              {{ item.title }}
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </div>
    <div class="frame-right">
      <div class="link">{{ linkPath }}</div>
      <div class="md-frame">
        <vue-markdown v-if="calInfo.content">{{ calInfo.content }}</vue-markdown>
      </div>
    </div>
  </div>
</template>

<script>
import {getFrameCategory, getFrameDetail} from "@/api/api";

export default {
  name: "detail",
  data() {
    return {
      searchInput: '',
      searchText: '',
      calInfo: {},
      filteredMenu: [],
      menuOpenList: [],
      menuSelect: '',
      menuList: [],
      linkPath: '',
      id: ''
    }
  },
  activated() {
    this.id = this.$route.params.id
    this._getFrameCategory()
  },
  computed: {
    filteredMenuItems() {
      let menuOpenList = new Set()
      if(!this.searchText) {
        this.menuOpenList = this.menuList.map(item => item.index)
        return this.menuList
      }
      const menus = []
      this.menuList.forEach((item) => {
        if(item.title.includes(this.searchText)) {
          // 一级有
          menus.push(item)
          menuOpenList.add(item.index)
        } else if(item.children_list && item.children_list.length) {
          const newItem = JSON.parse(JSON.stringify(item))
          newItem.children_list = []
          item.children_list.forEach((secondItem) => {
            // 二级有
            if(secondItem.title.includes(this.searchText)) {
              newItem.children_list.push(secondItem)
              menuOpenList.add(secondItem.index)
              menuOpenList.add(item.index)
            } else if(secondItem.children_list && item.children_list.length) {
              // 二级没有 去三级找
              const secondMenuList = secondItem.children_list.filter(jItem => jItem.title.includes(this.searchText))
              if(secondMenuList && secondMenuList.length) {
                const secondItemNew = JSON.parse(JSON.stringify(secondItem))
                secondItemNew.children_list = secondMenuList
                newItem.children_list.push(secondItemNew)
                menuOpenList.add(secondItemNew.index)
                menuOpenList.add(item.index)
              }
            }
          })
          if(newItem.children_list.length) {
            menus.push(newItem)
          }
        }
      })
      this.menuOpenList = Array.from(menuOpenList)
      return menus
    },
  },
  methods: {
    async menuClick({id, index, parentIndex}) {
      this.calInfo = {}
      setTimeout(async () => {
        this.calInfo = await getFrameDetail(id)
      }, 200)
      this.$nextTick(() => {
        this.menuSelect = index
      })
      this.setLinkPath(index)
    },
    async _getFrameCategory() {
      let data = await getFrameCategory()
      data.category_list.forEach((item, idx) => {
        this.buildTreeData(item, '', idx)
      })
      this.menuList = data.category_list
      // 第一次初始化 文章  this.curMenuInfo已经通过递归找到
      if(this.curMenuInfo) {
        this.menuClick(this.curMenuInfo)
      }
    },
    setLinkPath(index) {
      const indexPathList = index.split('-')
      let path = ''
      let menuList = this.menuList
      indexPathList.forEach(titleIndex => {
        path += menuList[titleIndex].title + '  /  '
        menuList = menuList[titleIndex].children_list
      })
      this.linkPath = path.substr(0, path.length - 3)
    },
    buildTreeData(data, parentIndex, index) {
      if(parentIndex === '') {
        data.index = index
      } else {
        data.index = parentIndex + '-' + (index)
        data.parentIndex = parentIndex
      }
      // 初始化menu的时候顺道把 id的那一项找到
      if(Number(this.id) === Number(data.id)) {
        this.curMenuInfo = data
      }
      if(data.children_list && data.children_list.length) {
        data.children_list.forEach((item, index) => {
          this.buildTreeData(item, data.index, index)
        })
      }
    }
  }
}
</script>

<style lang="scss">
.cal-frame {
  display: flex;

  .frame-left {
    width: 300px;
    padding: 32px;
    background: #F1F2F5;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;

    .buaa-cal-search {
      margin-bottom: 16px;

      input {
        height: 32px;
        line-height: 32px;
        border-radius: 20px;
        font-size: 14px;
      }

      .el-input__icon {
        height: 32px;
        line-height: 32px;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .frame-right {
    flex: 1;
    width: 1140px;
    background: #FAFAFA;

    .link {
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid #F1F2F5;
      padding-left: 48px;
      font-size: 14px;
      color: #8C8C8C;
    }

    .md-frame {
      width: 800px;
      margin-top: 40px;
      padding-left: 48px;

      img {
        width: 800px;
        margin: 40px 0;
      }

      h1 {
        font-weight: bold;
        font-size: 32px;
        color: #262626;
        margin-bottom: 16px;
      }

      h2 {
        margin-bottom: 16px;
      }

      table {
        border-collapse: collapse;
        text-align: center;
        margin-bottom: 16px;

        td {
          border: 1px solid #cad9ea;
          color: #666;
          height: 30px;
          padding: 0 10px;
        }

        th {
          border: 1px solid #cad9ea;
          color: #666;
          height: 30px;
        }

        thead {
          th {
            background-color: rgba(222, 234, 255, 0.94);
            min-width: 100px;
          }
        }
      }

      ul {
        li {
          height: 36px;
          line-height: 36px;
        }
      }

      p {
        line-height: 24px;
        font-weight: 400;
        font-size: 16px;
        color: #262626;
        margin-bottom: 16px;
      }

      .info {
        margin-top: 15px;

        .reship {
          background: rgba(194, 214, 255, 0.8);
          border-radius: 14px 14px 14px 14px;
          color: #262626;
          font-size: 12px;
          padding: 2px 8px;
          margin-right: 16px;
        }
      }

      .blue {
        color: #2954ff;
      }

      .textTile {
        font-weight: bold;
        font-size: 24px;
        color: #262626;
        text-align: center;
        margin: 40px 0;
      }

      .textLink {
        margin-top: 20px;

        a:link {
          color: #2954ff;
        }
      }
    }
  }

  .buaa-cla-menu {
    .el-submenu {
      &.is-opened {
        background: #F1F2F5 !important;
      }
    }

    .el-submenu__title {
      height: 32px;
      line-height: 32px;
      font-weight: 500;
      color: rgba(38, 38, 38, 0.8);
      font-size: 14px;
      background: #F1F2F5 !important;
    }

    .first-menu-title {
      font-size: 16px;
      color: #262626;
    }

    .el-submenu__icon-arrow {
      position: absolute;
      left: 0 !important;
      right: auto !important;
      font-weight: 600;
      font-size: 12px;
    }

    .submenu2 {
      .el-submenu__icon-arrow {
        position: absolute;
        left: 20px !important;
        right: auto !important;
        font-weight: 600;
        font-size: 12px;
      }
    }

    .el-menu-item {
      min-height: 32px;
      height: auto;
      padding-right: 0;
      line-height: 32px;
      color: rgba(38, 38, 38, 0.8);
      font-weight: 500;
      font-size: 14px;
      background-color: #F1F2F5;

      span {
        font-size: 16px;
        color: #262626;
      }

      &.is-active {
        background-color: #587DFF !important;
        color: #fff;
        border-radius: 6px;

        span {
          color: #fff;
        }
      }

      &:hover {
        background-color: #FFFFFF;
        border-radius: 6px !important;
      }
    }

    &.el-menu {
      background: #F1F2F5;
      border-right: none;

      .el-menu-item-group__title {
        padding: 0;
      }
    }
  }
}

</style>
