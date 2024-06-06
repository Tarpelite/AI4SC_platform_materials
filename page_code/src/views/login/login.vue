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
          <img :src="images.username" alt=""/>
          <input type="text" v-model="username" placeholder="输入你的用户名"/>
        </div>
        <div class="password" v-if="!verificationFlag">
          <img :src="images.password" alt=""/>
          <input type="password" v-model="password" placeholder="输入密码"/>
        </div>
        <div class="verification" v-if="verificationFlag">
          <img :src="images.verification" alt=""/>
          <input type="text" placeholder="输入6位验证码"/>
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
        <input type="checkbox" v-model="read"/><span @click="jump('/agreement')">服务协议</span>和<span @click="jump('/privacy')">隐私政策</span>
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
import images from "@/utils/js/exportImage";
import Signin from "./Signin.vue";
import {login} from "@/api/api";

export default {
  data() {
    return {
      images: images,
      verificationFlag: false,
      flag: "login",
      wxFlag: false,
      username: '',
      password: '',
      read: false
    };
  },
  components: {
    Signin,
  },
  methods: {
    Toggle() {
      this.flag = "login";
    },
    jump(Path) {
      this.$router.push({path: Path});
    },
    verification() {
      this.verificationFlag = !this.verificationFlag;
    },
    async Login() {
      if(!this.username) {
        this.$notify.error('请输入用户名')
        return
      }
      if(!this.password) {
        this.$notify.error('请输入密码')
        return
      }
      if(!this.read) {
        this.$notify.error('请勾选同意协议')
        return
      }
      const loginInfo = await login({
        username: this.username,
        password: this.password
      })
      if(loginInfo.token)
        sessionStorage.setItem("token", 'Token ' + loginInfo.token)
        sessionStorage.setItem("user_id", loginInfo.user_id)
        this.$router.push({path: '/dashboard'})
        this.$notify.success('登录成功')
      }
    }
}
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

      img {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
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
    background: #587dff;
    border-radius: 16px 16px 16px 16px;
    text-align: center;
    font-size: 18px;
    color: #ffffff;
    line-height: 48px;
    cursor: pointer;
  }

  .loginBtn:hover {
    background: rgba(88, 125, 255, 0.8);
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
      color: #587dff;
      cursor: pointer;
    }
  }
}
</style>
