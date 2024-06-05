<template>
  <div>
    <el-input :type="type"
              :value="value"
              @input="inputChange"
              :clearable="clearable"
              :placeholder="placeholder"
              :autosize="autosize"
              :disabled="disabled"
              @blur="$emit('blur')"
              :style="opstyle">
    </el-input>
    <el-popover placement="right" v-model="popVisible" v-show="haveInput" width="220px">
      <div>
        <el-table :height="300" :data="bookInfoList" v-loading="listLoading" element-loading-text="拼命加载中..." fit
                  highlight-current-row>
          <el-table-column align="center" label="书籍ID" width="80px">
            <template slot-scope="scope">
              <span>{{ scope.row.book_id }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="书籍名字" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.book_name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="版权所属" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.copybelong_name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="书籍类型" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.book_type }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="版权类型" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.copyright }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="80">
            <template slot-scope="scope">
              <el-button size="medium" type="text" @click="removeThisBook(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button size="medium" slot="reference" type="text">{{ msg }}</el-button>
    </el-popover>
  </div>
</template>

<script>
import { bookApi } from '@/api/book';
import { validateDataIds } from '@/utils/validate';

export default {
  name: 'index',
  props: ['value', 'clearable', 'type', 'disabled', 'opstyle', 'placeholder', 'autosize'],
  data() {
    return {
      popVisible: false,
      listLoading: false,
      bookInfoList: []
    };
  },
  computed: {
    msg() {
      if (!this.value) {
        return '';
      }
      let lens = 0;
      const books = this.value.toString()
        .split(',');
      for (const book of books) {
        if (!book) {
          continue;
        }
        lens++;
      }
      return `共计${ lens }本`;
    },
    haveInput() {
      return (this.value && (!this.disabled));
    }
  },
  watch: {
    popVisible() {
      if ((!this.popVisible) || (!this.value) || (!validateDataIds(this.value))) {
        return;
      }
      this.listLoading = true;
      bookApi.queryBrief({ book_ids: this.value })
        .then((resp) => {
          this.bookInfoList = resp.data.list;
          this.listLoading = false;
        });
    }
  },
  methods: {
    inputChange(newVal) {
      this.$emit('input', newVal);
    },
    removeThisBook(row) {
      const books = this.value.toString()
        .split(',');
      const index = books.indexOf(row.book_id.toString());
      books.splice(index, 1);
      const rowIndex = this.bookInfoList.indexOf(row);
      this.bookInfoList.splice(rowIndex, 1);
      this.value = books.join(',');
      if (!this.value) {
        this.popVisible = false;
      }
      this.inputChange(this.value);
    }
  }
};
</script>
