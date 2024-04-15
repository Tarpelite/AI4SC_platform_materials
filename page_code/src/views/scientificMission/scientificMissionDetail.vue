<template>
  <div class="scientificMissionDetail">
    <div class="content">
      <div class="header">
        <div class="title"><span class="renwu" @click="$router.back()">科学任务</span> / DeepHPMs求解Burgers-BUAA方程</div>
        <div class="btns">
          <img class="btnsImg" :src="images.link" alt="" />
          <img class="btnsImg" :src="images.homeLink" alt="" />
          <img class="btnsImg" :src="images.codeRepository" alt="" />
          <div class="back" @click="$router.back()">
            <img :src="images.back" class="backImg" alt="" />
            <span>返回</span>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="bodyLeft">
          <div class="title">DeepHPMs求解Burgers-BUAA方程</div>
          <div class="tag">
            <div class="type">数学</div>
            <div class="algorithm">百度AI Studio</div>
          </div>
          <div class="text">
            &nbsp;&nbsp;&nbsp;&nbsp;求解偏微分方程（PDE）是一类基础的物理问题，在过去几十年里，以有限差分（FDM）、有限体积（FVM）、有限元（FEM）为代表的多种偏微分方程组数值解法趋于成熟。随着人工智能技术的高速发展，利用深度学习求解偏微分方程成为新的研究趋势。PINNS（Physics-informed
            neural
            networks）是一种加入物理约束的深度学习网络，因此与纯数据驱动的神经网络学习相比，PINNS
            可以用更少的数据样本学习到更具泛化能力的模型，其应用范围包括但不限于流体力学、热传导、电磁场、量子力学等领域。传统的
            PINNS 会将PDE 作为loss 的一项参与到网络训练中去，这就要求 PDE
            公式为已知的先验条件，当PDE 公式未知时，这种方法就不能实现。
          </div>
          <div class="text">
            &nbsp;&nbsp;&nbsp;&nbsp;DeepHPMs着眼于
            PDE公式未知的情况，通过深度学习网络，从实验产生的高维数据中发现物理规律，即非线性
            PDE 方程，并用一个深度学习网络来表征这个 PDE 方程，再将这个 PDE
            网络替代传统 PINNS方法中的PDE公式，对新的数据进行预测。本问题对
            Burgers, Korteweg- de Vries （KdV）， Kuramoto-Sivashinsky,
            nonlinearSchro dinger 和 Navier- Stokes equations 多种
            PDE方程进行了研究，本案例主要针对 Burgers 方程进行实现。
          </div>
          <div class="experience">
            <div class="experienceTitle">立即体验</div>
            <div class="experienceBody">
              求解偏微分方程（PDE）是一类基础的物理问题，在过去几十年里，以有限差分（FDM）、有限体积（FVM）、有限元（FEM）为代表的多种偏微分方程组数值解法趋于成熟。随着人工智能技术的高速发展，利用深度学习求解偏微分方程成为新的研究趋势。PINNS（Physics-informed
              neural
              networks）是一种加入物理约束的深度学习网络，因此与纯数据驱动的神经网络学习相比，PINNS
              可以用更少的数据样本学习到更具泛化能力的模型，其应用范围包括但不限于流体力学、热传导、电磁场、量子力学等领域。传统的
              PINNS 会将PDE 作为loss 的一项参与到网络训练中去，这就要求 PDE
              公式为已知的先验条件，当PDE 公式未知时，这种方法就不能实现。
              DeepHPMs着眼于
              PDE公式未知的情况，通过深度学习网络，从实验产生的高维数据中发现物理规律，即非线性
              PDE 方程，并用一个深度学习网络来表征这个 PDE 方程，再将这个 PDE
              网络替代传统 PINNS方法中的PDE公式，对新的数据进行预测。本问题对
              Burgers, Korteweg- de Vries （KdV）， Kuramoto-Sivashinsky,
              nonlinearSchro dinger 和 Navier- Stokes equations 多种
              PDE方程进行了研究，本案例主要针对 Burgers 方程进行实现。
            </div>
          </div>
        </div>
        <div class="bodyRight">
          <div class="tryOnline">
            <div class="title">在线尝试</div>
            <div class="immediateExecution">
              <img :src="images.action" alt="" />
              立即执行
            </div>
          </div>
          <div class="relevantPapers">
            <div class="title">相关论文</div>
            <div class="relevantPapersText">
              Hidden physics models: Machine learning of nonlinear partial
              alterental equations…
            </div>
            <div class="relevantPapersText">
              Meshless physics-informed deep learning method for
              three-dimensional solid…
            </div>
          </div>
          <div class="scientificMission">
            <div class="title">类似科学任务</div>
            <div
              class="scientificMissionBox"
              v-for="(item, index) in likenessList"
              :key="index"
            >
              <img :src="item.img" alt="" />
              <div class="text">{{ item.name }}</div>
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
      moreList: [
        {
          title:
            "AI4Science的基石：几何图神经网络，最全综述来了！人大高瓴联合腾讯AI lab、清华、斯坦福等发布",
          type: "学术动态",
          img: "https://pic.imgdb.cn/item/65ef029a9f345e8d03ae62c6.png",
        },
        {
          title: "量子计算新进展，腾讯量子实验室设计新算法进行量子近似优化",
          type: "学术动态",
          img: "https://pic.imgdb.cn/item/65ef022f9f345e8d03aacc15.png",
        },
        {
          title:
            "5天完成6个月实验量，加速催化研究，「自动驾驶」催化实验室Fast-Cat登Nature子刊",
          type: "学术动态",
          img: "https://pic.imgdb.cn/item/65ef03149f345e8d03b2f078.png",
        },
        {
          title:
            "用基于结构的突变偏好进行蛋白质设计，加州大学、MIT、哈佛医学院团队开发了一种无监督方法",
          type: "学术动态",
          img: "https://pic.imgdb.cn/item/65ef02e89f345e8d03b136ae.png",
        },
      ],
      likenessList: [
        {
          name: "DeepOnet求解常微分方程",
          img: "https://pic.imgdb.cn/item/6612a16868eb9357136b82c0.png",
        },
        {
          name: "深度学习求解Euler_Beam问题",
          img: "https://pic.imgdb.cn/item/6612a2a768eb9357136ce477.png",
        },
        {
          name: "Laplace2D",
          img: "https://pic.imgdb.cn/item/6612a43368eb9357136f53a7.png",
        },
        {
          name: "Lorenz_transform_physx",
          img: "https://pic.imgdb.cn/item/6612a48b68eb9357136f89c1.png",
        },
        {
          name: "PIRBN",
          img: "https://pic.imgdb.cn/item/6612a48b68eb9357136f89c1.png",
        },
      ],
    };
  },
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.scientificMissionDetail {
  width: 1440px;
  margin-top: 20px;
  background: #fafafa;
  margin: 0 auto;
  .content {
    padding: 40px 80px;
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e1e2e6;
      padding-bottom: 8px;
      .title {
        color: #587dff;
        .renwu {
          cursor: pointer;
        }
      }
      .btns {
        display: flex;
        .btnsImg {
          width: 20px;
          height: 20px;
          margin-right: 22px;
          cursor: pointer;
        }
        .back {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #587dff;
          .backImg {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }
      }
    }
    .body {
      display: flex;
      padding-top: 48px;
      .bodyLeft {
        width: 840px;
        margin-right: 80px;
        .title {
          font-weight: bold;
          font-size: 32px;
          color: #262626;
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
        .text {
          margin-top: 20px;
          line-height: 25px;
          color: #262626;
        }
        .experience {
          width: 840px;
          height: 320px;
          background: #deeaff;
          border-radius: 16px 16px 16px 16px;
          padding: 20px;
          margin-top: 25px;
          .experienceTitle {
            font-weight: 500;
            font-size: 16px;
            color: #262626;
          }
          .experienceBody {
            width: 800px;
            background: #f2f7ff;
            border-radius: 8px 8px 8px 8px;
            margin-top: 10px;
            padding: 10px;
          }
        }
      }
      .bodyRight {
        width: 360px;
        .title {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
        }
        .tryOnline {
          width: 360px;
          height: 100px;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;
          .immediateExecution {
            width: 320px;
            height: 36px;
            background: #587dff;
            border-radius: 8px 8px 8px 8px;
            opacity: 0.8;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            margin-top: 6px;
            cursor: pointer;
            img {
              width: 16px;
              height: 16px;
              margin-right: 8px;
            }
          }
        }
        .relevantPapers {
          margin-top: 24px;
          width: 360px;
          height: 202px;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;
          .relevantPapersText {
            width: 320px;
            height: 60px;
            background: #f2f7ff;
            border-radius: 12px 12px 12px 12px;
            padding: 12px 15px;
            font-size: 14px;
            line-height: 20px;
            margin-top: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
          }
        }
        .scientificMission {
          margin-top: 24px;
          width: 360px;
          height: 418px;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          border-radius: 16px 16px 16px 16px;
          padding: 20px;
          .scientificMissionBox {
            margin-top: 12px;
            padding: 6px;
            display: flex;
            align-items: center;
            background: #f2f7ff;
            border-radius: 12px 12px 12px 12px;
            cursor: pointer;
            img {
              width: 48px;
              height: 48px;
              margin-right: 15px;
            }
            .text {
              font-weight: 500;
              font-size: 14px;
              color: #262626;
            }
          }
          .scientificMissionBox:hover {
            .text {
              color: #2954ff;
            }
          }
        }
      }
    }
  }
}
</style>