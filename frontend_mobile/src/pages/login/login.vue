<template>
  <div>
    <div class="login" v-if="flag == 'login'">
      <div class="title" v-if="wxFlag">
        <div class="titleLeft"><img :src="images.back1" alt="" @click="wxFlag = false"> 微信登录</div>
        <div class="titleRight">
          没有账号？<span class="signin" @click="flag = 'Signin'">注册</span>
        </div>
      </div>
      <div class="title" v-if="!wxFlag">
        <div class="titleLeft">登录</div>
        <div class="titleRight">
          没有账号？<span class="signin" @click="flag = 'Signin'">注册</span>
        </div>
      </div>
      <div class="form" v-if="!wxFlag">
        <div class="username">
          <img :src="images.username" alt=""/> <input type="text" v-model="username" placeholder="输入你的用户名"/>
        </div>
        <div class="password" v-if="!verificationFlag">
          <img :src="images.password" alt=""/> <input type="password" v-model="password" placeholder="输入密码"/>
        </div>
        <div class="verification" v-if="verificationFlag">
          <img :src="images.verification" alt=""/> <input type="text" placeholder="输入6位验证码"/>
          <div class="send">发送验证码</div>
        </div>
      </div>
      <!--      <div class="message" v-if="!wxFlag">-->
      <!--        <span @click="verification">{{-->
      <!--          verification ? "使用密码登录" : "使用验证码登录"-->
      <!--        }}</span>-->
      <!--        <span v-if="!verificationFlag">忘记密码？</span>-->
      <!--      </div>-->
      <div class="loginBtn" v-if="!wxFlag" @click="Login">登录</div>
      <div class="privacy" v-if="!wxFlag">
        <input type="radio" v-model="read" :value="true"/><span>服务协议</span>和<span>隐私政策</span>
      </div>
      <!--      <div
              class="WXBtn"
              style="margin-top: 24px"
              @click="wxFlag = true"
              v-if="!wxFlag"
            >
              微信登录
            </div>-->
    </div>
    <Signin v-if="flag == 'Signin'" @Toggle="Toggle"/>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import Signin from './Signin.vue';
import { login } from '@/api/api';

export default {
  data() {
    return {
      images: images,
      verificationFlag: false,
      flag: 'login',
      wxFlag: false,
      username: '',
      password: '',
      read: false
    };
  },
  components: {
    Signin
  },
  methods: {
    Toggle() {
      this.flag = 'login';
    },
    verification() {
      this.verificationFlag = !this.verificationFlag;
    },
    async Login() {
      if (!this.username) {
        this.$toast('请输入用户名')
        return
      }
      if (!this.password) {
        this.$toast('请输入密码')
        return
      }
      if (!this.read) {
        this.$toast('请勾选同意协议')
        return
      }
      const loginInfo = await login({
        username: this.username,
        password: this.password
      })
      if (loginInfo.token) {
        sessionStorage.setItem('token', 'Token ' + loginInfo.token)
        sessionStorage.setItem('user_id', loginInfo.user_id)
        this.$router.push({ path: '/dashboard' })
        this.$toast('登录成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 356px;
  background: #FFFFFF;
  box-shadow: 0 2px 16px 1px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  margin: 50px auto;
  padding: 30px 24px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .titleLeft {
      font-weight: bold;
      font-size: 32px;
      color: #262626;

      img {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }

    .titleRight {
      font-size: 16px;
      color: #595959;

      .signin {
        color: #2954ff;
      }
    }
  }

  .form {
    margin-top: 20px;

    .username {
      width: 310px;
      height: 40px;
      background: #f1f2f5;
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding: 0 12px;

      img {
        width: 24px;
        height: 24px;
      }

      input {
        border: 0;
        background: #f1f2f5;
        outline: none;
        width: 270px;
        font-size: 12px;
      }
    }

    .password {
      width: 310px;
      height: 40px;
      background: #f1f2f5;
      border-radius: 20px;
      display: flex;
      padding: 0 12px;
      align-items: center;

      img {
        width: 24px;
        height: 24px;
      }

      input {
        border: 0;
        background: #f1f2f5;
        outline: none;
        width: 270px;
        font-size: 12px;
      }

      margin-top: 20px;
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
    margin-top: 20px;
    width: 310px;
    height: 40px;
    background: #587dff;
    border-radius: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    line-height: 40px;
    cursor: pointer;
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
    text-align: left;
    font-size: 12px;
    margin-top: 16px;
    display: flex;
    align-items: center;

    input {
      margin-right: 6px;
    }

    span {
      color: #587dff;
      cursor: pointer;
    }
  }
}
</style>
