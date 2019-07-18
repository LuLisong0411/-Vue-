<template>
    <!-- 添加分页器 实现竖屏切换的效果 -->
    <div>
        <swiper class="swiper" :option="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index" >
                Slide{{item}}
            </swiper-slide>
            <div class="pagination" slot="pagination"></div>
        </swiper>
    </div>    
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
   data(){
       return {
           slide:[1,2,3,4,5,6],
           swiperOption:{
               direction:'vertical',
               pagination:{
                   el:'.swiper-pagination'
               }
           }, 
        }
   },
    components:{swiper,swiperSlide}
}
</script>


<style scoped>
    .swiper-slide{
        height: 4rem;
        text-align: center;
        padding: 3rem;
        border-bottom: 1px solid #eee;
    }
    .swiper{
        height: 7rem;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;

    }
</style>
