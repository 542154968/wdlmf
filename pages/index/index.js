//index.js
//获取应用实例
const app = getApp();
const tools = require('../../utils/util.js')

Page({
  data: {
    store: tools.store,
    haveArr: ''
  },
  //事件处理函数
  goShopCar: function(event) {
    const id = Number( event.target.dataset.id );
    wx.getStorage({
      key: tools.userShop,
      success: function(data){
        const response = data.data;
        let result = {
          id:  id ,
          num: 1
        };
        let idArr = [];
        for( var i = 0, l = response.length; i < l; i++ ){
          idArr.push( Number( response[i].id ) );
        };
        if( idArr.indexOf( id ) > -1 ){
          wx.showModal({
            title: '失败了',
            content: '订单中已有该商品了哦...'
          })
        }else{
          response.push(result);
          wx.setStorage({
            key: tools.userShop,
            data: response,
            success: function () {
              wx.showToast({
                title: '添加成功！'
              })
            },
            fail: function () {
              wx.showModal({
                title: '失败了',
                content: '订单添加失败了...'
              })
            }
          })
        }


      }
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '界首市五得利面粉欢迎您'
    });
    let _this = this;
    wx.getStorage({
      key: tools.userShop,
      success: function(data){
        
      },
      fail: function(e){
        if (e.errMsg == 'getStorage:fail data not found'){
          wx.setStorage({
            key: tools.userShop,
            data: [],
            success: function(){
            },
            fail: function(){

            }
          })
        }
      }
    })
  },
  onShow: function(){
    let _this = this;
    wx.getStorage({
      key: tools.userShop,
      success: function(res) {
        let data = res.data,
            arr = [];
        if( Array.isArray( data ) ){
          for( var i = 0, l = data.length; i < l; i++ ){
            arr.push(data[i].id);
          }
        }
        _this.setData({
          haveArr: arr.toString()
        })
      },
    })
  }

})
