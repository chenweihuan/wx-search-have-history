<div align="center">

[![npm-version](https://img.shields.io/npm/v/wx-search-have-history.svg)](https://www.npmjs.com/package/wx-search-have-history)
<h1>wx-search-have-history</h1>
<p>一款拥有历史搜索记录的微信小程序搜索框</p>
</div>


wx-search-have-history使用前提：

> 使用此组件需要依赖小程序基础库 2.2.1 或以上、及开发者工具 1.02.1808300 或以上，同时依赖开发者工具的 npm 构建。具体详情可查阅[微信小程序 npm 支持文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。

## 使用效果

1. 通过输入进行搜索  

![input-search](./docs/input-search.gif)

2. 清除单个（全部）历史搜索记录  

![delete-search](./docs/delete-search.gif)

3. 点击历史搜索记录进行搜索  

![click-search](./docs/click-search.gif)


> PS：若想要获得上图中的效果，可参考 [test/demo](./test/demo/pages) 中的例子实现。

## 使用方法

1. 安装 wx-search-have-history

```
npm install --save wx-search-have-history
```

2. 在需要使用 wx-search-have-history 的页面 page.json 中添加 wx-search-have-history 自定义组件配置

```json
{
  "usingComponents": {
    "searchHaveHistory": "wx-search-have-history"
  }
}
```
3. WXML 文件中引用 wx-search-have-history：调用history组件的同时，需要在调用wx-search-have-history的页面page.js绑定事件接收搜索值（bind:searchEvent="searchEvent"），且须在searchEvent函数里调用wx.hideLoding()，可参考 [test/demo](./test/demo/pages/index/index.js) 中的例子。  

``` xml
<searchHaveHistory id="history"
	bind:searchEvent="searchEvent">
</searchHaveHistory>
```

**slide-view的属性介绍如下：**

| 属性名                   | 类型         | 默认值                    | 是否必须    | 说明                                        |
|-------------------------|--------------|---------------------------|------------|---------------------------------------------|
| id                   | String       | 无             | 是          | 组件的id，必填且唯一                        |
| maxSize                  | Number       | 8                         | 否          | 历史搜索记录列表的最大显示条数                        |
| placeholderText              | String       | 请输入关键字                         | 否          | 输入框的placeholder值|


## 注意事项

1. 在调用组件的时候，id必须填写且唯一。因为此id作为本地缓存的key值。

2. 在调用wx-search-have-history的页面page.js需绑定事件接收搜索值（bind:searchEvent="searchEvent"），且须在searchEvent函数里调用wx.hideLoding(),可参考 [test/demo](./test/demo/pages/index/index.js) 中的例子。  

> 这是我第一次尝试，如有不当或需改进之处，请君指出，感谢万分！！！