<template>
  <div class="typicalTask">
    <div class="title">科学套件</div>
    <div class="content" ref="list">
      <swiper :options="swiperOption" ref="mySwiper" class="buaa-swiper">
        <swiper-slide v-for="(item, index) in list" class="buua-swiper-slide">
          <div class="item ua-swiper-slide" :key="index">
            <img v-lazy="item.img" alt="">
            <div class="text">
              <div class="titleChild">{{ item.title }}</div>
              <div class="msg"> {{ item.msg }}</div>
            </div>
            <img class="smallImg" :src="item.smallImg" :style="item.type == 'baidu' ? 'width:65px;height:40px;' : ''" alt="">
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev">
          <img :src="imageList.left" alt=""/>
        </div>
        <div class="swiper-button-next" slot="button-next">
          <img :src="imageList.right" alt=""/>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
import images from '@/utils/js/exportImage'

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title: 'MindEarth地球科学领域套件',
          msg: '地球科学领域套件MindEarth致力于高效使能AI+气象海洋的融合研究。',
          img: 'https://cnai4s.com/media/mindearth.png',
          smallImg: images.huawei,
          type: 'huawei',
          link: 'https://gitee.com/mindspore/mindscience/tree/master/MindEarth'
        },
        {
          id: 2,
          title: 'Mindflow计算流体求解套件',
          msg: '支持物理驱动、数据驱动和数据机理融合驱动的AI流体仿真',
          img: 'https://cnai4s.com/media/mindflow.png',
          smallImg: images.huawei,
          type: 'huawei',
          link: 'https://gitee.com/mindspore/mindscience/tree/master/MindFlow'
        },
        {
          id: 3,
          title: 'MindElec计算电磁仿真领域套件',
          msg: '持数据建构及转换、仿真计算、结果可视化以及端到端的AI电磁仿真',
          img: 'https://cnai4sc.oss-cn-beijing.aliyuncs.com/mindelec.png',
          smallImg: images.huawei,
          type: 'huawei',
          link: 'https://gitee.com/mindspore/mindscience/tree/master/MindElec'
        },
        {
          id: 4,
          title: 'MindChemistry计算化学领域套件',
          msg: '支持多体系，多尺度任务的AI+化学仿真',
          img: 'https://cnai4sc.oss-cn-beijing.aliyuncs.com/mindchemistry.jpg',
          smallImg: images.huawei,
          type: 'huawei',
          link: 'https://gitee.com/mindspore/mindscience/tree/master/MindChemistry'
        },
        {
          id: 5,
          title: 'MindSPONGE计算生物领域套件',
          msg: '支持高性能、模块化，端到端可微，类AI架构编写的分子模拟功能以及MSA生成，蛋白质折叠训练推理和蛋白质结构打分，NMR数据解析等常用功能。',
          img: 'https://cnai4s.com/media/mindsponge.png',
          smallImg: images.huawei,
          type: 'huawei',
          link: 'https://gitee.com/mindspore/mindscience/tree/master/MindSPONGE'
        },
        {
          id: 6,
          title: 'SciAI高频模型套件',
          msg: '覆盖物理感知（如PINNs、DeepRitz以及PFNN）和神经算子（如FNO、DeepONet）等主流模型，',
          img: 'https://cnai4sc.oss-cn-beijing.aliyuncs.com/sciAI.jpg',
          smallImg: images.feijiang,
          type: 'baidu',
          link: 'https://gitee.com/mindspore/mindscience/tree/master/SciAI'
        },
        {
          id: 7,
          title: 'PaddleHelix生物计算套件',
          msg: '支持小分子药物、多肽/蛋白药物、mRNA疫苗等场景，助力创新药的早期发现',
          img: 'https://cnai4sc.oss-cn-beijing.aliyuncs.com/paddlehelix.png',
          smallImg: images.feijiang,
          type: 'baidu',
          link: 'https://paddlehelix.baidu.com/'
        },
        {
          id: 8,
          title: 'PaddleScience科学计算套件',
          msg: 'AI方法加速设计并发现新材料，助力高能物理及天文领域的新问题探索，以及加速智慧工业实时设备数据与模型的“数字孪生”等',
          img: 'https://cnai4sc.oss-cn-beijing.aliyuncs.com/paddlescience.jpg',
          smallImg: images.feijiang,
          type: 'baidu',
          link: 'https://github.com/PaddlePaddle/PaddleScience'
        },
        {
          id: 9,
          title: 'PaddleQuantum量子计算套件',
          msg: '支持量子神经网络的搭建与训练等功能，',
          img: 'https://cnai4sc.oss-cn-beijing.aliyuncs.com/paddlequantum.jpg',
          smallImg: images.feijiang,
          type: 'baidu',
          link: 'https://github.com/PaddlePaddle/Quantum/blob/master/README_CN.md'
        },
      ],
      swiperOption: {
        // swiper options 所有的配置同swiper官方api配置
        // autoplay: 3000,
        slidesPerView: 3,
        autoHeight: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        onClick: (e) => {
          this.jump(this.list[e.clickedIndex])
        },
      },
      percentage: 0,
      imageList: images
    }
  },
  methods: {
    increase() {
      this.percentage += 92;
      if(this.percentage > 276) {
        this.percentage = 276;
      } else {
        this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
      }
    },
    decrease() {
      this.percentage -= 92;
      if(this.percentage < 0) {
        this.percentage = 0;
      } else {
        this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
      }
    },
    jump(item) {
      window.open(item.link)
    }
  }
};
</script>

<style lang="scss">
.typicalTask {
  position: relative;
  z-index: 2;
  overflow: hidden;
  width: 1480px;
  margin: 0 auto;
  padding: 0 80px;
  .swiper-wrapper {
    margin: 20px;
  }
  .swiper-button-next {
    right: -46px;
  }
  .swiper-button-prev {
    left: -46px;
  }
  .title {
    font-weight: bold;
    font-size: 40px;
    color: #262626;
    padding-top: 50px;
  }

  .content {
    position: relative;
    margin-top: 20px;
    padding-bottom: 15px;

    .mr24 {
      margin-right: 24px;
    }
    .item {
      width: 400px;
      height: 420px;
      box-shadow: 0 2px 16px 1px rgba(0,0,0,0.08);
      background: linear-gradient(180deg, #CCD7FF 0%, #F5F7FF 52%, #FFFFFF 100%);
      border-radius: 20px;
      padding: 20px;
      position: relative;
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
          opacity: 0.6;
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
      }

    }

    .item:hover {
      background: linear-gradient(180deg, #587DFF 0%, #9D2EFF 100%);
      box-shadow: 0 2px 16px 1px rgba(0,0,0,0.24);
      .titleChild {
        color: #fff;
      }

      .msg {
        color: #fff;
      }

      img {
        border-radius: 10px;
      }
    }
  }

  .right {
    position: absolute;
    right: 10px;
    top: 240px;
    cursor: pointer;

    img {
      width: 60px;
      height: 60px;
    }
  }

  .left {
    position: absolute;
    left: 10px;
    top: 240px;
    cursor: pointer;

    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
