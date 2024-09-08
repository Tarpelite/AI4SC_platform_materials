<template>
  <div>
    <div class="smart-left">
      <div class="smart-left-container">
        <h3>操作面板</h3>
        <div class="filter-item">
          <div class="filter-item-title">电离层浓度</div>
          <el-slider v-model="value2" :show-tooltip="false"></el-slider>
          <div class="slider-text">
            <span>0m-3</span>
            <span>20m-3</span>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title">通信卫星选择（单选）</div>
          <div class="radio-group">
            <div class="radio-group-item" :class="satelliteId === 1 ? 'select': ''" @click="satelliteClick(1)">北斗一号
            </div>
            <div class="radio-group-item" :class="satelliteId === 2 ? 'select': '' " @click="satelliteClick(2)">北斗二号
            </div>
            <div class="radio-group-item" :class="satelliteId === 3 ? 'select': '' " @click="satelliteClick(3)">GPS
            </div>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-item-title">手机天线结构选择（单选）</div>
          <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button type="primary" class="confirm-btn" style="width: 450px; margin: 0 auto">开始仿真</el-button>
      </div>
    </div>
    <div class="smart-right"></div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      value2: 46,
      radio1: 1,
      satelliteId: 0,
      phoneAirWire: 1
    }
  },
  methods: {
    satelliteClick(id) {
      this.satelliteId = id
    }
  },
}
</script>

<style lang="scss">
.smart-left {
  width: 600px;
  height: calc(100vh - 80px);
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(250, 250, 250, 1) 0%, rgba(222, 233, 254, 1) 100%);
  display: flex;
  align-items: center;

  .smart-left-container {
    margin: auto;
    width: 521px;
    height: 85vh;
    opacity: 1;
    padding: 28px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

    h3 {
      font-size: 24px;
      margin-bottom: 24px;
    }

    .filter-item {
      width: 463px;
      height: 145px;
      border-radius: 16px;
      background: rgba(243, 247, 255, 1);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
      margin-bottom: 24px;
      padding: 18px;

      .filter-item-title {
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 32.93px;
        color: rgba(56, 56, 56, 1);
        text-align: left;
        vertical-align: top;
      }

      .slider-text {
        display: flex;
        justify-content: space-between;
        color: rgba(56, 56, 56, 1);
        font-size: 14px;
        font-weight: 500;
      }

      .el-input {
        margin-top: 20px;
        input {
          width: 350px !important;
        }
      }
      .radio-group {
        display: flex;
        margin-top: 20px;

        .radio-group-item {
          width: 104.64px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-radius: 16px;
          background: rgba(255, 255, 255, 1);
          border: 2px solid rgba(88, 125, 255, 1);
          color: rgba(88, 125, 255, 1);
          margin-right: 20px;
          cursor: pointer;

          &.select {
            color: #fff;
            background: rgba(88, 125, 255, 1);
          }
        }

      }
      .confirm-btn {
        margin: 0 auto;
      }
    }
  }
}
</style>
