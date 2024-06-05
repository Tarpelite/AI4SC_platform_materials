<template>
  <el-input class="input-center" :value="value" @input="bindInput" size="small" :disabled="disabled" placeholder="请输入" :clearable="clearable"></el-input>
</template>

<script>
export default {
  name: 'zy-input-number',
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String,
      default: ''
    },
    max: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String,
      default: ''
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    value: Number | String
  },
  methods: {
    bindInput(e) {
      let value = e
      if (value) {
        const max = this.max ? Number(this.max) : Number.MAX_VALUE
        // 当前仅支持正整数
        const min = this.min ? Number(this.min) : 0
        // 当前仅支持正整数
        value = value.toString().replaceAll(/[^0-9]/ig, '')
        if (value) {
          value = Math.min(max, value)
          value = Math.max(min, value)
        }
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style>
.input-center input {
  text-align: center;
}
</style>
