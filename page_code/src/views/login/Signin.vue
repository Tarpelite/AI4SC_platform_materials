<template>
  <div class="login">
    <div class="title">
      <div class="titleLeft">注册</div>
      <div class="titleRight">已注册？请<span class="signin" @click="$emit('Toggle')">登录</span></div>
    </div>
    <div class="form">
      <div class="username">
        <img :src="images.username" alt=""/>
        <input type="text" placeholder="输入你的用户名" v-model="regInfo.username"/>
      </div>
      <div class="username mg-t24">
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
    <div class="message">密码至少8个字符，至少含字母和数字，不能包含空格</div>

    <div class="loginBtn" @click="regSubmit">注册</div>
    <div class="privacy">
      <input type="radio" v-model="isAcc" :value="true">
      我已阅读并同意<span>服务协议</span>和<span>隐私政策</span>
    </div>
    <div v-if="errorMsg" class="error-msg">
      {{ errorMsg }}
    </div>
    <!--    <div class="WXBtn" style="margin-top: 24px;">微信登录</div>-->
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import {register, sendCode} from "@/api/api";
import bus from "@/utils/bus";

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
      errorMsg: '',
      isAcc: false,
      sendBtnText: '发送验证码',
      countdown: 60 // 计时器总共的时间（秒）
    };
  },
  methods: {
    async sendCode() {
      if(this.isSending) return;
      if(!this.regInfo.email) {
        this.$notify.error('请输入邮箱')
        return;
      }
      if(!(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.regInfo.email))) {
        this.$notify.error('邮箱格式错误')
        return;
      }
      // 这里应该是发送请求到后端获取验证码的逻辑
      const sendInfo = await sendCode({email: this.regInfo.email})
      if(sendInfo) {
        this.$notify.success('验证码发送成功')
        // 模拟发送验证码的操作
        this.isSending = true;
        this.startCountdown();
      }
    },
    async regSubmit() {
      if(this.formReg()) {
        const result = await register({
          username: this.regInfo.username,
          email: this.regInfo.email,
          password: this.regInfo.password,
          verification_code: this.regInfo.verification
        })
        if(result.token) {
          sessionStorage.setItem("token", 'Token ' + result.token)
          sessionStorage.setItem("user_id", result.user_id)
          bus.$emit('userInfo')
          this.$router.push({path: '/dashboard'})
          this.$notify.success('注册成功')
        }
      }
    },
    formReg() {
      if(!this.regInfo.email) {
        this.$notify.error('请输入邮箱')
        return false
      }
      if(!this.regInfo.username) {
        this.$notify.error('请输入用户名')
        return false
      }
      if(!this.regInfo.verification) {
        this.$notify.error('请输入验证码')
        return false
      }
      if(!this.regInfo.password) {
        this.$notify.error('请输入密码')
        return false
      }
      if(!(/^(?=.*[a-zA-Z])(?=.*\d)[\s\S]{8,}$/.test(this.regInfo.password))) {
        this.$notify.error('密码至少8个字符，至少含字母和数字，不能包含空格')
        return false
      }
      if(!this.isAcc) {
        this.$notify.error('请勾选服务协议')
        return false
      }
      return  true
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
.mg-t24 {
  margin-top: 24px;
}
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
  .error-msg {
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    color: #EB2F32;
    padding: 0 10px;
    margin-top: 22px;
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
