<template>
  <div class="login">
    <div class="title">
      <div class="titleLeft">登录</div>
      <div class="titleRight">没有账号？<span class="signin">注册</span></div>
    </div>
    <div class="form">
      <div class="username">
        <img :src="images.username" alt="" />
        <input type="text" placeholder="输入你的手机号或邮箱" />
      </div>
      <div class="password" v-if="!verificationFlag">
        <img :src="images.password" alt="" />
        <input type="password" placeholder="输入密码" />
      </div>
      <div class="verification" v-if="verificationFlag">
        <img :src="images.verification" alt="" />
        <input type="text" placeholder="输入6位验证码" />
        <div class="send">发送验证码</div>
      </div>
    </div>
    <div class="message">
      <span @click="verification">{{
        verification ? "使用密码登录" : "使用验证码登录"
      }}</span>
      <span v-if="!verificationFlag">忘记密码？</span>
    </div>
    <div class="loginBtn">登录</div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
export default {
  data() {
    return {
      images: images,
      verificationFlag: false,
    };
  },
  methods: {
    itemClick(val) {},
    verification() {
      this.verificationFlag = !this.verificationFlag;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  .title {
    display: flex;
    justify-content: space-between;
    .titleLeft {
      font-weight: bold;
      font-size: 40px;
      color: #262626;
    }
    .titleRight {
      padding-top: 22px;
      font-size: 16px;
      color: #595959;
      .signin {
        color: #2954ff;
        cursor: pointer;
      }
    }
  }
  .form {
    margin-top: 30px;
    .username {
      width: 400px;
      height: 48px;
      background: #f1f2f5;
      border-radius: 16px 16px 16px 16px;
      display: flex;
      padding: 12px 12px;
      img {
        width: 24px;
        height: 24px;
      }
      input {
        border: 0;
        background: #f1f2f5;
        outline: none;
        width: 340px;
      }
    }
    .password {
      width: 400px;
      height: 48px;
      background: #f1f2f5;
      border-radius: 16px 16px 16px 16px;
      display: flex;
      padding: 12px 12px;
      img {
        width: 24px;
        height: 24px;
      }
      input {
        border: 0;
        background: #f1f2f5;
        outline: none;
        width: 340px;
      }
      margin-top: 24px;
    }
    .verification {
      margin-top: 24px;
      width: 400px;
      height: 48px;
      background: #f1f2f5;
      border-radius: 16px 16px 16px 16px;
      display: flex;
      padding: 12px 12px;
      img {
        width: 24px;
        height: 24px;
      }
      input {
        border: 0;
        background: #f1f2f5;
        outline: none;
        width: 200px;
      }
      .send {
        font-size: 14px;
        color: #587dff;
        border-left: 1px solid #9cb9ff;
        width: 140px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
  .message {
    font-weight: 500;
    font-size: 14px;
    color: #262626;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: 12px;
    span {
      cursor: pointer;
    }
  }
  .loginBtn {
    margin-top: 40px;
    width: 400px;
    height: 48px;
    background: #587DFF;
    border-radius: 16px 16px 16px 16px;
    text-align: center;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 48px;
    cursor: pointer;
  }
  .loginBtn:hover {
    background: rgba(88, 125, 255, .8);
  }
}
</style>