const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
//引入connect,initSchemas
const {connect,initSchemas} = require('./database/init')
const Router = require('koa-router')
const bodyParse = require('koa-bodyparser')
const cors = require('koa2-cors')
// 引入user.js模块
let user = require('./appAPI/User')
// 装载所有子路由
let router = new Router()
router.use('/user',user.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParse())
app.use(cors())


//立即执行函数
;(async()=>{
    await connect();
    initSchemas();
    const User = mongoose.model('User');
    let oneUser = new User({userName:'LuLisong',password:'123456'});
    oneUser.save().then(()=>{
        console.log('插入成功！！！')
    });
    let users = await User.findOne({}).exec();
    console.log('----------------');
    console.log(users);
    console.log('----------------');
    
})();

app.use(async(ctx)=>{
    ctx.body = 'hello koa'
});
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})