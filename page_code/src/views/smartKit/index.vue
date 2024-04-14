<template>
  <div class="smartKit">
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
    <div style="height: 40px"></div>
    <div class="smartKitBody">
      <div
        class="smartKitItem"
        v-for="(item, index) in smartKitList"
        :key="index"
      >
        <div class="smartKitLeft">
          <div class="title">
            <div class="titleLeft">{{ item.title }}</div>
            <div class="tag">{{ item.souce }}</div>
          </div>
          <div class="msg">{{ item.msg }}</div>
        </div>
        <div class="smartKitRight">
          <img :src="item.img" alt="" />
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
          title: "MindEarth地球科学领域套件",
          msg: "地球科学领域套件MindEarth致力于高效使能AI+气象海洋的融合研究。",
          img: "https://pic.imgdb.cn/item/65f25b6b9f345e8d03a16ef2.gif",
        },
        {
          id: 2,
          title: "Mindflow计算流体求解套件",
          msg: "支持物理驱动、数据驱动和数据机理融合驱动的AI流体仿真",
          img: "https://pic.imgdb.cn/item/65f25bac9f345e8d03a27224.gif",
        },
        {
          id: 3,
          title: "MindElec计算电磁仿真领域套件",
          msg: "持数据建构及转换、仿真计算、结果可视化以及端到端的AI电磁仿真。",
          img: "https://pic.imgdb.cn/item/65f25bed9f345e8d03a34c02.png",
        },
        {
          id: 4,
          title: "MindChemistry计算化学领域套件",
          msg: "支持多体系，多尺度任务的AI+化学仿真",
          img: "https://pic.imgdb.cn/item/65f25c359f345e8d03a440e7.jpg",
        },
      ],
      smartKitList: [
        {
          title: "MindEarth地球科学领域套件",
          msg: "天气现象与人类的生产生活、社会经济、军事活动等方方面面都密切相关，准确的天气预报能够在灾害天气事件中减轻影响、避免经济损失，还能创造持续不断地财政收入，例如能源、农业、交通和娱乐行业。目前，天气预报主要采用数值天气预报模式，通过处理由气象卫星、观测台站、雷达等收集到的观测资料，求解描写天气演变的大气动力学方程组，进而提供天气气候的预测信息。数值预报模式的预测过程涉及大量计算，耗费较长时间与较大的计算资源。相较于数值预报模式，数据驱动的深度学习模型能够有效地将计算成本降低数个量级。MindEarth是基于昇思MindSpore开发的地球科学领域套件，支持短临、中期、长期等多时空尺度以及降水、台风等灾害性天气的AI气象预测，旨在于为广大的工业界科研工程人员、高校老师及学生提供高效易用的AI气象预测软件。",
          img: "https://pic.imgdb.cn/item/65f25b6b9f345e8d03a16ef2.gif",
          souce: "华为",
        },
        {
          title: "Mindflow计算流体求解套件",
          msg: "流体仿真是指通过数值计算对给定边界条件下的流体控制方程进行求解，从而实现流动的分析、预测和控制，其在航空航天、船舶制造以及能源电力等行业领域的工程设计中应用广泛。传统流体仿真的数值方法如有限体积、有限差分等，主要依赖商业软件实现，需要进行物理建模、网格划分、数值离散、迭代求解等步骤，仿真过程较为复杂，计算周期长。AI具备强大的学习拟合和天然的并行推理能力，可以有效地提升流体仿真效率。MindFlow是基于昇思MindSpore开发的流体仿真领域套件，支持航空航天、船舶制造以及能源电力等行业领域的AI流场模拟，旨在于为广大的工业界科研工程人员、高校老师及学生提供高效易用的AI计算流体仿真软件。",
          img: "https://pic.imgdb.cn/item/65f25bac9f345e8d03a27224.gif",
          souce: "华为",
        },
        {
          title: "MindElec计算电磁仿真领域套件",
          msg: "电磁仿真是指通过计算的方式模拟电磁波在物体或空间中的传播特性，其在手机容差、天线优化和芯片设计等场景中应用广泛。传统数值方法如有限差分、有限元等需网格剖分、迭代计算，仿真流程复杂、计算时间长，无法满足产品的设计需求。AI方法具有万能逼近和高效推理能力，可有效提升仿真效率。MindSpore Elec是基于MindSpore开发的AI电磁仿真工具包，由数据构建及转换、仿真计算、以及结果可视化组成。可以支持端到端的AI电磁仿真。目前已在华为终端手机容差场景中取得阶段性成果，相比商业仿真软件，AI电磁仿真的S参数误差在2%左右，端到端仿真速度提升10+倍。",
          img: "https://pic.imgdb.cn/item/65f25bed9f345e8d03a34c02.png",
          souce: "华为",
        },
        {
          title: "MindChemistry计算化学领域套件",
          msg: "传统化学研究长期以来面临着众多挑战，实验设计、合成、表征和分析的过程往往耗时、昂贵，并且高度依赖专家经验。AI与化学的协同可以克服传统方法的局限性、开拓全新的研究范式，结合AI模型与化学知识，可以高效处理大量数据、挖掘隐藏的关联信息，构建仿真模型，从而加快化学反应的设计和优化，实现材料的性质预测，并辅助设计新材料。MindChemistry是基于MindSpore构建的化学领域套件，支持多体系（有机/无机/复合材料化学）、多尺度任务（微观分子生成/预测、宏观反应优化）的AI+化学仿真，致力于高效使能AI与化学的融合研究，践行和牵引AI与化学联合多研究范式跃迁，为化学领域专家的研究提供全新视角与高效的工具。",
          img: "https://pic.imgdb.cn/item/65f25c359f345e8d03a440e7.jpg",
          souce: "华为",
        },
        {
          title: "MindSPONGE计算生物领域套件",
          msg: "MindSpore SPONGE(Simulation Package tOwards Next GEneration molecular modelling)是基于昇思MindSpore的计算生物领域套件，支持分子动力学、蛋白质折叠等常用功能，旨在于为广大的科研人员、老师及学生提供高效易用的AI计算生物软件。支持高性能、模块化，端到端可微，类AI架构编写的分子模拟功能以及MSA生成，蛋白质折叠训练推理和蛋白质结构打分，NMR数据解析等常用功能。",
          img: "https://pic.imgdb.cn/item/65f25c439f345e8d03a47148.gif",
          souce: "华为",
        },
        {
          title: "SciAI高频模型套件",
          msg: "MindSpore SciAI是基于昇思MindSpore打造的AI4SCI高频基础模型套件，内置了60+高频模型，覆盖物理感知（如PINNs、DeepRitz以及PFNN）和神经算子（如FNO、DeepONet、PDENet）等主流模型，覆盖度全球第一； 提供了高阶API（一键环境配置，自动模型加载、极简训练微调等），开发者和用户开箱即用。 MindSpore SciAI应用领域覆盖到了流体、电磁、声、热、固体、生物等众多学科，为广大开发者和用户提供了高效、易用的AI4Science通用计算平台。",
          img: "https://pic.imgdb.cn/item/65f25c699f345e8d03a4f0b5.jpg",
          souce: "华为",
        },
        {
          title: "PaddleHelix生物计算套件",
          msg: "基于百度飞桨深度学习框架，打造“数据+原理”双驱动的生物计算大模型技术，支持小分子药物、多肽/蛋白药物、mRNA疫苗等场景，助力创新药的早期发现。生物计算大模型技术将大模型技术与生物领域原理知识进行融合，通过海量的数据，借鉴物理化学生物领域的第一性原理，使模型可以很好地适应新数据，大大增强了模型的泛化性和外推能力，即使面对全新的场景与任务也能取得优异的表现。",
          img: "https://pic.imgdb.cn/item/65f25c789f345e8d03a5241b.png",
          souce: "百度",
        },
        {
          title: "PaddleScience科学计算套件",
          msg: "PaddleScience 是一个基于深度学习框架 PaddlePaddle 开发的科学计算套件，利用深度神经网络的学习能力和 PaddlePaddle 框架的自动(高阶)微分机制，解决物理、化学、气象等领域的问题。支持物理机理驱动、数据驱动、数理融合三种求解方式，并提供了基础 API 和详尽文档供用户使用与二次开发。",
          img: "https://pic.imgdb.cn/item/65f25c939f345e8d03a58c1f.jpg",
          souce: "百度",
        },
        {
          title: "PaddleQuantum量子计算套件",
          msg: "Paddle Quantum（量桨）是基于百度飞桨研发的全球首个云量一体的量子机器学习平台。量桨支持量子神经网络的搭建与训练等功能，使得百度飞桨也因此成为国内首个支持量子机器学习的深度学习框架。量桨具备轻松上手、功能丰富等特点，提供了完善的API文档和用例教程，使用户可以快速入门和上手。量桨建立起了人工智能与量子计算的桥梁，不但可以快速实现量子神经网络的搭建与训练，还提供易用的量子机器学习开发套件与量子优化、量子化学等前沿量子应用工具集，并提供多项自研量子机器学习应用。通过百度飞桨深度学习平台赋能量子计算，量桨为领域内的科研人员以及开发者便捷地开发量子人工智能的应用提供了强有力的支撑，同时也为广大量子计算爱好者提供了一条可行的学习途径。",
          img: "https://pic.imgdb.cn/item/65f25ca29f345e8d03a5c61d.jpg",
          souce: "百度",
        },
      ],
    };
  },
  computed: {
    screenList() {
      let arr = [];
      this.tagList
        .filter((item) => item.flag)
        .map((item) => {
          arr.push(item.id);
        });
      let listArr = [];
      this.list.map((item) => {
        if (arr.includes(item.id)) {
          listArr.push(item);
        }
      });
      return listArr;
    },
  },
  components: {},
  methods: {},
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
    background: #fff;
    border-radius: 10px;
  }
}
.smartKit {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;
  .bannerBg {
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
    background: linear-gradient(135deg, #587dff 0%, #9d2eff 100%);
    .right {
      width: 400px;
      img {
        width: 400px;
        height: 280px;
        border-radius: 12px 12px 12px 12px;
      }
    }
    .left {
      width: 680px;
      margin-right: 80px;
      position: relative;
      .title {
        font-weight: bold;
        font-size: 40px;
        color: #ffffff;
        margin-top: 30px;
      }
      .msg {
        font-size: 16px;
        color: #ffffff;
        margin-top: 10px;
      }
      .detail {
        width: 80px;
        background: #ffffff;
        border-radius: 14px 14px 14px 14px;
        font-size: 12px;
        color: #2954ff;
        padding: 5px 0;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .smartKitBody {
    width: 1280px;
    margin: 0 auto;
    .smartKitItem {
      display: flex;
      margin-top: 80px;
      .smartKitLeft {
        max-width: 740px;
        min-width: 540px;
        margin-right: 80px;
        padding: 20px 40px;
        .title {
          display: flex;
          .titleLeft {
            font-weight: 500;
            font-size: 32px;
            color: #262626;
          }
          .tag {
            font-size: 14px;
            color: #ffffff;
            background: #587dff;
            border-radius: 16px;
            padding: 0px 15px;
            height: 28px;
            line-height: 28px;
            margin-left: 20px;
            margin-top: 10px;
          }
        }
        .msg {
          font-size: 14px;
          color: #262626;
          margin-top: 5px;
          line-height: 25px;
          display: -webkit-box;
          -webkit-line-clamp: 10;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
      }
      .smartKitRight {
        max-width: 560px;
        min-width: 460px;
        height: 320px;
        background: #ffffff;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 20px 20px 20px 20px;
        padding: 20px;
        img {
          width: 100%;
          height: 280px;
          border-radius: 16px 16px 16px 16px;
        }
      }
    }
    .smartKitItem:hover {
      background: #ffffff;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 20px 20px 20px 20px;
      .smartKitRight {
        box-shadow: none;
      }
    }
  }
}
</style>