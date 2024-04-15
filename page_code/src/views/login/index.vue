<template>
  <div class="box">
    <div class="left">
        <div class="bg">
            <img :src="images.loginLogo" alt="">
            <div class="bgtext">版权所有：科学智算共性平台 京ICP备18020905号-2</div>
        </div>
    </div>
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
    margin: 0 auto;
    height: 920px;
    .left {
        width: 640px;
        background: linear-gradient( 170deg, #33ADFF 0%, #45A8FD 40%, #9D2EFF 100%);
        .bg {
            height: 100%;
            background-image: url("@/utils/image/loginBg.png");
            background-size:100% 100%;
            img {
                width: 240px;
                height: 310px;
                margin-left: 200px;
                margin-top: 240px;
            }
            .bgtext {
                font-size: 16px;
                color: #FFFFFF;
                text-align: center;
                margin-top: 300px;
            }
        }
    }
    .right {
        width: 800px;
        padding: 160px 200px;
    }
}
</style>