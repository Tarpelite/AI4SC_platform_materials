<template>
  <!--记得一定要绑定vShow-->
  <div v-show="vShow" class="pagination-container">
    <el-pagination background :current-page.sync="pager[pageNum]" :page-sizes="[20, 30, 50, 100, 300, 1000]" :page-size="Number(pager[pageSize])" :total="pager.count ? Number(pager.count):  0" layout="total, sizes, prev, pager, next, jumper" @update:currentPage="currentChange" @size-change="sizeChange"></el-pagination>
  </div>
</template>

<script>

export default {
  name: 'pager',
  props: {
    pager: {
      type: Object
    },
    vShow: {
      type: Boolean
    },
    pageNum: {
      type: String,
      default: 'page'
    },
    pageSize: {
      type: String,
      default: 'psize'
    }
  },
  data() {
    return {
      // 解决mounted后会立刻发出一个事件的问题
      eatFirst: false
    }
  },
  methods: {
    change() {
      this.$emit('input', {
        [this.pageNum]: this.pager[this.pageNum],
        [this.pageSize]: this.pager[this.pageSize]
      })
    },
    sizeChange(newVal) {
      this.pager[this.pageSize] = newVal
      this.pager[this.pageNum] = 1
      this.change()
    },
    currentChange(newVal) {
      if (!this.eatFirst) {
        this.eatFirst = true
        return
      }
      this.pager[this.pageNum] = newVal
      this.change()
    }
  }
}

</script>
