---
title: tool-atom-(视频)atom编辑器技巧
date: '2018-01-03 00:10'
categories:
  - 工具
tags:
  - 工具
  - atom
img: 'https://ws4.sinaimg.cn/large/006tKfTcgy1fnfd8csp18j308506wdfq.jpg'
abbrlink: 3c2bef84
---

* 201801
* 编程+mac



## atom设置快捷键

lt、ltp、ltd表示，<%= link_to("XXXX", XXXX_path, class:"btn btn-danger btn-lg pull-right", method: :post) %>

tb表示，table.table.table-bordered>(thead>tr>th*3)+(tbody>tr>td*3)

sf表示，<%= simple_form_for @xx do |f| %><% end %>



atom在默认配置下， HTML, XML, HAML, CSS, SASS/SCSS, LESS, JavaScript, Python, Ruby 文件可以直接使用`Tab`键，而在其他类型文件中使用`ctrl+e`作为快捷键。

### 新标签打开未编辑的页面：双击

# 一、atom的emmet输入怎么才能支持wxml文件？并设置快捷键。

## 1、支持html以外的文件如wxml，设置如下：

1）`ctrl+,`打开atom设置-packages-找到ement-settings-view code打开emmet的代码。

2）打开`keymaps/emmet.cson`，第二行的`'ctrl-e': 'emmet:expand-abbreviation'`默认快捷键是`ctrl+e`，可以改成`'tab': 'emmet:expand-abbreviation'等。

3）测试发现虽然tab方便，但是被占用后无法使用原来的功能。最后还是选用ctrl+e。

## 2、更简单粗暴的方法

1）打开wxml等文件后，在atom的右下角改成用HTML模式编辑，就能正常使用emmet功能。

无需按上面的方法修改快捷键了。

![](https://ws1.sinaimg.cn/large/006tKfTcgy1fmyjg7acqyj30s70dmmy2.jpg)

# 二、快捷键：

1）打开`node_modules/emmet/lib/snippets.json`，搜索`html`（大约第660行，第一次搜会搜不到，要打开其他文件再回来搜索一次），在`snippets`里加入自定义快捷键如下。

2）`ctrl+q`退出atom，重新打开测试是否生效。

> 注意：定义里不能用双引号，否则全部快捷输入会失效。

```
"snippets": {
  "%":  "<% | %>",
  "%%":  "<%= | %>",
  "lt":  "<%= link_to('XXXX', XXXX_path, class:'btn btn-danger btn-lg') %>",
  "ltp":  "<%= link_to('XXXX', XXXX_path, class:'btn btn-danger btn-lg', method: :post) %>",
  "ltd":  "<%= link_to('XXXX', XXXX_path, class:'btn btn-danger btn-lg', method: :delete, data:{confirm:'确认删除？'}) %>",
  "ii":  "<image src=''></image>",
  "bb":  "<button bindtap='' type=''></button>",
  "tt":  "<text class=''></text>",
  "vv":  "<view class=''></view>",
  
  
    def show
    @shop_region = ShopRegion.find(params[:id])
     @batches = @shop_region.batches
              if params[:select_day].present?
      @batch = @batches.where( "created_at BETWEEN ? AND ?", Date.parse(params[:select_day]).beginning_of_day+7.hours, Date.parse(params[:select_day]).end_of_day+7.hours).last
  else
       @batch = @batches.last
    end
```



# 三、快速格式化代码插件 atom-beautify

1）复制别人代码的时候，快速格式化。

可以针对不同的编程语言，配置是否格式化，配置标点符号的处理、缩进等。

默认我们不去修改。

## 【问题】

1）html文件快速格式化，每行会空两个Tab，怎么改成空一格Tab（即两个空格）？



# 四、代码规范化检测插件 Linter

1）先安装linter的框架。然后可以选择自己需要检测的文件类型，安装相应插件。

2）linter-eslint，是针对javascript的。

比如，针对js文件的逗号，设置是否提示报错，在写代码的过程中，如果哪行代码少了逗号，就会在行首用一个红点提示。

3）linter-其他

## 【问题】

1）实测发现，下载的各种linter都不起作用？是不是都要手动配置？



# 五、JavaScript 语法智能提示 atom-ternjs

1）比如写`$(this).`的时候，会出现一些函数提示供选择。

2）打开任意js文件，点击工具栏的Packages-Atom-Ternjs-Configure project，需要注意的是 atom-ternjs是根据每一个项目来配置的。

因为每一个项目，想让它提示的东西可能是不一样的。

3）具体的配置选项：

ecmaVersion默认6；

libs一般选browser、jquery两个库；

其他配置如node、module、angular、commonjs

4）保存，点击最下边的save。

会在分支树里新建一个文件.term-project。

5）测试。

再回到js页面去写，就会出现详细的提示。非常方便。



# 六、快速书写代码的工具 emmet

1）默认我不会做任何更改。



# 七、文件图标 file-icons 与行高亮 highlight-line

1）file-icons，不同的文件类型，文件名前面加上不同类的图标。

可以设置`only color when changed`，当文件更改才显示图标颜色。

2）highlight-line，鼠标点击哪一行，就会高亮哪一行。

可以配置高亮的背景颜色。



# 八、代码中的颜色插件 pigments

1）颜色的代码如#000、#fff，会显示出颜色。



# 九、对最新版本 JavaScript 的支持 language-babel

1）主要是对`es5`、`es6`做一些语法的识别，做一些`react.js`课程的时候用到。它会对最新的js语法做高亮。

装完不用怎么过多配置。



# 十、更多插件与总结

1）atom的编辑器插件，转到其他编辑器比如shell也是通用的。

2）可以看atom网站的下载排行。基本上我们把前面的都做了介绍。



# 十一、atom-wxml

1）微信小程序要用到，可以让wxss文件、wxml文件代码高亮显示。