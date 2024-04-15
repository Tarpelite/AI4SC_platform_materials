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
            <div class="title">{{ screenlist.name }}</div>
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
              v-for="(item, index) in screenlist.childList"
              :key="index"
              @click="jumpDetail"
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
      ],
      list: [
        {
          name: "科学任务列表",
          type: 0,
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
          name: "科学任务列表",
          type: 1,

          childList: [
            {
              title: "AMGNet",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612a84e68eb935713737fcf.png",
              msg: "AMGNet探索了深度学习在科学计算领域的应用，尤其是在加速多重网格方法解决偏微分方程方面的潜力。",
            },
            {
              title: "Aneurysm",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612a8eb68eb935713743a4f.png",
              msg: "通过深度学习方法处理血管瘤问题，尤其是在脑血管疾病诊断和治疗计划制定中的应用。",
            },
            {
              title: "BubbleNet",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612a9ae68eb9357137504d2.png",
              msg: "利用物理信息神经网络(PINNs)模拟气泡流动，研究气泡在流体中的行为及其对流场的影响。",
            },
            {
              title: "CFDGCN",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612acd168eb935713783ec3.png",
              msg: "将图卷积网络应用于计算流体动力学(CFD)仿真数据，提高流场预测的准确性和效率。",
            },
            {
              title: "Cylinder2D_unsteady",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612ad1768eb9357137865c2.png",
              msg: "通过不稳定流动模型模拟二维圆柱绕流问题，探索流体在圆柱周围的动态行为。",
            },
            {
              title: "Cylinder2D_unsteady_transform_physx",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612ad7368eb93571378a0a0.png",
              msg: "结合物理变换技术，深入分析圆柱绕流问题，提高对流体动力学复杂现象的理解。",
            },
            {
              title: "Darcy2D",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612ae1468eb935713790ef6.png",
              msg: "应用达西流动模型，研究地下水流动及其在环境工程和水文学中的应用。",
            },
            {
              title: "DeepCFD",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612ae6968eb93571379a890.png",
              msg: "结合深度学习技术，提升计算流体动力学仿真的效率和精度，尤其针对复杂流场预测。",
            },
            {
              title: "LDC2D_steady",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612af2668eb9357137a4c18.png",
              msg: "通过稳态顶盖驱动方腔流模型，验证计算方法的有效性并研究流动现象。",
            },
            {
              title: "LDC2D_unsteady",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612af6868eb9357137a7266.png",
              msg: "研究非稳态顶盖驱动方腔流动，探索流体在复杂边界条件下的动态行为。",
            },
            {
              title: "Labelfree_DNN_surrogate(Aneurysm flow & Pipe flow)",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612affa68eb9357137b2d56.png",
              msg: "提出一种无标签深度学习代理模型，用于快速高效地模拟流体动力学问题。",
            },
            {
              title: "NSFNets",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b04f68eb9357137b8c11.png",
              msg: "基于深度学习的神经网络，优化纳维斯托克斯方程的求解，提高流体仿真的准确性。",
            },
            {
              title: "phyCRNet",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b0c368eb9357137ca202.png",
              msg: "利用物理知识加强的卷积-递归网络，为多维时空偏微分方程提供无监督学习解决方案，增强模型对物理过程的理解和预测能力。",
            },
            {
              title: "ShockWave",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b12668eb9357137d14ac.png",
              msg: "专注于通过物理信息神经网络模拟和预测激波现象，提高对高速流体动力学中激波行为的认识和预测精度。",
            },
            {
              title: "tempoGAN",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b15a68eb9357137d2acb.png",
              msg: "结合生成对抗网络(GAN)技术，进行高效的流体动力学模拟，特别是在模拟流体的复杂动态细节方面，如湍流和涡旋等。",
            },
            {
              title: "NSFNet4",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b17c68eb9357137d4192.png",
              msg: "通过物理信息神经网络深入探索纳维斯托克斯方程的求解，为流体力学提供高精度的数值解析工具。",
            },
            {
              title: "VIV ",
              type: "流体力学",
              algorithm: "百度AI Studio",
              img: "https://pic.imgdb.cn/item/6612b26868eb9357137df2c5.png",
              msg: "研究涡激振动现象，运用深度学习方法精确预测流体绕过柱体时产生的涡激振动，对海洋工程和风工程设计具有重要意义",
            },
            {
              title: "东方.御风",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbb5a.png",
              msg: "在航空航天领域，通过AI模型优化飞机气动设计，提升飞机性能和环保性。",
            },
            {
              title: "FNO方法求解Burgers方程",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e808.png",
              msg: "利用傅里叶神经算子(FNO)技术高效求解Burgers方程，为复杂流体动力学问题提供新的解决方案",
            },
            {
              title: "KNO方法求解Burgers方程",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e853.jpg",
              msg: "通过Koopman神经算子(KNO)深入分析和求解Burgers方程，揭示非线性波动和冲击波现象。",
            },
            {
              title: "FNO方法求解NS方程",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/6612c87168eb935713a22b49.png",
              msg: "使用傅里叶神经算子(FNO)针对Navier-Stokes方程进行高效求解，提升流体动力学模拟的精度和速度。",
            },
            {
              title: "FNO3D方法求解NS方程",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/6612c79d68eb935713a05868.png",
              msg: "通过三维傅里叶神经算子(FNO3D)技术，对三维Navier-Stokes方程进行创新求解，优化复杂三维流体模拟过程。",
            },
            {
              title: "KNO方法求解NS方程",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e853.jpg",
              msg: "应用Koopman神经算子(KNO)技术解决Navier-Stokes方程，增强对流体运动预测的准确性和效率。",
            },
            {
              title: "CAE-LSTM方法求解二维黎曼问题",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089c29f345e8d039418b6.png",
              msg: "结合卷积自编码器和长短期记忆网络，高效求解二维黎曼问题，提升流场预测的精度。",
            },
            {
              title: "CAE-LSTM方法求解Shu-Osher问题",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089c29f345e8d03941ab3.png",
              msg: "利用CAE-LSTM模型精确模拟Shu-Osher问题，为复杂的非定常流动提供高效的数值解决方案。",
            },
            {
              title: "CAE-LSTM方法求解Sod激波管问题",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089c49f345e8d03941fdf.png",
              msg: "通过CAE-LSTM网络模型，高效解决Sod激波管问题，提高对激波和稀疏波动现象的理解。",
            },
            {
              title: "CAE-LSTM方法求解KH问题",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089c49f345e8d03942135.png",
              msg: "使用CAE-LSTM技术模拟Kelvin-Helmholtz不稳定性问题，为流体界面不稳定性研究提供新方法。",
            },
            {
              title: "eHDNN方法求解抖振流场",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/6612cd3668eb935713aadbea.png",
              msg: "采用增强型混合深度神经网络解析跨声速抖振流场，提高对抖振现象预测的准确性。",
            },
            {
              title: "eHDNN方法预测非定常流场",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089d39f345e8d039452ec.jpg",
              msg: "利用eHDNN模型进行非定常流场预测，为动边界和流体-结构交互问题提供高效解决方案。",
            },
            {
              title: "ResUnet3D方法求解三维圆球绕流",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/6612cd9668eb935713ab8aa7.png",
              msg: "通过ResUnet3D网络深入研究三维圆球绕流问题，优化复杂三维流场的数值模拟。",
            },
            {
              title: "CAE-Transformer方法求解二维圆柱绕流问题",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089d49f345e8d03945474.png",
              msg: "结合卷积自编码器和Transformer网络，精确模拟二维圆柱绕流问题，提升流体动力学仿真的效率。",
            },
            {
              title: "PDE-NET方法求解对流扩散方程",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/6612cf3368eb935713ae6492.png",
              msg: "使用PDE-NET技术从数据中学习对流扩散方程的解，为复杂物理系统建模提供新途径。",
            },
            {
              title: "PeRCNN方法求解二维Burgers方程",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089db9f345e8d03946be7.jpg",
              msg: "通过PeRCNN模型求解二维Burgers方程，展示物理编码网络在非线性偏微分方程求解中的应用。",
            },
            {
              title: "AI湍流模型",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/6612cffe68eb935713afdf54.png",
              msg: "开发AI湍流模型，提高湍流模拟的精度和计算效率，对航空航天等领域的流体力学研究具有重要意义。",
            },
            {
              title: "PINNs方法求解Burgers方程",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/6612da9268eb935713c14819.png",
              msg: "应用物理信息神经网络(PINNs)技术求解Burgers方程，为非线性波动问题提供精确的数值解。",
            },
            {
              title: "PINNs方法求解圆柱绕流",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089df9f345e8d03947a35.png",
              msg: "利用PINNs技术模拟圆柱绕流问题，提高对流体绕过固体障碍物行为的理解。",
            },
            {
              title: "PINNs方法求解Darcy流动",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089e09f345e8d03947c7a.png",
              msg: "采用物理信息神经网络技术模拟Darcy流动，为地下水流和过滤过程提供高效的数值解析工具。",
            },
            {
              title: "PINNs方法求解泊松方程",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089f59f345e8d0394c295.png",
              msg: "利用PINNs技术精确求解泊松方程，为电磁学、热传导等领域的问题提供创新解决方案。",
            },
            {
              title: "PINNs方法求解玻尔兹曼方程",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089f59f345e8d0394c370.png",
              msg: "通过PINNs模型求解玻尔兹曼方程，深入研究气体动力学和统计物理中的基本过程。",
            },
            {
              title: "PINNs方法求解泰勒-格林涡",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089f69f345e8d0394c5dc.png",
              msg: "使用物理信息神经网络探索泰勒-格林涡流动问题，增进对流体力学中旋涡动力学的理解。",
            },
            {
              title: "PINNs方法求解NS方程反问题",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089f69f345e8d0394c8ae.png",
              msg: "应用PINNs技术解决Navier-Stokes方程的反问题，为流体力学参数识别和反向工程提供强大工具。",
            },
            {
              title: "PINNs方法求解二维带点源的泊松方程",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089f89f345e8d0394cc37.png",
              msg: "通过PINNs模拟带点源的二维泊松方程，为点源影响下的场问题提供精确数值解。",
            },
            {
              title: "PINNs方法求解Kovasznay流动",
              type: "流体力学",
              img: "https://pic.imgdb.cn/item/65e089f99f345e8d0394d26e.png",
              msg: " 利用物理信息神经网络精确模拟Kovasznay流动，为流体力学中的基准测试问题提供新解。",
            },
            {
              title: "PINNs方法求解周期山流动问题",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/65e089fa9f345e8d0394d306.png",
              msg: "采用PINNs技术研究周期山流动问题，深入理解复杂地形对大气流动的影响。",
            },
            {
              title: "PINNs方法求解Allen-Cahn方程",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089fa9f345e8d0394d5f5.jpg",
              msg: "使用PINNs解决Allen-Cahn方程，为相场理论中的相变问题提供高效的数值方法。",
            },
            {
              title: "CMA-ES&多目标梯度下降算法",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089fb9f345e8d0394d796.png",
              msg: "结合CMA-ES算法和多目标梯度下降，优化PINNs在求解偏微分方程时的性能。",
            },
            {
              title: "Sod激波管",
              type: "流体力学",
              algorithm: "华为Model Arts",
              img: "https://pic.imgdb.cn/item/6612d1c668eb935713b333e4.png",
              msg: "使用PINNs技术求解Sod激波管问题，提高对高速流动中激波和稀疏波现象的理解。",
            },
            {
              title: "Lax激波管",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089fc9f345e8d0394dced.png",
              msg: "通过物理信息神经网络探索Lax激波管问题，提升对非线性流动和激波传播的数值模拟能力。",
            },
            {
              title: "二维黎曼问题",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/6612d28968eb935713b41486.png",
              msg: "应用PINNs方法求解二维黎曼问题，为流体动力学中的接触不连续和激波问题提供解决方案。",
            },
            {
              title: "库埃特流动",
              type: "流体力学",
              algorithm: "华为Model Arts",

              img: "https://pic.imgdb.cn/item/65e089fe9f345e8d0394e3b1.png",
              msg: "利用物理信息神经网络模拟库埃特流动，为粘性流体在平行板间流动的经典问题提供深入分析。",
            },
            {
              title: "Phiflow playground - Fluid Simulation",
              type: "流体力学",
              algorithm: "北航高算",
              img: "https://pic.imgdb.cn/item/6612d9a468eb935713bfe119.png",
              msg: "应用PhiFlow流体库进行基础的流体模拟，根据用户指定的不同的源项位置分别进行仿真",
            },
            {
              title: "Phiflow playground - Kolmogorov流模拟",
              type: "流体力学",
              algorithm: "北航高算",
              img: "https://pic.imgdb.cn/item/6612dbd768eb935713c2cc1c.png",
              msg: "应用PhiFlow流体库对Kolmogorov流进行仿真，用户可以通过上传的方式指定初始压力场",
            },
            {
              title: "Phiflow playground - Obstacle simulation",
              type: "流体力学",
              algorithm: "北航高算",
              img: "https://pic.imgdb.cn/item/6612dc6e68eb935713c37195.png",
              msg: "应用PhiFlow流体库进行有障碍的的流体模拟，根据用户指定的不同的障碍物位置分别进行仿真",
            },
          ],
        },
        {
          name: "科学任务列表",
          type: 2,
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
          name: "科学任务列表",
          type: 3,
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
          name: "科学任务列表",
          type: 4,
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
          name: "科学任务列表",
          type: 5,
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
          name: "科学任务列表",
          type: 6,
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
          name: "科学任务列表",
          type: 7,
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
    };
  },
  computed: {
    screenHeaderList() {
      if (this.$route.query.id) {
        return this.headerList[this.$route.query.id];
      } else {
        return {};
      }
    },
    screenlist() {
      if (this.$route.query.id) {
        return this.list[this.$route.query.id];
      } else {
        return {};
      }
    },
  },
  components: {},
  methods: {
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