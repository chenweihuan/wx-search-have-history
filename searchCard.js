// pages/index/searchCard/searchCard.js
const app = getApp();
const utils = require("../../../utils/util.js");

// var inputValueOut;

Page({
  data: {
    sercherStorage: [],
    inputValue: "",             //搜索框输入的值  
    StorageFlag: false,         //显示搜索记录标志位
    resData:[],//搜索结果

    size:8,//每页返回的搜索条数
    page:1,//加载哪一页
  },
  // 初始化输入记录
  onLoad(){
    let searchData = wx.getStorageSync("searchData");
    console.log()
    this.setData({
      sercherStorage: searchData || []
    })
  },
  // 聚焦显示搜索记录
  bindFocus(){
    this.setData({
      StorageFlag:true
    })
  },
  //获取输入框的输入信息
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //清楚缓存历史并关闭历史搜索框
  clearSearchStorage: function () {
    wx.removeStorageSync('searchData')
    this.setData({
      sercherStorage: [],
      StorageFlag: false,
    })
  },
  //点击缓存搜索列表
  tapSercherStorage: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.id;
    let sercherStorage = that.data.sercherStorage;
    let chooseItem = sercherStorage.splice(index, 1);

    wx.showLoading({ title: '正在搜索' })

    this.setData({ 
      inputValue: chooseItem[0],
      page: 1
    })
    if (this.data.inputValue.trim() != '') {
      //请求搜索记录
      // inputValueOut = this.data.inputValue.trim();
      this.getResult(this.data.inputValue.trim());

      sercherStorage.unshift(chooseItem[0]);
      that.setData({
        StorageFlag: false,
        sercherStorage: sercherStorage,
        resData: [],
        maxSize: false
      })
    }else{
      wx.hideLoading();
      utils.showModal("输入不能为空");
      that.setData({
        inputValue: ""
      })
    }
  },
  // 清除某一条历史搜索记录
  deteleSercherStorage(e){
    let that = this;
    let index = e.currentTarget.dataset.id;
    let sercherStorage = this.data.sercherStorage; 
    sercherStorage.splice(index, 1);
    wx.setStorageSync('searchData', sercherStorage);
    that.setData({
      sercherStorage: sercherStorage
    });
  },
  //添加搜索记录并搜索
  setSearchStorage: function (e) {
    var that = this;
    //搜索
    wx.showLoading({ title: '正在搜索' })

    that.setData({
      StorageFlag: false,
      page: 1,
      resData: [],
      maxSize: false 
    })
    if (this.data.inputValue.trim() != '') {
      // inputValueOut = this.data.inputValue.trim();
      that.getResult(this.data.inputValue.trim());
      //将搜索记录更新到缓存
      let searchData = that.data.sercherStorage;
      // 如果搜索记录里面有重复的，要做删除操作
      for (let i = 0; i < searchData.length; i++) {
        if (searchData[i] == this.data.inputValue.trim()){
          searchData.splice(i,1);
          break;
        }
      }
      // 如果超过8条搜索记录的话，删掉最旧的一条
      if (searchData.length >= 8)searchData.pop();
      
      // 添加搜索记录
      searchData.unshift(that.data.inputValue.trim())
      wx.setStorageSync('searchData', searchData);
      that.setData({
        StorageFlag: false,
        sercherStorage: searchData
        })
    } else {
      wx.hideLoading();      
      utils.showModal("输入不能为空");
      that.setData({
        inputValue: ""
      })
    }
  },
  // 请求搜索结果
  getResult(inputVal){
    let params = {
      search: inputVal,
      page:this.data.page,
      size:this.data.size
    }
    // 这里使用了模拟的接口，根据自己需要修改
    utils.GET("text.com", {
      params: params,
      success: res => {
        console.log(res)
        let resData = this.data.resData;
        resData.push(...res.data.parms.visitingCards);
        if (res.data.parms.maxSize || res.data.parms.maxSize == 0){
          this.setData({
            resData: resData,
            maxSize: res.data.parms.maxSize
          })
        }else{
          this.setData({ 
            resData: resData
          })
        }
        wx.hideLoading();
      }, fail: () => { }
    })
  },
  // 点击加载更多
  loadMore(){
    this.setData({
      page:this.data.page + 1
    })
    this.getResult(this.data.inputValue);
  }
})