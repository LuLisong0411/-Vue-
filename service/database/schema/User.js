const mongoose = require('mongoose');       //引入mongoose
const Schema = mongoose.Schema;             //引入Schema

let ObjectId = Schema.Types.ObjectId        //声明Object类型
// bcrypt是一种跨平台的文件加密工具。bcrypt 使用的是布鲁斯·施内尔在1993年发布的 Blowfish 加密算法。
// 由它加密的文件可在所有支持的操作系统和处理器上进行转移。它的口令必须是8至56个字符，并将在内部被转化为448位的密钥。
const bcrypt = require('bcrypt');
//创建我们的Schema用户
const userSchema = new Schema({
    userId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()},
    
});
//每次存储数据时都要执行,用户密码加密机制
userSchema.pre('save', function(next){
    //let user = this
        console.log(this)
        bcrypt.genSalt( String,(err,salt)=>{
            if(err) return next(err)
            bcrypt.hash(this.password,salt, (err,hash)=>{
                if(err) return next(err)
                this.password = hash
                next();
            }) 
    })
});
// 声明一个实例方法comparePassword，然后传递两个参数，一个是客户端密码，一个是数据库取出来的密码。
// 用bcrypt提供的compare方法就可以比对，最后包装成Promise返回就可以了。
userSchema.methods = {
    //密码比对的方法
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) {
                    resolve(isMatch);
                }else{
                    reject(err)
                }
            })
        })
    }
}
//发布模型
mongoose.model('User',userSchema);

