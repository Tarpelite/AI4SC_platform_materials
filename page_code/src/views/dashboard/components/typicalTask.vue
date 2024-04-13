<template>
    <div class="typicalTask w1440">
        <div class="title">典型任务</div>
        <div class="content" ref="list">
            <div class="item mr24" v-for="(item,index) in list" :key="index">
                <div class="text">
                    <div class="titleChild">{{ item.title }}</div>
                    <div class="msg"> {{ item.msg }}</div>
                </div>
                <img :src="item.img" alt="">
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
                    title: '蛋白质结构评估 MEGA-Assessment',
                    msg: '为蛋白质结构预测提供评估工具，确保预测结果的可靠性和准确性。',
                    img: 'https://pic.imgdb.cn/item/65e089a69f345e8d0393bcef.jpg'
                },
                {
                    id: 2,
                    title: '共进化数据引擎 MEGA-EvoGen',
                    msg: '利用深度学习处理蛋白质共进化数据，为蛋白质结构预测提供关键信息。',
                    img: 'https://pic.imgdb.cn/item/65e089a69f345e8d0393bd31.jpg'
                },
                {
                    id: 3,
                    title: '东方.御风',
                    msg: '在航空航天领域，通过AI模型优化飞机气动设计，提升飞机性能和环保性。',
                    img: 'https://pic.imgdb.cn/item/65eeee559f345e8d031cbb5a.png'
                },
                {
                    id: 4,
                    title: 'CTEFNet: 基于 CNN 与迁移学习的厄尔尼诺预测模型',
                    msg: 'CTEFNet结合卷积神经网络和迁移学习，通过时间序列分析提升厄尔尼诺现象的预测时长，为气候变化研究提供高精度的预测工具。。',
                    img: 'https://pic.imgdb.cn/item/65eeee559f345e8d031cbc9f.png'
                },
                {
                    id: 5,
                    title: 'DEM-SRNet: 全球3弧秒（90m）海陆高分辨率数字高程模型',
                    msg: 'DEM-SRNet应用深度残差网络对地面DEM数据进行预训练，显著提升全球数字高程模型的分辨率，为地理科学研究和环境监测提供更为精确的地形数据。',
                    img: 'https://pic.imgdb.cn/item/65e08a099f345e8d039508a5.png'
                },
            ],
            percentage: 0,
            imageList: images
        }
    },
    methods: {
        increase() {
            this.percentage += 30;
            if (this.percentage > 30) {
                this.percentage = 30;
            } else {
                this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
            }
        },
        decrease() {
            this.percentage -= 30;
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
    padding: 0 80px;
    background: #fafafa;
    position: relative;
    overflow: hidden;
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
        .mr24 {
            margin-right: 24px;
        }
        .item {
            width: 300px;
            height: 440px;
            background: linear-gradient( #9CB9FF 0%, #DEEAFF 100%);
            box-shadow: 0px 2px 16px 1px rgba(0,0,0,0.08);
            border-radius: 20px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .text {
                .titleChild {
                    font-weight: bold;
                    font-size: 24px;
                    color: #262626;
                }
                .msg {
                    font-size: 14px;
                    color: #262626;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                    margin-top: 10px;
                }
            }
            img {
                width: 260px;
                height: 200px;
                border-radius: 10px;
                margin-top: 20px;
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