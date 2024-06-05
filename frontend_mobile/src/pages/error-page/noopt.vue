<template>
  <div class="limit-wrapper">
    <img src="@/assets/noopt.png" alt="">
    <h1 class="mt-d24">您没有权限查看此页面 <span class="back-btn" @click="linkPage">返回首页</span></h1>
  </div>
</template>
<script>
export default {
  methods: {
    linkPage() {
      this.$router.replace('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.limit-wrapper {
  width: 100%;
  height: calc(100vh - 112px);
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
