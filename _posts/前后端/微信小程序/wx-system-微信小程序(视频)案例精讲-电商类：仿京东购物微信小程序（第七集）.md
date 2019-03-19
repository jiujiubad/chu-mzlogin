---
title: wx-system-微信小程序(视频)案例精讲-电商类：仿京东购物微信小程序（第七集）
date: '2018-01-06 00:10'
categories:
  - 微信小程序
tags:
  - 微信系统
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fng5pmwdonj30cd08u0sx.jpg'
abbrlink: 24e38dd5
top: 3
---

* 201801
* 编程+小程序



### 参考资料

[视频——微信小程序案例精讲-电商类：仿京东购物微信小程序（第七集）](https://chuanke.baidu.com/v9139680-239406-1775747.html)

[微信小程序案例精讲（基础+菜谱精灵+今日头条+爱鲜蜂+淘票票+酷狗音乐+京东购物+拉勾网+猿题库）](http://www.rymooc.com/course/show/518)



对于页面布局，先用图片、文字写死，再通过js去改成变量。

好的案例视频要反复看、反复练几遍。

这个课的css命名，从布局到功能都很清晰。

# 一、需求描述及交互分析

见课件百度附件。

# 二、设计思路和相关知识点

1）tabbar

2）基本组件

3）wx.setStrorageSync，存储数据。

4）wx.getStorageSync，获取数据。

5）wx.navigateTo、wx.navigatoBack，导航跳转。wx.setNavigationBarTitle，新页面标题。

6）swiper

# 三、搜索商品首界面页面设计

<img src="https://ws4.sinaimg.cn/large/006tKfTcgy1fn3m71byddj306q0bnglp.jpg" width="250">

## 1、常用css

1）解决问题：如何一行放两个或三个商品？——**重新整理见《循环一行显示两个商品》**

width:47%;（宽度常用百分比）

height:100rpx;（高度常用rpx）

margin:0 auto;（居中，好像比text-align适用范围更广）

2）搜索框的文字上下位置

line-height:80rpx;（用行高能达到padding的效果）

# 四、搜索商品逻辑设计

<img src="https://ws4.sinaimg.cn/large/006tKfTcgy1fn3mj8kvcfj305e05i3yf.jpg" width="250">

## 1、常用css

1）外边的view常用css

display:flex;

flex-direction:row;

padding:10px;（撑开空白间隙，很好用）

2）推荐热词换行css。推荐设置好右边距、宽度，然后用float。——**重新整理见《循环一行显示两个商品》**

margin-right:10px;

padding:1%;（或者padding-left:10px; padding:right:10px;）——如果定义宽度width，字数较多时会跑出来。

float:left;（因为微信有rpx，所以用float也能大小屏幕自适应）

> 也可以先设置右边距、宽幅，然后用
>
>   display: flex;
>
>   flex-flow: row wrap;（相当于flex-direction:row; flex-wrap:wrap;）

3）新的view要清除浮动才会换行，不然会跟着上面的float

clear:both;

4）hr透明度

opacity:50%;

## 2、逻辑

1）对输入值，在系统的关键词数组里检索，看哪些是匹配的

```
for (var i = 0; i < goods.length; i++) {
  var good = goods[i];
  if (good.indexOf(name) > -1) {
    result.push(good);
  }
}
```

`var good = goos[i];`，拿到当前系统关键词

`good.indexOf(name)`，[0是关键词匹配，1是不匹配](http://www.w3school.com.cn/jsref/jsref_indexOf.asp)。

`result.push(good)`，如果输入词与系统关键词匹配，把系统关键词加入到result数组最右侧。

# 五、购物车页面设计

1）布局元素都会给里外两层，外层定位如flex、margin+定总外形如height，里层定形如width、height。

# 六、购物车逻辑设计——重点

## 1、初始页面时计算总价

```
  onLoad:function(){
     this.loadGoods();
  },
  loadGoods:function(){
    var goods = wx.getStorageSync("goods");
    var totalPrice=0;
    for(var i=0;i<goods.length;i++){
      var good = goods[i];
      totalPrice += good.price * good.count;
    }
    this.setData({goods: goods, totalPrice: totalPrice});
  },
```

1）拿到产品数组，然后计算总价。

## 2、单选框checkbox逻辑

```
  checkboxChange:function(e){
     var ids = e.detail.value; //ids数组如[0,1,2]
     if(ids.length==0){
       this.setData({selectedAll:false,totalPrice:0});
     }else{
       var goods = wx.getStorageSync("goods");
       var totalPrice = 0;
       for (var i = 0; i < goods.length; i++) {
         var good = goods[i];
         for (var j = 0; j < ids.length; j++) {
           if (good.id == ids[j]) {
             totalPrice += good.price * good.count;
           }
         }
       }
       this.setData({ selectedAll: true, totalPrice: totalPrice });
     } 
  },
```

1）如果ids数组长度为零。

全选框是false，且总价为零。

2）如果ids数组长度不为零。

拿商品good做循环，对比ids数组看id是否相同，相同则计算该商品价格。通过+=依次循环合计出总价。

## 3、全选框checkAll逻辑

```
  checkAll:function(e){
     var selected = this.data.selected;
     var result = selected==true?false:true; //如果状态为true，点击后变为false。反之变true。
     this.setData({selected:result});
     if (result==false){
        this.setData({totalPrice:0});
     }else{
       this.loadGoods();
     }
  },
```

1）全不选。

总价0。

2）全选。

重新计算，计算方法同第一步的初始计算总结。

## 4、加一

```
  addGoods:function(e){
    var id = e.currentTarget.id;
    var goods = wx.getStorageSync("goods");
    var addGoods = new Array();
    for(var i=0;i<goods.length;i++){
      var good = goods[i];
      if(good.id == id){
        good.count = good.count + 1;
      }
      addGoods.push(good);
    }
    wx.setStorageSync("goods", addGoods);
    this.loadGoods();
  },
```

1）拿到产品id，如果产品id等于当前点击位置的产品id，则数量count加一/减一

2）替换缓存数组goods，把点击位置的产品push进去

3）按步骤一的方法重新计算总价

## 5、减一

```
  minusGoods:function(e){
    var id = e.currentTarget.id;
    var goods = wx.getStorageSync("goods");
    var addGoods = new Array();
    for (var i = 0; i < goods.length; i++) {
      var good = goods[i];
      if (good.id == id) {
        var count = good.count;
        if(count >= 2){
          good.count = good.count - 1;
        }
      }
      addGoods.push(good);
    }
    wx.setStorageSync("goods", addGoods);
    this.loadGoods();
  }
```

1）跟加一唯一的不同是，多了一个if判断，当产品数量大于2才执行减一。



# 七、我的订单页面设计

# 八、优惠券设计

## 1、逻辑

1）用currentTab来控制点击标签改变颜色，先设定三个标签的currenTab的值分别为0、1、2。

```
class="{{currentTab==0?'select':'default'}}" 
```

2）点击标签时，触发事件，在js改变currenTab的下标值index，此时currentTab=index实现标签变色。

3）点击时，js也改变优惠券数组，由loadCoupons(0)变成loadCoupons(index)。

## 2、问题：wxml中的data-current="0"有什么用？

## 3、两种返回数据的方法

1）this.satData({})

2）result = [];  return result;



# 【一】套路总结：

1、js放置测试初始数据；

2、wxml布局；

3、wxss添加一点样式；

4、js写变化逻辑；——即**『拿数据』**

5、把wxss里的测试数据，替换成js里的变量——即**『显示数据』**

> 其中，第四步，js逻辑即拿数据是核心。而且除了逻辑设计外，还隐藏后端api设计这一步。
>
> 所以，有时看起来好像很简单，但是**『后端api设计+前后端数据连接+js逻辑设计』**经常比预想要多花几倍时间。
>
> 因此，**css不能纠结**，更多时间应该花在练习刚刚提到的**『』**。

* 一开始做，担心代码重复很丑，担心css命名不好辨认或重复，担心做某一部分时功能做的不全，一系列担心。但是2018.01.04真正进入状态后，发现根本就没有资格担心这些东西，因为最最重要的事情是把东西做出来，这样才会有干劲。
* 这篇教程的**『小刚老师』**也是，**『吉米』**也是，**『从0到1的作者』**也是，都是**『先wxml框架、再wxss穿衣服、最后来点js动作』**，也就是说，先把静态页面先做出来，图片、图标全部不考虑变量直接粘贴现成的，把作品做出样子后，就能专注于去改每一部分，吉米做的网站搭建教程就是一个最好的例子，简单的现成静态图片却能搭建出成熟网站的样子。

# 【二】魔改练习法：

* 如果看完不做第二天甚至当天就会全部忘记。
* 如果看完按照教程做会自己为搞懂逻辑，而实际上自己离开这个案例就不会用了。
* 魔改的好处：
  * ①、按照教程代码，在自己的作品上立即呈现效果，有成就感；
  * ②、按照教程练习逻辑，理一理思路；
  * ③、根据自己的需求去改，这时才会根据自己的需要去思考怎么修改这个功能，过程中就能看清楚自己真正看懂的是哪部分代码，看不懂的又是哪一部分。

#【三】问题

## 1、数据传递方法

1）同个js页面，不同function的数组变量传递

最常用的是`this.data.xx`，传递变量。如果代码结构相同，重新执行function可以用`page.function()`。

2）[不同js页面，传递数组、传递散列对象](http://www.wxapp-union.com/article-617-1.html)

数据页，关键代码`JSON.stringify(this.data.testData)`

```
data: {  
  testData:{name:'我是name', extra:'我是extra'}  
}, 
next: function(e){
  wx.navigateTo({  
    url: '/pages/test/test?extra='+JSON.stringify(this.data.testData)  
  }) 
}
```

接收页，关键代码`JSON.parse(e.extra)`

```
data:{  
  testData: null  
}, 
onLoad:function(e){ 
  console.log("接收到的参数是obj="+e.extra);//此处打印出来的仅仅是字符串 需要解析，解析如下  
  var testData = JSON.parse(e.extra);//解析得到对象
  this.setData({
    testData: testData
  })
}
```

3）拿到api回调函数返回的数据。（success function等回调函数是不能return返回数据的，可以通过缓存的方法）

在success function里用wx.setstorageSync，在api请求外调用wx.getstorageSync，做一些js算法运算输出新数组。详见luccak项目，p_search的loatTips()、loadTitles()两个加载数据的函数。

```
  loadTips:function(e){
    var that = this;
    var word = [];
    wx.request({
      url: 'https://luccake.top/api/v1/products',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorageSync('word',res.data.data)
      }
    })
    var word = wx.getStorageSync('word');
    var out = [];
    for(var i=0; i<10; i++){
      var temp = (Math.random()*word.length)>>0;
      out.push(word[temp]);
    }
    this.setData({out: out})
    console.log('cccfd',out)
  },
```

4）wxml页面拿到js页面的数据，特别是动态改变的数据？

①、实测发现，必须在data里定义变量a，才能在wxml调用。

②、用同步this.setData()，或异步that.setData()，把变量a由初始值改为新值。

```
Page({
  data:{
  	dynamic_name: '', //『重要步骤』data的初始值，可用来给wxml提供初始状态。
  },
  dynamicInput:function(e){
  	var name = e.detail.value; //根据具体案例，拿到动态输入的文字
  	var dynamic_name = '' //引入dynamic_name
  	this.setData({dynamic_name: name}) //『重要步骤』把dynamic_name由初始值改为新值
  }
})
```

5）wxml传数据如id等给js。

在标签里加上data-id="{{item.id}}"。

## 2、wx:for循环怎么控制个数

在wxml用`wx:if='{{index<10}}'`

```
<view wx:for="{{word}}" wx:if='{{index<10}}' class="tip" >
  {{item.title}}
</view>
```

## 3、typeof()检测数据类型

`console.log('类型1', typeof (utf))`

## 4、一般情况下，小程序的utils这个文件夹下，我们可以把本地的数据写进去，封装成.js文件，提供对外暴露的接口，然后读取本地数据，这些在上一篇博客中有详细介绍。我们最后说到写好的本地数据可以另一个页面读取：

## 5、wx:for怎么写在js？js拿api数组？wx.request异步请求不能返回数据，怎么处理？异步接口怎么返回数据给其他函数？

* [微信小程序 wx.request(接口调用方式)详解及实例](http://wxkf.me/archives/2017/1216/181.html)，有require写法。但不能解决当前问题。

* 好像js里返回api数组不是很容易实现。。

* 用缓存

  * ```
    <view bindtap='yy'>测试测试</view>
    ```

  * ```
      tt:function(e){
        var that = this; //保存this的数据
        wx.request({
          url: 'https://luccake.top/api/v1/products',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              goods: res.data.data,
            }) 
            wx.setStorageSync('e',res.data.data)
          }
        })
      },
      test:function(){
        this.tt();
        var goods = wx.getStorageSync('e');
        console.log('测试',goods);
        var qq = goods.title;
        console.log('qq',qq)
      },
      ```
    ```

    ```

* 把缓存数据，用for循环和setData输出，return返回

  * ```
    <view bindtap='test'>测试测试</view>
    ```

  * ```
      test:function(e){
        var that = this; 
        wx.request({
          url: 'https://luccake.top/api/v1/products',
          header: {
            'content-type': 'application/json' 
          },
          success: function (res) {
            that.setData({
              goods: res.data.data,
            }) 
            wx.setStorageSync('e',res.data.data)  //最最关键的一步，保存到缓存
          }
        })
        var goods = wx.getStorageSync('e');       //从缓存拿数组
        var titles = [];
        for (var i = 0; i < goods.length; i++) {  //循环api数组拿到titles数组
          var title = goods[i].title;
          titles.push(title);
        }
        this.setData({ titles: titles })     //保存titles数组
        console.log("测试",goods)
        return titles						 //返回titles		
      },
      ```
    ```

    ```

6、[微信小程序中使用Promise进行异步流程处理](https://www.jianshu.com/p/e92c7495da76)

# 【四】魔改

## 1、搜索页

### 1.1 正在做

1）把检索关键词的功能先拿开，bindblur="searchGoods"

```
  loadGoods: function () {
    var goods = ['奶粉成人', '奶粉3段', '奶粉1段', '奶粉2段', '奶粉京东自营', '奶粉4段', '奶粉盒', '咖啡机', '咖啡杯', '咖啡豆', '咖啡伴侣', '咖啡机家用'];
    return goods;
  },
  searchGoods: function (e) {
    var name = e.detail.value;
    var goods = this.loadGoods();
    var result = new Array();
    if (name != '') {
      for (var i = 0; i < goods.length; i++) {
        var good = goods[i];
        if (good.indexOf(name) > -1) {
          result.push(good);
        }
      }
    }
    this.setData({ result: result });
  },
```

2）拿掉以前做的wxml搜索框和css。

3）搜索结果想要有返回按钮，所以创建新的pages/p_result。把wxml和css转移过去，并navigateTo跳转。

4）p_search传递cakes数组给p_result？用`JSON.stringfy(arr)`和`JSON.parse(arr)`。

5）p_search输入框复制到p_result，并引用js和wxss。

【问题】引用js失败，暂时复制search的js。

6）p_search传数据给p_result，把原来传递数组cakes，改成传递输入名称inputValue。搜索功能直接放在p_result页面做。

7）p_result增加所有、价格、时间排序按钮及功能。

8）想把p_result整合到p_search。包含五个模块：

①、输入框name；②、历史name；③、热词tips④、下拉匹配结果result；⑤、显示商品；

```
①一直显示
if 输入为空name=''
    显示②③
else 输入不为空!name=''（当①输入name、或②③④改变name）
    显示④
    按回车后，显示⑤
end
```

！！！不用那么复杂

> 1、②③④⑤都是靠wx:for循环显示出来的，如wx:for="{{cakes}}"只要在js页把cakes数组清空，wxml就不会显示。
>
> 2、用`<block wx:if="{{cakes.length>0}}">`来判断是否显示，其他几个同理。

```
<block wx:if="{{result.length > 0}}">
  <block wx:for="{{result}}">
    <view class="item">
      <view class="name" bindtap="clickTitle" data-title="{{item}}">{{item}}</view>
      <view class="hr"></view>
    </view>
  </block>
</block>
<block wx:else>
  <block wx:if="{{cakes != ''}}">
    <view class='tab'>
      <view class="{{currentTab==0?'select':'default'}}" data-id="0" bindtap='switchAll'>所有</view>
      <view class="{{currentTab==1?'select':'default'}}" data-id="1" bindtap='switchPrice'>价格</view>
      <view class="{{currentTab==2?'select':'default'}}" data-id="2" bindtap='switchTime'>时间</view>
      <view class="{{currentTab==3?'select':'default'}}" data-id="3" bindtap='switchTest'>筛选</view>
    </view>
    <view class="hr"></view>
    <scroll-view class='p_search-body' scroll-y>
      <navigator url='../p_goods/p_goods' wx:for="{{cakes}}" wx:key="">
        <view class='p_search-box'>
          <image src="{{item.photos[0].avatar.url}}"></image>
          <view class='p_search-post'>
            <text class='title2'>{{item.title}}</text>
            <text class='description'>{{item.description}}</text>
            <text class='price'>¥ {{item.price}}</text>
          </view>
        </view>
      </navigator>
    </scroll-view>
  </block>
  <block wx:else>
    <view class="hotSearch">
      <view class="title">
        <view class="left">热门搜索</view>
        <view class="right">换一批</view>
      </view>
      <view class="tips">
        <view wx:for="{{word}}" bindtap='clickTip' data-id="{{item.id}}" data-title="{{item.title}}">
          <view wx:if='{{index<10}}' class="tip" >
            {{item.title}}
          </view>
        </view>
      </view>
    </view>
  </block>
</block>
```

9）p_search排序

10）p_search历史输入name，**数组顺序颠倒用arr.reverse()**

11）p_search换一批。

**js随机输出数组的方法：**

```
  aaa:function(e){
    //原数组
    var arr = [0,1,2,3,4,5,6,7,8,9,10,11];
    //输出数组
    var out = [];
    //输出个数
    var num = 5;
    while(out.length < num){
        var temp = (Math.random()*arr.length) >> 0;
        out.push(temp);
    }
    console.log('ccc',out)
  },
```

12）p_search按钮-清除输入历史

13）p_search按钮-✘，清除输入框并退回到初始页面

14）p_search边输入文字边匹配词库的bindinput效果。

[js如何监听回车键搜索事件？——官方文档bindinput键盘输入时触发事件。以及bindconfirm按下回车键/点击完成按钮触发事件。](https://mp.weixin.qq.com/debug/wxadoc/dev/component/input.html)

```
  <block wx:if="{{name == ''}}">
    <view class="btn1" bindtap="resetSearch">取消</view>
  </block>
  <block wx:else>
    <view class="btn1 btn2" bindtap="searchTitle" data-name="{{name}}">搜索</view>
  </block>
```

```
.btn2{
  background-color: red;
  border-color: red;
  color: #fff;
}
```

> 逻辑设计，不要在脑子里空想，越想越乱。
>
> 如下，整理出来，再去atom写。

```
问题1：不管有没有匹配，都只执行匹配，不执行搜索？
问题2：执行搜索后，只显示匹配结果，不显示搜索结果？

一、动态输入逻辑，所有条件都不执行搜索。
if name为空
	返回
else name不为空
	计算result数组
	if result为空
		返回
	else result不为空
		显示匹配的关键词，即this.setData({result:result})
	end
end
二、搜索逻辑
if name为空
	返回
else name不为空
	保存历史搜索记录
	搜索、并清空热门搜索匹配resutl=''
	显示推荐商品（不管是否有搜索结果）
end
```

15）【错误混乱的例子】按钮✘在input有输入时不出现的bug。

用has_input=''或等于1，来控制按钮是否隐藏。在不同的函数里做相应的setData。

为input输入框绑定bindfocus事件，当光标聚焦时，如果name不为空则显示按钮。

```
if has_input=''
	隐藏按钮
else has_input != ''
	显示按钮
end
```

16）【错误混乱的例子】p_search按钮-取消/搜索，同位置两按钮。

跟步骤15的has_input一样，直接在wxml加上has_input的判断。

17）【错误混乱的例子】按钮-搜索，点击可以搜索。**想通过input框的bindconfirm功能得到搜索结果，但是点击按钮发现没有数据传递怎么办？**

在dropdown的函数即bindinput对应的函数里先定义wx.setstorageSync，拿到输入的数据e，然后在input的bindtap事件上引入数据，调用input框的函数。

18）【错误混乱的例子】按钮-取消，点击可以返回搜索的产品页面。

```
拿到步骤17中定义的输入值缓存e
在wxml页
if name=''
	显示按钮
else

当按下按钮时，
拿到步骤17设置的输入缓存e
if name=''
	this.setData({result:'', cakes:''})
end

```

19）【15-18逻辑重新整理】【问题】三个按钮搞不清楚逻辑，分不清楚哪些逻辑在wxml判断，哪些在js判断。。。。

**案例用的主要变量：name输入内容、result匹配输入内容、cakes商品、searchData历史搜索、out热门搜索**。

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fn7d5z5bw7j31400u00v2.jpg" width="550">



* 1、在输入框bindinput的函数里，按问题1数据传递4的方法（wxml调用js），设置

  * ```
    Page({
      data:{
      	dynamic_name: '', //『重要步骤』data的初始值，可用来给wxml提供初始状态。
      },
      dynamicInput:function(e){
     	var name = e.detail.value;
        var dynamic_name = name;
        this.setData({dynamic_name:dynamic_name})
      }
    })
    ```

* 2、在wxml用dynamic_name是否为空，判断三个按钮的显示

* 3、搜索按钮、✘按钮，设置成鼠标点击时显示。输入框加入bindfocus="showIcon"

  * ```
      showIcon:function(e){
        this.setData({dynamic_name:1})
      },
      ```
    ```

    ```

* 4、三个按钮js事件，分别设置this.setaData，修改name、result、cakes、searchData、out，这些wxml调用的数据，看是否设置为空。


20）p_search显示商品，切换样式的按钮？（用true_or_false判断，点击按钮，变量值!反转）

显示/隐藏的切换，定义一个变量x，值是true或false来判断。在js里写法`this.setData({x: !x})`

## 21）循环商品，一行显示两个的css？——我以为我会写了，结果。。而且有两个参考模板在手，就是写不出来（注意检查是否受最外层css如小程序的page或web端的body影响）

见《循环一行显示两个商品》

22）p_search价格两种排序（用true_or_false判断，点击按钮，变量值!反转）

wxml

```
<view class="{{currentTab==1?'select':'default'}}" data-id="1" bindtap='switchPrice'>价格</view>
```

js

```
  switchPrice:function(e){ 
    var price = this.data.price //重要的一步
    this.setData({price: !price})
    if(price==true){
      var aa = 'price+asc&q%5Btitle_or_description_cont%5D='
    }else{
      var aa = 'price+desc&q%5Btitle_or_description_cont%5D='
    }
```

23）p_search价格排序对应图标？

```
<view class="{{currentTab==1?'select':'default'}} price common1" bindtap='switchPrice'>
  价格
  <view class='img-pri'>
    <view class="{{currentTab==1&price==1?'up':'ping'}} img1">▲</view>
    <view class="{{currentTab==1&price==0?'down':'ping'}} img2">▼</view>
  </view>
</view>

```

说明：class要同时满足currentTab==1&price==1，才会显示up的样式。其中currentTab是触发“价格”两个字的颜色用的js变量，price是在步骤22用来判断价格是升序还是降序的变量。



25）搜索时显示随机商品推荐。要后端做api？还是在js随机？还是在wxml随机？

26）8号welcome首页重做。

27）下拉刷新

app.json全局设置如下。dark的配置是为了下拉时显示三个点。

```
  "window":{
    "backgroundTextStyle":"dark",
    "enablePullDownRefresh": true
  },
```

index.js

```
onPullDownRefresh: function () {  
  wx.showNavigationBarLoading();// 显示导航栏loading 
  this.onLoad();// 调用接口加载数据  
  wx.hideNavigationBarLoading();// 隐藏导航栏loading 
  wx.stopPullDownRefresh();// 当处理完数据刷新后，停止当前页面的下拉刷新 
},  
```

28）上拉加载更多http://blog.csdn.net/michael_ouyang/article/details/56846185

http://www.mntuku.cn/index.php/article/show/id-7581

第五点：下拉的逻辑，将页数设置为一，并清空msgList 内容，定位距顶部0px，最后调用加载数据的方法。 
第六点：上滑的逻辑，直接调用。因为定位点在scorll方法中已经赋值。

29）修改标题在json文件增加`"navigationBarTitleText": "商品详情",`


【问题】js模块化，that.setData或this.setData会报错，而且测试发现this是模块化页面的this。

30）9号完成详情页css。

item.avatar.medium.url

按钮置底导航置底http://www.wxapp-union.com/article-1029-1.html

① 、添加按钮

```
<button bindtap="add" type="primary" class="address-add">添加</button>
/*添加地址按钮*/
.product-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
}
```

②、给按钮上边的版块加marginbottom

```
.product-detail {
    margin-bottom: 46px;
}
```

31）随机商品api

>  暂时解决办法：先用products的api，在小程序的js里随机。
>
>  坏处是：对小程序影响不大，只是bug不解决在web端就没法用随机商品功能。

### 32）后端问题二：搜索，怎么在product里搜索category。

> 暂时解决办法：现在先用筛选分类的网址。
>
> 坏处是：点击首页分类图标可以进入搜索页，但是因为url不同不能排序。

32）搜索没有结果显示提示图标。7小时

逻辑：所有的显示/隐藏基本都是同理，在wxml设置条件某位为0或1，然后在js定义。

> 这里有点绕，多梳理几次。

```
当没有搜索结果时，即cakes==[]
  给一个参数cakes_data，值是0或1。在wxml当值为1时显示图标。
  在js的searchTitle的函数里，获取cakes的同时设置cakes_data为1（意思是有搜索就会显示icon，同时受限于上边给的条件cakes==[]，所以只会在搜索且搜索结果为[]时显示）。
```



32）▲▲▲-★搜索推荐商品、详情页最后推荐商品

一开始以为如果搜索为空，用js循环为空，所以最好接api。

更好的办法，用products的api在js随机。

①、js定义random_8函数（同loadTips函数）

②、在搜索函数searchTitle加入

③、wxml显示

33）▲▲▲-★★首页、详情页各种按钮接入跳转链接

直接用navigator标签搞定



34）▲▲-★★资讯页面

35）▲-★★名片页的设计，参考潘鹏作品浮起的css、二维码、电话、地址

35）▲-★★★加入购物车的逻辑http://blog.csdn.net/michael_ouyang/article/details/70755892

36）▲-★★★上拉加载更多，一种是在api做好分页（分页能做但是小程序不知道怎么做），一种是按论坛教程做

37）▲-★★★收藏功能

其他1）整理手机图片等

其他2）整理小程序功能

其他3）整理浏览器收藏



### 1.2 待优化

1）p_search页。搜索框用的search的js，和tips热门词最后用的search几乎相同，怎么写可以合并成一个。

2）p_result页。也是复制search function，去掉其中的navigateTo。

3）历史输入searchData的缓存，在四个function写入同样的代码。clickTip()、clickTitle()、searchTitle()、clickSearchData()。





## 整理教程跟着它分类http://blog.csdn.net/michael_ouyang/article/details/55215104



# 小程序发布与体验

## 1、体验版生成

1）在开发者工具点击上传-填写版本如v1.0，备注随意；

2）https://mp.weixin.qq.com/登录小程序后台，点击开发管理-开发版本-提交体验版。会生成一个二维码。

## 2、体验版给其他人使用

1）小程序后台-用户身份-成员管理-添加成员。

添加后就可以在其他手机上体验未审核未上线的小程序啦。如果没有设置，会提示**『没有体验权限』**。

