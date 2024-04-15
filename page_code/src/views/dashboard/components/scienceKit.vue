<template>
    <div class="typicalTask">
        <div class="title">科学套件</div>
        <div class="content" ref="list">
            <div class="item mr24" v-for="(item,index) in list" :key="index">
                <img :src="item.img" alt="">
                <div class="text">
                    <div class="titleChild">{{ item.title }}</div>
                    <div class="msg"> {{ item.msg }}</div>
                </div>
                <img class="smallImg" :src="item.smallImg" :style="item.type == 'baidu' ? 'width:65px;height:40px;' : ''" alt="">
            </div>
        </div>
        <div class="left" @click="decrease">
            <img :src="imageList.left" alt="">
        </div>
        <div class="right" @click="increase">
            <img :src="imageList.right" alt="">
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
                    img: 'https://pic.imgdb.cn/item/65f25b6b9f345e8d03a16ef2.gif',
                    smallImg: images.huawei,
                    type: 'huawei'
                },
                {
                    id: 2,
                    title: 'Mindflow计算流体求解套件',
                    msg: '支持物理驱动、数据驱动和数据机理融合驱动的AI流体仿真',
                    img: 'https://pic.imgdb.cn/item/65f25bac9f345e8d03a27224.gif',
                    smallImg: images.huawei,
                    type: 'huawei'
                },
                {
                    id: 3,
                    title: 'MindElec计算电磁仿真领域套件',
                    msg: '持数据建构及转换、仿真计算、结果可视化以及端到端的AI电磁仿真',
                    img: 'https://pic.imgdb.cn/item/65f25bed9f345e8d03a34c02.png',
                    smallImg: images.huawei,
                    type: 'huawei'
                },
                {
                    id: 4,
                    title: 'MindChemistry计算化学领域套件',
                    msg: '支持多体系，多尺度任务的AI+化学仿真',
                    img: 'https://pic.imgdb.cn/item/65f25c359f345e8d03a440e7.jpg',
                    smallImg: images.huawei,
                    type: 'huawei'
                },
                {
                    id: 5,
                    title: 'MindSPONGE计算生物领域套件',
                    msg: '支持高性能、模块化，端到端可微，类AI架构编写的分子模拟功能以及MSA生成，蛋白质折叠训练推理和蛋白质结构打分，NMR数据解析等常用功能。',
                    img: 'https://pic.imgdb.cn/item/65f25c439f345e8d03a47148.gif',
                    smallImg: images.huawei,
                    type: 'huawei'
                },
                {
                    id: 6,
                    title: 'SciAI高频模型套件',
                    msg: '覆盖物理感知（如PINNs、DeepRitz以及PFNN）和神经算子（如FNO、DeepONet）等主流模型，',
                    img: 'https://pic.imgdb.cn/item/65f25c699f345e8d03a4f0b5.jpg',
                    smallImg: images.feijiang,
                    type: 'baidu'
                },
                {
                    id: 7,
                    title: 'PaddleHelix生物计算套件',
                    msg: '支持小分子药物、多肽/蛋白药物、mRNA疫苗等场景，助力创新药的早期发现',
                    img: 'https://pic.imgdb.cn/item/65f25c789f345e8d03a5241b.png',
                    smallImg: images.feijiang,
                    type: 'baidu'
                },
                {
                    id: 8,
                    title: 'PaddleScience科学计算套件',
                    msg: 'AI方法加速设计并发现新材料，助力高能物理及天文领域的新问题探索，以及加速智慧工业实时设备数据与模型的“数字孪生”等',
                    img: 'https://pic.imgdb.cn/item/65f25c939f345e8d03a58c1f.jpg',
                    smallImg: images.feijiang,
                    type: 'baidu'
                },
                {
                    id: 9,
                    title: 'PaddleQuantum量子计算套件',
                    msg: '支持量子神经网络的搭建与训练等功能，',
                    img: 'https://pic.imgdb.cn/item/65f25ca29f345e8d03a5c61d.jpg',
                    smallImg: images.feijiang,
                    type: 'baidu'
                },
                
            ],
            percentage: 0,
            imageList: images
        }
    },
    methods: {
        increase() {
            this.percentage += 92;
            if (this.percentage > 276) {
                this.percentage = 276;
            } else {
                this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
            }
        },
        decrease() {
            this.percentage -= 92;
            if (this.percentage < 0) {
                this.percentage = 0;
            } else {
                this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.typicalTask {
    position: relative;
    overflow: hidden;
    width: 1440px;
    margin: 0 auto;
    padding: 0 80px;
    .title {
        font-weight: bold;
        font-size: 40px;
        color: #262626;
        padding-top: 50px;
    }
    .content {
        display: flex;
        width: auto;
        margin-top: 20px;
        transform: translateX(0px);
        transition-property:transform;
        transition-duration: 2s;
        padding-bottom: 15px;
        .mr24 {
            margin-right: 24px;
        }
        .item {
            width: 400px;
            height: 420px;
            background: linear-gradient( 180deg, #CCD7FF 0%, #F5F7FF 52%, #FFFFFF 100%);
            box-shadow: 0px 2px 16px 1px rgba(0,0,0,0.08);
            border-radius: 20px;
            padding: 20px;
            position: relative;
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
                margin-top: 20px;
            }
            
        }
        .item:hover {
            background: linear-gradient( 180deg, #587DFF 0%, #9D2EFF 100%);
            .titleChild {
                color: #fff;
            }
            .msg {
                color: #fff;
            }
            img{
                background: #fff;
                border-radius: 0px;
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