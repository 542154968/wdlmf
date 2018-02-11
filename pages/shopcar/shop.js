// pages/shopcar/shop.js
const tools = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    resultArr: [],
    listDetail: '',
    touchId: '', // 当前触摸的id
    touchStartX: 0, // 刚开始的位置
    numTimeId: null
  },
  /*********** */
  fingerStart: function (event) {
    let id = Number(event.currentTarget.dataset.id),
        touchId = this.data.touchId;
    // 如果是第一次点击 那就不让touchId清空  
    if ( id != touchId && touchId != ''){
        this.setData({
          touchId: ''
        })
    } else {
        this.setData({
          firstTouch: true,
          touchStartX: event.changedTouches[0].clientX
        })
      }
  },
  fingerMove: function (event) {
    let startX = this.data.touchStartX,
      nowX = event.changedTouches[0].clientX,
      moveX = nowX - startX;
    // 阻止一直设置   
    if ( ( moveX < 0 ) && ( moveX > -30 ) ){ 
      return false 
    }  
    if ((moveX > 0) && (moveX > 30)  ){
      return false
    }
    if ( ( moveX < 0) && (moveX < -10) ){
      this.setData({
        touchId: Number( event.currentTarget.dataset.id )
      })
    } else if ((moveX > 0) && (moveX > 10) ){
      this.setData({
        touchId: ''
      })
    }
  },
  /************* */
  getStore: function(){
    let _this = this;
    wx.showLoading({
      title: '加载中...'
    });
    wx.getStorage({
      key: tools.userShop,
      success: function (data) {
        let arr = data.data,
          idArr = [],
          resultArr = [],
          l = arr.length,
          k = tools.store.length;
        for( let i = 0; i < l; i++ ){
          let id = arr[i].id;
          for (let j = 0; j < k; j++) {
            let item = tools.store[j],
              ide = Number( item.id );
            if ( id === ide ) {
              resultArr.push({ data: item, num: arr[i].num })
              break;
            }
          }
        };
        _this.setData({
          arr: arr,
          resultArr: resultArr,
          touchId: '', // 当前触摸的id
          touchStartX: 0
        });
        wx.hideToast()
      },
      fail: function () {
        if (e.errMsg == 'getStorage:fail data not found') {
          wx.setStorage({
            key: tools.userShop,
            data: [],
            success: function () {
            },
            fail: function () {

            }
          });
        } else {

        };
        wx.hideToast()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '界首市五得利面粉欢迎您'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getStore();

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  accNumStart: function(event){
    let _this = this;
    let changeId = setInterval( function(){
                      _this.accNum(event)
                    }, 100 );
    _this.setData({
      numTimeId: changeId
    })                
  },
  accNumEnd: function (event) {
    let _this = this;
    clearInterval(_this.data.numTimeId )
  },
  addNumStart: function (event) {
    let _this = this;
    let changeId = setInterval(function () {
      _this.addNum(event)
    }, 100);
    _this.setData({
      numTimeId: changeId
    })
  },
  addNumEnd: function (event) {
    let _this = this;
    clearInterval(_this.data.numTimeId)
  },
  numChange: function(event){
    let num = Number( event.detail.value ),
        id = Number( event.target.dataset.id ),
        _this = this; 
    if( isNaN( num ) || isNaN( id ) ){ return false }    
    if( num < 1 ){ return false }   
    _this.setNum( id, num ) 
  },
  accNum: function(event){
    let id = Number( event.target.dataset.id ),
      _this = this,
      strogeData = _this.data.arr,
      num = 'undefined';
      if( isNaN( id ) ){ return false }
      for (let i = 0, l = strogeData.length; i < l; i++ ){
        if (Number(strogeData[i].id ) ===  id ){
          num = strogeData[i].num;
          num = num - 1;
          break;
        }
      };
      _this.setNum( id, num )
  },
  addNum: function( event ){
    let id = Number(event.target.dataset.id),
      _this = this,
      strogeData = _this.data.arr,
      num = 'undefined';
    if (isNaN(id)) { return false }
    for (let i = 0, l = strogeData.length; i < l; i++) {
      if (Number(strogeData[i].id) === id) {
        num = strogeData[i].num;
        num = num + 1;
        break;
      }
    };
    _this.setNum(id, num)
  },
  saveData: function( id, num ){
    wx.getStorage({
      key: tools.userShop,
      success: function( response ) {
        let data = response.data;
        for( let i = 0, l = data.length; i < l; i++ ){
          let item = data[i];
          if( Number( item.id ) === id ){
            item.num = Number( num );
            break;
          }
        };
        wx.setStorage({
          key: tools.userShop,
          data: data
        })
      },
      fail: function(){

      }
    })
  },
  setNum: function (id, num  ){
    let _this = this,
      strogeData = _this.data.arr,
      viewData = _this.data.resultArr;
    if (typeof num == 'undefined') { return false }

    if (num < 1) {
      return false;
    }
    _this.saveData(id, num);
    for (let i = 0, l = strogeData.length; i < l; i++) {
      if (Number(strogeData[i].id) === id) {
        strogeData[i].num = num;
        break;
      }
    };
    for (let j = 0, k = viewData.length; j < k; j++) {
      if (Number(viewData[j].data.id) === id) {
        viewData[j].num = num;
        break;
      }
    }
    _this.setData({
      arr: strogeData,
      resultArr: viewData
    })
  },
  clearList: function(){
    let _this = this;
    wx.showModal({
      title: '确认',
      content: '确定要清空列表吗？',
      success: function( res ){
        if( res.confirm ){
          _this.setData({
            arr: [],
            resultArr: [],
            touchId: '', // 当前触摸的id
            touchStartX: 0
          });
          wx.setStorage({
            key: tools.userShop,
            data: []
          })
        }
        
      }
    })
  },
  getOrder: function(){
    let _this = this;
    _this.setData({
      touchId: '', // 当前触摸的id
      touchStartX: 0
    });
    wx.setStorage({
      key: 'orderList',
      data: _this.data.resultArr,
      success: function(){
        wx.navigateTo({
          url: '../order/order'
        })
      },
      fail: function(){
        wx.showModal({
          title: '失败了',
          content: '订单生成失败了，清空订单重新添加！'
        })
      }
    })
  },
  deleteGoods: function(event){
    wx.showLoading({
      title: '删除中'
    })
    let id = Number( event.target.dataset.id ),
        _this = this,
        vueDataArr = _this.data.arr,
        vueDataResultArr = _this.data.resultArr;
    wx.getStorage({
      key: tools.userShop,
      success: function(res) {
        let storeData = res.data;
        // 清除视图和本地存储的用户商品列表
        for( let i = 0, l = storeData.length; i < l; i++ ){
          let item = storeData[i],
              itemId = Number( item.id ); 
          if( itemId === id ){
            let storeIndex = storeData.indexOf( item );
            storeData.splice( storeIndex, 1 );
            _this.setData({
              arr: storeData
            })
            wx.setStorage({
              key: tools.userShop,
              data: storeData,
              success: function(){
                // 清除视图中的列表数据源中的数据
                for (let i = 0, l = vueDataResultArr.length; i < l; i++) {
                  let item = vueDataResultArr[i],
                    resultData = item.data,
                    itemId = Number(resultData.id);

                  if (itemId === id) {
                    let idIndex = vueDataResultArr.indexOf(item);
                    vueDataResultArr.splice(idIndex, 1);
                    _this.setData({
                      resultArr: vueDataResultArr
                    })
                    break;
                  }
                }
                wx.hideLoading();
              },
              fail: function(){}
            });
            break;
          }    
        };
        
        
      },
      fail: function(){
        wx.hideLoading()
      }
    })

  }
})