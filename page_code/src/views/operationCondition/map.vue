<template>
  <div>
    <img src="./img/totalImg.png" class="centerImg" />
    <div class="echarts" id="mapEcharts"></div>
  </div>
</template>

<script>
var myChart = {};
import * as echarts from "echarts";
import "./china.js";
export default {
  data() {
    return {};
  },
  methods: {
    initial() {
      myChart = echarts.init(document.getElementById("mapEcharts"));

      var option = {
        geo: {
          map: "china",
          zoom: 1.2, //地图的缩放
          label: {
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#122955",
              borderColor: "#337eff", //国界线颜色
              borderWidth: 1,
              borderType: "solid", //国界线类型
            },
            emphasis: {
              areaColor: "#337eff",
            },
          },
        },
        visualMap: {
          min: 0,
          max: 5,
          right: "8",
          bottom: "8",
          calculable: true,
          itemWidth: "8",
          itemHeight: "118",
          orient: "horizontal",
          align: "right",
          seriesIndex: [0],
          inRange: {
            color: [
              "#122955",
              "#153166",
              "#1a3d7d",
              "#1d468f",
              "#204d9d",
              "#255ab6",
              "#2864cb",
              "#2c6cdb",
              "#2e71e6",
            ],
          },
          textStyle: {
            color: "#B3DBFF",
            fontSize: 10,
            padding: "1",
          },
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            map: "china",
            roam: true,
            zoom: 1.2,
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            data: [],
          },
          {
            type: "lines", //飞线
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.1,
              color: "#2bc8dc", //箭头颜色
              symbol: "",
              symbolSize: 4,
            },
            lineStyle: {
              normal: {
                color: "#2bc8dc", //线的颜色
                width: 1.5,
                opacity: 1,
                curveness: 0.5,
                type: "solid",
              },
              emphasis: {
                color: "#fad232",
              },
            },
            data: [],
          },
          {
            type: "effectScatter", //圆点
            coordinateSystem: "geo",
            rippleEffect: {
              brushType: "stroke",
            },
            zlevel: 1,
            symbol: "circle",
            symbolSize: 12,
            itemStyle: {
              color: "#fad232",
              normal: {
                color: "rgba(234,191,9,1)",
              },
            },
            hoverAnimation: true,
            silent: false,
            data: [],
            showEffectOn: "render",
            hoverAnimation: true,
          },
        ],
      };
      myChart.setOption(option, true);
    },
  },
  mounted() {
    this.initial();
  },
};
</script>

<style scoped lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
</style>
