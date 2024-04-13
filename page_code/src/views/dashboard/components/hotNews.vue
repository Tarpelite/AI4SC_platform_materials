<template>
    <div class="hotNews w1440">
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
                    msg: '华盛顿大学团队开发了RoseTTAFold All-Atom，预测蛋白质与多分子复合结构，推进生物分子设计。',
                    img: 'https://pic.imgdb.cn/item/65ef01049f345e8d039fc9bf.png'
                },
                {
                    id: 2,
                    msg: 'Nature杂志连续刊登了Chroma和GNoME研究，利用图神经网络在AI科学领域取得重大进展。',
                    img: 'https://pic.imgdb.cn/item/65ef029a9f345e8d03ae62c6.png'
                },
                {
                    id: 3,
                    msg: '「自动驾驶实验室」成为未来科研新趋势，如RoboChem、A-Lab以及Fast-Cat等，这些系统运用AI技术自动执行高质量的科学实验，显著提高效率和效果。',
                    img: 'https://pic.imgdb.cn/item/65ef03149f345e8d03b2f078.png'
                },
                {
                    id: 4,
                    msg: '2023年10月28日，科学智算共性平台举办“科学计算平台技术前沿”分论坛，聚集各领域专家共同探讨科学智算最新研究和产业动态。',
                    img: 'https://pic.imgdb.cn/item/65ef074c9f345e8d03daa411.png'
                },
                {
                    id: 5,
                    msg: '北理和北航在2023年10月27日共同举办了“神经符号计算：理论、技术与应用”分论坛，探讨将神经网络计算与符号规则推理结合的新型计算方法，此法能提高学习模型的泛化性、鲁棒性和可解释性。',
                    img: 'https://pic.imgdb.cn/item/65ef07649f345e8d03db8f32.png'
                },
                {
                    id: 6,
                    msg: '北航联合其他八家单位举办首届“人工智能科学计算研讨会”。会议提议成立科学智算研究联盟，促进人工智能与科学深度结合，加速科学发现与技术创新。',
                    img: 'https://pic.imgdb.cn/item/65ef08599f345e8d03e41a72.png'
                },
                {
                    id: 7,
                    msg: '首届“大湾区杯”粤港澳AI for Science科技竞赛于2023年11月18日在广东韶关举行，此次大赛共有近千名青年学子参与，最终产生80支获奖队伍。大赛旨在推动AI技术在科研领域的应用与发展。',
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
                    font-size: 18px;
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