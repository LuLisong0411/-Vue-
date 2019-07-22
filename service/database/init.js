const mongoose = require('mongoose');
const db = "mongodb://localhost/simle-db";
// glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
// resolve: 将一系列路径或路径段解析为绝对路径。
const glob = require('glob');
const {resolve} = require('path')

mongoose.Promise = global.Promise;

exports.connect = ()=>{
    return new Promise((resolve,reject)=>{
        let maxConnectTimes = 0;
        //连接数据库
        mongoose.connect(db);
        
        //增加数据库连接的事件监听
        mongoose.connection.on('disconnected',()=>{
            console.log('*********数据库断开*********')
            if(maxConnectTimes < 3){
                maxConnectTimes++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库出现异常，程序无法处理，请人为修复！！！！！');
            }
        })
        //数据库出现错误的时候
        mongoose.connection.on('error',err=>{
            if(maxConnectTimes < 3){
                maxConnectTimes++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('数据库出现异常，程序无法处理，请人为修复！！！！！');
            }
        })
            //连接打开的时候
        mongoose.connection.on('open',()=>{
            console.log('MongoDB Connected Successful');
            resolve();
        })
    })
 }
//  使用glob.sync同步引入所有的schema文件，然后用forEach的方法require（引入）进来。比一条条引入要优雅的多
 exports.initSchemas = ()=>{
     glob.sync(resolve(__dirname,'./schema/',"**/*.js")).forEach(require)
 }