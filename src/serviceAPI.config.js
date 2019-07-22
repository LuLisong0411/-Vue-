const BASEURL = "https://www.easy-mock.com/mock/5d1b68ea4e718016e83ba659/RSshop/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL + 'getGoodsInfo',
    registerUser:LOCALURL+'register',   //用户注册接口   
}

module.exports = URL