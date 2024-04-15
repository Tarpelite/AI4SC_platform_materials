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
                <div class="msg">{{ item.msg }}</div>
                <div class="detail" @click="jumpDetail(item)">了解详情</div>
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
            :class="item.flag ? 'chooseContributingParty' : ''"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="more">更多筛选<img :src="images.up" alt="" /></div>
    </div>
    <div class="body">
      <div style="max-width: 1440px; min-width: 900px; margin: 0 auto">
        <div class="bodyItem" v-for="(item, index) in screenList" :key="index">
          <div class="header">
            <div class="title">{{ item.name }}</div>
            <div
              class="more"
              @click="jump('/scientificMissionMore', { id: index })"
            >
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
                <div class="btns">
                  <div class="btnsImg" v-if="item1.jupyter_notebook_link">
                    <img
                      :src="images.link"
                      alt=""
                      @click.stop="winOpen(item1.jupyter_notebook_link)"
                    />
                  </div>
                  <div class="btnsImg" v-if="item1.code_repo_link">
                    <img
                      :src="images.homeLink"
                      alt=""
                      @click.stop="winOpen(item1.code_repo_link)"
                    />
                  </div>
                  <div class="btnsImg" v-if="item1.homepage_link">
                    <img
                      :src="images.codeRepository"
                      alt=""
                      @click.stop="winOpen(item1.homepage_link)"
                    />
                  </div>
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
          name: "数学（AI for Math)",
          id: 0,
          childList: [
            {
              title: "DeepHPMs求解Burgers-BUAA方程",
              msg: "求解偏微分方程(PDE) 是一类基础的物理问题，在过去几十年里，以有限差分(FDM)、有限体积(FVM)、有限元(FEM)为代表的多种偏微分方程组数值解法趋于成熟。随着人工智能技术的高速发展，利用深度学习求解偏微分方程成为新的研究趋势。PINNs(Physics-informed neural networks) 是一种加入物理约束的深度学习网络，因此与纯数据驱动的神经网络学习相比，PINNs 可以用更少的数据样本学习到更具泛化能力的模型，其应用范围包括但不限于流体力学、热传导、电磁场、量子力学等领域。\n\n传统的 PINNs 会将 PDE 作为 loss 的一项参与到网络训练中去，这就要求 PDE 公式为已知的先验条件，当 PDE 公式未知时，这种方法就不能实现。\n\nDeepHPMs 着眼于 PDE 公式未知的情况，通过深度学习网络，从实验产生的高维数据中发现物理规律，即非线性 PDE 方程，并用一个深度学习网络来表征这个 PDE 方程，再将这个 PDE 网络替代传统 PINNs 方法中的 PDE 公式，对新的数据进行预测。\n\n本问题对 Burgers, Korteweg- de Vries (KdV), Kuramoto-Sivashinsky, nonlinear Schro ̈dinger 和 Navier- Stokes equations 多种 PDE 方程进行了研究，本案例主要针对 Burgers 方程进行实现。",
              img: "https://pic.imgdb.cn/item/65e077fd9f345e8d0352290e.png",
              jupyter_notebook_link: "PaddleScience-DeepHPMs",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/deephpms",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/deephpms/",
              type: "数学（AI for Math)",
              algorithm: "百度AI Studio",
            },
            {
              title: "DeepOnet求解常微分方程",
              msg: "根据机器学习领域的万能近似定理，一个神经网络模型不仅可以拟合输入数据到输出数据的函数映射关系，也可以扩展到对函数与函数之间的映射关系进行拟合，称之为“算子”学习。\n\n因此 DeepONet 在各个领域的应用都有相当的潜力。以下是一些可能的应用领域：\n\n流体动力学模拟：DeepONet可以用于对流体动力学方程进行数值求解，例如Navier-Stokes方程。这使得DeepONet在诸如空气动力学、流体机械、气候模拟等领域具有直接应用。\n图像处理和计算机视觉：DeepONet可以学习图像中的特征，并用于分类、分割、检测等任务。例如，它可以用于医学图像分析，包括疾病检测和预后预测。\n信号处理：DeepONet可以用于各种信号处理任务，如降噪、压缩、恢复等。在通信、雷达、声纳等领域，DeepONet有潜在的应用。\n控制系统：DeepONet可以用于控制系统的设计和优化。例如，它可以学习系统的动态行为，并用于预测和控制系统的未来行为。\n金融：DeepONet可以用于金融预测和分析，如股票价格预测、风险评估、信贷风险分析等。\n人机交互：DeepONet可以用于语音识别、自然语言处理、手势识别等任务，使得人机交互更加智能化和自然。\n环境科学：DeepONet可以用于气候模型预测、生态系统的模拟、环境污染检测等任务。\n需要注意的是，虽然 DeepONet 在许多领域都有潜在的应用，但每个领域都有其独特的问题和挑战。在将 DeepONet 应用到特定领域时，需要对该领域的问题有深入的理解，并可能需要针对该领域进行模型的调整和优化。",
              img: "https://pic.imgdb.cn/item/65e078199f345e8d03528fe6.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6566389?sUid=438690&shared=1&ts=1690775701017",
              code_repo_link: "",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/deeponet/",
              type: "数学（AI for Math)",
              algorithm: "百度AI Studio",
            },
            {
              title: "深度学习求解Euler_Beam问题",
              msg: "Euler Beam理论是工程力学中的基础理论之一，通常用于分析和计算在各种加载条件下梁的弯曲行为。近年来，深度学习方法被提出用于求解与Euler Beam相关的复杂问题，这种方法能够通过训练数据学习到梁的弯曲行为，从而快速准确地预测未知条件下的行为。",
              img: "https://pic.imgdb.cn/item/65eeee549f345e8d031cb56a.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/euler_beam",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/euler_beam/",
              type: "数学（AI for Math)",
              algorithm: "百度AI Studio",
            },
            {
              title: "Laplace2D",
              msg: "拉普拉斯方程由法国数学家拉普拉斯首先提出而得名，该方程在许多领域都有重要应用，例如电磁学、天文学和流体力学等。在实际应用中，拉普拉斯方程的求解往往是一个复杂的数学问题。对于一些具有特定边界条件和初始条件的实际问题，可以通过特定的数值方法（如有限元方法、有限差分方法等）来求解拉普拉斯方程。对于一些复杂的问题，可能需要采用更高级的数值方法或者借助高性能计算机进行计算。\n\n本案例通过深度学习的方式对拉普拉斯方程的2维形式进行求解。",
              img: "https://pic.imgdb.cn/item/65e078199f345e8d0352906f.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6169897?sUid=455441&shared=1&ts=1684122038217",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/laplace",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/laplace2d/",
              type: "数学（AI for Math)",
              algorithm: "百度AI Studio",
            },
            {
              title: "Lorenz_transform_physx",
              msg: "Lorenz System，中文名称可译作“洛伦兹系统”，又称“洛伦兹混沌系统”，最早由美国气象学家爱德华·洛伦兹（Edward N.Lorenz）在1963年的一篇文章中提出。著名的“蝴蝶效应”，即“一只南美洲亚马逊河流域热带雨林中的蝴蝶，偶尔扇动几下翅膀，可以在两周以后引起美国得克萨斯州的一场龙卷风”，也是最早起源于这篇文章。洛伦兹系统的特点是在一定参数条件下展现出复杂、不确定的动态行为，包括对初始条件的敏感性和长期行为的不可预测性。这种混沌行为在自然界和许多实际应用领域中都存在，例如气候变化、股票市场波动等。洛伦兹系统对数值扰动极为敏感，是评估机器学习（深度学习）模型准确性的良好基准。",
              img: "https://pic.imgdb.cn/item/65e078199f345e8d03529130.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6206798?contributionType=1&sUid=455441&shared=1&ts=1684477535039",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/lorenz",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/lorenz/",
              type: "数学（AI for Math)",
              algorithm: "百度AI Studio",
            },
            {
              title: "PIRBN",
              msg: "经过训练，物理信息神经网络（PINN）往往会成为局部近似函数。这一观察结果促使我们开发了一种新型的物理-信息径向基网络（PIRBN），该网络在整个训练过程中都能够维持局部近似性质。与深度神经网络不同，PIRBN 仅包含一个隐藏层和一个径向基“激活”函数。在适当的条件下，我们证明了使用梯度下降方法训练 PIRBN 可以收敛到高斯过程。此外，我们还通过神经邻近核（NTK）理论研究了 PIRBN 的训练动态。此外，我们还对 PIRBN 的初始化策略进行了全面调查。基于数值示例，我们发现 PIRBN 在解决具有高频特征和病态计算域的非线性偏微分方程方面比PINN更有效。此外，现有的 PINN 数值技术，如自适应学习、分解和不同类型的损失函数，也适用于 PIRBN。",
              img: "https://pic.imgdb.cn/item/65e078199f345e8d03529198.jpg",
              jupyter_notebook_link: "",
              code_repo_link: "",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/pirbn/",
              type: "数学（AI for Math)",
              algorithm: "百度AI Studio",
            },
            {
              title: "Rossler_transform_physx",
              msg: "Rossler System，最早由德国科学家 Rossler 提出，也是常见的混沌系统。该系统在混沌理论的研究中具有重要地位，为混沌现象提供了一种数学描述和理解方法。同时由于该系统对数值扰动极为敏感，因此也是是评估机器学习（深度学习）模型准确性的良好基准。",
              img: "https://pic.imgdb.cn/item/65e078499f345e8d03532938.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6209280?sUid=455441&shared=1&ts=1684495132419",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/rossler",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/rossler/",
              type: "数学（AI for Math)",
              algorithm: "百度AI Studio",
            },
            {
              title: "Volterra_IDE",
              msg: "Volterra integral equation(沃尔泰拉积分方程)是一种积分方程，即方程中含有对待求解函数的积分运算。\n \n在数学领域，沃尔泰拉方程可以用于表达各种多变量概率分布，是进行多变量统计分析的有力工具。这使得它在处理复杂数据结构时非常有用，例如在机器学习领域。沃尔泰拉方程还可以用于计算不同维度属性的相关性，以及模拟复杂的数据集结构，以便为机器学习任务提供有效的数据支持。\n\n在生物学领域，沃尔泰拉方程被用作渔业生产的指导，对生态平衡和环境保护有重要意义。此外，该方程还在疾病防治，人口统计等方面有应用。值得一提的是，沃尔泰拉方程的建立是数学在生物学领域应用的首次成功尝试，推动了生物数学这门科学的产生和发展。\n\n本案例以第二种方程为例，使用深度学习的方式进行求解。",
              img: "https://pic.imgdb.cn/item/65e078499f345e8d03532991.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6622866?sUid=438690&shared=1&ts=1691582831601",
              code_repo_link: "",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/volterra_ide/",
              type: "数学（AI for Math)",
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
              msg: "近年来，深度学习在计算机视觉和自然语言处理方面的成功应用，促使人们探索人工智能在科学计算领域的应用，尤其是在计算流体力学(CFD)领域的应用。\n\n流体是非常复杂的物理系统，流体的行为由 Navier-Stokes 方程控制。基于网格的有限体积或有限元模拟方法是 CFD 中广泛使用的数值方法。计算流体动力学研究的物理问题往往非常复杂，通常需要大量的计算资源才能求出问题的解，因此需要在求解精度和计算成本之间进行权衡。为了进行数值模拟，计算域通常被网格离散化，由于网格具有良好的几何和物理问题表示能力，同时和图结构相契合，所以这篇文章的作者使用图神经网络，通过训练 CFD 仿真数据，构建了一种数据驱动模型来进行流场预测。",
              img: "https://pic.imgdb.cn/item/65e078499f345e8d03532a57.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/amgnet",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/amgnet/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Aneurysm",
              msg: "深度学习方法可以用于处理血管瘤问题，其中包括基于物理信息的深度学习方法。这种方法可以用于脑血管瘤的压力建模，以预测和评估血管瘤破裂的风险。\n\n针对如下血管瘤几何模型，本案例通过深度学习方式，在内部和边界施加适当的物理方程约束，以无监督学习的方式对管壁压力进行建模。",
              img: "https://pic.imgdb.cn/item/65e078499f345e8d03532b41.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/aneurysm",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/aneurysm/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "BubbleNet",
              msg: "物理信息神经网络（Physics-informed Neural Networks，PINNs）是一种基于神经网络的物理模型，旨在解决有监督学习任务，同时尊重由非线性偏微分方程描述的物理规律。这种网络不仅学习到训练数据样本的分布规律，还能学习到数学方程描述的物理定律。\n\nPINNs 的背景源于对数据驱动方法和物理模型的结合。在许多科学和工程应用中，由于训练数据的采集难度高和复杂性，纯数据驱动方法往往难以取得理想的效果。同时，传统的物理模型虽然能够准确地描述自然现象，但在某些情况下可能无法充分利用所有可用的数据。因此，PINN作为一种结合了数据驱动和物理模型的方法，旨在利用两者的优势，提高预测的准确性和泛化能力。\n\nPINNs 的原理是将物理方程作为正则器，以神经网络作为求解器，将神经网络预测的结果与实际观测数据进行比较，并通过反向传播算法更新神经网络的权重，以减小预测误差。这种方法在训练过程中考虑了物理约束，从而能够更准确地捕捉系统的动态行为。\n\n尽管PINN具有许多优点，如能够处理高维数据和解决反问题等，但它仍然存在一些局限性，例如损失函数中物理方程的考虑通常需要物理量的高阶微分。特别是在两相流中，不同流体界面处的相位值呈现出从 0 到 1 的剧烈变化，使得梯度的计算变得非常困难。 因此，对于具有高梯度的变量，高分辨率训练数据将是算法成功的先决条件，然而这将大大增加深度学习的计算量，同时许多实验也很难获得高分辨率的数据。\n\n为此，不采用完整的流体动力学方程来监督训练气泡流动的过程，而是基于部分物理信息以获得令人满意的结果。具体来说，仅将流体连续性条件（  ）和压力泊松方程（表示为 ⁠ ) 代入损失函数，可以将其描述为具有部分物理信息的神经网络—— Semi-PINNs。（最后一段两个公式粘贴不过来，具体参考URL:https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/bubble/）",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e853.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/bubble",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/bubble/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "CFDGCN",
              msg: "近年来，深度学习在计算机视觉和自然语言处理方面的成功应用，促使人们探索人工智能在科学计算领域的应用，尤其是在计算流体力学(CFD)领域的应用。\n\n流体是非常复杂的物理系统，流体的行为由 Navier-Stokes 方程控制。基于网格的有限体积或有限元模拟方法是 CFD 中广泛使用的数值方法。计算流体动力学研究的物理问题往往非常复杂，通常需要大量的计算资源才能求出问题的解，因此需要在求解精度和计算成本之间进行权衡。为了进行数值模拟，计算域通常被网格离散化，由于网格具有良好的几何和物理问题表示能力，同时和图结构相契合，所以这篇文章的作者使用图神经网络，通过训练 CFD 仿真数据，构建了一种数据驱动模型来进行流场预测。",
              img: "https://pic.imgdb.cn/item/65e089459f345e8d03926699.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/7127446",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/cfdgcn",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/cfdgcn/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Cylinder2D_unsteady",
              msg: "圆柱绕流问题可以应用于很多领域。例如，在工业设计中，它可以被用来模拟和优化流体在各种设备中的流动，如风力发电机、汽车和飞机的流体动力学性能等。在环保领域，圆柱绕流问题也有应用，如预测和控制河流的洪水、研究污染物的扩散等。此外，在工程实践中，如流体动力学、流体静力学、热交换、空气动力学等领域，圆柱绕流问题也具有实际意义。\n\n2D Flow Around a Cylinder，中文名称可译作“2维圆柱绕流”，是指二维圆柱低速定常绕流的流型只与  数有关。在  时，流场中的惯性力与粘性力相比居次要地位，圆柱上下游的流线前后对称，阻力系数近似与  成反比(阻力系数为 10~60)，此  数范围的绕流称为斯托克斯区；随着  的增大，圆柱上下游的流线逐渐失去对称性。",
              img: "https://pic.imgdb.cn/item/65e089459f345e8d0392678e.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/aistudio/projectdetail/6160381?contributionType=1&sUid=438690&shared=1&ts=1683961158552",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/cylinder/2d_unsteady",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/cylinder2d_unsteady/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Cylinder2D_unsteady_transform_physx",
              msg: "圆柱绕流问题可以应用于很多领域。例如，在工业设计中，它可以被用来模拟和优化流体在各种设备中的流动，如风力发电机、汽车和飞机的流体动力学性能等。在环保领域，圆柱绕流问题也有应用，如预测和控制河流的洪水、研究污染物的扩散等。此外，在工程实践中，如流体动力学、流体静力学、热交换、空气动力学等领域，圆柱绕流问题也具有实际意义。\n\n2D Flow Around a Cylinder，中文名称可译作“2维圆柱绕流”，是指二维圆柱低速定常绕流的流型只与  数有关。在  时，流场中的惯性力与粘性力相比居次要地位，圆柱上下游的流线前后对称，阻力系数近似与  成反比(阻力系数为 10~60)，此  数范围的绕流称为斯托克斯区；随着  的增大，圆柱上下游的流线逐渐失去对称性。（公式图片粘贴不过来，可见URL：https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/cylinder2d_unsteady_transformer_physx/）",
              img: "https://pic.imgdb.cn/item/65e089479f345e8d03926dac.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6178818?sUid=455441&shared=1&ts=1684397945680",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/cylinder/2d_unsteady",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/cylinder2d_unsteady_transformer_physx/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Darcy2D",
              msg: "Darcy Flow是一个基于达西定律的工具，用于计算液体的流动。在地下水模拟、水文学、水文地质学和石油工程等领域中，Darcy Flow被广泛应用。\n\n例如，在石油工程中，Darcy Flow被用来预测和模拟石油在多孔介质中的流动。多孔介质是一种由小颗粒组成的物质，颗粒之间存在空隙。石油会填充这些空隙并在其中流动。通过Darcy Flow，工程师可以预测和控制石油的流动，从而优化石油开采和生产过程。\n\n此外，Darcy Flow也被用于研究和预测地下水的流动。例如，在农业领域，通过模拟地下水流动可以预测灌溉对土壤水分的影响，从而优化作物灌溉计划。在城市规划和环境保护中，Darcy Flow也被用来预测和防止地下水污染。\n\n2D-Darcy 是达西渗流（Darcy flow）的一种，流体在多孔介质中流动时，渗流速度小，流动服从达西定律，渗流速度和压力梯度之间呈线性关系，这种流动称为线性渗流。",
              img: "https://pic.imgdb.cn/item/65e0894c9f345e8d03928239.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6184070?contributionType=1&sUid=438690&shared=1&ts=1684239806160",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/darcy",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/darcy2d/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "DeepCFD",
              msg: "计算流体力学（Computational fluid dynamics, CFD）模拟通过求解 Navier-Stokes 方程（N-S 方程），可以获得流体的各种物理量的分布，如密度、压力和速度等。在微电子系统、土木工程和航空航天等领域应用广泛。\n\n在某些复杂的应用场景中，如机翼优化和流体与结构相互作用方面，需要使用千万级甚至上亿的网格对问题进行建模（如下图所示，下图展示了 F-18 战斗机的全机内外流一体结构化网格模型），导致 CFD 的计算量非常巨大。因此，目前亟需发展出一种相比于传统 CFD 方法更高效，且可以保持计算精度的方法。",
              img: "https://pic.imgdb.cn/item/65e0894d9f345e8d039282b9.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/deepcfd",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/deepcfd/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "LDC2D_steady",
              msg: "顶盖方腔驱动流LDC问题在许多领域中都有应用。例如，这个问题可以用于计算流体力学（CFD）领域中验证计算方法的有效性。虽然这个问题的边界条件相对简单，但是其流动特性却非常复杂。在顶盖驱动流LDC中，顶壁朝x方向以U=1的速度移动，而其他三个壁则被定义为无滑移边界条件，即速度为零。\n\n此外，顶盖方腔驱动流LDC问题也被用于研究和预测空气动力学中的流动现象。例如，在汽车工业中，通过模拟和分析车体内部的空气流动，可以帮助优化车辆的设计和性能。\n\n总的来说，顶盖方腔驱动流LDC问题在计算流体力学、空气动力学以及相关领域中都有广泛的应用，对于研究和预测流动现象、优化产品设计等方面都起到了重要的作用。",
              img: "https://pic.imgdb.cn/item/65e089589f345e8d0392ab9d.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6137973",
              code_repo_link: "",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/ldc2d_steady/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "LDC2D_unsteady",
              msg: "顶盖方腔驱动流LDC问题在许多领域中都有应用。例如，这个问题可以用于计算流体力学（CFD）领域中验证计算方法的有效性。虽然这个问题的边界条件相对简单，但是其流动特性却非常复杂。在顶盖驱动流LDC中，顶壁朝x方向以U=1的速度移动，而其他三个壁则被定义为无滑移边界条件，即速度为零。\n\n此外，顶盖方腔驱动流LDC问题也被用于研究和预测空气动力学中的流动现象。例如，在汽车工业中，通过模拟和分析车体内部的空气流动，可以帮助优化车辆的设计和性能。\n\n总的来说，顶盖方腔驱动流LDC问题在计算流体力学、空气动力学以及相关领域中都有广泛的应用，对于研究和预测流动现象、优化产品设计等方面都起到了重要的作用。",
              img: "https://pic.imgdb.cn/item/65e089589f345e8d0392ac1b.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6160749?contributionType=1&sUid=438690&shared=1&ts=1683961132625",
              code_repo_link: "",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/ldc2d_unsteady/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Labelfree_DNN_surrogate(Aneurysm flow & Pipe flow)",
              msg: "流体动力学问题的数值模拟主要依赖于使用多项式将控制方程在空间或/和时间上离散化为有限维代数系统。由于物理的多尺度特性和对复杂几何体进行网格划分的敏感性，这样的过程对于大多数实时应用程序（例如，临床诊断和手术计划）和多查询分析（例如，优化设计和不确定性量化）。在本文中，我们提供了一种物理约束的 DL 方法，用于在不依赖任何模拟数据的情况下对流体流动进行代理建模。 具体来说，设计了一种结构化深度神经网络 (DNN) 架构来强制执行初始条件和边界条件，并将控制偏微分方程（即 Navier-Stokes 方程）纳入 DNN的损失中以驱动训练。 对与血液动力学应用相关的许多内部流动进行了数值实验，并研究了流体特性和域几何中不确定性的前向传播。结果表明，DL 代理近似与第一原理数值模拟之间的流场和前向传播不确定性非常吻合。",
              img: "https://pic.imgdb.cn/item/65e089589f345e8d0392acc2.png",
              jupyter_notebook_link: "",
              code_repo_link: "",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/labelfree_DNN_surrogate/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "NSFNets",
              msg: "最近几年,深度学习在很多领域取得了非凡的成就,尤其是计算机视觉和自然语言处理方面,而受启发于深度学习的快速发展,基于深度学习强大的函数逼近能力,神经网络在科学计算领域也取得了成功,现阶段的研究主要分为两大类,一类是将物理信息以及物理限制加入损失函数来对神经网络进行训练, 其代表有 PINN 以及 Deep Retz Net,另一类是通过数据驱动的深度神经网络算子,其代表有 FNO 以及 DeepONet。这些方法都在科学实践中获得了广泛应用,比如天气预测,量子化学,生物工程,以及计算流体等领域。而为充分探索PINN对流体方程的求解能力,本次复现论文作者设计了NSFNets，并且先后使用具有解析解或数值解的二维、三维纳韦斯托克方程以及使用DNS方法进行高精度求解的数据集作为参考, 进行正问题求解训练。论文实验表明PINN对不可压纳韦斯托克方程具有优秀的数值求解能力, 本项目主要目标是使用PaddleScience复现论文所实现的高精度求解纳韦斯托克方程的代码。",
              img: "https://pic.imgdb.cn/item/65e089589f345e8d0392ad97.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/7305373",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/nsfnet",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/nsfnet/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "phyCRNet",
              msg: "复杂时空系统通常可以通过偏微分方程（PDE）来建模，它们在许多领域都十分常见，如应用数学、物理学、生物学、化学和工程学。求解PDE系统一直是科学计算领域的一个关键组成部分。 本文的具体目标是为了提出一种新颖的、考虑物理信息的卷积-递归学习架构（PhyCRNet）及其轻量级变体（PhyCRNet-s），用于解决没有任何标签数据的多维时间空间PDEs。本项目主要目标是使用PaddleScience复现论文所提供的代码，并与代码的精度对齐。\n\n该网络有以下优势：\n\n1、 使用ConvLSTM(enconder-decoder Convolutional Long Short-Term Memory network) 可以充分提取低维空间上的特征以及学习其时间上的变化。\n\n2、使用一个全局的残差迭代从而可以严格地执行时间上的迭代过程。\n\n3、使用基于高阶有限差分格式的滤波从而能够精确求解重要的偏微分方程导数值。\n\n4、使用强制边界条件是的所求解的数值解可以满足原方程所要求的初值以及边界条件。",
              img: "https://pic.imgdb.cn/item/65e089599f345e8d0392ae68.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/7296776",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/phycrnet",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/phycrnet/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "ShockWave",
              msg: "激波是自然界以及工程应用中经常发现的现象。它们不仅广泛地存在于航空航天领域的可压缩流动中，而且也表现在理论与应用物理以及工程应用等其它领域。在超声速与高超声速流动中，激波的出现对流体流动的整体特征会产生重要影响。激波捕捉问题已在CFD领域发展了数十年，以弱解的数学理论为基础的激波捕捉方法以其简单易实现的特点发展迅速，并在复杂超声速、高超声速流动数值模拟中得到了广泛应用。\n\n本案例针对 PINN-WE 模型进行优化，使得该模型可适用于超音速、高超音速等具有强激波的流场模拟中。\n\nPINN-WE 模型通过损失函数加权，在 PINN 优化过程中减弱强梯度区域的拟合，避免了因激波区域强梯度引起的激波过拟合问题，其在一维 Euler 问题、弱激波情况下的二维问题中取得了不错的结果。但是在超音速二维流场中，该模型并没有取得很好的效果，在实验中还发现该模型经常出现激波位置偏移，激波形状不对称等非物理解的预测结果。因此本案例针对上述 PINN-WE 模型的这一问题，提出渐进加权的思想，抛弃优化过程中强调梯度思想，而是创新性地通过逐步强化梯度权重对模型优化的影响，使得模型在优化过程中能够得到较好的、符合物理的激波位置。",
              img: "https://pic.imgdb.cn/item/65e089679f345e8d0392e08c.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6755993?contributionType=1&sUid=438690&shared=1&ts=1694949960479",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/shock_wave",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/shock_wave/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "tempoGAN",
              msg: "流体模拟方面的问题，捕捉湍流的复杂细节一直是数值模拟的长期挑战，用离散模型解决这些细节会产生巨大的计算成本，对于人类空间和时间尺度上的流动来说，很快就会变得不可行。因此流体超分辨率的需求应运而生，它旨在通过流体动力学模拟和深度学习技术将低分辨率流体模拟结果恢复为高分辨率结果，以减少生成高分辨率流体过程中的巨大计算成本。该技术可以应用于各种流体模拟，例如水流、空气流动、火焰模拟等。\n\n生成式对抗网络 GAN(Generative Adversarial Networks) 是一种使用无监督学习方法的深度学习网络，GAN 网络中（至少）包含两个模型：生成器(Generator) 和判别器(Discriminator)，生成器用于生成问题的输出，判别器用于判断输出的真假，两者在相互博弈中共同优化，最终使得生成器的输出接近真实值。\n\ntempoGAN 在 GAN 网络的基础上新增了一个与时间相关的判别器 Discriminator_tempo，该判别器的网络结构与基础判别器相同，但输入为时间连续的几帧数据，而不是单帧数据，从而将时序纳入考虑范围。\n\n本问题主要使用该网络，通过输入的低密度流体数据，得到对应的高密度流体数据，大大节省时间和计算成本。",
              img: "https://pic.imgdb.cn/item/65e089679f345e8d0392e30e.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6521709",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/tempoGAN",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/tempoGAN/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "NSFNet4",
              msg: "最近几年, 深度学习在很多领域取得了非凡的成就, 尤其是计算机视觉和自然语言处理方面, 而受启发于深度学习的快速发展, 基于深度学习强大的函数逼近能力, 神经网络在科学计算领域也取得了成功, 现阶段的研究主要分为两大类, 一类是将物理信息以及物理限制加入损失函数来对神经网络进行训练, 其代表有 PINN 以及 Deep Ritz Net, 另一类是通过数据驱动的深度神经网络算子, 其代表有 FNO 以及 DeepONet。这些方法都在科学实践中获得了广泛应用, 比如天气预测, 量子化学, 生物工程, 以及计算流体等领域。而为充分探索PINN对流体方程的求解能力, 本次复现论文作者设计了NSFNets, 并且先后使用具有解析解或数值解的二维、三维纳韦斯托克方程以及使用DNS方法进行高精度求解的数据集作为参考, 进行正问题求解训练。论文实验表明PINN对不可压纳韦斯托克方程具有优秀的数值求解能力, 本项目主要目标是使用PaddleScience复现论文所实现的高精度求解纳韦斯托克方程的代码。",
              img: "https://pic.imgdb.cn/item/65e089679f345e8d0392e396.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/7305374",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/nsfnet",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/nsfnet4/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "VIV ",
              msg: "涡激振动（Vortex-Induced Vibration，VIV）是一种流固耦合振动现象，主要发生在流体绕过柱体或管体时。在海洋工程和风工程中，这种振动现象具有重要应用。\n\n在海洋工程中，涡激振动问题主要涉及海洋平台（如桩基、立管等）的涡激振动响应分析。这些平台在海流中运行，会受到涡激振动的影响。这种振动可能会导致平台结构的疲劳损伤，因此在进行海洋平台设计时，需要考虑这一问题。\n\n在风工程中，涡激振动问题主要涉及风力发电机的涡激振动响应分析。风力发电机叶片在运行过程中受到气流的涡激振动，这种振动可能会导致叶片的疲劳损伤。为了确保风力发电机的安全运行，需要对这一问题进行深入的研究。\n\n总之，涡激振动问题的应用主要涉及海洋工程和风工程领域，对于这些领域的发展具有重要意义。",
              img: "https://pic.imgdb.cn/item/65e089689f345e8d0392e442.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6160556?contributionType=1&sUid=438690&shared=1&ts=1683961088129",
              code_repo_link: "",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/viv/",
              type: "流体力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "东方.御风",
              msg: "民用飞机气动设计水平直接决定飞机的“四性”，即安全性，舒适性，经济性，环保性。飞机的气动设计作为飞机设计中最基础，最核心的技术之一，在飞机飞行包线（起飞-爬升-巡航-下降-降落等）的不同阶段有着不同的研究需求和重点。如起飞阶段工程师将更关注外部噪声和高升阻比，而巡航阶段则关注油耗效率和能耗效率。流体仿真技术在飞机的气动设计的应用广泛，其主要目的在于通过数值计算的方法 获取仿真目标的流场特性（速度、压力等），进而分析飞机的气动性能参数，实现飞行器的气动性能的优化设计。“东方·御风” 是基于昇腾AI打造的面向大型客机翼型流场高效高精度AI预测仿真模型， 并在昇思MindSpore流体仿真套件的支持下，有效提高了对复杂流动的仿真能力，仿真时间缩短至原来的二十四分之一，减小风洞实验的次数。同时，“东方·御风”对流场中变化剧烈的区域可进行精准预测，流场平均误差降低至万分之一量级，达到工业级标准。",
              img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbb5a.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/airfoil/2D_steady",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/airfoil/2D_steady",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "FNO方法求解Burgers方程",
              msg: "计算流体力学是21世纪流体力学领域的重要技术之一，其通过使用数值方法在计算机中对流体力学的控制方程进行求解，从而实现流动的分析、预测和控制。传统的有限元法（finite element method，FEM）和有限差分法（finite difference method，FDM）常用于复杂的仿真流程（物理建模、网格划分、数值离散、迭代求解等）和较高的计算成本，往往效率低下。因此，借助AI提升流体仿真效率是十分必要的。\n\n近年来，随着神经网络的迅猛发展，为科学计算提供了新的范式。经典的神经网络是在有限维度的空间进行映射，只能学习与特定离散化相关的解。与经典神经网络不同，傅里叶神经算子（Fourier Neural Operator，FNO）是一种能够学习无限维函数空间映射的新型深度学习架构。该架构可直接学习从任意函数参数到解的映射，用于解决一类偏微分方程的求解问题，具有更强的泛化能力。更多信息可参考Fourier Neural Operator for Parametric Partial Differential Equations。\n\n本案例介绍利用傅里叶神经算子的1-d Burgers方程求解方法。",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e808.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/burgers/fno1d",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/burgers/fno1d",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "KNO方法求解Burgers方程",
              msg: "伯格斯方程（Burgers' equation）是一个模拟冲击波的传播和反射的非线性偏微分方程，被广泛应用于流体力学，非线性声学， 气体动力学等领域，它以约翰内斯·马丁斯汉堡（1895-1981）的名字命名。\n\n一维伯格斯方程（1-d Burgers' equation）的应用包括一维粘性流体流动建模。它的形式如下：\n\n∂tu(x,t)+∂x(u2(x,t)/2)=ν∂xxu(x,t),x∈(0,1),t∈(0,1]\nu(x,0)=u0(x),x∈(0,1)\n其中u表示速度场，u0表示初始条件，ν表示粘度系数。\n\n本案例利用Koopman Neural Operator学习初始状态到下一时刻状态的映射，实现一维Burgers'方程的求解：\n\nu0↦u(⋅,1)（公式详情见URL:https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/burgers/kno1d)",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e853.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/burgers/kno1d",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/burgers/kno1d",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "FNO方法求解NS方程",
              msg: "纳维-斯托克斯方程（Navier-Stokes equation）是计算流体力学领域的经典方程，是一组描述流体动量守恒的偏微分方程，简称N-S方程。它在二维不可压缩流动中的涡度形式如下：\n\n∂tw(x,t)+u(x,t)⋅∇w(x,t)=νΔw(x,t)+f(x),x∈(0,1)2,t∈(0,T]\n∇⋅u(x,t)=0,x∈(0,1)2,t∈[0,T]\nw(x,0)=w0(x),x∈(0,1)2\n其中u表示速度场，w=∇×u表示涡度，w0(x)表示初始条件，ν表示粘度系数，f(x)为外力合力项。\n\n本案例利用Fourier Neural Operator学习某一个时刻对应涡度到下一时刻涡度的映射，实现二维不可压缩N-S方程的求解：\n\nwt↦w(⋅,t+1)(公式详情见URL:https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/fno2d)",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e8d0.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/fno2d",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/fno2d",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "FNO3D方法求解NS方程",
              msg: "纳维-斯托克斯方程（Navier-Stokes equation）是计算流体力学领域的经典方程，是一组描述流体动量守恒的偏微分方程，简称N-S方程。它在二维不可压缩流动中的涡度形式如下：\n\n∂tw(x,t)+u(x,t)⋅∇w(x,t)=νΔw(x,t)+f(x),x∈(0,1)2,t∈(0,T]\n∇⋅u(x,t)=0,x∈(0,1)2,t∈[0,T]\nw(x,0)=w0(x),x∈(0,1)2\n其中u表示速度场，w=∇×u表示涡度，w0(x)表示初始条件，ν表示粘度系数，f(x)为外力合力项。\n\n本案例利用Fourier Neural Operator学习某一个时刻对应涡度到下一时刻涡度的映射，实现二维不可压缩N-S方程的求解：\n\nwt↦w(⋅,t+1)(公式详情见URL:https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/fno3d)",
              img: "https://pic.imgdb.cn/item/65e089b49f345e8d0393ea5c.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/fno3d",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/fno3d",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "KNO方法求解NS方程",
              msg: "纳维-斯托克斯方程（Navier-Stokes equation）是计算流体力学领域的经典方程，是一组描述流体动量守恒的偏微分方程，简称N-S方程。它在二维不可压缩流动中的涡度形式如下：\n\n∂tw(x,t)+u(x,t)⋅∇w(x,t)=νΔw(x,t)+f(x),x∈(0,1)2,t∈(0,T]\n∇⋅u(x,t)=0,x∈(0,1)2,t∈[0,T]\nw(x,0)=w0(x),x∈(0,1)2\n其中u表示速度场，w=∇×u表示涡度，w0(x)表示初始条件，ν表示粘度系数，f(x)为外力合力项。\n\n本案例利用Koopman Neural Operator学习某一个时刻对应涡度到下一时刻涡度的映射，实现二维不可压缩N-S方程的求解：\n\nwt↦w(⋅,t+1)(公式详情见URL:https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/kno2d)",
              img: "https://pic.imgdb.cn/item/65e089b39f345e8d0393e853.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/kno2d",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/navier_stokes/kno2d",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "CAE-LSTM方法求解二维黎曼问题",
              msg: "降阶模型可有效降低使用CFD方法的设计成本和周期。对于复杂的可压缩流动，使用POD等线性方法进行流场降维，需要大量的模态才能保证流场重建的精度，而采用非线性降维方法能够有效减少所需模态数。卷积自编码器(CAE)是一种由编码器和解码器组成的神经网络，能够实现数据降维和重构，可看作是POD方法的非线性拓展。采用CAE进行流场数据的非线性降维，同时使用LSTM进行流场状态的时间演化。对于非定常可压缩流动，“CAE-LSTM”降阶模型能够在使用较少自由变量数的前提下获得较高的重构和预测精度。",
              img: "https://pic.imgdb.cn/item/65e089c29f345e8d039418b6.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "CAE-LSTM方法求解Shu-Osher问题",
              msg: "降阶模型可有效降低使用CFD方法的设计成本和周期。对于复杂的可压缩流动，使用POD等线性方法进行流场降维，需要大量的模态才能保证流场重建的精度，而采用非线性降维方法能够有效减少所需模态数。卷积自编码器(CAE)是一种由编码器和解码器组成的神经网络，能够实现数据降维和重构，可看作是POD方法的非线性拓展。采用CAE进行流场数据的非线性降维，同时使用LSTM进行流场状态的时间演化。对于非定常可压缩流动，“CAE-LSTM”降阶模型能够在使用较少自由变量数的前提下获得较高的重构和预测精度。",
              img: "https://pic.imgdb.cn/item/65e089c29f345e8d03941ab3.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "CAE-LSTM方法求解Sod激波管问题",
              msg: "降阶模型可有效降低使用CFD方法的设计成本和周期。对于复杂的可压缩流动，使用POD等线性方法进行流场降维，需要大量的模态才能保证流场重建的精度，而采用非线性降维方法能够有效减少所需模态数。卷积自编码器(CAE)是一种由编码器和解码器组成的神经网络，能够实现数据降维和重构，可看作是POD方法的非线性拓展。采用CAE进行流场数据的非线性降维，同时使用LSTM进行流场状态的时间演化。对于非定常可压缩流动，“CAE-LSTM”降阶模型能够在使用较少自由变量数的前提下获得较高的重构和预测精度。",
              img: "https://pic.imgdb.cn/item/65e089c49f345e8d03941fdf.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "CAE-LSTM方法求解KH问题",
              msg: "降阶模型可有效降低使用CFD方法的设计成本和周期。对于复杂的可压缩流动，使用POD等线性方法进行流场降维，需要大量的模态才能保证流场重建的精度，而采用非线性降维方法能够有效减少所需模态数。卷积自编码器(CAE)是一种由编码器和解码器组成的神经网络，能够实现数据降维和重构，可看作是POD方法的非线性拓展。采用CAE进行流场数据的非线性降维，同时使用LSTM进行流场状态的时间演化。对于非定常可压缩流动，“CAE-LSTM”降阶模型能够在使用较少自由变量数的前提下获得较高的重构和预测精度。",
              img: "https://pic.imgdb.cn/item/65e089c49f345e8d03942135.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_lstm",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "eHDNN方法求解抖振流场",
              msg: "在跨声速流动条件下，在翼型上的自持续大尺度激波振荡被称为跨声速抖振。其原因与激波与边界层流动分离及相互作用有关。进入抖振边界后，分离区变化引起流动不稳定，影响了激波的流场位置，使得激波产生前后运动，具有复杂的非定常和非线性特征。从流场(时空流)直接学习非定常激波抖振特征对抖振研究来说，是一种有价值且具有挑战性的方法。为了找到一个高效的DL建模方法解决复杂非定常跨声速抖振问题，提出一种增强型混合深度神经网络(eHDNN)基于流场重构对非定常流场进行预测。",
              img: "https://pic.imgdb.cn/item/65e089d39f345e8d0394527d.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/transonic_buffet_ehdnn",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/transonic_buffet_ehdnn",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "eHDNN方法预测非定常流场",
              msg: "对具有移动边界的非定常流场系统进行模拟，以分析运动结构在流场中的受力情况，可在工程上优化设计运动结构。高精确度计算流体力学技术（CFD）能够准确模拟流场演化和结构受力情况，但是高精度动边界问题需要大量网格，导致计算成本巨大，动态网格构造也格外耗时。深度神经网络可学习流动工况与流场之间的演化关系，快速实现流场高精度重构。为了高效解决动边界流场重构问题，提出了一种混合深度神经网络(HDNN)，以实现非定常动边界流场重构，并基于此实现流场的快速预测。流场相关尺寸如图所示，其中\nY=Asin(2πft)\n代表圆柱体在竖直方向做简谐运动的运动表达式，A为振幅，f为频率；D代表圆柱体直径；矩形边界代表计算域。\n本案例的动边界深度神经网络模型(HDNN)的基本框架主要基于以前的工作：混合深度神经网络框架论文 ，其主要由卷积神经网络（CNN）、卷积长短期记忆网络（ConvLSTM）和反卷积神经网络（DeCNN）组成。CNN降低了时间序列流场的维数，实现特征提取；ConvLSTM学习低维时空特征并进行预测；最后，DeCNN实现预测流场的重建。",
              img: "https://pic.imgdb.cn/item/65e089d39f345e8d039452ec.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/move_boundary_hdnn",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/move_boundary_hdnn",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "ResUnet3D方法求解三维圆球绕流",
              msg: "三维复杂流动广泛存在于工程实际问题中，其中流场的快速获取与准确分析十分具有挑战性。由于网格自由度的增加，涉及复杂几何的三维流场的CFD模拟会耗费大量计算资源，限制了交互式设计和实时优化控制等下游任务的开展。\n\n近年来，深度学习技术在流场建模中的潜力得到深入挖掘，但大部分建模工作依然围绕二维形状展开，距离实际的工程应用场景还具有一定的差距。这主要是因为与2D数据相比，三维数据中的空间耦合效应更强，同时具有大量模型参数的神经网络的训练需要鲁棒的计算能力和存储资源。对于三维非定常流动，基于全卷积神经网络的“ResUnet3D”降阶模型能够快速建立三维流场快照之间的非线性映射。",
              img: "https://pic.imgdb.cn/item/65e089d49f345e8d039453a2.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/flow_around_sphere",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_driven/flow_around_sphere",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "CAE-Transformer方法求解二维圆柱绕流问题",
              msg: "降阶模型可有效降低使用CFD方法的设计成本和周期。对于复杂的可压缩流动，使用POD等线性方法进行流场降维，需要大量的模态才能保证流场重建的精度，而采用非线性降维方法能够有效减少所需模态数。卷积自编码器(CAE)是一种由编码器和解码器组成的神经网络，能够实现数据降维和重构，可看作是POD方法的非线性拓展。采用CAE进行流场数据的非线性降维，同时使用Transformer进行流场状态的时间演化。对于非定常可压缩流动，“CAE-Transformer”降阶模型能够在使用较少自由变量数与较短计算周期的前提下获得较高的重构和预测精度。",
              img: "https://pic.imgdb.cn/item/65e089d49f345e8d03945474.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_transformer",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cae_transformer",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PDE-NET方法求解对流扩散方程",
              msg: "PDE-Net是Zichao Long等人提出的一种前馈深度网络用于从数据中学习偏微分方程，同时实现了准确预测复杂系统的动力学特性和揭示潜在的PDE模型。PDE-Net的基本思想是通过学习卷积核(滤波器)来逼近微分算子，并应用神经网络或其他机器学习方法来拟合未知的非线性响应。数值实验表明，即使在噪声环境中，该模型也可以识别被观测的动力学方程，并预测相对较长时间的动态行为。",
              img: "https://pic.imgdb.cn/item/65e089d49f345e8d039454f1.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_mechanism_fusion/pde_net",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_mechanism_fusion/pde_net",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PeRCNN方法求解二维Burgers方程",
              msg: "PDE方程在对物理系统的建模中占据着中心地位，但在流行病学、气象科学、流体力学和生物学等等领域中，很多的底层PDE仍未被完全发掘出来。而对于那些已知的PDE方程，比如Naiver-Stokes方程，对这些方程进行精确数值计算需要巨大的算力，阻碍了数值仿真了在大规模时空系统上的应用。目前，机器学习的进步提供了一种PDE求解和反演的新思路。\n近日，华为与中国人民大学孙浩教授团队合作，基于昇腾AI基础软硬件平台与昇思 MindSpore AI框架提出了一种物理编码递归卷积神经网络（Physics-encoded Recurrent Convolutional Neural Network， PeRCNN）。相较于物理信息神经网络、ConvLSTM、PDE-NET等方法，模型泛化性和抗噪性明显提升，长期推理精度提升了 10倍以上，在航空航天、船舶制造、气象预报等领域拥有广阔的应用前景，目前该成果已在 nature machine intelligence 上发表。\n\nPeRCNN神经网络强制嵌入物理结构，基于结合部分物理先验设计的π-卷积模块，通过特征图之间的元素乘积实现非线性逼近。该物理嵌入机制保证模型根据我们的先验知识严格服从给定的物理方程。所提出的方法可以应用于有关PDE系统的各种问题，包括数据驱动建模和PDE的发现，并可以保证准确性和泛用性。",
              img: "https://pic.imgdb.cn/item/65e089db9f345e8d03946be7.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_mechanism_fusion/percnn",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_mechanism_fusion/percnn",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "AI湍流模型",
              msg: "湍流AI模型是基于昇腾AI开发的面向航空航天工程高雷诺数问题的高精度AI仿真模型，并在昇思MindSpore流体仿真套件的支持下，建立了大型客机机翼、翼身组合体等千万网格量级全尺度应用级大规模并行智能化的高效湍流模拟方法，大力提升传统湍流模拟方法的计算效率和计算精度，流场精度绝对误差小于5%，达到工业级标准。\n\n本案例将对湍流AI模型的研究背景、技术路径和使用指南进行介绍，并展示如何通过MindFlow实现该模型的训练，训练好的模型，将在红山社区发布。",
              img: "https://pic.imgdb.cn/item/65e089db9f345e8d03946c47.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_mechanism_fusion/ai_turbulence_modeling",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/data_mechanism_fusion/ai_turbulence_modeling",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解Burgers方程",
              msg: "伯格斯方程（Burgers' equation）是一个模拟冲击波的传播和反射的非线性偏微分方程，被广泛应用于流体力学，非线性声学，气体动力学等领域，它以约翰内斯·马丁斯汉堡（1895-1981）的名字命名。本案例采用MindFlow流体仿真套件，基于物理驱动的PINNs (Physics Informed Neural Networks)方法，求解一维有粘性情况下的Burgers方程。",
              img: "https://pic.imgdb.cn/item/65e089db9f345e8d03946c86.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/burgers",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/burgers",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解圆柱绕流",
              msg: "圆柱绕流，即二维圆柱低速非定常绕流，流动特性与雷诺数Re有关。。在Re≤1 时，流场中的惯性力与粘性力相比居次要地位，圆柱上下游的流线前后对称，阻力系数近似与Re成反比，此Re数范围的绕流称为斯托克斯区；随着 Re 的增大，圆柱上下游的流线逐渐失去对称性。这种特殊的现象反映了流体与物体表面相互作用的奇特本质，求解圆柱绕流则是流体力学中的经典问题。本案例利用 PINNs 求解圆柱绕流的尾流流场。",
              img: "https://pic.imgdb.cn/item/65e089df9f345e8d03947a35.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/cylinder_flow_forward",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/cylinder_flow_forward",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解Darcy流动",
              msg: "达西方程（Darcy equation）是一个描述了流体在多孔介质中低速流动时渗流规律的二阶椭圆型偏微分方程，被广泛应用于水利工程，石油工程等领域中。达西方程最初由亨利·达西根据沙土渗流实验的实验结果制定，后来由斯蒂芬·惠特克通过均质化方法从纳维-斯托克斯方程推导出来。本案例利用PINNs求解二维定常达西方程。",
              img: "https://pic.imgdb.cn/item/65e089e09f345e8d03947c7a.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/darcy",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/darcy",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解泊松方程",
              msg: "本案例采用 MindFlow 流体仿真套件，基于物理驱动的 PINNs (Physics Informed Neural Networks)方法，求解一维，二维和三维的泊松方程:\n\n泊松方程是理论物理中广泛应用的偏微分方程，其形式如下:\n\nΔu=f\n其中，Δ是拉普拉斯算子，u 和f 是定义在流形上的实值或复值函数。通常，f 是已知的，而φ 是需要求解的。\n\n在本案例中，对于一维泊松方程，我们有:\n\nΔu=−sin(4πx),\n对于二维泊松方程，我们有:\n\nΔu=−sin(4πx)sin(4πy),\n对于三维泊松方程，我们有:\n\nΔu=−sin(4πx)sin(4πy)sin(4πz),\n并且我们可以通过修改 yaml 中的 BC_type 来选择使用的边界条件，目前可选择的有:迪利克雷边界、罗宾边界以及周期性边界条件。\n\n对于一维问题，本案例使用一维数轴区间作为求解域，对于二维问题，本例演示在矩形，圆形，三角形，L 形和五边形区域求解方程，而对于三维问题，我们将在四面体，圆柱和圆锥区域内求解方程。（(公式详情见URL:https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/poisson/continuous)",
              img: "https://pic.imgdb.cn/item/65e089f59f345e8d0394c295.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/poisson/continuous",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/poisson/continuous",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解玻尔兹曼方程",
              msg: "玻尔兹曼方程或玻尔兹曼输运方程（Boltzmann transport equation，BTE）是由玻尔兹曼于1872年提出的一个方程，用于描述非平衡状态热力学系统的统计行为。本案例采用MindFlow流体仿真套件，基于神经网络稀疏表示的方法，求解一维的BGK以及二次碰撞项的玻尔兹曼方程。",
              img: "https://pic.imgdb.cn/item/65e089f59f345e8d0394c370.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/boltzmann",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/boltzmann",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解泰勒-格林涡",
              msg: "在流体力学中，Taylor-Green涡流动是一种不稳定的衰减的涡流，在二维周期性边界条件时存在精确解，该精确解与Navier-Stokes方程的解一致。本案例使用PINNs对2维的taylor green涡流进行仿真",
              img: "https://pic.imgdb.cn/item/65e089f69f345e8d0394c5dc.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/taylor_green",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/taylor_green",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解NS方程反问题",
              msg: "Navier-Stokes的反问题是指，在已知某些流体运动特征（如流量、速度等）的条件下，求解出能够产生这些运动特征的流体性质（如黏度、密度等）和流体边界条件（如壁面摩擦力等）的问题。与正问题（即已知流体性质和边界条件，求解流体的运动特征）不同，反问题的解决需要通过数值优化和逆推算法等方法进行求解。",
              img: "https://pic.imgdb.cn/item/65e089f69f345e8d0394c8ae.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/cylinder_flow_inverse",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/cylinder_flow_inverse",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解二维带点源的泊松方程",
              msg: "本案例采用MindFlow流体仿真套件，基于物理驱动的PINNs (Physics Informed Neural Networks)方法，求解二维带点源的泊松方程：\nΔu=−δ(x−xsrc)δ(y−ysrc),\n其中 (xsrc,ysrc) 为点源位置对应的坐标。 点源在数学上可以用狄拉克 δ 函数来表示：\nδ(x)={+∞,0,x=0x≠0∫+∞−∞δ(x)dx=1.(公式详情见URL:https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/poisson/point_source)",
              img: "https://pic.imgdb.cn/item/65e089f89f345e8d0394cc37.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/poisson/point_source",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/poisson/point_source",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解Kovasznay流动",
              msg: "Kovasznay流动是Navier-Stokes方程的一个精确解，广泛应用于流体力学领域，并常用作基准问题。它在空气动力学和计算流体力学等领域有着广泛的应用。本示例演示了如何使用MindFlow流体仿真套件，基于物理信息神经网络（PINNs）方法来求解Kovasznay流动问题。",
              img: "https://pic.imgdb.cn/item/65e089f99f345e8d0394d26e.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/kovasznay",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/kovasznay",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解周期山流动问题",
              msg: "雷诺平均Navier-Stokes方程求解周期山流动问题是流体力学和气象学领域中的一个经典数值模拟案例，用于研究空气或流体在周期性山地地形上的流动行为。这个问题旨在探究山地地形对大气或流体运动的影响，从而深入理解气象现象、地形效应以及流体在复杂地形下的特性。本项目采取雷诺平均模型模拟湍流在二维周期山地地形上的流动.",
              img: "https://pic.imgdb.cn/item/65e089fa9f345e8d0394d306.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/periodic_hill",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/physics_driven/navier_stokes/periodic_hill",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "PINNs方法求解Allen-Cahn方程",
              msg: "Allen-Cahn 方程（以 John W. Cahn 和 Sam Allen 命名）是数学物理的反应扩散方程，描述了多组分合金系统中的相分离过程，包括有序-无序转变。 该方程描述了域 Ω 上标量值状态变量 η 在时间间隔 T 内的时间演化。 本例中，MindFLow流体模拟套件用于基于物理驱动的PINNs（Physics INformed Neural Networks）方法求解Allen Cahn方程。",
              img: "https://pic.imgdb.cn/item/65e089fa9f345e8d0394d5f5.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/allen_cahn",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/allen_cahn",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "CMA-ES&多目标梯度下降算法",
              msg: "PINNs 的训练往往需要求解一个高度非线性、非凸的优化问题，并且损失函数中权重值的设置对网络训练效果有显著影响。本案例将免梯度优化算法—— CMA-ES和多目标梯度优化算法（mgda）相结合，克服优化中的高度非凸、梯度异常难题。",
              img: "https://pic.imgdb.cn/item/65e089fb9f345e8d0394d796.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cma_es_mgda",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/research/cma_es_mgda",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "Sod激波管",
              msg: "Sod 激波管问题，以 Gary A. Sod 的名字命名，是用于测试计算流体代码（如 Riemann 求解器）准确性的常见测试问题。本案例采用 MindFlow 流体仿真套件，求解 Sod 激波管问题。",
              img: "https://pic.imgdb.cn/item/65e089fe9f345e8d0394e1cc.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/sod",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/sod",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "Lax激波管",
              msg: "Lax 激波管问题是流体动力学中的经典问题，以 Peter D. Lax 的名字命名。该问题用于测试求解偏微分方程的数值方法的准确性。本案例采用 MindFlow 流体模拟套件用于解决 Lax 激波管问题。",
              img: "https://pic.imgdb.cn/item/65e089fc9f345e8d0394dced.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/lax",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/lax",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "二维黎曼问题",
              msg: "二维黎曼问题是流体动力学中的一个基础问题，涉及到当不同状态的流体在初始时刻突然接触时，流体如何随时间发展的问题。这一问题是理解复杂流体动力学现象如激波、稀疏波以及它们的相互作用的关键。在二维情况下，问题变得更加复杂，因为流体的运动可以在两个方向上发生，导致更加丰富的波动现象和流动结构。应用物理信息神经网络（PINNs）求解二维黎曼问题，不仅可以提供对这些复杂流动现象的深入理解，还能展示PINNs在处理具有高度非线性和多尺度特征的偏微分方程中的能力。通过这种方法，研究人员可以在没有显式数值解的情况下，预测流体在不同初始条件下的动态行为，对于设计高性能的流体动力系统和防灾减灾具有重要意义。",
              img: "https://pic.imgdb.cn/item/65e089fd9f345e8d0394df20.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/riemann2d",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/riemann2d",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "库埃特流动",
              msg: "库埃特流动描述了在两个平行板之间的粘性流体流动现象，其中一个板固定不动，另一个板以恒定速度移动。这一经典问题是流体力学中的一个基本问题，对于理解粘性流体的剪切流动特性至关重要。在实际应用中，库埃特流动模型可以帮助工程师设计和优化各种流体系统和设备，如润滑系统、化工过程设备以及微流控芯片等。利用物理信息神经网络（PINNs）模拟库埃特流动，可以不仅准确地捕捉流体在剪切作用下的速度分布，还能分析流体的粘性特性对流动的影响。这种方法为深入研究粘性流体动力学提供了一个强大的数值工具，特别是在解析解难以获得或不适用的复杂条件下。",
              img: "https://pic.imgdb.cn/item/65e089fe9f345e8d0394e3b1.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/couette",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindFlow/applications/cfd/couette",
              type: "流体力学",
              algorithm: "华为Model Arts",
            },
            {
              title: "Phiflow playground - Fluid Simulation",
              msg: "在使用PhiFlow进行流体模拟时，用户可以指定不同的源项位置来进行仿真。源项位置的选择会影响流体的流动和分布，从而影响仿真的结果。例如，用户可以设置源项位置在流体域的中心、边缘或任意位置，以模拟不同的流体注入场景。具体操作时，用户首先需要定义流体域的大小和分辨率，然后设置源项位置和相关参数（如流体注入速度、温度等）。接下来，使用PhiFlow的求解器进行模拟计算，得到流体的速度场、压力场等信息。通过可视化工具，用户可以观察流体在不同时间步的动态变化，分析流体的流动特性。",
              img: "https://i2.100024.xyz/2024/03/01/12gga9b.gif",
              jupyter_notebook_link:
                "https://colab.research.google.com/github/tum-pbs/PhiFlow/blob/develop/docs/Fluids_Tutorial.ipynb",
              code_repo_link: "https://github.com/tum-pbs/PhiFlow",
              homepage_link:
                "https://tum-pbs.github.io/PhiFlow/Fluids_Tutorial.html",
              type: "流体力学",
              algorithm: "北航高算",
            },
            {
              title: "Phiflow playground - Kolmogorov流模拟",
              msg: "Kolmogorov流是流体动力学中的一个重要概念，它描述了在一定条件下，湍流流体中能量的分布和传递。Kolmogorov流的特点是具有统计自相似性，即在不同尺度上观察到的流体行为具有相似的统计特征。这种特性使得Kolmogorov流成为研究湍流理论和实验的一个重要模型。在使用PhiFlow对Kolmogorov流进行仿真时，用户可以通过上传的方式指定初始压力场。初始压力场是仿真的起始条件，它决定了流体初始时刻的状态。通过调整初始压力场的分布，用户可以模拟不同的流体动力学现象，进而研究Kolmogorov流在不同条件下的行为。这种仿真方法为深入理解Kolmogorov流提供了一个强有力的工具，有助于推动流体动力学和湍流理论的发展。",
              img: "https://i2.100024.xyz/2024/03/01/12gxkez.gif",
              jupyter_notebook_link:
                "https://colab.research.google.com/github/tum-pbs/PhiFlow/blob/develop/docs/Fluids_Tutorial.ipynb",
              code_repo_link: "https://github.com/tum-pbs/PhiFlow",
              homepage_link:
                "https://tum-pbs.github.io/PhiFlow/HigherOrder_Demo.html",
              type: "流体力学",
              algorithm: "北航高算",
            },
            {
              title: "Phiflow playground - Obstacle simulation",
              msg: "在有障碍的流体模拟任务中，流体被假定为不可压缩的，即流体的密度在整个流动过程中保持不变。这种假设适用于许多实际情况，比如水或其他低速流动的液体。\n用户可以在仿真环境中放置不同位置的障碍物，以研究它们对流体流动的影响。障碍物的位置和形状会改变流体的流动路径，从而产生不同的流动模式和涡旋结构。通过改变障碍物的位置，用户可以探索各种流动场景，比如流体绕过障碍物、流体在障碍物之间的流动等。\n",
              img: "https://i2.100024.xyz/2024/03/01/12gxspf.gif",
              jupyter_notebook_link:
                "https://colab.research.google.com/drive/10Ssa_-bO0cXy2tpQ4FrQaph6GpC1SMZE",
              code_repo_link: "https://github.com/tum-pbs/PhiFlow",
              homepage_link:
                "https://tum-pbs.github.io/PhiFlow/Batched_Obstacles.html",
              type: "流体力学",
              algorithm: "北航高算",
            },
          ],
        },
        {
          name: "结构力学",
          id: 2,
          childList: [
            {
              title: "2D-Biharmonic",
              msg: "双调和方程（Biharmonic Equation）是一种表征应力、应变和载荷之间关系的方程，它是一种四阶偏微分方程，因此在传统数值方法中难以解决。本案例尝试使用 PINNs(Physics Informed Neural Networks) 方法解决 Biharmonic 方程在 2D 矩形平板上的应用问题，并使用深度学习方法根据线弹性等方程进行求解。",
              img: "https://pic.imgdb.cn/item/65e089689f345e8d0392e557.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/biharmonic2d",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/biharmonic2d/",
              type: "结构力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Bracket",
              msg: "线弹性方程在形变分析中起着核心的作用。在物理和工程领域，形变分析是研究物体在外力作用下的形状和尺寸变化的方法。线弹性方程是描述物体在受力后恢复原状的能力的数学模型。具体来说，线弹性方程通常是指应力和应变之间的关系。应力是一个物理量，用于描述物体内部由于外力而产生的单位面积上的力。应变则描述了物体的形状和尺寸的变化。线弹性方程通常可以表示为应力和应变之间的线性关系，即应力和应变是成比例的。这种关系可以用一个线性方程来表示，其中系数被称为弹性模量（或杨氏模量）。这种模型假设物体在受力后能够完全恢复原状，即没有永久变形。这种假设在许多情况下是合理的，例如在研究金属的力学行为时。然而，对于某些材料（如塑料或橡胶），这种假设可能不准确，因为它们在受力后可能会产生永久变形。线弹性方程只是形变分析中的一部分。要全面理解形变，还需要考虑其他因素，例如物体的初始形状和尺寸、外力的历史、材料的其他物理性质（如热膨胀系数和密度）等。然而，线弹性方程提供了一个基本的框架，用于描述和理解物体在受力后的行为。",
              img: "https://pic.imgdb.cn/item/65e0897d9f345e8d03932ff9.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/bracket",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/bracket/",
              type: "结构力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Control arm",
              msg: "结构受力分析是在符合某个边界条件的结构受到特定条件的载荷后，结构会产生相应的应力应变，此时对它们状态的分析。 应力是一个物理量，用于描述物体内部由于外力而产生的单位面积上的力。应变则描述了物体的形状和尺寸的变化。 通常结构力学问题分为静力学问题和动力学问题，本案例着眼于静力学分析，即结构达到受力平衡状态后再进行分析。 本问题假设结构受到一个比较小的力，此时结构形变符合线弹性方程。\n\n需要指出的是，能够适用线弹性方程的结构需要满足在受力后能够完全恢复原状，即没有永久变形。 这种假设在很多情况下是合理的，但同时对于某些可能产生永久形变的材料（如塑料或橡胶）来说，这种假设可能不准确。 要全面理解形变，还需要考虑其他因素，例如物体的初始形状和尺寸、外力的历史、材料的其他物理性质（如热膨胀系数和密度）等。\n\n汽车控制臂，也称为悬挂臂或悬挂控制臂，是连接车轮和车辆底盘的重要零件。控制臂作为汽车悬架系统的导向和传力元件，将作用在车轮上的各种力传递给车身，同时保证车轮按一定轨迹运动。控制臂分别通过球铰或者衬套把车轮和车身弹性地连接在一起 ，控制臂（包括与之相连的衬套及球头）应有足够的刚度、强度和使用寿命。\n\n本问题主要研究如下汽车悬挂控制臂结构上的受力分析情况以及验证在不给定附加数据的情况下进行参数逆推的可能性，并使用深度学习方法根据线弹性等方程进行求解，结构如下所示，左侧单一圆环内表面受力，右侧两圆环内表面固定，共研究了受力方向为：x 轴负方向、z 轴正方向两种情况，下面以 x 轴正方向受力为例进行说明。",
              img: "https://pic.imgdb.cn/item/65e0897e9f345e8d0393325a.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/control_arm",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/control_arm/",
              type: "结构力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "EPNN",
              msg: "这里主要为复现 Elasto-Plastic Neural Network (EPNN) 的 Physics-Informed Neural Network (PINN) 代理模型。将这些物理嵌入神经网络的架构中，可以更有效地训练网络，同时使用更少的数据进行训练，同时增强对训练数据外加载制度的推断能力。EPNN 的架构是模型和材料无关的，即它可以适应各种弹塑性材料类型，包括地质材料和金属；并且实验数据可以直接用于训练网络。为了证明所提出架构的稳健性，我们将其一般框架应用于砂土的弹塑性行为。EPNN 在预测不同初始密度砂土的未观测应变控制加载路径方面优于常规神经网络架构。",
              img: "https://pic.imgdb.cn/item/65e0897e9f345e8d039333ab.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/epnn",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/epnn/",
              type: "结构力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "PhyLSTM",
              msg: "我们引入了一种创新的物理知识LSTM框架，用于对缺乏数据的非线性结构系统进行元建模。基本概念是将可用但尚不完整的物理知识（如物理定律、科学原理）整合到深度长短时记忆（LSTM）网络中，该网络在可行的解决方案空间内限制和促进学习。物理约束嵌入在损失函数中，以强制执行模型训练，即使在可用训练数据集非常有限的情况下，也能准确地捕捉潜在的系统非线性。特别是对于动态结构，考虑运动方程的物理定律、状态依赖性和滞后本构关系来构建物理损失。嵌入式物理可以缓解过拟合问题，减少对大型训练数据集的需求，并提高训练模型的鲁棒性，使其具有外推能力，从而进行更可靠的预测。因此，物理知识指导的深度学习范式优于传统的非物理指导的数据驱动神经网络。",
              img: "https://pic.imgdb.cn/item/65e0897e9f345e8d039333f9.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/phylstm",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/phylstm/",
              type: "结构力学",
              algorithm: "百度AI Studio",
            },
            {
              title: "TopOpt",
              msg: "拓扑优化 (Topolgy Optimization) 是一种数学方法，针对给定的一组负载、边界条件和约束，在给定的设计区域内，以最大化系统性能为目标优化材料的分布。这个问题很有挑战性因为它要求解决方案是二元的，即应该说明设计区域的每个部分是否存在材料或不存在。这种优化的一个常见例子是在给定总重量和边界条件下最小化物体的弹性应变能。随着20世纪汽车和航空航天工业的发展，拓扑优化已经将应用扩展到很多其他学科：如流体、声学、电磁学、光学及其组合。SIMP (Simplied Isotropic Material with Penalization) 是目前广泛传播的一种简单而高效的拓扑优化求解方法。它通过对材料密度的中间值进行惩罚，提高了二元解的收敛性。",
              img: "https://pic.imgdb.cn/item/65e0897f9f345e8d03933470.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6956236",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/topopt",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/topopt/",
              type: "结构力学",
              algorithm: "百度AI Studio",
            },
          ],
        },
        {
          name: "传热学",
          id: 3,
          childList: [
            {
              title: "Heat_Exchanger",
              msg: "换热器（亦称为热交换器或热交换设备）是用来使热量从热流体传递到冷流体，以满足规定的工艺要求的装置，是对流传热及热传导的一种工业应用。\n\n在一般空调设备中都有换热器，即空调室内机和室外机的冷热排；换热器作放热用时称为“冷凝器”，作吸热用时称为“蒸发器”，冷媒在此二者的物理反应相反。所以家用空调机作为冷气机时，室内机的换热器称作蒸发器，室外机的则称为冷凝器；换做暖气机的角色时，则相反称之，如图所示为蒸发循环制冷系统。研究换热器热仿真可以为优化设计、提高性能和可靠性、节能减排以及新技术研发提供重要的参考和指导。",
              img: "https://pic.imgdb.cn/item/65e0898e9f345e8d03936647.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/heat_exchanger",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/heat_exchanger/",
              type: "传热学",
              algorithm: "百度AI Studio",
            },
            {
              title: "Heat_PINN",
              msg: "热传导是自然界中的常见现象，广泛应用于工程、科学和技术领域。热传导问题在多个领域中都具有广泛的应用和重要性，对于提高能源效率、改进材料性能、促进科学研究和推动技术创新都起着至关重要的作用。因此了解和模拟传热过程对于设计和优化热传导设备、材料和系统至关重要。2D 定常热传导方程描述了稳态热传导过程，传统的求解方法涉及使用数值方法如有限元法或有限差分法，这些方法通常需要离散化领域并求解大规模矩阵系统。近年来，基于物理信息的神经网络（Physics-informed neural networks, PINN）逐渐成为求解偏微分方程的新方法。PINN 结合了神经网络的灵活性和对物理约束的建模能力，能够直接在连续领域中解决偏微分方程问题。",
              img: "https://pic.imgdb.cn/item/65e089959f345e8d03937f89.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/heat_pinn",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/heat_pinn/",
              type: "传热学",
              algorithm: "百度AI Studio",
            },
            {
              title: "PhyGeoNet",
              msg: "最近几年，深度学习在很多领域取得了非凡的成就，尤其是计算机视觉和自然语言处理方面，受启发于深度学习的快速发展，基于深度学习强大的函数逼近能力，神经网络在科学计算领域也取得了成功，现阶段的研究主要分为两大类，一类是将物理信息以及物理限制加入损失函数来对神经网络进行训练, 其代表有 PINN 以及 Deep Ritz Net，另一类是通过数据驱动的深度神经网络算子，其代表有 FNO 以及 DeepONet。这些方法都在科学实践中获得了广泛应用，比如天气预测，量子化学，生物工程，以及计算流体等领域。由于卷积神经网络具有参数共享的性质，可以学习大尺度的时空域，因此获得了越来越多的关注。",
              img: "https://pic.imgdb.cn/item/65e089959f345e8d0393800a.jpg",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/7195983",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/phygeonet",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/phygeonet/",
              type: "传热学",
              algorithm: "百度AI Studio",
            },
          ],
        },
        {
          name: "材料科学",
          id: 4,
          childList: [
            {
              title: "hPINNs(PINN with hard constraints)",
              msg: "求解偏微分方程(PDE) 是一类基础的物理问题，在过去几十年里，以有限差分(FDM)、有限体积(FVM)、有限元(FEM)为代表的多种偏微分方程组数值解法趋于成熟。随着人工智能技术的高速发展，利用深度学习求解偏微分方程成为新的研究趋势。PINNs(Physics-informed neural networks) 是一种加入物理约束的深度学习网络，因此与纯数据驱动的神经网络学习相比，PINNs 可以用更少的数据样本学习到更具泛化能力的模型，其应用范围包括但不限于流体力学、热传导、电磁场、量子力学等领域。\n\n传统的 PINNs 网络中的约束都是软约束，即 PDE(偏微分方程) 作为 loss 项参与网络训练。而本案例 hPINNs 通过修改网络输出的方法，将约束严格地加入网络结构中，形成一种更有效的硬约束。\n\n同时 hPINNs 设计了不同的约束组合，进行了软约束、带正则化的硬约束和应用增强的拉格朗日硬约束 3 种条件下的实验。本文档主要针对应用增强的拉格朗日方法的硬约束进行说明，但完整代码中可以通过 train_mode 参数来切换三种训练模式。",
              img: "https://pic.imgdb.cn/item/65e089959f345e8d039380f6.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6390502",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/hpinns",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/hpinns/",
              type: "材料科学",
              algorithm: "百度AI Studio",
            },
          ],
        },
        {
          name: "气象学",
          id: 5,
          childList: [
            {
              title: "FourCastNet",
              msg: "在天气预报任务中，有基于物理信息驱动和数据驱动两种方法实现天气预报。基于物理信息驱动的方法，往往依赖物理方程，通过建模大气变量之间的物理关系实现天气预报。例如在 IFS 模型中，使用了分布在 50 多个垂直高度上共 150 多个大气变量实现天气的预测。基于数据驱动的方法不依赖物理方程，但是需要大量的训练数据，一般将神经网络看作一个黑盒结构，训练网络学习输入数据与输出数据之间的函数关系，实现给定输入条件下对于输出数据的预测。FourCastNet是一种基于数据驱动方法的气象预报算法，它使用自适应傅里叶神经算子（AFNO）进行训练和预测。该算法专注于预测两大气象变量：距离地球表面10米处的风速和6小时总降水量，以对极端天气、自然灾害等进行预警。相比于 IFS 模型，它仅仅使用了 5 个垂直高度上共 20 个大气变量，具有大气变量输入个数少，推理理速度快的特点。",
              img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cb7ce.png",
              jupyter_notebook_link:
                "https://aistudio.baidu.com/projectdetail/6213922?contributionType=1&sUid=455441&shared=1&ts=1684585396793",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/fourcastnet",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/fourcastnet/",
              type: "气象学",
              algorithm: "百度AI Studio",
            },
            {
              title: "NowcastNet",
              msg: "近年来，深度学习方法已被应用于天气预报，尤其是雷达观测的降水预报。这些方法利用大量雷达复合观测数据来训练神经网络模型，以端到端的方式进行训练，无需明确参考降水过程的物理定律。 这里复现了一个针对极端降水的非线性短临预报模型——NowcastNet，该模型将物理演变方案和条件学习法统一到一个神经网络框架中，实现了端到端的优化。",
              img: "https://pic.imgdb.cn/item/65e089a49f345e8d0393b8ee.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/paddlepaddle/PaddleScience/tree/develop/examples/nowcastnet",
              homepage_link:
                "https://paddlescience-docs.readthedocs.io/zh/latest/zh/examples/nowcastnet/",
              type: "气象学",
              algorithm: "百度AI Studio",
            },
            {
              title: "CTEFNet: 基于 CNN 与迁移学习的厄尔尼诺预测模型",
              msg: "CTEFNet是一种基于深度学习的 ENSO 预测模型，其使用 2D CNN 从气象数据中提取特征，将多个时点特征拼接为时间序列后输入 Transformer Encoder 进行时序分析和 ENSO 预测。 与之前的深度学习模型相比，CTEFNet的有效预测时长延长至19个月。\n本案例介绍了CTEFNet的研究背景和技术路径，并展示了如何通过MindEarth训练和快速推理模型。",
              img: "https://pic.imgdb.cn/item/65eeee559f345e8d031cbc9f.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindEarth/applications/climate-prediction/ensoforecast",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindEarth/applications/climate-prediction/ensoforecast",
              type: "气象学",
              algorithm: "华为Model Arts",
            },
            {
              title: "DEM-SRNet: 全球3弧秒（90m）海陆高分辨率数字高程模型",
              msg: "DEM-SRNet是一个预训练地面DEM数据的深度残差网络，设计的预训练结构源自增强型深度超分辨率网络（EDSR）。\n本案例介绍了DEM-SRNet的研究背景和技术路径，并展示了如何通过MindEarth训练和快速推理模型。",
              img: "https://pic.imgdb.cn/item/65e08a099f345e8d039508a5.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindEarth/applications/dem-super-resolution",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindEarth/applications/dem-super-resolution",
              type: "气象学",
              algorithm: "华为Model Arts",
            },
            {
              title: "DgmrNet：基于深度生成模型的雷达数据气象短临预报",
              msg: "DgmrNet（雷达数据深度生成模型）是由 DeepMind 的研究人员开发的用于雷达降水概率短临预报的深度生成模型。它可以对面积达 1,536 公里 × 1,280 公里的区域进行现实且时空一致的预测，并且提前时间为 5 至 90 分钟。\n本案例介绍了DgmrNet的研究背景和技术路径，并展示了如何通过MindEarth训练和快速推断模型。",
              img: "https://pic.imgdb.cn/item/65e08a099f345e8d0395090b.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindEarth/applications/nowcasting/dgmr",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindEarth/applications/nowcasting/dgmr",
              type: "气象学",
              algorithm: "华为Model Arts",
            },
          ],
        },
        {
          name: "生物学",
          id: 6,
          childList: [
            {
              title: "NMR数据自动解析 FAAST",
              msg: "已有的AI计算方法如MEGA-Fold/AlphaFold虽然极大地提高了预测静态蛋白质结构的准确性，但仍存在未解决的问题，例如生成动态构象和进行符合实验或先验信息的结构预测。为了解决这些问题我们在已有MEGA-Fold的基础上自研了RASP(Restraints Assisted Structure Predictor)模型，RASP模型能接受抽象或实验约束，使它能根据抽象或实验、稀疏或密集的约束生成结构。这使得RASP可用于多种应用，包括改进多结构域蛋白和msa较少的蛋白的结构预测。\n\n核磁共振方法（NMR）是唯一一种以原子分辨率解析更贴近蛋白质在实际环境下的溶液态构象与动态结构的方法，然而NMR实验数据获取与分析耗时长，平均单条蛋白需领域专家投入至少数月，其中大部分时间用于实验数据的解析和归属。现有NMR NOE谱峰数据解析方法如CARA，ARIA、CYANA等使用传统分子动力学模拟生成的结构迭代解析数据，解析速度慢，且从数据中解析出的约束信息和结构仍然需要大量专家知识，同时需要投入较长时间做进一步修正。为了提高 NMR 实验数据解析的速度和准确性，我们基于MindSpore+昇腾AI软硬件平台开发了NMR数据自动解析方法FAAST（iterative Folding Assisted peak ASsignmenT）。",
              img: "https://pic.imgdb.cn/item/65e089a59f345e8d0393bb55.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/research/FAAST",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/research/FAAST",
              type: "生物学",
              algorithm: "华为Model Arts",
            },
            {
              title: "蛋白质结构预测 MEGA-Fold",
              msg: "使用计算机高效计算获取蛋白质空间结构的过程被称为蛋白质结构预测，传统的结构预测工具一直存在精度不足的问题，直至2020年谷歌DeepMind团队提出AlphaFold2[1,2]，该模型相较于传统工具预测精度大幅提升，所得结构与真实结构误差接近实验方法，但是仍存在数据前处理耗时过长、缺少MSA时预测精度不准、缺乏通用评估结构质量工具的问题。针对这些问题，高毅勤老师团队与MindSpore科学计算团队合作进行了一系列创新研究，开发出更准确和更高效的蛋白质结构预测工具MEGA-Protein，本目录即为MEGA-Protein的开源代码。",
              img: "https://pic.imgdb.cn/item/65e089a59f345e8d0393bcb0.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/MEGAProtein/",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/MEGAProtein/",
              type: "生物学",
              algorithm: "华为Model Arts",
            },
            {
              title: "蛋白质结构评估 MEGA-Assessment",
              msg: "使用计算机高效计算获取蛋白质空间结构的过程被称为蛋白质结构预测，传统的结构预测工具一直存在精度不足的问题，直至2020年谷歌DeepMind团队提出AlphaFold2[1,2]，该模型相较于传统工具预测精度大幅提升，所得结构与真实结构误差接近实验方法，但是仍存在数据前处理耗时过长、缺少MSA时预测精度不准、缺乏通用评估结构质量工具的问题。针对这些问题，高毅勤老师团队与MindSpore科学计算团队合作进行了一系列创新研究，开发出更准确和更高效的蛋白质结构预测工具MEGA-Protein，本目录即为MEGA-Protein的开源代码。",
              img: "https://pic.imgdb.cn/item/65e089a69f345e8d0393bcef.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/MEGAProtein/",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/MEGAProtein/",
              type: "生物学",
              algorithm: "华为Model Arts",
            },
            {
              title: "共进化数据引擎 MEGA-EvoGen",
              msg: "使用计算机高效计算获取蛋白质空间结构的过程被称为蛋白质结构预测，传统的结构预测工具一直存在精度不足的问题，直至2020年谷歌DeepMind团队提出AlphaFold2[1,2]，该模型相较于传统工具预测精度大幅提升，所得结构与真实结构误差接近实验方法，但是仍存在数据前处理耗时过长、缺少MSA时预测精度不准、缺乏通用评估结构质量工具的问题。针对这些问题，高毅勤老师团队与MindSpore科学计算团队合作进行了一系列创新研究，开发出更准确和更高效的蛋白质结构预测工具MEGA-Protein，本目录即为MEGA-Protein的开源代码。",
              img: "https://pic.imgdb.cn/item/65e089a69f345e8d0393bd31.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/MEGAProtein/",
              homepage_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE/applications/MEGAProtein/",
              type: "生物学",
              algorithm: "华为Model Arts",
            },
          ],
        },
        {
          name: "电磁学",
          id: 7,
          childList: [
            {
              title: "点源时域麦克斯韦方程AI求解",
              msg: "人工智能技术的蓬勃发展为科学计算提供了新的范式。MindSpore Elec套件提供了物理驱动和数据驱动的AI方法。物理驱动的AI方法结合物理方程和初边界条件进行模型的训练，相比于数据驱动而言，其优势在于无需监督数据。本案例教程重点介绍物理驱动的AI方法求解点源时域麦克斯韦方程。\n\n",
              img: "https://pic.imgdb.cn/item/65e089ff9f345e8d0394e535.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindElec/examples/physics_driven/time_domain_maxwell",
              homepage_link:
                "https://gitee.com/link?target=https%3A%2F%2Fwww.mindspore.cn%2Fmindelec%2Fdocs%2Fzh-CN%2Fmaster%2Ftime_domain_maxwell.html",
              type: "电磁学",
              algorithm: "华为Model Arts",
            },
            {
              title: "增量训练求解麦克斯韦方程组",
              msg: "原始的PINNs（Physics-Informed Neural Networks, PINNs）方法不具备求解一类方程的能力。当方程中的特征参数（如介电系数等）发生变化时需要重新训练，增加了求解时间。\n\n本教程重点介绍基于MindSpore Elec套件的物理信息自解码器（Physics-Informed Auto-Decoder）增量训练方法，该方法可以快速求解同一类方程，极大减少重新训练的时间。",
              img: "https://pic.imgdb.cn/item/65e08a039f345e8d0394f29a.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindElec/examples/physics_driven/incremental_learning",
              homepage_link:
                "https://gitee.com/link?target=https%3A%2F%2Fwww.mindspore.cn%2Fmindelec%2Fdocs%2Fzh-CN%2Fmaster%2Fincremental_learning.html",
              type: "电磁学",
              algorithm: "华为Model Arts",
            },
            {
              title: "基于参数化方案的AI电磁仿真",
              msg: "电磁仿真在天线、芯片和手机等产品设计过程中应用广泛，主要目的是获取待仿真目标的传输特性（散射参数、电磁场等）。散射参数（S参数）是建立在输入波、反射波基础上的网络参数，用于微波电路分析，以器件端口的反射信号强度以及从该端口传向另一端口的信号的强度来描述电路网络。\n\n目前天线、手机等产品通常依靠商业仿真软件（CST、HFS等）进行仿真，得到S参数等结果。当前商业软件仿真多通过数值算法（FDTD等）计算S参数，仿真流程主要包括半自动/自动的网格剖分和数值求解麦克斯韦方程这两个步骤，耗时较长，同时算力消耗十分庞大。\n\nMindSpore Elec通过AI方法跳过传统数值方法的迭代计算直接得到待仿真目标的S参数，极大节省仿真时长。MindSpore Elec提供两种数据驱动的电磁仿真方案：参数化方案和点云方案，这两种方案有以下特点：\n\n参数化方案实现的是参数到仿真结果的直接映射，例如天线的宽度、角度作为网络输入，网络输出为S参数。参数化方案的优点是直接映射且网络简单。\n\n点云方案实现的是从天线/手机的采样点云到仿真结果的映射，该方案先将手机结构文件转化为点云张量数据，（压缩后）使用卷积神经网络提取结构特征，再通过数层全连接层映射到最终的仿真结果（S参数），该方案的优点是适用于结构参数数量或种类可能发生变化的复杂工况。",
              img: "https://pic.imgdb.cn/item/65e08a029f345e8d0394f281.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindElec/examples/data_driven/parameterization",
              homepage_link:
                "https://gitee.com/link?target=https%3A%2F%2Fwww.mindspore.cn%2Fmindelec%2Fdocs%2Fzh-CN%2Fmaster%2Fparameterization.html",
              type: "电磁学",
              algorithm: "华为Model Arts",
            },
            {
              title: "基于点云方案的AI电磁仿真",
              msg: "本案例介绍MindSpore Elec提供的基于点云方案的AI电磁仿真方法，引导您快速使用MindSpore Elec。\n\n传统电磁仿真计算通常使用基于有限元或有限差分的方法计算电磁场，这些方法需要复杂的网格剖分与迭代计算，整体流程耗时长，影响产品研发效率。MindSpore Elec提供一种新的电磁场端到端AI计算方法，该方法基于点云数据，跳过网格剖分与迭代求解，直接计算仿真区域内电磁场，大幅提升整体仿真速度，助力产品高效研发。",
              img: "https://pic.imgdb.cn/item/65e08a039f345e8d0394f4cf.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindElec/examples/data_driven/pointcloud",
              homepage_link:
                "https://gitee.com/link?target=https%3A%2F%2Fwww.mindspore.cn%2Fmindelec%2Fdocs%2Fzh-CN%2Fmaster%2Fpoint_cloud.html",
              type: "电磁学",
              algorithm: "华为Model Arts",
            },
            {
              title: "基于可微分FDTD的贴片天线S参数仿真",
              msg: "本案例介绍MindSpore Elec提供的基于端到端可微分FDTD求解电磁正问题的方法。时域有限差分（FDTD）方法求解麦克斯韦方程组的过程等价于一个循环卷积网络（RCNN）。利用MindSpore的可微分算子重写更新流程，便可得到端到端可微分FDTD。相比于数据驱动的黑盒模型，可微分FDTD方法的求解流程严格满足麦克斯韦方程组的约束，精度与传统数值算法精度相当。\n\n",
              img: "https://pic.imgdb.cn/item/65e08a039f345e8d0394f64d.jpg",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindElec/examples/AD_FDTD/fdtd_forward",
              homepage_link:
                "https://gitee.com/link?target=https%3A%2F%2Fwww.mindspore.cn%2Fmindelec%2Fdocs%2Fzh-CN%2Fmaster%2FAD_FDTD_forward.html",
              type: "电磁学",
              algorithm: "华为Model Arts",
            },
            {
              title: "端到端可微分FDTD求解电磁逆散射问题",
              msg: "本案例介绍MindSpore Elec提供的基于端到端可微分FDTD求解电磁逆问题的方法。时域有限差分（FDTD）方法求解麦克斯韦方程组的过程等价于一个循环卷积网络（RCNN）。利用MindSpore的可微分算子重写更新流程，便可得到端到端可微分FDTD。相比于数据驱动的黑盒模型，可微分FDTD方法的求解流程严格满足麦克斯韦方程组的约束。利用MindSpore的基于梯度的优化器，可微分FDTD可求解各种电磁逆问题。",
              img: "https://pic.imgdb.cn/item/65e08a069f345e8d03950102.png",
              jupyter_notebook_link: "",
              code_repo_link:
                "https://gitee.com/mindspore/mindscience/tree/master/MindElec/examples/AD_FDTD/fdtd_inverse",
              homepage_link:
                "https://gitee.com/link?target=https%3A%2F%2Fwww.mindspore.cn%2Fmindelec%2Fdocs%2Fzh-CN%2Fmaster%2FAD_FDTD_inverse.html",
              type: "电磁学",
              algorithm: "华为Model Arts",
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
          name: "百度AI Studio",
          flag: true,
        },
        {
          name: "华为Model Arts",
          flag: true,
        },
        {
          name: "北航高算",
          flag: true,
        },
      ],
      contributingPartyIndex: 0,
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
  methods: {
    jump(jumpPath, data) {
      this.$router.push({ path: jumpPath, query: data });
    },
    jumpDetail() {
      this.$router.push({ path: "/scientificMissionDetail" });
    },
    winOpen(link) {
      window.open(link)
    },
    screenScientificField(item) {
      item.flag = !item.flag;
    },
    screenChildList(list) {
      let arr = [];
      this.tagList1
        .filter((item) => item.flag)
        .map((item) => {
          arr.push(item.name);
        });
      let listArr = [];
      list.map((item) => {
        if (arr.includes(item.algorithm)) {
          listArr.push(item);
        }
      });
      return listArr;
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
    background: #fff;
    border-radius: 10px;
  }
}
.scientificMission {
  height: 100%;
  margin-top: 20px;
  background: #fafafa;
  .bannerBg {
    padding: 0 40px 20px 40px;
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
    // padding: 0 40px;
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
        cursor: pointer;
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
    width: 1280px;
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
            margin-top: 8px;
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
          .btns {
            display: flex;
            margin-top: 10px;
            .btnsImg {
              width: 28px;
              height: 28px;
              margin-right: 22px;
              background: rgba(222, 234, 255, 0.6);
              border-radius: 8px 8px 8px 8px;
              cursor: pointer;
              text-align: center;
              img {
                width: 20px;
                height: 20px;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>