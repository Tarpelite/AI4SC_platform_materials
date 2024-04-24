<template>
  <div class="scientificMissionMore">
    <div class="scientificMissionMoreHeader">
      <div style="width: 1200px; margin: 0 auto">
        <div class="title">{{ screenHeaderList.name }}</div>
        <div class="msg">{{ screenHeaderList.msg }}</div>
      </div>
    </div>
    <div class="body">
      <div style="width: 1280px; margin: 0 auto">
        <div class="bodyItem">
          <div class="header">
            <div class="title">{{ scienceList.name }}</div>
            <div
              class="more"
              @click="$router.push({ path: '/scientificMission' })"
            >
              折叠
              <img :src="images.moreRight" alt="" />
            </div>
          </div>
          <div class="content">
            <div
              class="contentItem"
              v-for="(item, index) in scienceList.childList"
              :key="index"
              @click="jumpDetail"
            >
              <div class="img">
                <img :src="item.img" alt="" />
              </div>
              <div class="boxBody">
                <div class="title">{{ item.title }}</div>
                <div class="msg">{{ item.short_description }}</div>
                <div class="tag">
                  <div class="type">{{ item.domain }}</div>
                  <div class="algorithm">{{ item.contributor }}</div>
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
import {getScienceListByCategory} from "@/api/api";
export default {
  data() {
    return {
      images: images,
      headerList: [
        {
          name: "数学（AI for Math）",
          msg: "近年来，人工智能（AI）在科学研究中的应用迅速增长，并在数学领域展现出显著的潜力。AI for Science指的是使用人工智能技术来加速科学发现和研究的过程，而在数学领域，AI已经开始辅助数学家解决复杂问题，发现新的数学结构，甚至在某些情况下，引导证明数学定理。",
        },
        {
          name: "流体力学",
          msg: "在AI for Science中，流体力学的研究通过运用人工智能技术，特别是深度学习和机器学习算法，解决了一系列复杂的流体力学问题。这些技术被广泛应用于模拟和分析流体在各种条件下的行为，以及解决流体动力学的关键方程。AI方法在处理Navier-Stokes方程的反问题、二维圆柱绕流和翼型绕流问题，以及多相流动模拟等任务中展现出卓越的能力。通过这些应用，AI不仅提高了流体力学问题解决的效率和准确性，还推动了该领域研究的新发展。",
        },
        {
          name: "结构力学",
          msg: "人工智能（AI）在结构力学领域的应用主要包括：材料设计与优化、结构预测与分析、故障检测与健康监测、仿真与模型减缩以及数据驱动的决策支持。这些应用通过机器学习算法提高了设计效率，优化了材料性能，实现了结构健康的实时监控，并减少了复杂计算的需求，从而在材料科学、维护规划和风险管理等方面带来了变革。随着AI技术的进步，其在结构力学中的作用将变得更加重要。",
        },
        {
          name: "传热学",
          msg: "人工智能在传热学领域的应用包括热性能预测、传热设备设计、故障诊断、仿真加速和能源系统管理。这些应用通过机器学习优化材料和系统设计，提高能效，加速设计过程，并改善系统的维护和运行。AI技术正在推动传热学研究和实践的进步，使其在未来的能源和工程领域中变得更加重要。",
        },
        {
          name: "材料科学",
          msg: "在AI for Science领域中，材料学正经历由人工智能技术带来的变革，人工智能的融入推动材料性质的预测、新材料的设计以及材料行为的深入分析，提供了新的途径来探索和开发先进材料。例如在晶体材料的研究中，人工智能技术正在帮助科学家更精确地计算和预测材料的势能表面，这对于理解和预测材料的化学和物理性质至关重要。此外，AI在发现和优化新型材料的性能方面也显示出巨大潜力，如通过分析大量的数据来预测材料的力学、热学和电学特性。通过深度学习模型，材料学家能够探索更广泛的化学空间，发现具有特定功能或性能的新材料，为材料科学的未来发展开辟了新的道路，同时也为能源、电子、医药等多个应用领域带来了创新的可能性。",
        },
        {
          name: "气象学",
          msg: "在AI for Science领域内，气象学通过人工智能技术迎来革新，推动着更精准的气象预测和气候分析。各类人工智能科学技术如GraphCast的图神经网络、ViT-KNO的视觉变换器结合知识神经算子、以及DGMR的动态图模型回归，均在提高降水预测和极端天气事件预测的准确性方面展现出优势，DEMNet的全球数字高程模型数据处理和基于Transformer的ENSO预测为理解全球气候变化提供了新的工具。这些科学任务的应用体现了人工智能助力气象学家更准确地预测天气和气候变化，处理复杂的气象数据，并提供关于气候系统动态的深入洞察。通过利用人工智能技术，气象学领域不仅能更有效地应对极端天气事件，还能为气候变化研究提供强有力的工具，彰显了人工智能在解析复杂气候系统中的巨大潜力。",
        },
        {
          name: "生物学",
          msg: "在AI for Science领域内，生物学正通过人工智能技术迈向新的发展阶段，在蛋白质工程、药物发现和基因组学等方面的应用正在重塑生物学研究的范畴。人工智能技术在生物学中的应用包括蛋白质序列设计、药物与疾病关联的探索、分子结构的生成和分析，以及单细胞数据的整合和聚类等。这些技术不仅助力设计具有特定功能的蛋白质，推动新药物开发，还在药物与疾病关联探索、分子结构生成及单细胞数据分析中显示出巨大潜力。人工智能在处理庞大生物数据、预测蛋白质功能以及理解细胞异质性方面展现了其独特优势，为生物学领域的创新和发展提供了强有力的支撑。",
        },
        {
          name: "电磁学",
          msg: "在AI for Science的领域中，电磁学领域人工智能技术的应用正在改变传统的电磁学研究方法，提供了解决复杂电磁问题的新途径。这些技术在求解高维泊松方程、处理时域麦克斯韦方程，以及应用于人体姿态识别等方面展现出巨大的潜力。人工智能的引入使得高维电磁方程的求解变得更加高效，提升了计算精度和速度，在处理时域麦克斯韦方程方面能够更准确地模拟和预测电磁波的传播和相互作用。电磁学中存在着各种复杂的计算问题，人工智能技术的融入为电磁学领域带来了更深入的理解和新的发现，同时也推动了相关技术的发展和应用，在电磁应用技术的创新和实践中展现了其广泛的应用前景。",
        },
      ]
    };
  },
  computed: {
    screenHeaderList() {
      if (this.$route.query.name) {
        return this.headerList[this.$route.query.name];
      } else {
        return {};
      }
    }
  },
  created() {
    this.categoryName = this.$route.query.name
  },
  mounted() {
    this._getMoreInfo()
  },
  components: {},
  methods: {
    async _getMoreInfo() {
     const list = await getScienceListByCategory({domain: this.categoryName})
      const scienceList = {
        name: list[0].domain,
        flag: true,
        childList: list
      }
      this.scienceList = scienceList
    },
    jumpDetail() {
      this.$router.push({ path: "/scientificMissionDetail" });
    },
  },
};
</script>

<style lang="scss" scoped>
.scientificMissionMore {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;
  .scientificMissionMoreHeader {
    width: 100%;
    margin: 0 auto;
    height: 250px;
    background: linear-gradient(
      180deg,
      #deeaff 0%,
      #deeaff 18%,
      rgba(222, 234, 255, 0) 100%
    );
    .title {
      font-weight: bold;
      font-size: 40px;
      color: #2954ff;
      text-align: center;
      padding-top: 60px;
    }
    .msg {
      font-weight: 400;
      font-size: 18px;
      color: #262626;
      margin-top: 12px;
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
          font-size: 16px;
          color: #262626;
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
