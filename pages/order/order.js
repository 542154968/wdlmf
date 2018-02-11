// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: '',
    cloneList: ''
  },
  getData: function( data ){
    // console.log( data )
    let str = '';
    if(  !(Array.isArray( data )) ){ 
      str = '订单生成失败！'
    }else{
      for (let i = 0, l = data.length; i < l; i++) {
        str += data[i].data.name + ' ' + data[i].data.weight + '  ' + 'x' + data[i].num + '\n\n';
      }
    }
    this.setData({
      orderList: str,
      cloneList: str
    })
  },
  setTextData: function(event){
    this.setData({
      cloneList: event.detail.value
    })
  },
  cloneStr: function(event){
    let _this = this;
    wx.setClipboardData({
      data: _this.data.cloneList,
      success: function (res) {
        wx.showToast({
          title: '复制成功'
        })
      },
      fail: function(){
        wx.showModal({
          title: '失败了',
          content: '您的手机可能不支持复制'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
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
    let _this = this;
    wx.getStorage({
      key: 'orderList',
      success: function (res) {
        _this.getData( res.data )
      },
      fail: function () {

      }
    })
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
  
  }
})