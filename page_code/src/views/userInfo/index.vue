<template>
  <div class="userInfo">
    <div class="content">
      <div class="information">
        <div class="infoBox">
          <div class="avatar">
            <img :src="images.user" alt="" />
          </div>
          <div class="info">
            <div class="name">Hi,Admin</div>
            <div class="time">今天是你加入科学智算共性平台的第365天~</div>
            <img :src="images.edit" alt="" />
            <div class="basicInformation">
              <div class="left">
                <div class="item">
                  <span class="title">邮箱</span>
                  <span class="spanContent">18759445778@163.com</span>
                </div>
                <div class="item">
                  <span class="title">手机号</span>
                  <span class="spanContent">18759445778</span>
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <span class="title">微信</span>
                  <span class="spanContent">DeepHPMs</span>
                </div>
                <div class="item">
                  <span class="title">加入时间</span>
                  <span class="spanContent">2023-04-08</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="collect">
          <div class="quest">
            <div class="title">收藏科学任务数量</div>
            <div class="num">8</div>
          </div>
          <div class="kit">
            <div class="title">收藏科学套件数量</div>
            <div class="num">5</div>
          </div>
        </div>
      </div>
      <div class="history">
        <div class="title">浏览历史</div>
        <div class="historyBody">
          <div
            class="historyItem"
            v-for="(item, index) in historyList"
            :key="index"
            @click="$router.push({ path: '/newsNoticeDetail' })"
          >
            <div class="ItemLeft">
              <img :src="item.img" alt="" />
            </div>
            <div class="ItemRight">
              <div class="title">{{ item.title }}</div>
              <div class="type">
                {{ item.type }}
                <div class="time">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collectBox">
      <div class="tab">
        <div
          class="quest"
          :class="active == 0 ? 'active' : ''"
          @click="active = 0"
        >
          科学任务收藏
        </div>
        <div
          class="kit"
          :class="active == 1 ? 'active' : ''"
          @click="active = 1"
        >
          科学套件收藏
        </div>
      </div>
      <div class="collectContent">
        <div v-if="active == 0" style="display: flex; flex-wrap: wrap">
          <div
            class="questItem"
            v-for="(item, index) in collectList"
            :key="index"
            @click="jumpDetail(0,item)"
          >
            <div class="img">
              <img :src="item.img" alt="" />
            </div>
            <div class="boxBody">
              <div class="title">{{ item.title }}</div>
              <div class="msg">{{ item.msg }}</div>
              <div class="tag">
                <div class="type">{{ item.type }}</div>
                <div class="algorithm">{{ item.algorithm }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="active == 1" style="display: flex; flex-wrap: wrap">
          <div
            class="kitItem mr24"
            v-for="(item, index) in kitList"
            :key="index"
            @click="jumpDetail(1,item)"
          >
            <img :src="item.img" alt="" />
            <div class="text">
              <div class="titleChild">{{ item.title }}</div>
              <div class="msg">{{ item.msg }}</div>
            </div>
            <img
              class="smallImg"
              :src="item.smallImg"
              :style="item.type == 'baidu' ? 'width:65px;height:40px;' : ''"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";
export default {
  data() {
    return {
      images: images,
      historyList: [
        {
          img: "https://pic.imgdb.cn/item/65ef08039f345e8d03e0fa72.png",
          title: "上海人工智能实验室科学家白磊进行关于气象大模型的报告和讨论",
          type: "社区活动",
          time: "4/8 0:57",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef04059f345e8d03bb7fda.png",
          title: "AI炼金术革新化学：MIT学者使用生成式AI，六秒生成新化学反应",
          type: "学术动态",
          time: "4/8 0:57",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef042d9f345e8d03bcd868.png",
          title: "人工智能促进科学、能源和安全的报告",
          type: "产业动向",
          time: "4/8 0:57",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef044e9f345e8d03bdf414.png",
          title: "使用深度神经网络整合药物与疾病关联数据进行药物再利用",
          type: "学术动态",
          time: "4/8 0:57",
        },
        {
          img: "https://pic.imgdb.cn/item/65ef046f9f345e8d03bf228f.png",
          title:
            "中国科学院团队利用 AI 大模型训练技术解决同步辐射海量数据处理难题",
          type: "学术动态",
          time: "4/8 0:57",
        },
      ],
      active: 0,
      collectList: [
        {
          title: "DeepHPMs求解Burgers-BUAA方程",
          msg: "DeepHPMs应用于Burgers方程，展现流体动力学中复杂波动的数值解。",
          img: "https://pic.imgdb.cn/item/6612a08d68eb9357136ae905.png",
          type: "数学",
          algorithm: "百度AI Studio",
        },
        {
          title: "DeepOnet求解常微分方程",
          msg: "利用DeepOnet解决常微分方程问题，为科学计算提供新的深度学习方法。",
          img: "https://pic.imgdb.cn/item/6612a16868eb9357136b82c0.png",
          type: "数学",
          algorithm: "百度AI Studio",
        },
        {
          title: "深度学习求解Euler_Beam问题",
          msg: "利用深度学习技术对Euler Beam理论进行模拟，提高工程力学问题的求解效率。",
          img: "https://pic.imgdb.cn/item/6612a2a768eb9357136ce477.png",
          type: "数学",
          algorithm: "百度AI Studio",
        },
        {
          title: "AMGNet",
          msg: "AMGNet探索了深度学习在科学计算领域的应用，尤其是在加速多重网格方法解决偏微分方程方面的潜力。",
          img: "https://pic.imgdb.cn/item/6612a84e68eb935713737fcf.png",
          type: "流体力学",
          algorithm: "百度AI Studio",
        },
        {
          title: "Aneurysm",
          msg: "通过深度学习方法处理血管瘤问题，尤其是在脑血管疾病诊断和治疗计划制定中的应用。",
          img: "https://pic.imgdb.cn/item/6612a8eb68eb935713743a4f.png",
          type: "流体力学",
          algorithm: "百度AI Studio",
        },
        {
          title: "2D-Biharmonic",
          type: "结构力学",
          algorithm: "百度AI Studio",
          img: "https://pic.imgdb.cn/item/6612b29268eb9357137e0e3a.png",
          msg: "应用物理信息神经网络求解二维双调和方程，探索在复杂边界条件下的数值解法。",
        },
        {
          title: "hPINNs(PINN with hard constraints)",
          type: "材料科学",
          algorithm: "百度AI Studio",
          img: "https://pic.imgdb.cn/item/65e089959f345e8d039380f6.png",
          msg: "将硬约束条件整合进物理信息神经网络中，提高求解偏微分方程的准确度和鲁棒性。",
        },
        {
          title: "FourCastNet",
          type: "气象学",
          algorithm: "百度AI Studio",
          img: "https://pic.imgdb.cn/item/6612b4c468eb9357138150b6.png",
          msg: "基于深度学习的天气预报模型，通过自适应傅里叶神经算子高效预测气象变量，如风速和降水。",
        },
      ],
      kitList: [
        {
          id: 1,
          title: "MindEarth地球科学领域套件",
          msg: "地球科学领域套件MindEarth致力于高效使能AI+气象海洋的融合研究。",
          img: "https://pic.imgdb.cn/item/65f25b6b9f345e8d03a16ef2.gif",
          smallImg: images.huawei,
          type: "huawei",
          link: "https://gitee.com/mindspore/mindscience/tree/master/MindEarth",
        },
        {
          id: 2,
          title: "Mindflow计算流体求解套件",
          msg: "支持物理驱动、数据驱动和数据机理融合驱动的AI流体仿真",
          img: "https://pic.imgdb.cn/item/65f25bac9f345e8d03a27224.gif",
          smallImg: images.huawei,
          type: "huawei",
          link: "https://gitee.com/mindspore/mindscience/tree/master/MindFlow",
        },
        {
          id: 3,
          title: "MindElec计算电磁仿真领域套件",
          msg: "持数据建构及转换、仿真计算、结果可视化以及端到端的AI电磁仿真",
          img: "https://pic.imgdb.cn/item/65f25bed9f345e8d03a34c02.png",
          smallImg: images.huawei,
          type: "huawei",
          link: "https://gitee.com/mindspore/mindscience/tree/master/MindElec",
        },
        {
          id: 4,
          title: "MindChemistry计算化学领域套件",
          msg: "支持多体系，多尺度任务的AI+化学仿真",
          img: "https://pic.imgdb.cn/item/65f25c359f345e8d03a440e7.jpg",
          smallImg: images.huawei,
          type: "huawei",
          link: "https://gitee.com/mindspore/mindscience/tree/master/MindChemistry",
        },
        {
          id: 5,
          title: "MindSPONGE计算生物领域套件",
          msg: "支持高性能、模块化，端到端可微，类AI架构编写的分子模拟功能以及MSA生成，蛋白质折叠训练推理和蛋白质结构打分，NMR数据解析等常用功能。",
          img: "https://pic.imgdb.cn/item/65f25c439f345e8d03a47148.gif",
          smallImg: images.huawei,
          type: "huawei",
          link: "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE",
        },
      ],
    };
  },
  computed: {},
  components: {},
  methods: {
    jumpDetail(type,item) {
      if (type) {
        window.open(item.link)
      } else {
        this.$router.push({ path: "/scientificMissionDetail" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  height: 100%;
  background: #fafafa;
  max-width: 2000px;
  min-width: 900px;
  margin: 0 auto;
  .content {
    width: 1440px;
    padding: 40px 80px;
    margin: 0 auto;
    display: flex;
    .information {
      width: 860px;
      margin-right: 20px;
      .infoBox {
        height: 280px;
        background: #ffffff;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 16px 16px 16px 16px;
        padding: 40px;
        display: flex;
        .avatar {
          img {
            width: 120px;
            height: 120px;
          }
        }
        .info {
          margin: 20px 0 0 40px;
          .name {
            font-weight: bold;
            font-size: 24px;
            color: #262626;
          }
          .time {
            font-size: 14px;
            color: #262626;
            margin-top: 8px;
          }
          img {
            width: 16px;
            height: 16px;
            margin-top: 8px;
            cursor: pointer;
          }
          .basicInformation {
            display: flex;
            margin-top: 10px;
            .left {
              margin-right: 50px;
            }
            .item {
              font-size: 14px;
              color: #262626;
              margin-top: 15px;
              .title {
                width: 100px;
                display: inline-block;
              }
            }
          }
        }
      }
      .collect {
        margin-top: 20px;
        height: 120px;
        background: #ffffff;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 16px 16px 16px 16px;
        padding: 24px 40px;
        display: flex;
        .title {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
          text-align: center;
        }
        .num {
          font-weight: 500;
          font-size: 40px;
          color: #6e91fa;
          text-align: center;
        }
        .quest {
          width: 370px;
        }
        .kit {
          width: 370px;
        }
      }
    }
    .history {
      width: 400px;
      height: 420px;
      background: #ffffff;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16px 16px 16px 16px;
      padding: 24px;
      .historyBody {
        .historyItem {
          display: flex;
          margin-top: 6px;
          padding: 6px;
          cursor: pointer;
          background: #fafafa;
          .ItemLeft {
            position: relative;
            img {
              width: 48px;
              height: 48px;
              border-radius: 8px 8px 8px 8px;
            }
          }
          .ItemRight {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            .title {
              font-weight: 500;
              font-size: 14px;
              color: #262626;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: normal;
            }
            .type {
              font-size: 14px;
              color: #587dff;
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
              .time {
                color: #262626;
              }
            }
          }
        }
        .historyItem:hover {
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          .title {
            color: #2954ff;
          }
        }
      }
    }
  }
  .collectBox {
    width: 1440px;
    margin: 0 auto;
    padding: 0px 80px;
    .tab {
      width: 400px;
      height: 40px;
      background: #d9d9d9;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 12px 12px 12px 12px;
      display: flex;
      text-align: center;
      line-height: 35px;
      div {
        margin: 2px;
        width: 198px;
        height: 36px;
        cursor: pointer;
      }
      div:hover {
        color: #2954ff;
        background: #ffffff;
        border-radius: 10px 10px 10px 10px;
      }
      .active {
        color: #2954ff;
        background: #ffffff;
        border-radius: 10px 10px 10px 10px;
      }
    }
    .collectContent {
      margin-top: 40px;
      border-radius: 16px;
      .questItem {
        width: 290px;
        height: 320px;
        margin: 0 30px 30px 0;
        cursor: pointer;
        .img {
          width: 290px;
          height: 160px;
          background: linear-gradient(180deg, #9cb9ff 0%, #deeaff 100%);
          border-radius: 16px 16px 0px 0px;
          img {
            width: 250px;
            height: 139px;
            border-radius: 8px 8px 0px 0px;
            margin: 20px 20px 0 20px;
          }
        }
        .boxBody {
          width: 290px;
          height: 160px;
          padding: 15px 20px;
          background: #fff;
          border-radius: 0px 0px 16px 16px;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          .title {
            font-weight: bold;
            font-size: 16px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
          }
          .msg {
            font-size: 12px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin-top: 8px;
          }
          .tag {
            display: flex;
            font-size: 12px;
            margin-top: 24px;
            .type {
              background: #587dff;
              border-radius: 14px 14px 14px 14px;
              color: #ffffff;
              padding: 2px 8px;
              margin-right: 5px;
            }
            .algorithm {
              background: #ffffff;
              border: 1px solid #587dff;
              border-radius: 14px 14px 14px 14px;
              color: #587dff;
              padding: 2px 8px;
            }
          }
        }
      }
      .kitItem {
        width: 400px;
        height: 420px;
        background: linear-gradient(
          180deg,
          #ccd7ff 0%,
          #f5f7ff 52%,
          #ffffff 100%
        );
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        padding: 20px;
        position: relative;
        margin: 0 25px 30px 0;
        cursor: pointer;
        .text {
          margin-top: 24px;
          .titleChild {
            font-weight: bold;
            font-size: 24px;
            color: #262626;
          }
          .msg {
            font-size: 14px;
            color: #262626;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            margin-top: 10px;
          }
        }
        .smallImg {
          width: 80px;
          height: 28px;
          position: absolute;
          right: 20px;
          bottom: 20px;
        }
        img {
          width: 360px;
          height: 200px;
          border-radius: 10px;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>