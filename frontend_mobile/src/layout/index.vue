<template>
  <div :class="classObj" class="app-wrapper">
    <div class="main-container" id="main-container">
      <navbar/>
      <app-main/>
      <buaa-footer/>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Footer } from './components/index.js';
import { mapState } from 'vuex';

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    'buaa-footer': Footer,
  },
  data() {
    return {
      appId: '' // Todo 待补充（需申请appId https://q7w8vltyes.feishu.cn/wiki/wikcnxQKOA5Wmf0Jk1F5RSJbGgf)
    };
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      };
    },
    userName() {
      return ''; // Todo 待补充 (当前用户)
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #fafafa;
}

</style>
