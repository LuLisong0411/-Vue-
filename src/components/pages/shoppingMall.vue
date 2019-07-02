<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" calss="locationIcon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button type="mini">搜索</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- Swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(items , index) in bannerPicArray" :key="index">
                    <img v-lazy="items.imageUrl" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'hello world',
                locationIcon:require('../../assets/images/location.png'),
                bannerPicArray:[
                {imageUrl:'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg'},
                {imageUrl:'https://img.alicdn.com/tfs/TB187mteG1s3KVjSZFAXXX_ZXXa-966-644.jpg_620x10000q100.jpg_.webp'},
                {imageUrl:'https://aecpm.alicdn.com/simba/img/TB1_JXrLVXXXXbZXVXXSutbFXXX.jpg'},
                {imageUrl:'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg'},           
            ]
            }
        },
    }
</script>

<style scoped>
    .search-bar{
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-input{
        width:100%;
        height:1.3rem;
        border-top:0px;
        border-right:0px;
        border-left:0px;
        border-bottom: 1px solid #fff !important;
        background-color:#e5017d;
        color:#fff;
    }
    .locationIcon{
        padding-top:0.2rem;
        padding-left:0.3rem;
    }
    .swiper-area{
        clear: both;
        /* 解决懒加载时网速慢的问题 */
        max-height: 15rem;
        overflow: hidden;
    }
</style>