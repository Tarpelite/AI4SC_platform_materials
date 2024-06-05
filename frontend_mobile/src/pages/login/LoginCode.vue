<!--oss 统一登录-->
<template>
  <div>
    <img class="full-loading" src="@/assets/full-loading.gif"></img>
  </div>
</template>

<script>
import { ossLogin, tagLog } from '@/api/api';

export default {
  name: 'loginCode',
  created() {
    this.code = this.$route.query.code
    this.login()
  },
  methods: {
    login() {
      const redirctUrl = `${window.location.protocol}//${window.location.host}/login_code`
      const data = {
        redirect_uri: redirctUrl,
        sso_code: this.code,
        client_id: process.env.VUE_APP_LOGIN_CLIENT_ID
      }
      if (!this.code) {
        window.location.replace(`http://sso.zhangyue-inc.com/oauth/authorize?redirect_uri=${process.env.VUE_APP_LOGIN_URL}&response_type=code&client_id=${process.env.VUE_APP_LOGIN_CLIENT_ID}&state=23`);
      }
      ossLogin(data)
        .then(res => {
          localStorage.setItem('token', res['x-token'])
          tagLog({ page_name: 'login', page_desc: '登陆' })
          this.$router.push('/')
        })
        .catch(e => {
          // window.location.replace(`http://sso.zhangyue-inc.com/oauth/authorize?redirect_uri=${process.env.VUE_APP_LOGIN_URL}&response_type=code&client_id=${process.env.VUE_APP_LOGIN_CLIENT_ID}&state=23`);
        })
    }
  }

}
</script>
<style scoped>
.full-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 340px;
  height: 240px;
}
</style>
