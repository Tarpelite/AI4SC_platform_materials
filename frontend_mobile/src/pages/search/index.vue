<template>
  <div class="search-page">
    <div class="search">
      <img src="@/assets/image/search.png" alt=""/>
      <input type="text" v-model="searchTxt" placeholder="输入关键词搜索…" @keydown.enter="handleSearch"/>
      <img class="close-btn" src="@/assets/image/X.png" @click="$router.back()" alt=""/>
    </div>
    <div ref="searchContentRef" class="search-content" v-if="isSearching">
      <div class="search-content-item" v-if="searchList.length" v-for="(item,idx) in searchList" :key="idx">
        <h3 class="main-title">{{ item.title }}</h3>
        <div class="sub-category-item" v-if="item.list && item.list.length > 0" v-for="(innerItem ,idx) in item.list" :key="idx" @click.stop="linkPage(innerItem)">
          <div class="sub-category-title" v-html="innerItem.titleHtml"></div>
          <div class="sub-category-content" v-html="innerItem.inHtml"></div>
        </div>
        <div v-if="item.list && !item.list.length" class="sub-category-content no-result">无结果</div>
      </div>
    </div>
  </div>
</template>

<script>
import { smartSearch } from '@/api/api';

export default {
  name: 'search',
  data() {
    return {
      searchTxt: '',
      isSearching: false,
      searchList: []
    }
  },
  methods: {
    async handleSearch() {
      if (this.searchTxt) {
        const result = await smartSearch({ query: this.searchTxt })
        const newsList = result.news.slice(0, 3)
        const scList = result.science_tasks.slice(0, 3)
        newsList.forEach(item => {
          item._tag = 0
          item.titleHtml = this.wrapStringWithTag(item.title, 'i', this.searchTxt)
          item.inHtml = this.wrapStringWithTag(item.description, 'i', this.searchTxt)
        })
        scList.forEach(item => {
          item._tag = 1
          item.titleHtml = this.wrapStringWithTag(item.title, 'i', this.searchTxt)
          item.inHtml = this.wrapStringWithTag(item.short_description, 'i', this.searchTxt)
        })
        this.searchList = [{ title: '新闻', list: newsList }, { title: '科学任务', list: scList }]
        this.isSearching = true
        document.addEventListener('click', this.listenClick)
      }
    },
    listenClick() {
      const e = event || window.event
      // 判断点击的地方在不在输入框盒子内， contains判断dom节点的包含关系
      if (this.$refs.searchContentRef && !this.$refs.searchContentRef.contains(e.target)) {
        this.isSearching = false
        document.removeEventListener('click', this.listenClick)
      }
    },
    linkPage(item) {
      this.isSearching = false
      if (item._tag === 0) {
        this.$router.push({ path: `/newsNoticeDetail/${ item.id }` });
      } else {
        this.$router.push({ path: `/scientificMissionDetail/${ item.id }` });
      }
    },
    wrapStringWithTag(str, tag, word) {
      const regex = new RegExp(word, 'gi');
      return str.replace(regex, match => `<${ tag } style="color: #EB2F32">${ match }</${ tag }>`);
    }
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  width: 390px;
  height: 100vh;
  padding: 10px 16px;
  .search {
    width: 318px;
    height: 40px;
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #587DFF;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    img {
      width: 24px;
      height: 24px;
    }

    .close-btn {
      width: 14px;
      height: 14px;
      position: fixed;
      top: 24px;
      right: 24px;
    }
    input {
      width: 260px;
      height: 30px;
      margin-left: 10px;
      border: 0;
      outline: 0;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .search-content {
    width: 380px;
    background: #fff;
    padding: 22px;

    .main-title {
      width: 328px;
      height: 22px;
      font-weight: bold;
      font-size: 16px;
      color: #262626;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 8px;
    }

    .sub-category-title {
      width: 328px;
      line-height: 20px;
      font-weight: 500;
      font-size: 14px;
      color: #262626;
      text-align: left;
      font-style: normal;
      margin-bottom: 4px;
    }

    .sub-category-item {
      margin-bottom: 16px;
    }

    .sub-category-content {
      width: 328px;
      font-weight: 400;
      font-size: 12px;
      color: #595959;
      text-align: left;
      line-height: 17px;
      font-style: normal;
      text-transform: none;

      &.no-result {
        color: #8C8C8C;
      }
    }
  }
}

</style>
