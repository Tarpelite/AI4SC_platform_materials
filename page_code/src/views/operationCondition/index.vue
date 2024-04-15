<template>
  <div class="operationCondition">
    <div class="operationalBg">
      <div class="operationalMap">
        <mapEcharts />
      </div>
      <div class="operationalTable">
        <div class="title">情况表格</div>
        <div style="margin-top: 10px;">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#F1F2F5',color:'#606266'}">
            <el-table-column
              prop="name"
              label="集群名称">
            </el-table-column>
            <el-table-column
              prop="serve"
              label="服务"
              width="180">
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span :class="scope.row.status">
                  {{ scope.row.status == 'normal' ? '正常' : ( scope.row.status == 'abnormal' ? '异常' : '停止' ) }}
                </span>
              </template>  
            </el-table-column>
            <el-table-column
              prop="time"
              label="检测时间">
            </el-table-column>
            <el-table-column
              prop="region"
              label="区域">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
import mapEcharts from "./map.vue"
export default {
  data() {
    return {
      images: images,
      tableData: [
        {
          name: '北航高算中心-XE1',
          serve: '主控节点',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '京津冀'
        },
        {
          name: '北航高算中心-XE1',
          serve: '主控节点',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '京津冀'
        },
        {
          name: '百度云-CPU',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '京津冀'
        }
        ,
        {
          name: '百度云-CPU',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '京津冀'
        }
        ,
        {
          name: '浙大高算中心-GE1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '长三角'
        }
        ,
        {
          name: '浙大高算中心-GE1',
          serve: '计算服务',
          status: 'abnormal',
          time: '2024/3/9  19:27:00',
          region: '长三角'
        }
        ,
        {
          name: '浙大高算中心-GE1',
          serve: '计算服务',
          status: 'stop',
          time: '2024/3/9  19:27:00',
          region: '长三角'
        }
        ,
        {
          name: '华为云-MC1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '大湾区'
        }
        ,
        {
          name: '华为云-MC1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '大湾区'
        }
        ,
        {
          name: '华为云-MC1',
          serve: '计算服务',
          status: 'normal',
          time: '2024/3/9  19:27:00',
          region: '大湾区'
        }
      ]
    };
  },
  components: {
    mapEcharts
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.operationCondition {
  height: 100%;
  margin-top: 20px;
  .operationalBg {
    margin: 0 auto;
    background: linear-gradient(
      180deg,
      #deeaff 0%,
      #deeaff 18%,
      rgba(222, 234, 255, 0) 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    .operationalMap {
      width: 1280px;
      height: 720px;
      background: rgba(15, 52, 153, 0.3);
      border-radius: 20px 20px 20px 20px;
      margin-top: 20px;
    }
    .operationalTable {
      width: 1280px;
      height: 650px;
      margin-top: 48px;
      background: #ffffff;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16px 16px 16px 16px;
      padding: 24px 40px;
      .title {
        font-weight: bold;
        font-size: 24px;
        color: #262626;
      }
      
    }
  }
}

::v-deep.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{
  background-color: rgba(222, 234, 255, .6) !important;
}
.normal {
  color: #52C41A;
}
.abnormal {
  color: #FAAD14;
}
.stop {
  color: #EB2F32;
}
</style>