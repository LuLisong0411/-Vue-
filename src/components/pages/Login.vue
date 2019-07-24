<template>
    <div>
       <van-nav-bar
        title="用户登录"
        left-text="返回"
        left-arrow
        @click-left="goBack()"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                :error-message="passwordErrorMsg"
                required
            />
            <div class="register-button">
                <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登陆</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false,    //是否开启用户的Loading
                usernameErrorMsg:'',   //当用户名出现错误的时候
                passwordErrorMsg:'',   //当密码出现错误的时候
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
            },
            loginAction(){
                this.checkForm() && this.axiosRegisterUser()
            },
            
            //*********axios注册用户方法********
            axiosRegisterUser(){
                //先把按钮进行loading状态，防止重复提交
                this.openLoading = true;
                new Promise((resolve,reject)=>{
                    localStorage.userInfo = {userName:this.username};
                    setTimeout(()=>{
                        resolve()
                    },800)
                }).then(()=>{
                    Toast.success('登陆成功');
                    this.router.push('/')
                }).catch((err)=>{
                    Toast.fail('登陆状态保存失败');
                    console.log(err)
                })

                axios({
                    url:url.login,
                    method:'post',
                    data:{
                        username: this.username,
                        password: this.password,
                    }
                }).then(response=>{
                    console.log(response);
                    if(response.data.code == 200 && response.data.message){
                        Toast.success('登陆成功');
                        this.$router.push('/')
                    }else{
                        Toast.fail('登陆失败');
                        this.openLoading = false;
                    }
                    
                }).catch((error)=>{
                    console.log(error);
                    Toast.fail('登陆失败');
                    this.openLoading = false
                })
            },
            // **** 客户端验证:编写验证方法checkFrom,用来专门验证表单信息
            checkForm(){
                let isOk = true;
                if(this.username.length<5){
                    this.usernameErrorMsg = '用户名不能小于5位。';
                    isOk = false
                }else{
                    this.usernameErrorMsg = ''
                }
                if(this.password.length<8){
                    this.passwordErrorMsg = '密码不能少于8位。';
                    isOk = false
                }else{
                    this.passwordErrorMsg = ''
                }
                return isOk
            },            
        },
        created(){
            if(localStorage.userInfo){
                Toast.success('您已经登陆过了');
                this.$router.push('/')
            }
        }
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
    
</style>