// pages/userDefineOne/userDefineOne.js
Page({
  data: {
  
  },
  onReady() {
    this.history = this.selectComponent("#history");//获取history组件,可以调用组件的内部方法
  },
  searchEvent(e){
    console.log("发起请求，搜索：" + e.detail)
  }
})