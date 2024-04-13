<template>
    <div class="fastFunction w1440">
        <div class="title">快速功能</div>
        <div class="content">
            <div class="item" v-for="(item,index) in list" :key="index" :class="index == 3 ? '' : 'mr24'">
                <img :src="item.img" alt="">
                <div class="title">{{ item.title }}</div>
                <div class="msg">{{ item.msg }}</div>
            </div>
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
                    title: '个人中心',
                    msg: '一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍',
                    img: images.personage
                },
                {
                    id: 2,
                    title: '科学任务',
                    msg: '一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍',
                    img: images.quest
                },
                {
                    id: 3,
                    title: '智算套件',
                    msg: '一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍',
                    img: images.kit
                },
                {
                    id: 4,
                    title: '运行情况',
                    msg: '一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍一句话介绍',
                    img: images.operation
                },
            ],
        }
    },
    methods: {
        
    }
};
</script>

<style lang="scss" scoped>
.fastFunction {
    padding: 0 80px;
    background: #fafafa;
    .title {
        font-weight: bold;
        font-size: 40px;
        color: #262626;
        padding-top: 50px;
    }
    .content {
        display: flex;
        margin-top: 20px;
        .mr24 {
            margin-right: 24px;
        }
        .item {
            flex: 1;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0px 2px 16px 1px rgba(0,0,0,0.08);
            padding: 37px 32px;
            img {
                width: 80px;
                height: 80px;
            }
            .title {
                font-weight: bold;
                font-size: 24px;
                color: #262626;
                margin-top: 16px;
            }
            .msg {
                font-size: 14px;
                color: #262626;
                margin-top: 5px;
            }
        }
    }
}
</style>