<template>
  <div class="mapModule">
    <div class="chart-info-list">
      <div class="dashboard-item" :style="{top: item.top}" v-for="(item, index) in mapDashboardList" :key="index">
        <div class="item-left">
          <img :src="item.img" alt="">
        </div>
        <div class="item-right">
          <div class="info-right-title">{{ item.title }}</div>
          <div class="info-right-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <img src="./img/totalImg.png" class="centerImg"/>
    <div class="echarts" id="mapEcharts"></div>
  </div>
</template>

<script>
var myChart = {};
import * as echarts from "echarts";
import chinaMap from "./china.json";
import images from "@/utils/js/exportImage";

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
          tooltipTitle: '北京（算力中心）',
          subList: ['北京航空航天大学', '北京航空航天大学', '北京航空航天大学',],
          value: ["116.405285", "39.904989"],
        },
        {
          count: 2,
          name: "天津市",
          tooltipTitle: '天津市（算力中心）',
          subList: ['天津航空航天大大学', '天津航空航天大大学', '天津航空航天大大学',],
          ratio: "1.00",
          value: ["117.190182", "39.125596"],
        },
        {
          count: 2,
          name: "河南省",
          ratio: "1.00",
          tooltipTitle: '北京（算力中心）',
          subList: ['北京航空航天大学', '北京航空航天大学', '北京航空航天大学',],
          value: [113.665412, 34.757975],
        },
        {
          count: 2,
          name: "江苏省",
          ratio: "1.00",
          tooltipTitle: '北京（算力中心）',
          subList: ['北京航空航天大学', '北京航空航天大学', '北京航空航天大学',],
          value: [118.767413, 32.041544],
        },
        {
          count: 2,
          name: "安徽省",
          ratio: "1.00",
          tooltipTitle: '北京（算力中心）',
          subList: ['北京航空航天大学', '北京航空航天大学', '北京航空航天大学',],
          value: [117.283042, 31.86119],
        },
        {
          count: 2,
          name: "浙江省",
          ratio: "1.00",
          tooltipTitle: '北京（算力中心）',
          subList: ['北京航空航天大学', '北京航空航天大学', '北京航空航天大学',],
          value: [120.153576, 30.287459],
        },
        {
          count: 2,
          name: "广东省",
          ratio: "1.00",
          tooltipTitle: '北京（算力中心）',
          subList: ['北京航空航天大学', '北京航空航天大学', '北京航空航天大学',],
          value: [113.280637, 23.125178],
        },
      ],
      mapList: [],
      enterpriseList: [],
      showEnterpriseList: false,
      scroll: "",
      positionX: "",
      positionY: "",
      showSubItemInfo: false,
      info: {},
      max: 0,
      mapDashboardList: [
        {title: '平台用户数', content: '104705', img: images.map_icon1, top: '24px'},
        {title: '算力总数', content: '11782P', img: images.map_icon2, top: '102px'},
        {title: '储存总数', content: '1.74EB', img: images.map_icon3, top: '180px'},
        {title: '算力中心个数', content: '8', img: images.map_icon4, top: '542px'},
        {title: '伙伴中心个数', content: '4', img: images.map_icon5, top: '620px'}
      ]
    };
  },
  methods: {
    initial() {
      myChart = echarts.init(document.getElementById("mapEcharts"));
      echarts.registerMap("china", {geoJSON: chinaMap});
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
              } else if(params.name == '浙江省') {
                return '浙江大学'
              } else if(params.name == '广东省') {
                return '中山大学 华为云'
              } else if(params.name == '河北省') {
                return '百度云'
              } else {
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
        tooltip: {
          trigger: 'item', // axis显示该列下所有坐标轴对应数据，item只显示该点数据
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: 'rgba(11,16,41,0.6)',
          padding: 4,
          borderColor: '#587DFF',
          textStyle: {
            color: '#DEEAFF'
          },
          formatter: (params) => {
            const curTip =this.point.find(item => item.name === params.name)
            if(!curTip) {
              return ''
            }
            let htmlTxt = `<div style="width: 142px;height: 24px;background: #2954FF; text-indent: 8px; font-size: 14px;">${curTip.tooltipTitle}</div>`
            curTip.subList.forEach( item=> {
              htmlTxt += `<div style="width: 142px;height: 20px;background: #2954FF; text-indent: 8px; font-size: 12px; margin-top: 2px;">${item}</div>`
            })
            var res = `<div >${htmlTxt}</div>`
            return res
          }
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
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "河北省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "辽宁省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "江苏省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "浙江省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "四川省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "湖北省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "安徽省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "湖南省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "陕西省",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "香港特别行政区",
                value: 1,
                itemStyle: {color: "#509FFA"},
              },
              {
                name: "青海省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .8)"},
              },
              {
                name: "福建省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .8)"},
              },
              {
                name: "青海省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .8)"},
              },
              {
                name: "贵州省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "贵州省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "云南省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "黑龙江省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "吉林省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "天津市",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "山东省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "台湾省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "上海市",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "南海诸岛",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .6)"},
              },
              {
                name: "江西省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "广东省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "山西省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "河南省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "甘肃省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "宁夏回族自治区",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "重庆市",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "广西壮族自治区",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "海南省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "台湾省",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .4)"},
              },
              {
                name: "新疆维吾尔自治区",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .2)"},
              },
              {
                name: "西藏自治区",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .2)"},
              },
              {
                name: "内蒙古自治区",
                value: 1,
                itemStyle: {color: "rgba(80, 159, 250, .2)"},
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

  .chart-info-list {
    .dashboard-item {
      position: absolute;
      left: 24px;
      top: 24px;
      width: 170px;
      height: 68px;
      background: rgba(11, 16, 41, 0.4);
      border-radius: 0px 0px 0px 0px;
      border: 1px solid #587DFF;
      display: flex;
      align-items: center;
      padding: 4px;

      .item-left {
        height: 60px;
        margin-right: 2px;

        img {
          width: 60px;
          height: 60px;
        }
      }

      .item-right {
        .info-right-title {
          width: 100px;
          height: 24px;
          background: rgba(80, 159, 250, 0.3);
          border-radius: 0px 0px 0px 0px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 400;
          font-size: 14px;
          color: #DEEAFF;
          line-height: 24px;
          margin-bottom: 2px;
          text-indent: 8px;
        }

        .info-right-content {
          width: 100px;
          height: 34px;
          background: rgba(80, 159, 250, 0.3);
          border-radius: 0px 0px 0px 0px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 500;
          font-size: 20px;
          color: #DEEAFF;
          line-height: 34px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          text-indent: 8px;
        }
      }
    }
  }

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
