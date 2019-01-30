Page({
  data: {
  },
  searchEvent(e){
  	console.log("用户搜索"+e.detail)
    setTimeout(()=>{
      wx.hideLoading();
    },1000)
  }
})
