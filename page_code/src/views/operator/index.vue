<template>
  <!--算子-->
  <div class="buaa-operator">
    <div class="bannerBg"></div>
    <div class="operator-intro clearfix">
      <div class="intro-left">
        <div class="intro-title">科学智算共性框架</div>
        <div class="intro-subtitle">国产化、模块化、可扩展、全流程的模型算子开发基础框架</div>
        <div class="intro-content clearfix">
          <span :class="collapse ? 'content-span' : ''">科学智算异构混合的基础框架与计算库是一套支持国产化硬件、模块化、可扩展、全流程的模型算子开发基础框架和服务于科学智算任务的多领域基础计算库，为人工智能科学计算提供通用的基础框架和丰富的计算库等基础能力支撑。包含智算算子异构混合适配、科学智算基础框架、多领域计算库三个模块。智算算子异构混合适配模块基于基础算子扩展、高阶算子拆分、复杂算子多硬件适配等技术，模块化支持算子扩展，为科学智算任务提供软硬件环境支撑。科学智算基础框架提供高阶计算图自动构建、神经网络编译器等机制，提供复杂科学智算任务的灵活表示和高效执行，解决科学智算任务运算过程中高阶微分计算复杂、计算规模大的问题。多领域计算库提供常用的基础数学、方程求解、专业软件协作等基础运算库，加速领域领域任务的设计与实现，实现对多领域科学计算应用的有力支撑。目前已经在海光CPU+海光DCU上支持6类科学智算算子，并使用高阶计算图和编译器优化技术进行加速，提供10类方程求解与10类计算库，高效支撑了工业设计、智能制造、气象预测、地球科学等领域任务。</span>
          <!-- <span class="intro-op" :class="collapse ? 'collapse' : ''" @click="collapse = collapse">{{ collapse ? '展开' : '折叠' }}<img :src="images.cal_arrow_theme" alt=""></span> -->
        </div>
      </div>
      <div class="intro-right">
        <img src="https://cnai4sc.oss-cn-beijing.aliyuncs.com/framework_tiny.png" alt="">
      </div>
    </div>
    <div class="calculate-wrapper clearfix">
      <div class="title">计算库</div>
      <div class="cal-content">
        <div class="calculate-item" v-for="(item, index) in calList" :key="index" @click="linkDetail(item.id)">
          <div class="title">{{ item.title }}</div>
          <div class="content">{{ item.desc }}</div>
          <div class="more">
            <span>了解详情</span>
            <img class="more-theme" :src="images.cal_arrow_theme" alt="">
            <img class="more-white" :src="images.cal_arrow" alt="">
          </div>
        </div>
        <div v-if="calList.length > 1 && calList.length % 4 !== 0" class="none-box"
             v-for="count of 4 - calList.length % 4"></div>
      </div>
    </div>
    <div class="common-wrapper">
      <div class="title">共性算子</div>
      <div class="common-content">
        <div class="common-item" v-for="(item, index) in comList" :key="index" @click="linkDetail(item.id)">
          <div class="common-item-title">
            <span>{{ item.title }}</span>
            <img :src="images.cal_arrow" alt="">
          </div>
          <div class="content">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from "@/utils/js/exportImage";

export default {
  name: "index",
  data() {
    return {
      images,
      collapse: false,
      calList: [
        {title: '数据处理计算库', id: 42, desc: '集成数据（预）处理相关的计算库，包括几何缩放、平移、样本组合、拆分等操作。'},
        {title: '概率统计计算库',id: 43, desc: '集成概率统计相关的计算库，包括伪随机、准随机、获取随机分布等操作。'},
        {title: '稀疏计算库', id: 44, desc: '集成稀疏计算相关的计算库，包括稀疏矩阵基础运算、稀疏表示格式转换、稀疏梯度计算等操作'},
        {title: '二阶优化计算库',id: 45, desc: '集成二阶优化相关的计算库，包括L-BFGS等二阶优化器'},
        {title: '几何形状定义计算库', id: 46,desc: '集成几何形状定义相关的计算库，包括代数几何、Mesh几何、点云几何'},
        {title: '方程符号化定义计算库',id: 47, desc: '集成方程符号化定义相关的计算库，包括创建符号、创建函数、符号表达式转写等操作'},
        {title: 'PINN求解方法计算库',id: 48, desc: '集成PINN求解方法相关的计算库，包括多种常见微分方程求解，包括Allen-Cahn、Euler-Beam、Navier-Stokes等。'},
        {title: 'FNO求解方法计算库', id: 49,desc: '集成FNO求解方法相关的计算库，包括FourcastNet等模型'},
        {title: 'DeepONet计算库',id: 50, desc: '集成算子学习相关方法的计算库，包括DeepONet等模型'},
        {title: '势函数模拟/LAMMPS计算库',id: 51, desc: '集成势函数模拟相关方法的计算库，包括DeepMD-kit套件'}
      ],
      comList: [
        {title: '高阶微分类', id: 2, desc: '海森矩阵、张量操作等'},
        {title: '复数操作类', id: 1, desc: '计算相位角、复数取模等'},
        {title: '傅里叶变换类', id: 4, desc: '二维离散傅里叶变换、逆变换等'},
        {title: '线性代数类',id: 8,  desc: '特征值与特征向量计算等'},
        {title: '分数阶微分类', id: 13, desc: '分数阶快速、精准微分等'},
        {title: '积分操作类', id: 5, desc: '蒙特卡洛积分、高斯求积等'},
      ]
    }
  },
  methods: {
    linkDetail(id) {
      this.$router.push(`/operator/${id}`)
    }
  },
}
</script>

<style scoped lang="scss">
.buaa-operator {
  width: 1280px;
  margin: 0 auto;

  .bannerBg {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    height: 600px;
    background: linear-gradient(180deg, #DEEAFF 0%, #DEEAFF 18%, rgba(222, 234, 255, 0) 100%);
    margin: 0 auto;
    z-index: 1;
  }
  .operator-intro {
    background: linear-gradient(291deg, #C0B1FF 0%, #B7CEFF 100%);
    box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
    border-radius: 20px 20px 20px 20px;
    display: flex;
    align-items: center;
    padding: 40px 60px;
    position: relative;
    z-index: 2;

    .intro-left {
      .intro-title {
        height: 56px;
        font-family: Helvetica Neue, Helvetica Neue;
        font-weight: bold;
        font-size: 40px;
        color: #262626;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .intro-subtitle {
        font-family: Helvetica Neue, Helvetica Neue;
        font-weight: bold;
        font-size: 24px;
        color: #262626;
        line-height: 32px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-top: 12px;
        margin-bottom: 20px;
      }

      .intro-content {
        font-family: Helvetica Neue, Helvetica Neue;
        font-weight: 400;
        font-size: 16px;
        color: rgba(38, 38, 38, 0.8);
        text-align: left;
        font-style: normal;
        text-transform: none;
        .content-span {
          display: inline-block;
          height:  42px;
          transition: height 1s linear;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }
        .intro-op {
          float: right;
          height: 20px;
          font-size: 12px;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: rgba(41, 84, 255, 0.8);
          &.collapse {
            img {
              transform: rotate(90deg);
            }
          }
          img {
            width: 16px;
            height: 16px;
            transform: rotate(270deg);
          }
        }
      }
    }

    .intro-right {
      margin-left: 80px;

      img {
        width: 400px;
        height: 280px;
        border-radius: 12px 12px 12px 12px;
      }
    }
  }

  .calculate-wrapper {
    position: relative;
    z-index: 2;
    .title {
      height: 40px;
      font-family: Helvetica Neue, Helvetica Neue;
      font-weight: bold;
      font-size: 28px;
      color: #262626;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin: 60px 0 20px 0;
    }

    .cal-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .calculate-item {
        width: 302px;
        height: 160px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 16px 16px 16px 16px;
        border: 1px solid #E1E2E6;
        padding: 24px 20px;
        position: relative;
        margin-bottom: 24px;
        cursor: pointer;

        &:hover {
          background: #587DFF;

          .title {
            color: #fff;
          }

          .content {
            color: #fff;
          }

          .more {
            color: #fff;

            .more-white {
              display: block;
            }

            .more-theme {
              display: none;
            }
          }
        }

        .title {
          height: 28px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 500;
          font-size: 20px;
          color: #262626;
          text-align: left;
          margin: 0;
        }

        .content {
          width: 256px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 400;
          font-size: 12px;
          color: #262626;
          text-align: left;
          margin-top: 4px;
        }

        .more {
          display: flex;
          align-items: center;
          height: 17px;
          position: absolute;
          left: 20px;
          bottom: 10px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 400;
          font-size: 12px;
          color: #587DFF;
          text-align: left;
          font-style: normal;
          text-transform: none;

          img {
            width: 16px;
            height: 16px;
          }

          .more-theme {
            display: block;
          }

          .more-white {
            display: none;
          }
        }
      }

      .none-box {
        width: 302px;
      }
    }
  }

  .common-wrapper {
    position: relative;
    z-index: 2;
    .title {
      height: 40px;
      font-family: Helvetica Neue, Helvetica Neue;
      font-weight: bold;
      font-size: 28px;
      color: #262626;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin: 60px 0 20px 0;
    }

    .common-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .common-item {
        width: 414px;
        height: 140px;
        background: #FFFFFF;
        box-shadow: 0px 2px 16px 1px rgba(0, 0, 0, 0.08);
        border-radius: 20px;
        border: 1px solid #E1E2E6;
        padding: 43px 32px;
        position: relative;
        margin-bottom: 24px;
        cursor: pointer;

        &:hover {
          background: #587DFF;

          .common-item-title {
            color: #fff;
          }

          .content {
            color: #fff;
          }
        }

        .common-item-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 30px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 500;
          font-size: 22px;
          color: #262626;
          text-align: left;
          margin: 0;

          img {
            width: 24px;
            height: 24px;
          }
        }

        .content {
          width: 256px;
          font-family: Helvetica Neue, Helvetica Neue;
          font-weight: 400;
          font-size: 14px;
          color: rgba(38, 38, 38, 0.6);
          text-align: left;
          margin-top: 4px;
        }
      }
    }
  }
}

</style>
