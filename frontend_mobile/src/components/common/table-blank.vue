<template>
  <div class="flex justify-center items-center" :style="{width: bWidth, height: bHeight}">
    <img class="blank-img" src="@/assets/blank-table.png" alt=""> <span class="blank-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '暂无数据'
    },
    bWidth: {
      type: String,
      default: '100%'
    },
    bHeight: {
      type: String,
      default: '300px'
    }
  },
  name: 'table-blank'
}
</script>

<style scoped>
.blank-img {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}
.blank-title {
  font-weight: 600;
  font-size: 16px;
  color: #a8abb2;
}
</style>
