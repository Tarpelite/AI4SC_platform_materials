<template>
  <div class="limit-wrapper">
    <img src="@/assets/noopt.png" alt="">
    <h1 class="mt-d24">暂无权限 <span class="back-btn" @click="refreshPage">刷新页面</span></h1>
  </div>
</template>
<script>
export default {
  methods: {
    refreshPage() {
      this.$router.replace('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.limit-wrapper {
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  img {
    width: 300px;
    height: 300px;
  }
  .back-btn {
    cursor: pointer;
    color: #4773f3;
    margin-left: 15px;
  }
}
</style>
