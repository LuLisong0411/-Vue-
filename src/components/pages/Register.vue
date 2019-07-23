<template>
    <div>
       <van-nav-bar
        class="header"
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack()"
        />
        <div class="register-panel">
            <van-field
            v-model="userName"
            type="userName"
            label="用户名"
            icon="clear"
            placeholder="请输入用户名"
            required
            />

            <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            />
            <div class="register-button">
                <van-button type="primary" size="large" @click="axiosRegisterUser" :loading="openLoading">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'
    export default {
        data() {
            return {
                userName: '',
                password: '',
                openLoading:false,    //是否开启用户的Loading
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
            },
            //*********axios注册用户方法********
            axiosRegisterUser(){
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName: this.userName,
                        password: this.password   
                    }
                }).then(response=>{
                    console.log(response)
                    //如果返回code为200，代表注册成功，我们给用户作Toast提示
                    if(response.status == 200){
                        Toast.success('注册成功');
                        this.$router.push('/')
                    }else{
                        console.log(response.statusText);
                        Toast.fail('注册失败');
                        this.openLoading = false
                    }
                    console.log(response.status)
                }).catch((error)=>{
                    console.log(error);
                    Toast.fail('注册失败');
                    this.openLoading = false
                })
            }
        },
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
    /* .header{
        background-color: #fa21f6;
        color:floralwhite
    } */
</style>