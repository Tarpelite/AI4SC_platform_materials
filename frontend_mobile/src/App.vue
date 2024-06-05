<template>
  <div id="app" :class="{'micro-app-environment': microAppEnvironment}">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "styles/common";
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
