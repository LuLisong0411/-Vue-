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
                <van-button type="primary" size="large">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userName: '',
                password: '',
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)   
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