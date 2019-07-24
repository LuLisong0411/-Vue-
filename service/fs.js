const fs = require('fs')
fs.readFile('./data_json/goods.json','utf-8',function(err,data){
    let newData = JSON.parse(data);
    let i = 0;
    let pushData = [];
    newData.RECORDS.map(function(value,index){
        if(value.IMAGE1!=null){
            i++;
            console.log(value.NAME);
            pushData.push(value)
        }
    })
    console.log(i);
    console.log(pushData)
})
fs.writeFile('./newGoods.json',JSON.stringify(pushData),function(err){
    if(err){
        console.log('写入文件失败')
    }else{
        console.log('写入文件成功')
    }
})