<template>
   <div>
    <div class="navbar-div">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
    <div class="topimage-div">
        <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
</div>
</template>

<script>
    import axios from 'axios'
     import {Toast} from 'vant'
    import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                goodsId:'',
                goodsInfo:{},  //商品详细信息 
            }
        },
        created(){
            
            this.getInfo()
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getInfo() {
                
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId:this.goodsId
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code== 200 && response.data.message){
                        this.goodsInfo= response.data.message
                    }else{
                        Toast('服务器错误，数据获取失败')
                    }
                     console.log(this.goodsInfo)
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>

</style>