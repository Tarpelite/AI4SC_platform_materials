<template>
  <div class="mapModule">
    <div class="title">运行地图</div>
    <img src="./img/totalImg.png" class="centerImg" />
    <div class="echarts" id="mapEcharts"></div>
  </div>
</template>

<script>
var myChart = {};
import * as echarts from "echarts";
import chinaMap from "./china.json";
export default {
  data() {
    return {
      map: "population",
      line: [
        {
          coords: [
            ["117.190182", "39.125596"],
            ["116.405285", "39.904989"],
          ],
          count: "70",
        },
        {
          coords: [
            [113.665412, 34.757975],
            ["116.405285", "39.904989"],
          ],
          count: "70",
        },
        {
          coords: [
            [118.767413, 32.041544],
            ["116.405285", "39.904989"],
          ],
          count: "70",
        },
        {
          coords: [
            [117.283042, 31.86119],
            ["116.405285", "39.904989"],
          ],
          count: "70",
        },
        {
          coords: [
            [120.153576, 30.287459],
            ["116.405285", "39.904989"],
          ],
          count: "70",
        },
        {
          coords: [
            [113.280637, 23.125178],
            ["116.405285", "39.904989"],
          ],
          count: "70",
        },
      ],
      point: [
        {
          count: 5,
          name: "北京市",
          ratio: "1.00",
          value: ["116.405285", "39.904989"],
        },
        {
          count: 2,
          name: "天津市",
          ratio: "1.00",
          value: ["117.190182", "39.125596"],
        },
        {
          count: 2,
          name: "河南省",
          ratio: "1.00",
          value: [113.665412, 34.757975],
        },
        {
          count: 2,
          name: "江苏省",
          ratio: "1.00",
          value: [118.767413, 32.041544],
        },
        {
          count: 2,
          name: "安徽省",
          ratio: "1.00",
          value: [117.283042, 31.86119],
        },
        {
          count: 2,
          name: "浙江省",
          ratio: "1.00",
          value: [120.153576, 30.287459],
        },
        {
          count: 2,
          name: "广东省",
          ratio: "1.00",
          value: [113.280637, 23.125178],
        },
      ],
      enterpriseList: [],
      showEnterpriseList: false,
      scroll: "",
      positionX: "",
      positionY: "",
      showSubItemInfo: false,
      info: {},
      max: 0,
    };
  },
  methods: {
    initial() {
      myChart = echarts.init(document.getElementById("mapEcharts"));
      echarts.registerMap("china", { geoJSON: chinaMap });
      var option = {
        geo: {
          map: "china",
          top: "31%",
          left: "27%",
          zoom: 1.6, //地图的缩放
          label: {
            show: true,
            color: "#fff",
            formatter: function (params) {
              if(params.name == '北京市') {
                return '北京航空航天大学'
              }else if(params.name == '浙江省') {
                return '浙江大学'
              }else if(params.name == '广东省') {
                return '中山大学 华为云'
              }else if(params.name == '河北省') {
                return '百度云'
              }else {
                return ''
              }
            },
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          itemStyle: {
            normal: {
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
          show: false,
          min: 0,
          max: this.max,
          right: "8",
          bottom: "8",
          itemWidth: "8",
          itemHeight: "118",
          seriesIndex: [0],
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
            zoom: 1.2,
            label: {
              normal: {
                show: true,
                color: "#fff",
              },
              emphasis: {
                show: true,
              },
            },
            data: [
              {
                name: "北京市",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "河北省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "辽宁省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "江苏省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "浙江省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "四川省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "湖北省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "安徽省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "湖南省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "陕西省",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "香港特别行政区",
                value: 1,
                itemStyle: { color: "#509FFA" },
              },
              {
                name: "青海省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .8)" },
              },
              {
                name: "福建省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .8)" },
              },
              {
                name: "青海省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .8)" },
              },
              {
                name: "贵州省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "贵州省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "云南省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "黑龙江省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "吉林省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "天津市",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "山东省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "台湾省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "上海市",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "南海诸岛",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .6)" },
              },
              {
                name: "江西省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "广东省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "山西省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "河南省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "甘肃省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "宁夏回族自治区",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "重庆市",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "广西壮族自治区",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "海南省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "台湾省",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .4)" },
              },
              {
                name: "新疆维吾尔自治区",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .2)" },
              },
              {
                name: "西藏自治区",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .2)" },
              },
              {
                name: "内蒙古自治区",
                value: 1,
                itemStyle: { color: "rgba(80, 159, 250, .2)" },
              },
            ],
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
                color: "#fff", //线的颜色
                width: 1,
                opacity: 1,
                curveness: 0.5,
                type: "solid",
              },
              emphasis: {
                color: "#fad232",
              },
            },
            data: this.line,
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
            data: this.point,
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
.mapModule {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("@/utils/image/mapbg.png");
  background-size: 100% 100%;
  .centerImg {
    position: absolute;
    top: 268px;
    right: 464px;
    width: 70px;
    height: 70px;
    z-index: 100;
    -webkit-transform: rotate(360deg);
    animation: rotation 5s linear infinite;
    -moz-animation: rotation 5s linear infinite;
    -webkit-animation: rotation 5s linear infinite;
    -o-animation: rotation 5s linear infinite;
    pointer-events: none;
  }
  .title {
    position: absolute;
    top: 20px;
    left: 40px;
    font-weight: bold;
    font-size: 24px;
    color: #ffffff;
  }
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
