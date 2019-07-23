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
                    <img v-lazy="items.image" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar -->
        <div class="type-bar">
            <div  v-for="(cate,index) in category" :key="index" >
                    <img v-lazy="cate.image" width="90%" />
                    <span>{{cate.mallCategoryName}}</span> 
            </div>
        </div>
        <!-- adBanner area -->
        <div>
            <img v-lazy="adBanner" width="100%">
        </div>
        <!-- Recommend goods area -->
        <div class="reconmend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods":key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- floor area -->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent> 
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent> 
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent> 
        <!-- hot area -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <!-- hot list列表 -->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goodsInfoComponent :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfoComponent>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    
    </div>
</template>

<script>
    import axios from 'axios';
    import 'swiper/dist/css/swiper.css'
    import{swiper , swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    import {toMoney} from '../../filter/moneyFilter.js'
    import goodsInfoComponent from '../component/goodsInfoComponent'
    import url from '@/serviceAPI.config.js'
    //测试swiper的特效
    // import swiperDefault from '../pages/swiperDefault'
    // import swiperAuto from '../pages/swiperAuto'
    export default {
        data() {
            return {
                swiperOption:{
                    slidesPerView:3
                },
                msg: '',
                locationIcon:require('../../assets/images/location.png'),
                bannerPicArray:[], // 轮播图片
                category:[],       //商品类别标签栏
                adBanner:'',       //广告图片
                recommendGoods:[], //推荐商品
                floor1:[],         //楼层1的数据
                floor2:[],         //楼层1的数据
                floor3:[],         //楼层1的数据
                floorName:{},       //楼层名称
                hotGoods:[]
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        // components:{swiper,swiperSlide,swiperDefault,swiperAuto},
        components:{swiper,swiperSlide,floorComponent,goodsInfoComponent},
        created(){
            axios({
                url: url.getShoppingMallInfo,
                method: 'get',
            })
            .then(response => {
                // console.log(response)
                if(response.status==200){
                    this.category=response.data.data.category;
                    this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArray = response.data.data.slides;
                    this.recommendGoods = response.data.data.recommend;
                    this.floorName = response.data.data.floorName        //楼层名称
                    this.floor1 = response.data.data.floor1              //楼层1数据
                    this.floor2 = response.data.data.floor2              //楼层2数据
                    this.floor3 = response.data.data.floor3              //楼层3数据
                    this.hotGoods = response.data.data.hotGoods
                    // console.log(this.hotGoods)
                }
            })
            .catch((error) => {     
                // console.log(error)
            })
        }
        
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
    .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding: .3rem;
      font-size: 12px;
      text-align: center;
  }
  .recommend-area{
      background-color: #fff;
      margin-top: .3rem;
  }
  .recommend-title{
      border-bottom: 1px sloid #eee;
      font-size: 14px;
      padding: .2rem;
      color:#e5017d
  }
  .recommend-body{
      border-bottom: 1px solid #eee;
  }
  .recommend-item{
      width: 99%;
      border-right: 1px solid #eee;
      font-size: 12px;
      text-align: center
  }
  .floor-rule{
      display: flex;
      flex-direction:row;
      flex-wrap: wrap;
      background-color: #fff;
  }
  .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:10rem;
      border-bottom:1px solid #ddd;
  }
  .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
  }
  .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
  }
</style>