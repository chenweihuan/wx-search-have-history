# searchHaveHistory  
微信小程序 带搜索记录的输入框  

在最近的项目里有一个需求，就是需要一个带搜索记录的输入框，但是不需要用到后台，就想到了使用本地缓存setStorageSync。  
## 一：不使用自定义组件 

##### 1、按搜索时间倒序。  
unshift：在数组前面插入数据，并改变数组。  

##### 2、搜索内容前后添加了空格的时候。   
string.trim();//去掉前后空格  

##### 3、最多缓存多少条搜索记录。  
// 如果超过8条搜索记录的话，删掉最旧的一条  
if (searchData.length >= 8)searchData.pop();  
//pop：删除数组最后一个元素。  

##### 4、输入了搜索记录已经有了的内容。
//先删除搜索记录里面的，再添加元素到第一位  
// 如果搜索记录里面有重复的，要做删除操作  
```
for (let i = 0; i < searchData.length; i++) {
  if (searchData[i] == this.data.inputValue.trim()){
    searchData.splice(i,1);
    break;
  }
}
 // 添加搜索记录
 searchData.unshift(inputValue.trim());
```

## 二：使用自定义组件
自从使用了自定义组件封装行业二级联动，感觉很好用，封装性也好，复用性好。那么，如果多个页面需要带搜索记录的搜索框，也需要把搜索框封装成自定义组件呀，下面就是自定义组件--带搜索记录的搜索框 的注意事项。

##### 1、properties设置title值，接受组件的title属性，作为setStorageSync的key，从而实现组件复用而不矛盾。

##### 2、发起搜索请求的时候，执行页面的回调函数，把用户的输入内容传出去
```this.triggerEvent("searchEvent",inputVal);```

##### 3、参数说明:title(setStorageSync的key)、在页面注册的回调函数用于发起ajax请求搜索。
    ```<history id="history"
    title="historyOne"
    bind:searchEvent="searchEvent">
    </history>```
