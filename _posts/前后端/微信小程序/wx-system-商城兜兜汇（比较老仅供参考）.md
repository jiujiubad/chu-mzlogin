---
title: wx-system-商城兜兜汇（比较老仅供参考）
date: '2017-12-20 00:10'
categories:
  - 微信小程序
tags:
  - 微信系统
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fng5pmwdonj30cd08u0sx.jpg'
abbrlink: 1ff9fef
---

* 201712
* 编程+小程序



# 一、通用设置

page、container常用自定义参数：`height: 100%;`、`min-height: 100%;`、`background: #fff;`、`width: 100%;`。	

有时会用`overflow: hidden;`。

```
/**app.wxss**/
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
}
page {
  font-size: 30rpx;
  color: #353535;
  letter-spacing: 2rpx;
  line-height: 45rpx;
}
```



# 二、welcome页面最小可行性代码

## 1、通用配置

1）class怎么命名？

最外层用大写Box-welcome，里层用box-intro、box-story，再往里用intro-item1、box-item1。

这样就知道box开头的是外层，Box外头是最外层，而intro-item1、box-item1就知道是哪个模块的第几个部分。

2）怎么注解？

wxml用`<!-- -->`，wxss用`/* */`，js和json用`//`

3）字体。主字色#353535，副字色#888

```
page {
  font-size: 30rpx;
  color: #353535;
  letter-spacing: 2rpx;
  line-height: 45rpx;
}
```

## 2、welcome的box-product产品分两列

1）wxml文件

```
<view class="Box-welcome">
  <view wx:for="{{weldata}}" wx:key="" class="box-product">
    <image src='{{item.image.url}}'></image>
    <view class='product-text1'>{{item.title}}</view>
    <view class='product-text2'>{{item.description}}</view>
  </view>
</view>
```

2）js文件

```
var app = getApp();
Page({
  data: {
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://wx-luccake.herokuapp.com/api/v1/products',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          weldata: res.data.data,
          wedata: res.data.data
        })
      }
    })
  }
})
```

3）wxss文件，难点在于产品怎么分成两列？

用space-between让图片靠两边排列，加上图片width设置49%，就能排成两列。用wrap设置多行排列。

```
.Box-welcome {
display: flex;
flex-flow: row wrap;
justify-content: space-between;
padding:1%;
}
.box-product {
width:49%;
margin-top:1%;
text-align:center;
border: 1rpx solid #e8e8e8;
}
.box-product image {
width:100%;
height: 330rpx;
}
.product-text2 {
color: #888;
font-size: 25rpx;
}
```

## 3、welcome的box-intro大图轮播

1）wxml文件，这里的`mode="aspectFill"`用来调整图片平铺/裁剪效果（有4种缩放模式9中裁剪模式），模式虽多但是感觉aspectFill效果最好。

```
  <swiper class="swiper" indicator-dots="true"
    autoplay="true" interval="5000" duration="1000">
    <block wx:for="{{movies}}" wx:key="">
      <swiper-item>
        <image src="{{item.url}}" mode="aspectFill"/>
      </swiper-item>
    </block>
  </swiper>
```

2）js文件

```
  data: {
   movies:[
   {url:'https://ws2.sinaimg.cn/large/006tNc79gy1fmizuzzadzj30ku0km0u5.jpg'} ,
   {url:'https://ws4.sinaimg.cn/large/006tNc79gy1fmizuz16u0j30u00u1405.jpg'} ,
   {url:'https://ws4.sinaimg.cn/large/006tNc79gy1fmizus0vlkj30qm0qmdib.jpg'}
   ]
  },
```

3）wxss文明

```
.swiper {
 height: 400rpx;
 width: 100%; /*非常重要的值，没有就不会显示轮播*/
}
.swiper image {
 width: 100%;
}
```

## 4、welcome的box-search搜索

1）wxml文件

```
  <view class="box-search">
    <input type="text" placeholder="翻糖蛋糕清新款" focus/>
  </view>
```

2）wxss文件

```
/*搜索框*/
.box-search {
  width: 100%;
  text-align: center;
}
.box-search input {
  padding: 20rpx;
}
```

3）js文件

```

```

## 5、底部tabbar

1）app.json，图片放到/image文件夹

```
  "tabBar": {
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "borderStyle": "black",
    "backgroundColor": "#ffffff",
    "list": [{
      "pagePath": "pages/welcome/welcome",
      "iconPath": "image/icon_component.png",
      "selectedIconPath": "image/icon_component_HL.png",
      "text": "主页"
    }, {
      "pagePath": "pages/logs/logs",
      "iconPath": "image/icon_API.png",
      "selectedIconPath": "image/icon_API_HL.png",
      "text": "分类"
    }]
  }
```



# 三、分类页面

## 1、wxml最初的布局

```
<view class='container'>
  <view class='search'></view>
  <view class='category'>
    <scroll-view class='left' scroll-y="true">
    </scroll-view>
    <scroll-view class='right' scroll-y="true">
    </scroll-view>
  </view>
</view>
```

最外层还是用container，其他层简单用left、right等简单命名。

image、text等标签，不用加class，直接在css定义`search image{...}`。

## 2、搜索框

wxml

```
  <view class='search'>
    <navigator url="/pages/search/search" class="input">
      <image></image>
      <text>商品搜索, 共xxx款好物</text>
    </navigator>  
  </view>
```

wxss

```
/* page {
  height: 100%;
} */
.search {
  height: 88rpx;
  padding: 0 30rpx;
  display: flex;
  align-items: center;
}
.search .input {
  width: 690rpx;
  height: 56rpx;
  background: #ededed;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search image {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png) center no-repeat;
  background-size: 100%;
  width: 28rpx;
  height: 28rpx;
}
.search text {
  color: #888;
  padding-left: 10rpx;
  font-size: 30rpx;
}
```

## 3、左侧分类标题

### 3.1 思路：

1）先循环出api数据，

2）bindtap点击事件，并设置data-id="{{item.id}}"

3）var一个`_id`，设置为当前id即e.currentTarget.dataset.id。然后用this.setData，把`_id`的值给到left_id

4）回到wxml，用`left_id==item.id? 'active':''`判断，如果点击的left_id等于item.id，就会触发active的css样式。这里的效果是字色变红。

### 3.2 问题

1）怎么设置初始id和index（用于初始化后显示图片）？

可以在js的page的data里，设置index=0、id=1。

### 4、右侧分类明细

### 4.1 思路：

1）目的是可以用`wx:for="{{navRightList[curIndex].products}}"`加载数据。

2）拿到navRightList的数据表。如果api包含index和show，在同个api请求中顺便setData，让navRightList: res.data.categories。如果网址分开就分开写request。

3）在左侧标题的view里，先设置`data-id="{{item.id}}"`、`data-index="{{index}}"`。然后在点击事件bindtap="switch_right"上，设置当前id和index的值，值的具体获取方法可以先console.log(e)，从获取的数据表中去看。

4）OK了，可以通过`wx:for="{{navRightList[curIndex].products}}"`拿数据。

5）初始化的数据（字色变红、加载第一组的图片）。在js的page的data里，设置left_id=1、curIndex=0。

6）最后改wxss。



# 四、商品详情页

wxml

```
<swiper class="goodsimgs" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
  <swiper-item wx:for="{{picdata}}" wx:key="">
    <image src="{{item.avatar.medium.url}}" ></image>
  </swiper-item>
</swiper>

<view class="service-policy">
  <view class="item">30天无忧退货</view>
  <view class="item">48小时快速退款</view>
  <view class="item">满88元免邮费</view>
</view>

<view class="goods-info">
  <view class="c">
    <text class="name">{{goods.title}}</text>
    <text class="desc">{{goods.description}}</text>
    <text class="price">￥{{goods.price}}</text>
    <view class="brand" wx:if="{{brand.name}}">
      <navigator url="../brandDetail/brandDetail?id={{brand.brandId}}">
        <text>{{brand.name}}</text>
      </navigator>
    </view>
  </view>
</view>
```

js

```
// pages/goods/goods.js
Page({

  data: {
  },

  onLoad: function (options) {
    console.log(options.id)
    var p_id = options.id
    var that = this
    wx.request({
      url: 'https://luccake.top/api/v1/products/' + p_id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.photos)
        that.setData({
          picdata: res.data.photos,
          goods: res.data
        })
      }
    })
  },

})
```

wxss

```
.container{
  margin-bottom: 100rpx;
}
.goodsimgs{
  width: 100%;
  height: 750rpx;
}
.goodsimgs image{
  width: 100%;
  height: 750rpx;
}

.service-policy{
    width: 750rpx;
    height: 75rpx;
    background: #f8f8f8;
    padding: 0 31.25rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}
.service-policy .item{
    background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/servicePolicyRed-518d32d74b.png) 0 center no-repeat;
    background-size: 10rpx;
    padding-left: 15rpx;
    display: flex;
    align-items: center;
    font-size: 25rpx;
}

.goods-info{
    width: 750rpx;
    height: 306rpx;
    overflow: hidden;
    background: #fff;
}
.goods-info .c{
    display: block;
    width: 718.75rpx;
    height: 100%;
    margin-left: 31.25rpx;
    padding: 38rpx 31.25rpx 38rpx 0;
    border-bottom: 1px solid #f4f4f4;
}
.goods-info .c text{
    display: block;
    width: 687.5rpx;
    text-align: center;
}
.goods-info .name{
    height: 41rpx;
    margin-bottom: 5.208rpx;
    font-size: 41rpx;
    line-height: 41rpx;
}
.goods-info .desc{
    height: 43rpx;
    margin-bottom: 41rpx;
    font-size: 24rpx;
    line-height: 36rpx;
    color: #999;
}
.goods-info .price{
    height: 35rpx;
    font-size: 35rpx;
    line-height: 35rpx;
    color: #b4282d;
}
.goods-info .brand{
    margin-top: 23rpx;
    min-height: 40rpx;
    text-align: center;
}
.goods-info .brand text{
    display: inline-block;
    width: auto;
    padding: 2px 30rpx 2px 10.5rpx;
    line-height: 35.5rpx;
    border: 1px solid #f48f18;
    font-size: 25rpx;
    color: #f48f18;
    border-radius: 4px;
    background: url(http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/detailTagArrow-18bee52dab.png) 95% center no-repeat;
    background-size: 10.75rpx 18.75rpx;
}
```

