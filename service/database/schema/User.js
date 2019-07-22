const mongoose = require('mongoose');       //引入mongoose
const Schema = mongoose.Schema;             //引入Schema

let ObjectId = Schema.Types.ObjectId        //声明Object类型
//创建我们的Schema用户
const userSchema = new Schema({
    userId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
    
});
//发布模型
mongoose.model('User',userSchema);
