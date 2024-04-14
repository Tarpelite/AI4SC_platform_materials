<template>
    <div class="hotNews">
        <div class="title">热点新闻</div>
        <div class="content" ref="list">
            <div class="item mr24" v-for="(item,index) in list" :key="index">
                <img :src="item.img" alt="">
                <div class="msg">
                    <div class="text">{{ item.msg }}</div>
                </div>
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
                    msg: '预测所有生物分子，David Baker 团队蛋白质设计新工具 RoseTTAFold All-Atom 登 Science',
                    img: 'https://pic.imgdb.cn/item/65ef01049f345e8d039fc9bf.png'
                },
                {
                    id: 2,
                    msg: 'AI4Science的基石：几何图神经网络，最全综述来了！人大高瓴联合腾讯AI lab、清华、斯坦福等发布',
                    img: 'https://pic.imgdb.cn/item/65ef029a9f345e8d03ae62c6.png'
                },
                {
                    id: 3,
                    msg: '5天完成6个月实验量，加速催化研究，「自动驾驶」催化实验室Fast-Cat登Nature子刊',
                    img: 'https://pic.imgdb.cn/item/65ef03149f345e8d03b2f078.png'
                },
                {
                    id: 4,
                    msg: '课题组组织CNCC分论坛 —— 科学计算平台技术前沿',
                    img: 'https://pic.imgdb.cn/item/65ef074c9f345e8d03daa411.png'
                },
                {
                    id: 5,
                    msg: '课题组组织CNCC分论坛——“神经符号计算：理论、技术与应用”',
                    img: 'https://pic.imgdb.cn/item/65ef07649f345e8d03db8f32.png'
                },
                {
                    id: 6,
                    msg: '北京航空航天大学举办首届“人工智能科学计算学术研讨会”',
                    img: 'https://pic.imgdb.cn/item/65ef08599f345e8d03e41a72.png'
                },
                {
                    id: 7,
                    msg: '首届“大湾区杯”粤港澳 AI for Science科技竞赛颁奖典礼隆重举行',
                    img: 'https://pic.imgdb.cn/item/65ef08df9f345e8d03e86d28.png'
                },
            ],
            percentage: 0,
            imageList: images
        }
    },
    methods: {
        increase() {
            this.percentage += 75;
            if (this.percentage > 150) {
                this.percentage = 150;
            } else {
                this.$refs.list.style.transform = 'translateX(' + this.percentage * -9 + 'px)'
            }
        },
        decrease() {
            this.percentage -= 75;
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
.hotNews {
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
            width: 360px;
            height: 320px;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0px 2px 16px 1px rgba(0,0,0,0.08);
            img {
                width: 360px;
                height: 180px;
                border-radius: 20px 20px 0 0;
            }
            .msg {
                padding: 20px 20px;
                .text {
                    font-weight: bold;
                    font-size: 16px;
                    color: #262626;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                }
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