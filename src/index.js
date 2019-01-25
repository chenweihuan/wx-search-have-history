Component({
  properties: {
    maxSize: { 
      type:Number,
      value:8
    },
    placeholderText: { 
      type: String,
      value:'请输入关键字'
    }
  },
  data: {
    searcherStorage: [],
    inputValue: "",          
    StorageFlag: false,      
  },
  ready() {
    let searchData = wx.getStorageSync(this.id);
    this.setData({ searcherStorage: searchData || [] });
  },
  methods: {
    bindFocus() { 
      this.setData({ StorageFlag: true })
    },
    bindInput(e) {
      this.setData({ inputValue: e.detail.value })
    },
    clearSearchStorage() { 
      wx.removeStorageSync(this.id)
      this.setData({
        searcherStorage: [],
        StorageFlag: false,
      })
    },
    tapSearcherStorage(e) {
      let index = e.currentTarget.dataset.id;
      let searcherStorage = this.data.searcherStorage;
      let chooseItem = searcherStorage.splice(index, 1)[0];
      wx.showLoading({ title: '正在搜索' })
      this.getResult(chooseItem);
      searcherStorage.unshift(chooseItem);
      this.setData({
        StorageFlag: false,
        searcherStorage: searcherStorage,
        inputValue: chooseItem
      })
      wx.setStorageSync(this.id, searcherStorage);
    },
    deteleSearcherStorage(e) {
      let index = e.currentTarget.dataset.id;
      let searcherStorage = this.data.searcherStorage;
      searcherStorage.splice(index, 1);
      wx.setStorageSync(this.id, searcherStorage);
      this.setData({ searcherStorage: searcherStorage });
    },
    setSearchStorage(e) { 
      let that = this;
      let inputValue = this.data.inputValue.trim();
      let searchData = that.data.searcherStorage;      
      wx.showLoading({ title: '正在搜索' })
      if (inputValue != '') {
        that.getResult(inputValue);
        searchData = searchData.filter((item) => item !== inputValue);
        if (searchData.length >= this.data.maxSize) searchData.pop();
        searchData.unshift(inputValue);
        wx.setStorageSync(this.id, searchData);
        that.setData({
          StorageFlag: false,
          searcherStorage: searchData
        })
      } else {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '输入不能为空',
          showCancel: false
        })
        that.setData({
          StorageFlag: false,
          inputValue: ""
        })
      }
    },
    getResult(inputVal) { 
      this.triggerEvent("searchEvent",inputVal);
    }
  }
})