<template>
  <div class="scientificMission">
    <div class="bannerBg">
      <div class="banner">
        <el-carousel height="400px" ref="nop">
          <el-carousel-item
            v-for="item in carouselData"
            :key="item.id"
            :class="'carousel' + item.id"
          >
            <div class="carouselItem">
              <div class="left">
                <div class="title">{{ item.title }}</div>
                <div class="msg">{{ item.title }}</div>
                <div class="detail" @click="jump(item)">了解详情</div>
              </div>
              <div class="right">
                <img :src="item.img" alt="" />
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="body">
      <div style="width: 1280px; margin: 0 auto">
        <div class="bodyItem" v-for="(item, index) in list" :key="index">
          <div class="header">
            <div class="title">{{ item.name }}</div>
            <div class="more">
              更多
              <img :src="images.moreRight" alt="" />
            </div>
          </div>
          <div class="content">
            <div
              class="contentItem"
              v-for="(item1, index1) in item.childList"
              :key="index1"
            >
              <div class="img">
                <img :src="item1.img" alt="" />
              </div>
              <div class="boxBody">
                <div class="title">{{ item1.title }}</div>
                <div class="msg">{{ item1.msg }}</div>
                <div class="tag">
                  <div class="type">{{ item1.type }}</div>
                  <div class="algorithm">{{ item1.algorithm }}</div>
                </div>
              </div>
            </div>
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
      carouselData: [
        {
          id: 1,
          title: "深度学习求解Euler_Beam问题",
          msg:
            "利用深度学习技术对Euler Beam理论进行模拟，提高工程力学问题的求解效率。",
          img: "https://pic.imgdb.cn/item/6612a2a768eb9357136ce477.png",
        },
        {
          id: 2,
          title: "FourCastNet",
          msg:
            "基于深度学习的天气预报模型，通过自适应傅里叶神经算子高效预测气象变量，如风速和降水。",
          img: "https://pic.imgdb.cn/item/6612b4c468eb9357138150b6.png",
        },
        {
          id: 3,
          title: "东方.御风",
          msg:
            "在航空航天领域，通过AI模型优化飞机气动设计，提升飞机性能和环保性。",
          img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbb5a.png",
        },
        {
          id: 4,
          title: "CTEFNet: 基于 CNN 与迁移学习的厄尔尼诺预测模型",
          msg:
            "CTEFNet结合卷积神经网络和迁移学习，通过时间序列分析提升厄尔尼诺现象的预测时长，为气候变化研究提供高精度的预测工具。。",
          img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbc9f.png",
        },
        {
          id: 5,
          title: "DEM-SRNet: 全球3弧秒（90m）海陆高分辨率数字高程模型",
          msg:
            "DEM-SRNet应用深度残差网络对地面DEM数据进行预训练，显著提升全球数字高程模型的分辨率，为地理科学研究和环境监测提供更为精确的地形数据。",
          img: "https://pic.imgdb.cn/item/6612d7e168eb935713bd2d60.png",
        },
        {
          id: 6,
          title: "Phiflow playground - Kolmogorov流模拟",
          msg:
            "应用PhiFlow流体库对Kolmogorov流进行仿真，用户可以通过上传的方式指定初始压力场",
          img: "https://pic.imgdb.cn/item/6612dbd768eb935713c2cc1c.png",
        },
      ],
      list: [
        {
          name: "数学（AI for Math）",
          childList: [
            {
              title: "DeepHPMs求解Burgers-BUAA方程",
              msg:
                "DeepHPMs应用于Burgers方程，展现流体动力学中复杂波动的数值解。",
              img: "https://pic.imgdb.cn/item/6612a08d68eb9357136ae905.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "DeepOnet求解常微分方程",
              msg:
                "利用DeepOnet解决常微分方程问题，为科学计算提供新的深度学习方法。",
              img: "https://pic.imgdb.cn/item/6612a16868eb9357136b82c0.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "深度学习求解Euler_Beam问题",
              msg:
                "利用深度学习技术对Euler Beam理论进行模拟，提高工程力学问题的求解效率。",
              img: "https://pic.imgdb.cn/item/6612a2a768eb9357136ce477.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Laplace2D",
              msg:
                "通过解决二维Laplace方程，深入分析电磁学和流体动力学中的稳态问题。",
              img: "https://pic.imgdb.cn/item/6612a43368eb9357136f53a7.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Lorenz_transform_physx",
              msg:
                "洛伦兹变换在物理学中的应用，通过混沌理论解析气象预测的复杂性。",
              img: "https://pic.imgdb.cn/item/6612a48b68eb9357136f89c1.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "PIRBN",
              msg:
                "通过开发一种新型的物理信息神经网络，PIRBN项目提升了局部近似函数的准确度和应用范围。",
              img: "https://pic.imgdb.cn/item/6612a51768eb9357137058ec.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Rossler_transform_physx",
              msg:
                "Rossler系统的研究强调了混沌理论在预测复杂系统行为中的重要性，特别是在化学反应动力学中。",
              img: "https://pic.imgdb.cn/item/6612a59568eb93571370a859.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Volterra_IDE",
              msg:
                "通过沃尔泰拉积分方程的研究，项目探索了在数学物理和生物学模型中解决积分方程的新方法。",
              img: "https://pic.imgdb.cn/item/6612a75568eb93571372aec0.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
          ],
        },
        {
          name: "流体力学",
          childList: [
            {
              title: "AMGNet",
              msg:
                "AMGNet探索了深度学习在科学计算领域的应用，尤其是在加速多重网格方法解决偏微分方程方面的潜力。",
              img: "https://pic.imgdb.cn/item/6612a84e68eb935713737fcf.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Aneurysm",
              msg:
                "通过深度学习方法处理血管瘤问题，尤其是在脑血管疾病诊断和治疗计划制定中的应用。",
              img: "https://pic.imgdb.cn/item/6612a8eb68eb935713743a4f.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "BubbleNet",
              msg:
                "利用物理信息神经网络(PINNs)模拟气泡流动，研究气泡在流体中的行为及其对流场的影响。",
              img: "https://pic.imgdb.cn/item/6612a9ae68eb9357137504d2.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "CFDGCN",
              msg:
                "将图卷积网络应用于计算流体动力学(CFD)仿真数据，提高流场预测的准确性和效率。",
              img: "https://pic.imgdb.cn/item/6612acd168eb935713783ec3.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Cylinder2D_unsteady",
              msg:
                "通过不稳定流动模型模拟二维圆柱绕流问题，探索流体在圆柱周围的动态行为。",
              img: "https://pic.imgdb.cn/item/6612ad1768eb9357137865c2.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Cylinder2D_unsteady_transform_physx",
              msg:
                "结合物理变换技术，深入分析圆柱绕流问题，提高对流体动力学复杂现象的理解。",
              img: "https://pic.imgdb.cn/item/6612ad7368eb93571378a0a0.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Darcy2D",
              msg:
                "应用达西流动模型，研究地下水流动及其在环境工程和水文学中的应用。",
              img: "https://pic.imgdb.cn/item/6612ae1468eb935713790ef6.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "DeepCFD",
              msg:
                "结合深度学习技术，提升计算流体动力学仿真的效率和精度，尤其针对复杂流场预测。",
              img: "https://pic.imgdb.cn/item/6612ae6968eb93571379a890.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
          ],
        },
      ],
    };
  },
  components: {},
  methods: {
    jump(jumpPath) {
      this.$router.push({ path: jumpPath });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__indicators--horizontal {
  position: absolute;
  bottom: 5px;
  text-align: right;
  .el-carousel__indicator--horizontal button {
    width: 20px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .el-carousel__indicator--horizontal.is-active button {
    width: 60px;
    height: 4px;
    background: rgba(41, 84, 255, 1);
    border-radius: 10px;
  }
}
.scientificMission {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;
  .bannerBg {
    width: 1440px;
    height: 400px;
    background: linear-gradient(
      180deg,
      #deeaff 0%,
      #deeaff 18%,
      rgba(250, 250, 250, 1) 100%
    );
    margin: 0 auto;
  }
  .banner {
    width: 1280px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
  }
  .carouselItem {
    width: 1280px;
    height: 400px;
    padding: 40px 60px;
    display: flex;
    .right {
      width: 400px;
      img {
        width: 400px;
        height: 280px;
      }
    }
    .left {
      width: 680px;
      margin-right: 80px;
      position: relative;
      .title {
        font-weight: bold;
        font-size: 40px;
        color: #262626;
      }
      .msg {
        font-size: 16px;
        color: #2954ff;
        margin-top: 10px;
      }
      .detail {
        width: 80px;
        background: #587dff;
        border-radius: 14px 14px 14px 14px;
        font-size: 12px;
        color: #ffffff;
        padding: 5px 0;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .body {
    width: 1440px;
    margin: 0 auto;
    background: #fafafa;
    margin-top: 40px;
    .bodyItem {
      .header {
        border-bottom: 1px solid #e1e2e6;
        padding-bottom: 2px;
        display: flex;
        justify-content: space-between;
        .title {
          font-weight: bold;
          font-size: 28px;
          color: #2954ff;
          padding-bottom: 10px;
        }
        .more {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          color: #587dff;
          cursor: pointer;
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
      border-radius: 16px;
      .contentItem {
        width: 290px;
        height: 320px;
        margin: 0 30px 30px 0;
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
    }
  }
}
</style>