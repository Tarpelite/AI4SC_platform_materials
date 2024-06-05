import Store from '@/store';

export default {
  methods: {
    hasPermission(permission) {
      if (!permission || !permission.length) {
        return false
      }
      if (!this.$route.meta) {
        return false
      }
      const roles = this.$store.getters.roles || []
      if (!roles.length) {
        return false
      }
      if (permission.find(item => roles.includes(item))) {
        return true
      }
      return false
    }
  }
}
