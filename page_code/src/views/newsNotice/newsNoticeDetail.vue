<template>
  <div class="newsNoticeDetail">
    <div class="content">
      <div class="header">
        <div class="title">新闻通知 / 产业动向</div>
        <div class="btns">
          <div class="share">
            <img :src="images.share" alt="" />
            <span>分享</span>
          </div>
          <div class="collect">
            <img :src="images.collect" alt="" />
            <span>收藏</span>
          </div>
          <div class="back">
            <img :src="images.back" alt="" />
            <span>返回</span>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="title">
          预测所有生物分子，David Baker 团队蛋白质设计新工具 RoseTTAFold
          All-Atom 登 Science
        </div>
        <div class="info">
          <span class="reship">转载</span>
          <span>点击数:117 | ScienceAI | 2024-03-08 12:37 | 美国</span>
        </div>
        <!-- <img :src="img" alt="" /> -->
        <div class="lineheight">
          在蛋白领域，华盛顿大学 David Baker
          团队又带来了新进展。蛋白质是生命存在不可或缺的分子，但它们不是细胞中唯一的分子，参与生命过程它们必须与其他分子相互协作。近年来，AlphaFold
          和 RoseTTAFold
          等蛋白质结构预测算法，席卷了结构生物学领域。深度学习方法彻底改变了蛋白质结构预测和设计方式，但目前仅限于纯蛋白质系统。问题是，这些模型忽略了许多影响蛋白质结构的化学类型。「例如，许多生物学涉及蛋白质与小分子相互作用。」华盛顿大学教授
          David Baker 说。「<span class="blue"
            >这是我们想要测试的一种假设：是否有可能训练一个可以代表所有这些不同类型分子的模型？</span
          >」 论文一作 Rohith Krishna 说道。基于此，<span class="blue"
            >Baker 团队开发了 RoseTTAFold All-Atom（RFAA），它可以将氨基酸和 DNA
            碱基的基于残基的表示与所有其他基团的原子表示相结合，从而对包含蛋白质、核酸、小分子、金属和给定序列和化学结构的共价修饰的组件进行建模</span
          >。该研究以「Generalized biomolecular modeling and design with
          RoseTTAFold All-Atom」为题，于 2024 年 3 月 7 日发布在《Science》。
        </div>
        <img
          src="https://pic.imgdb.cn/item/65effb5b9f345e8d039a3dfd.png"
          alt=""
        />
        <div class="lineheight">
          深度神经网络 AlphaFold2（AF2）和 RoseTTAFold
          实现了高精度从氨基酸序列预测蛋白质结构。这些机器学习工具在已经通过实验解决的蛋白质结构上进行训练，仅根据蛋白质的氨基酸序列预测新的
          3D
          结构。生物化学家利用这些预测来提出有关蛋白质如何工作以及它们如何组合在一起的假设，并且还使用这些工具来设计具有所需功能的新蛋白质。然而，在自然界中，蛋白质很少单独发生作用，它们在细胞信号传导中与其他蛋白质形成复合物，在转录和翻译过程中与
          DNA 和 RNA
          相互作用，在代谢过程中与小分子进行共价或非共价相互作用。目前，模拟一般的生物分子组件所组成的多肽链，共价修饰的氨基酸、核酸链，以及任意的小分子，仍然是一个突出的挑战。
        </div>
        <div class="textTile">将结构预测推广到所有生物分子</div>
        <div class="lineheight">
          华盛顿大学 David Baker
          团队开发了一种结构预测方法，可以生成一个生物单元的所有原子的三维坐标，包括蛋白质、核酸、小分子、金属和化学修饰。面对广义生物分子系统建模的更广泛的挑战，研究人员面临的第一个问题是如何表示组成单元。现有的蛋白质结构预测网络表示蛋白质线性链的氨基酸，这种表示可以很容易地扩展到核酸。然而，许多与蛋白质相互作用的小分子并不是聚合物，而且目前还不清楚如何将它们建模为线性序列。表示小分子键合结构的一种自然方法是用图来表示，图中的节点是原子，图中的边表示键的连通性。这种图表示并不适合蛋白质，因为它们包含成千上万的原子，所以整个蛋白质在原子水平上建模在计算方面非常棘手。为了克服这一限制，研究人员尝试将生物聚合物（蛋白质和核酸）的基于序列的描述，与小分子和蛋白质共价修饰的解剖图表示相结合。通过对扩散去噪任务进行微调，研究人员获得了
          RFdiffusion All-Atom
          (RFdiffusionAA)，它通过直接在小分子和其他非蛋白质分子周围构建蛋白质结构，来生成结合口袋。Baker
          表示：「原则上，经过更多样化数据集训练的网络应该能够更好地进行泛化。」他补充说，研究人员计划让该网络取代任务特定版本的
          RoseTTAFold。
        </div>
        <img
          src="https://pic.imgdb.cn/item/65effbc99f345e8d039bf1e1.png"
          alt=""
        />
        <div class="lineheight">
          具体来说，研究人员根据
          RoseTTAFold2（RF2）蛋白质结构预测网络对网络架构进行建模，该网络可以接受
          1D 序列信息、来自同源模板的 2D 成对距离信息和 3D
          坐标信息，并通过许多隐藏层迭代改进预测结构。与蛋白质和核酸序列不同，分子图是排列不变的，因此，无论小分子元素标记顺序如何，网络都应该做出相同的预测。AF2
          和 RF2
          中，氨基酸和碱基的序列顺序是通过相对位置编码来表示的；对于原子，该团队省略了这样的编码并利用网络注意力机制的排列不变性。研究人员还修改了坐标更新：在
          AF2 和 RF2 中，蛋白质残基由 C 坐标和 N-C -C 刚性框架 α 的方向 α
          表示，并且沿着 3D
          轨迹，网络生成每个框架方向的旋转更新，以及每个坐标的平移更新。为了在
          RFAA 中概括这一点，重原子坐标被添加到 3D
          轨迹中，并仅根据对其位置的预测平移更新独立移动。因此，在输入后，整个系统立即被表示为氨基酸残基、核酸碱基以及自由移动原子的断开气体，它通过网络的许多块连续转化为物理上合理的组装结构。对于指导参数优化的损失函数，研究人员开发了
          AF2
          中引入的帧对齐点误差（FAPE）损失的全原子版本，通过根据其键合邻居的身份定义任意分子中每个原子的坐标系，与基于残基的
          FAPE
          一样，连续对齐每个坐标系并计算周围原子的坐标误差。除了原子坐标之外，网络还可以预测原子和残基置信度
          (pLDDT) 和成对置信度 (PAE) 指标，从而能够识别高质量的预测。
        </div>
        <div class="textTile">应用及展望</div>
        <div class="lineheight">
          在蛋白质数据库（PDB）中对完整生物组装体的结构进行训练后，RFAA 具有与
          AF2 相当的蛋白质结构预测准确性，在 CAMEO
          中具有出色的灵活骨架小分子对接性能，并且对蛋白质共价修饰以及具有多个核酸链和小分子的蛋白质组装具有合理的预测准确性。
        </div>
        <img
          src="https://pic.imgdb.cn/item/65effbe79f345e8d039c61a4.png"
          alt=""
        />
        <div class="lineheight">
          在此之前，没有方法可以同时建模。同时，从目标小分子周围氨基酸残基的随机分布开始，该团队设计并通过实验验证了与心脏病治疗剂地高辛、酶促辅因子血红素和光学活性胆碱分子结合的蛋白质，这些蛋白质具有扩大光合作用捕获的波长范围的潜力。美国国家医学图书馆（National
          Library of Medicine）的计算生物学家 Lauren Porter
          表示，该网络前景广阔，但需要时间来了解它所代表的巨大进步，以及它可能存在的不足。她说，人工智能模型总体而言「取决于它们的训练集」。它们可能会在可用训练数据有限的领域遇到困难，例如当单个蛋白质根据其上下文采用两种截然不同的形状时。生物化学家本身并不知道其中许多案例，因此需要时间才能发现这些差异。尽管如此，Porter
          说，「这无疑是朝着正确方向迈出的一步，也许是一个重大的一步，时间会证明一切。」
        </div>
        <div class="textLink">
          论文连接：<a
            target="_blank"
            href="https://www.science.org/doi/10.1126/science.adl2528"
            >https://www.science.org/doi/10.1126/science.adl2528</a
          >
        </div>
        <div class="textLink">
          参考内容：<a
            target="_blank"
            href="https://cen.acs.org/analytical-chemistry/structural-biology/new-tool-protein-designers/101/i36"
            >https://cen.acs.org/analytical-chemistry/structural-biology/new-tool-protein-designers/101/i36</a
          >
        </div>
      </div>
    </div>
    <div class="paging">
      <div class="previous">
        <div class="btn">
          <img :src="images.left1" alt="" />
          上一篇
        </div>
        <div class="text">
          AI4Science的基石：几何图神经网络，最全综述来了！人大高瓴联合腾讯AI
          lab、清华、斯坦…
        </div>
      </div>
      <div class="next">
        <div class="btn" style="justify-content: flex-end">
          下一篇
          <img :src="images.right1" alt="" />
        </div>
        <div class="text">
          用基于结构的突变偏好进行蛋白质设计，加州大学、MIT、哈佛医学院团队开发了一种无监督…
        </div>
      </div>
    </div>
    <div class="more">更多相关新闻</div>
    <div class="moreList">
      <div class="moreItem" v-for="(item, index) in moreList" :key="index">
        <img :src="item.img" alt="" />
        <div class="body">
          <div class="title">{{ item.title }}</div>
          <div class="type">{{ item.type }}</div>
        </div>
      </div>
    </div>
    <div style="height: 50px;"></div>
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
    };
  },
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.newsNoticeDetail {
  width: 1440px;
  margin-top: 20px;
  background: #fafafa;
  margin: 0 auto;
  .content {
    padding: 40px 320px;
    .header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e1e2e6;
      padding-bottom: 8px;
      .title {
        color: #587dff;
      }
      .btns {
        display: flex;
        .share {
          margin-right: 15px;
        }
        .collect {
          margin-right: 15px;
        }
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          img {
            width: 20px;
            height: 20px;
            margin-right: 2px;
          }
        }
      }
    }
    .body {
      width: 800px;
      margin-top: 40px;
      img {
        width: 800px;
        margin: 40px 0;
      }
      .title {
        font-weight: bold;
        font-size: 32px;
        color: #262626;
      }
      .info {
        margin-top: 15px;
        .reship {
          background: rgba(194, 214, 255, 0.8);
          border-radius: 14px 14px 14px 14px;
          color: #262626;
          font-size: 12px;
          padding: 2px 8px;
          margin-right: 16px;
        }
      }
      .lineheight {
        line-height: 2;
      }
      .blue {
        color: #2954ff;
      }
      .textTile {
        font-weight: bold;
        font-size: 24px;
        color: #262626;
        text-align: center;
        margin: 40px 0;
      }
      .textLink {
        margin-top: 20px;
        a:link {
          color: #2954ff;
        }
      }
    }
  }
  .paging {
    width: 100%;
    height: 140px;
    width: 800px;
    margin: 0 auto;
    padding: 30px 20px;
    background: #ffffff;
    box-shadow: 0px 3px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 12px 12px 12px 12px;
    display: flex;
    .previous {
      flex: 1;
      border-right: 1px solid #e1e2e6;
      padding-right: 40px;
      cursor: pointer;
    }
    .next {
      flex: 1;
      padding-left: 40px;
      cursor: pointer;
    }
    .text {
      font-size: 16px;
      color: #262626;
      font-weight: 500;
      margin-top: 10px;
    }
    .btn {
      display: flex;
      align-items: center;
      color: #587dff;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
  .more {
    font-weight: bold;
    font-size: 24px;
    color: #262626;
    text-align: center;
    margin-top: 40px;
  }
  .moreList {
    width: 800px;
    margin: 0 auto;
    .moreItem {
      margin-top: 30px;
      padding: 10px;
      display: flex;
      cursor: pointer;
      img {
        width: 140px;
        height: 100px;
        border-radius: 8px;
        margin-right: 16px;
      }
      .body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px 0;
        .title {
          font-weight: 500;
          font-size: 16px;
          color: #262626;
        }
        .type {
          color: #587dff;
        }
      }
    }
    .moreItem:hover {
      background: #ffffff;
      box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
      border-radius: 16px 16px 16px 16px;
      .title {
        color: #2954ff;
      }
    }
  }
}
</style>