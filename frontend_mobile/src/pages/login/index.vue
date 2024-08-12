<template>
  <div class="box">
    <div class="bg">
      <img :src="images.loginLogo" alt="">
      <Login/>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import Login from './login.vue'

export default {
  data() {
    return {
      images: images

    };
  },
  components: {
    Login
  },
  methods: {
    itemClick(val) {}
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 390px;
  // height: calc(100vh);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background-size: 100% 100%;
  overflow-y: auto;
  background: linear-gradient(170deg, #33ADFF 0%, #45A8FD 40%, #9D2EFF 100%);

  .bg {
    
    z-index: 1;
    background-image: url("../../assets/image/loginBg.png");
    background-size: 100% 100%;
    text-align: center;
    img {
      width: 170px;
      height: 200px;
      margin-top: 60px;
    }

    .bgtext {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 51px;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      margin-top: 300px;
    }
  }
}
</style>
