<template>
  <div class="box">
    <div class="left"></div>
    <div class="right">
        <Login />
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import Login from "./login.vue"
export default {
  data() {
    return {
      images: images,
      
    };
  },
  components: {
    Login
  },
  methods: {
    itemClick(val) {},
  },
};
</script>

<style lang="scss" scoped>
.box {
    width: 1440px;
    display: flex;
    .left {
        width: 640px;

    }
    .right {
        width: 800px;
        padding: 160px 200px;
    }
}
</style>