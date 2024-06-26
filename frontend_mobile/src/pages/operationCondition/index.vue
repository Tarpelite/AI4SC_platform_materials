<template>
  <div class="operationCondition">
    <div class="operationalBg">
      <div class="operationalMap">
        <mapEcharts/>
      </div>
      <div class="operationalTable">
        <div class="title">情况表格</div>
        <div>
          <vue-good-table :columns="columns" :rows="tableData">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'status'">
                <span :class="props.row.status"> {{ props.row.status == 'normal' ? '正常' : (props.row.status == 'abnormal' ? '异常' : '停止') }} </span>
              </span>
              <span v-else-if="props.column.field == 'timeTpt'"> {{ timeConvert(props.row.timeTpt) }} </span>
              <span v-else> {{ props.formattedRow[props.column.field] }} </span>
            </template>
          </vue-good-table>
          <!--          <el-table-->
          <!--            :data="tableData"-->
          <!--            style="width: 100%"-->
          <!--            :header-cell-style="{background:'#F1F2F5',color:'#606266'}">-->
          <!--            <el-table-column-->
          <!--              prop="name"-->
          <!--              label="集群名称">-->
          <!--            </el-table-column>-->
          <!--            <el-table-column-->
          <!--              prop="serve"-->
          <!--              label="服务"-->
          <!--              width="180">-->
          <!--            </el-table-column>-->
          <!--            <el-table-column label="状态">-->
          <!--              <template slot-scope="scope">-->
          <!--                <span :class="scope.row.status">-->
          <!--                  {{ scope.row.status == 'normal' ? 'normal' : ( scope.row.status == 'abnormal' ? '异常' : '停止' ) }}-->
          <!--                </span>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--            <el-table-column-->
          <!--              label="检测时间">-->
          <!--              <template slot-scope="scope">-->
          <!--                {{ timeConvert(scope) }}-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--            <el-table-column-->
          <!--              prop="region"-->
          <!--              label="区域">-->
          <!--            </el-table-column>-->
          <!--          </el-table>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '@/utils/exportImage';
import mapEcharts from './map.vue'

export default {
  data() {
    return {
      images: images,
      randomInterval: [],
      columns: [
        {
          label: '集群名称',
          field: 'name',
          sortable: false,
          width: '150px'
        },
        {
          label: '服务',
          field: 'serve',
          sortable: false,
          width: '70px'
        },
        {
          label: '状态',
          field: 'status',
          sortable: false,
          width: '60px'
        },
        {
          label: '检测时间',
          field: 'timeTpt',
          sortable: false,
          width: '170px'
        },
        {
          label: '区域',
          field: 'region',
          sortable: false,
          width: '70px'
        }
      ],
      tableData: [
        {
          name: '北航高算中心-XE1',
          serve: '主控节点',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '京津冀'
        },
        {
          name: '北航高算中心-XE1',
          serve: '主控节点',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '京津冀'
        },
        {
          name: '百度云-CPU',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '京津冀'
        },
        {
          name: '百度云-CPU',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '京津冀'
        },
        {
          name: '浙大高算中心-GE1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '长三角'
        },
        {
          name: '浙大高算中心-GE1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '长三角'
        },
        {
          name: '浙大高算中心-GE1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '长三角'
        },
        {
          name: '华为云-MC1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '大湾区'
        },
        {
          name: '华为云-MC1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '大湾区'
        },
        {
          name: '华为云-MC1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          timeTpt: new Date().getTime(),
          region: '大湾区'
        }
      ]
    };
  },
  components: {
    mapEcharts
  },
  mounted() {
    this.timeCounting()
  },
  beforeDestroy() {
    this.timeOff()
  },
  methods: {
    timeCounting() {
      const tableLen = this.tableData.length
      this.randomInterval.forEach((item) => {
        if(item) clearInterval(item)
      })
      this.randomInterval = []
      for (let i = 0; i < tableLen; i++) {
        const ra = Math.max(2, Math.floor(Math.random() * 10)) * 1000
        // 列表每一列都有各自的增加时间
        console.log('ra', ra)
        this.randomInterval[i] = setInterval(() => {
          this.$set(this.tableData[i], 'timeTpt', new Date().getTime())
        }, ra)
      }
    },
    timeOff() {
      this.randomInterval.forEach((item) => {
        if(item) clearInterval(item)
      })
      this.randomInterval = []
    },
    timeConvert(time) {
      const now = time ? new Date(time) : new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      var minute1 = ''
      var second1 = ''
      if (minute < 10) {
        minute1 = '0' + minute
      } else {
        minute1 = minute
      }
      if (second < 10) {
        second1 = '0' + second
      } else {
        second1 = second
      }
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute1 + ':' + second1
    }
  }
};
</script>

<style lang="scss">
.operationCondition {
  height: 100%;
  background-color: #fff;

  .operationalBg {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .operationalMap {
      width: 390px;
      height: 270px;
      background: #202D6B;
    }

    .operationalTable {
      width: 356px;
      margin-top: 40px;
      background: #fff;

      .title {
        font-weight: 500;
        font-size: 16px;
        color: #262626;
        margin-bottom: 8px;
      }
    }
  }

  .vgt-table {
    td {
      font-size: 12px;
      font-weight: 400;

      .normal {
        color: #52C41A;
      }

      .abnormal {
        color: #FAAD14;
      }

      .stop {
        color: #EB2F32;
      }
    }

    thead {
      th {
        background-color: #f1f2f5;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}
</style>
