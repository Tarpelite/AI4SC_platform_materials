<template>
    <div class="fastFunction w1440">
        <div class="title">科学数据</div>
        <div class="content">
            <div class="item" v-for="(item,index) in list" :key="index" :class="index == 3 ? '' : 'mr24'">
                <div class="body">
                    <div class="header">
                        <img :src="images.data" alt="">
                        <div class="type">{{ item.type }}</div>
                    </div>
                    <div class="itemTitle">{{ item.title }}</div>
                    <div class="itemTime">{{ item.time }}</div>
                </div>
                <div class="footer">
                    <div class="tagList">
                        <div class="tag" v-for="(item2,index2) in item.tag" :key="index2">{{ item2 }}</div>
                    </div>
                    <img :src="images.download" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import images from '@/utils/js/exportImage'
export default {
    data() {
        return {
            images: images,
            list: [
                {
                    id: 1,
                    title: '尼亚克磁性航空地球物理调查数据',
                    type: '电磁',
                    time: '2024-04-11 12:23:04 更新',
                    tag: ['公共数据库']
                },
                {
                    id: 2,
                    title: 'qm9 (DFT, 003xxx.tar)',
                    type: '材料',
                    time: '2024-04-02 12:25:12 更新',
                    tag: ['公共数据库']
                },
                {
                    id: 3,
                    title: '3D Maxwell Equation',
                    type: 'PDE',
                    time: '2024-04-01 16:40:35 更新',
                    tag: ['原创','公共数据库']
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
            width: 400px;
            height: 240px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .body {
                width: 100%;
                padding: 20px;
                .header {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    img {
                        width: 48px;
                        height: 48px;
                    }
                    .type {
                        width: 60px;
                        height: 28px;
                        background: #E1E2E6;
                        border-radius: 8px;
                        text-align: center;
                        font-size: 14px;
                        line-height: 28px;
                    }
                }
                .itemTitle {
                    font-weight: bold;
                    font-size: 24px;
                    margin-top: 20px;
                }
                .itemTime {
                    font-size: 14px;
                    margin-top: 10px;
                }
            }
            .footer {
                width: 403px;
                height: 60px;
                background: #FAFAFA;
                border-radius: 0px 0px 20px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                img {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
                .tagList {
                    display: flex;
                    .tag {
                        border-radius: 16px;
                        border: 1px solid #6E91FA;
                        font-size: 12px;
                        color: #587DFF;
                        padding: 4px 18px;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
}
</style>