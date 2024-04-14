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
    <div style="height: 80px"></div>
    <div class="screen">
      <div class="scientificField">
        <div class="title">科学领域</div>
        <div class="scientificFieldTag">
          <div
            class="scientificFieldTagItem"
            v-for="(item, index) in tagList"
            :key="index"
            :class="item.flag ? 'choosescientificField' : ''"
            @click="screenScientificField(item)"
          >
            <img :src="images.check" alt="" v-if="item.flag" />
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="contributingParty">
        <div class="title">贡献方</div>
        <div class="contributingPartyTag">
          <div
            class="contributingPartyTagItem"
            v-for="(item, index) in tagList1"
            :key="index"
            @click="item.flag = !item.flag"
            :class="
              item.flag ? 'chooseContributingParty' : ''
            "
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="more">更多筛选<img :src="images.up" alt="" /></div>
    </div>
    <div class="body">
      <div style="width: 1280px; margin: 0 auto">
        <div class="bodyItem" v-for="(item, index) in screenList" :key="index">
          <div class="header">
            <div class="title">{{ item.name }}</div>
            <div class="more" @click="jump('/scientificMissionMore',{ id: index })">
              更多
              <img :src="images.moreRight" alt="" />
            </div>
          </div>
          <div class="content">
            <div
              class="contentItem"
              v-for="(item1, index1) in screenChildList(item.childList)"
              :key="index1"
              @click="jumpDetail()"
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
          msg: "利用深度学习技术对Euler Beam理论进行模拟，提高工程力学问题的求解效率。",
          img: "https://pic.imgdb.cn/item/6612a2a768eb9357136ce477.png",
        },
        {
          id: 2,
          title: "FourCastNet",
          msg: "基于深度学习的天气预报模型，通过自适应傅里叶神经算子高效预测气象变量，如风速和降水。",
          img: "https://pic.imgdb.cn/item/6612b4c468eb9357138150b6.png",
        },
        {
          id: 3,
          title: "东方.御风",
          msg: "在航空航天领域，通过AI模型优化飞机气动设计，提升飞机性能和环保性。",
          img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbb5a.png",
        },
        {
          id: 4,
          title: "CTEFNet: 基于 CNN 与迁移学习的厄尔尼诺预测模型",
          msg: "CTEFNet结合卷积神经网络和迁移学习，通过时间序列分析提升厄尔尼诺现象的预测时长，为气候变化研究提供高精度的预测工具。。",
          img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbc9f.png",
        },
        {
          id: 5,
          title: "DEM-SRNet: 全球3弧秒（90m）海陆高分辨率数字高程模型",
          msg: "DEM-SRNet应用深度残差网络对地面DEM数据进行预训练，显著提升全球数字高程模型的分辨率，为地理科学研究和环境监测提供更为精确的地形数据。",
          img: "https://pic.imgdb.cn/item/6612d7e168eb935713bd2d60.png",
        },
        {
          id: 6,
          title: "Phiflow playground - Kolmogorov流模拟",
          msg: "应用PhiFlow流体库对Kolmogorov流进行仿真，用户可以通过上传的方式指定初始压力场",
          img: "https://pic.imgdb.cn/item/6612dbd768eb935713c2cc1c.png",
        },
      ],
      list: [
        {
          name: "数学（AI for Math）",
          id: 0,
          childList: [
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
              title: "Laplace2D",
              msg: "通过解决二维Laplace方程，深入分析电磁学和流体动力学中的稳态问题。",
              img: "https://pic.imgdb.cn/item/6612a43368eb9357136f53a7.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Lorenz_transform_physx",
              msg: "洛伦兹变换在物理学中的应用，通过混沌理论解析气象预测的复杂性。",
              img: "https://pic.imgdb.cn/item/6612a48b68eb9357136f89c1.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "PIRBN",
              msg: "通过开发一种新型的物理信息神经网络，PIRBN项目提升了局部近似函数的准确度和应用范围。",
              img: "https://pic.imgdb.cn/item/6612a51768eb9357137058ec.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Rossler_transform_physx",
              msg: "Rossler系统的研究强调了混沌理论在预测复杂系统行为中的重要性，特别是在化学反应动力学中。",
              img: "https://pic.imgdb.cn/item/6612a59568eb93571370a859.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Volterra_IDE",
              msg: "通过沃尔泰拉积分方程的研究，项目探索了在数学物理和生物学模型中解决积分方程的新方法。",
              img: "https://pic.imgdb.cn/item/6612a75568eb93571372aec0.png",
              type: "数学",
              algorithm: "百度AI Studio",
            },
          ],
        },
        {
          name: "流体力学",
          id: 1,
          childList: [
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
              title: "BubbleNet",
              msg: "利用物理信息神经网络(PINNs)模拟气泡流动，研究气泡在流体中的行为及其对流场的影响。",
              img: "https://pic.imgdb.cn/item/6612a9ae68eb9357137504d2.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "CFDGCN",
              msg: "将图卷积网络应用于计算流体动力学(CFD)仿真数据，提高流场预测的准确性和效率。",
              img: "https://pic.imgdb.cn/item/6612acd168eb935713783ec3.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Cylinder2D_unsteady",
              msg: "通过不稳定流动模型模拟二维圆柱绕流问题，探索流体在圆柱周围的动态行为。",
              img: "https://pic.imgdb.cn/item/6612ad1768eb9357137865c2.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Cylinder2D_unsteady_transform_physx",
              msg: "结合物理变换技术，深入分析圆柱绕流问题，提高对流体动力学复杂现象的理解。",
              img: "https://pic.imgdb.cn/item/6612ad7368eb93571378a0a0.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Darcy2D",
              msg: "应用达西流动模型，研究地下水流动及其在环境工程和水文学中的应用。",
              img: "https://pic.imgdb.cn/item/6612ae1468eb935713790ef6.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "DeepCFD",
              msg: "结合深度学习技术，提升计算流体动力学仿真的效率和精度，尤其针对复杂流场预测。",
              img: "https://pic.imgdb.cn/item/6612ae6968eb93571379a890.png",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
          ],
        },
        {
          name: "结构力学",
          id: 2,
          childList: [
            {
              title: "2D-Biharmonic",
              type: "结构力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b29268eb9357137e0e3a.png",
              msg: "应用物理信息神经网络求解二维双调和方程，探索在复杂边界条件下的数值解法。",
            },
            {
              title: "Bracket",
              type: "结构力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b32168eb9357137f13f2.png",
              msg: "利用深度学习技术进行线弹性方程的求解，为结构力学中的应力应变分析提供新的计算方法。",
            },
            {
              title: "Control arm",
              type: "结构力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b36d68eb9357137f765d.png",
              msg: "结合深度学习，对汽车悬挂控制臂的结构受力分析进行模拟，提高设计的效率和精度。",
            },
            {
              title: "EPNN",
              type: "结构力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/65e0897e9f345e8d039333ab.png",
              msg: "通过物理信息加强的神经网络模拟弹塑性行为，特别是在地质材料和金属的应用，为材料科学提供深入洞察。",
            },
            {
              title: "PhyLSTM",
              type: "结构力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/65e0897e9f345e8d039333f9.png",
              msg: "引入物理知识到长短期记忆网络中，为缺乏数据的非线性结构系统提供准确的元建模能力。",
            },
            {
              title: "TopOpt",
              type: "结构力学",
              algorithm: "百度AI Studio",
              msg: "利用拓扑优化方法进行结构设计，以最小化材料使用的同时最大化性能效率，适用于工程设计和材料科学领域。",
              img: "https://pic.imgdb.cn/item/65e0898e9f345e8d03936647.png",
            },
          ],
        },
        {
          name: "传热学",
          id: 3,
          childList: [
            {
              title: "Heat_Exchanger",
              type: "传热学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b44468eb93571380b842.png",
              msg: "利用拓扑优化方法进行结构设计，以最小化材料使用的同时最大化性能效率，适用于工程设计和材料科学领域。",
            },
            {
              title: "Heat_PINN",
              type: "传热学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/65e089959f345e8d03937f89.png",
              msg: "结合物理信息神经网络技术求解热传导问题，为热工学研究提供精确的数值解析工具。",
            },
            {
              title: "PhyGeoNet",
              type: "传热学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b48e68eb93571380e4fc.png",
              msg: "通过深度学习探索地理信息系统中的复杂地理数据处理问题，提高地形分析和环境监测的精度。",
            },
          ],
        },
        {
          name: "材料科学",
          id: 4,
          childList: [
            {
              title: "hPINNs(PINN with hard constraints)",
              type: "材料科学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/65e089959f345e8d039380f6.png",
              msg: "将硬约束条件整合进物理信息神经网络中，提高求解偏微分方程的准确度和鲁棒性。",
            },
          ],
        },
        {
          name: "气象学",
          id: 5,
          childList: [
            {
              title: "FourCastNet",
              type: "气象学",
              algorithm: "百度AI Studio",
              coverImage:
                "https://pic.imgdb.cn/item/6612b4c468eb9357138150b6.png",
              msg: "基于深度学习的天气预报模型，通过自适应傅里叶神经算子高效预测气象变量，如风速和降水。",
            },
            {
              title: "NowcastNet",
              type: "气象学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b52d68eb93571382ee1a.png",
              msg: "使用深度学习对极端降水事件进行短期预测，提高天气预报的准确性和实时性。",
            },
            {
              title: "CTEFNet: 基于 CNN 与迁移学习的厄尔尼诺预测模型",
              type: "气象学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbc9f.png",
              msg: "CTEFNet结合卷积神经网络和迁移学习，通过时间序列分析提升厄尔尼诺现象的预测时长，为气候变化研究提供高精度的预测工具。。",
            },
            {
              title: "DEM-SRNet: 全球3弧秒（90m）海陆高分辨率数字高程模型",
              type: "气象学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/6612d7e168eb935713bd2d60.png",
              msg: "DEM-SRNet应用深度残差网络对地面DEM数据进行预训练，显著提升全球数字高程模型的分辨率，为地理科学研究和环境监测提供更为精确的地形数据。",
            },
            {
              title: "DgmrNet：基于深度生成模型的雷达数据气象短临预报",
              type: "气象学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/6612d88968eb935713be3f37.png",
              msg: "DgmrNet利用深度生成模型对雷达降水数据进行短临预报，能够对广阔区域进行高精度的天气预测，支持灾害预警和气象服务的优化。",
            },
          ],
        },
        {
          name: "生物学",
          id: 6,
          childList: [
            {
              title: "NMR数据自动解析 FAAST",
              type: "生物学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089a59f345e8d0393bb55.png",
              msg: " 针对NMR数据，利用深度学习自动解析蛋白质结构，加速生物分子研究过程。",
            },
            {
              title: "蛋白质结构预测 MEGA-Fold",
              type: "生物学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089a59f345e8d0393bcb0.png",
              msg: "基于深度学习的蛋白质结构预测工具，提升对蛋白质三维结构的精确预测能力。",
            },
            {
              title: "蛋白质结构评估 MEGA-Assessment",
              type: "生物学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089a69f345e8d0393bcef.jpg",
              msg: "为蛋白质结构预测提供评估工具，确保预测结果的可靠性和准确性。",
            },
            {
              title: "共进化数据引擎 MEGA-EvoGen",
              type: "生物学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089a69f345e8d0393bd31.jpg",
              msg: "利用深度学习处理蛋白质共进化数据，为蛋白质结构预测提供关键信息。",
            },
          ],
        },
        {
          name: "电磁学",
          id: 7,
          childList: [
            {
              title: "点源时域麦克斯韦方程AI求解",
              type: "电磁学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/6612d31468eb935713b50183.png",
              msg: "采用AI方法求解点源时域麦克斯韦方程，为电磁场的动态分布提供快速准确的预测。",
            },
            {
              title: "增量训练求解麦克斯韦方程组",
              type: "电磁学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e08a039f345e8d0394f29a.png",
              msg: "开发增量训练方法针对麦克斯韦方程组的求解，显著提升电磁问题求解的效率。",
            },
            {
              title: "基于参数化方案的AI电磁仿真",
              type: "电磁学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e08a029f345e8d0394f281.jpg",
              msg: "实现基于参数化方案的AI电磁仿真，为电磁器件设计提供高效的预测工具。",
            },
            {
              title: "基于点云方案的AI电磁仿真",
              type: "电磁学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e08a039f345e8d0394f4cf.png",
              msg: "探索点云数据在AI电磁仿真中的应用，为复杂电磁结构的快速仿真开辟新路径。",
            },
            {
              title: "基于可微分FDTD的贴片天线S参数仿真",
              type: "电磁学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e08a039f345e8d0394f64d.jpg",
              msg: "利用可微分FDTD方法进行贴片天线S参数仿真，提升电磁仿真的精度和速度。",
            },
            {
              title: "端到端可微分FDTD求解电磁逆散射问题",
              type: "电磁学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e08a069f345e8d03950102.png",
              msg: "开发端到端可微分FDTD技术求解电磁逆散射问题，为电磁成像和探测提供新的数值方法。",
            },
          ],
        },
      ],
      tagList: [
        {
          name: "数学",
          id: 0,
          flag: true,
        },
        {
          name: "流体力学",
          id: 1,
          flag: true,
        },
        {
          name: "结构力学",
          id: 2,
          flag: true,
        },
        {
          name: "传热学",
          id: 3,
          flag: true,
        },
        {
          name: "材料科学",
          id: 4,
          flag: true,
        },
        {
          name: "气象学",
          id: 5,
          flag: true,
        },
        {
          name: "生物学",
          id: 6,
          flag: true,
        },
        {
          name: "电磁学",
          id: 7,
          flag: true,
        },
      ],
      tagList1: [
        {
          name: '百度AI Studio',
          flag: true
        },
        {
          name: '华为Model Arts',
          flag: true
        },
        {
          name: '北航高算',
          flag: true
        },
      ],
      contributingPartyIndex: 0,
    };
  },
  computed: {
    screenList() {
      let arr = []
      this.tagList.filter(item => item.flag).map(item => {
        arr.push(item.id)
      })
      let listArr = []
      this.list.map(item => {
        if(arr.includes(item.id)) {
          listArr.push(item)
        }
      })
      return listArr
    },
  },
  components: {},
  methods: {
    jump(jumpPath,data) {
      this.$router.push({ path: jumpPath ,query: data});
    },
    jumpDetail() {
      this.$router.push({ path: '/scientificMissionDetail' });
    },
    screenScientificField(item) {
      item.flag = !item.flag;
    },
    screenChildList(list) {
      let arr = []
      this.tagList1.filter(item => item.flag).map(item => {
        arr.push(item.name)
      })
      let listArr = []
      list.map(item => {
        if(arr.includes(item.algorithm)) {
          listArr.push(item)
        }
      })
      return listArr
    }
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
    background: #fff;
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
    background: linear-gradient( 135deg, #587DFF 0%, #9D2EFF 100%);
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
        color: #FFFFFF;
        margin-top: 30px;
      }
      .msg {
        font-size: 16px;
        color: #FFFFFF;
        margin-top: 10px;
      }
      .detail {
        width: 80px;
        background: #FFFFFF;
        border-radius: 14px 14px 14px 14px;
        font-size: 12px;
        color: #2954FF;
        padding: 5px 0;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .screen {
    width: 1280px;
    height: 190px;
    background: #ffffff;
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
    margin: 0 auto;
    padding: 24px;
    position: relative;
    .scientificField {
      .scientificFieldTag {
        margin-top: 12px;
        display: flex;
        .scientificFieldTagItem {
          font-size: 14px;
          color: #262626;
          background: #f1f2f5;
          padding: 4px 12px;
          border-radius: 14px 14px 14px 14px;
          margin-right: 15px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 16px;
            height: 16px;
            margin-right: 2px;
          }
        }
        .choosescientificField {
          background: #587dff;
          color: #fff;
        }
      }
    }
    .contributingParty {
      margin-top: 20px;
      .contributingPartyTag {
        margin-top: 12px;
        display: flex;
        .contributingPartyTagItem {
          font-size: 14px;
          color: #262626;
          background: #f1f2f5;
          padding: 4px 12px;
          border-radius: 14px 14px 14px 14px;
          margin-right: 15px;
          cursor: pointer;
        }
        .chooseContributingParty {
          border: 1px solid #587dff;
          background: #ffffff;
          box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
          color: #587dff;
        }
      }
    }
    .more {
      background: #deeaff;
      border-radius: 14px 14px 14px 14px;
      padding: 7px 0;
      font-size: 12px;
      color: #2954ff;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      position: absolute;
      right: 24px;
      bottom: 24px;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
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
          box-shadow: 0px 2px 16px 1px rgba(0,0,0,0.08);
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