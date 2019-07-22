//引入connect
const {connect} = require('./database/init');
//立即执行函数
(async()=>{
    await connect();
})()