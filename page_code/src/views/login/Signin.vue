<template>
  <div class="login">
    <div class="title">
      <div class="titleLeft">注册</div>
      <div class="titleRight">已注册？请<span class="signin" @click="$emit('Toggle')">登录</span></div>
    </div>
    <div class="form">
      <div class="username">
        <img :src="images.username" alt=""/>
        <input type="text" placeholder="输入你的邮箱" v-model="regInfo.email"/>
      </div>
      <div class="verification">
        <img :src="images.verification" alt=""/>
        <input type="text" placeholder="输入6位验证码" v-model="regInfo.verification"/>
        <div class="send" @click="sendCode">{{ sendBtnText }}</div>
      </div>
      <div class="password">
        <img :src="images.password" alt=""/>
        <input type="password" placeholder="输入密码" v-model="regInfo.password"/>
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
    <!--    <div class="WXBtn" style="margin-top: 24px;">微信登录</div>-->
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {sendCode} from "@/api/api";

export default {
  data() {
    return {
      regInfo: {
        email: '',
        verification: '',
        password: ''
      },
      phoneNumber: '',
      isSending: false,
      images,
      sendBtnText: '发送验证码',
      countdown: 60 // 计时器总共的时间（秒）
    };
  },
  methods: {
    async sendCode() {
      if(this.isSending) return;
      if(!this.regInfo.email) {
        this.$notify.info('请输入注册邮箱');
        return;
      }
      // 这里应该是发送请求到后端获取验证码的逻辑
      const sendInfo = await sendCode({email: this.regInfo.email})

      // 模拟发送验证码的操作
      this.isSending = true;
      this.startCountdown();
    },
    startCountdown() {
      let counter = this.countdown;
      const intervalId = setInterval(() => {
        if(counter > 0) {
          this.sendBtnText = `重新发送(${counter}s)`;
          counter--;
        } else {
          this.sendBtnText = '发送验证码';
          this.isSending = false;
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }
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
      align-items: center;
      padding-left: 12px;
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
        height: 48px;
        line-height: 48px;
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
