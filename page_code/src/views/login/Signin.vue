<template>
  <div class="login">
    <div class="title">
      <div class="titleLeft">注册</div>
      <div class="titleRight">已注册？请<span class="signin" @click="$emit('Toggle')">登录</span></div>
    </div>
    <div class="form">
      <div class="username">
        <img :src="images.username" alt="" />
        <input type="text" placeholder="输入你的手机号或邮箱" />
      </div>
      <div class="verification">
        <img :src="images.verification" alt="" />
        <input type="text" placeholder="输入6位验证码" />
        <div class="send">发送验证码</div>
      </div>
      <div class="password">
        <img :src="images.password" alt="" />
        <input type="password" placeholder="输入密码" />
      </div>
    </div>
    <div class="message">
      密码至少8个字符，至少含字母和数字，不能包含空格
    </div>
    <div class="loginBtn">注册</div>
    <div class="privacy">
        <input type="radio">
        我已阅读并同意<span>服务协议</span>和<span>隐私政策</span>
    </div>
    <div class="WXBtn" style="margin-top: 24px;">微信登录</div>
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
    margin-top: 2px;
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
  .WXBtn {
    width: 400px;
    height: 48px;
    border-radius: 16px 16px 16px 16px;
    border: 1px solid #587dff;
    background: #fff;
    color: #587dff;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }
  .WXBtn:hover {
    background: #587dff;
    color: #ffffff;
  }
  .privacy {
    margin-top: 12px;
    span {
        color: #587DFF;
        cursor: pointer;
    }
  }
}
</style>