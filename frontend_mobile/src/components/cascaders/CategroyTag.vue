<!--展示分类-->
<template>
  <el-cascader
    size="medium"
    clearable
    :options="options"
    :placeholder="placeholder"
    :value="value"
    :props="props"
    :emitPath="false"
    :collapse-tags="collapse"
    @visible-change="checkInit"
    @change="valueChange">
  </el-cascader>
</template>

<script>
import { commonApi } from '@/api/common'

export default {
  props: {
    value: { required: true },
    placeholder: {
      type: String,
      default: '书籍展示分类'
    },
    props: Object,
    depth: {
      type: Number,
      default: 0
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      hadInit: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.length) {
          this.checkInit()
        }
      }
    }
  },
  methods: {
    async checkInit() {
      if (this.hadInit || (this.options.length !== 0)) {
        return
      }
      const params = { parent_id: -1 }
      if (this.depth !== 0) {
        params.depth = this.depth
      }
      const resp = await commonApi.getTagCategoryList()
      if (resp.code === 0) {
        this.hadInit = true
        this.options = resp.data
      }
    },
    valueChange(newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
