---
title: ror-system-Ajax交互式网页应用
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 765fb13d
---

* 201712
* 编程+前端



## 1.1、Jquery

```
jquery 就对javascript的一个扩展，封装，就是让javascript更好用，更简单。人家怎么说的来着，jquery就是要用更少的代码，漂亮的完成更多的功能。
```

[jQuery](https://jquery.com)是一套最多人使用的 JavaScript 函式库，可以撰写各种网页效果，有丰富的社区和各种 Plugins 外挂。

它的主要作用是操纵网页的 DOM(Document Object Model)：浏览器会解析 HTML 然后显示在画面上，这个解析出来的结构就叫做 DOM

```
<p>
  <a id="my-click">Click Me</a>
</p>

<div id="foo" style="border: 1px solid red;">
  <p>bar</p>
</div>

<script>
  $("#my-click").click(function(){
    $("#foo").html('<h1>zoo</h1>');
  })
</script>
```

解说：

- `<script>...</script>` 包起来的部分就是写 JavaScript 的地方
- 这个钱号 $ 等同于 jQuery
- `$("#my-click")` 是 jQuery 的选择器用法，会挑出 id 是 `my-click` 的元素，在这里就是指 Click Me 的超连结。在 HTML 上 id 是唯一的，不能有重复的 id。
- `.click( function(){...} )` 会绑订一个点击(click)事件在该元素上面，当用户点击这个元素时，就会执行里面的 function
- `$("#foo").html('<h1>zoo</h1>')` 会把 #foo 这个元素的内容置换成 `<h1>zoo</h1>`

请试试看把 `html` 换成以下用法，观察看看有什么差别：

- `text` 文字替换
- `prepend` 把内容插在指定元素里面的最前面
- `append` 把内容插在指定元素里面的最后面
- `before` 把内容插在指定元素的前面
- `after` 把内容插在指定元素的后面



## 1.2、

`$(document).ready` 是一个浏览器的事件，会在加载 HTML 完成之后，才执行里面的 function



## 1.3、

最常见的 jQuery 使用套路了，包括：

- 用选择器 Selector 选取出目标元素，例如 `$("#某个ID")`和 `$(".某个class")`。
- 绑定一个事件(Event)上去，例如 `click` 和 `hover` 事件
- 当事件被触发的时候，执行某个 DOM 操作来改变 HTML，可能是改变元素的属性、插入新内容、新增或移除 class 属性等等。目前学到的用法有：
  - `html`
  - `append`
  - `prepend`
  - `before`
  - `after`
  - `remove`
  - `replaceWith`
  - `toggle`
  - `addClass` 和 `removeClass`



## 2.1、Ajax（99：相当于把原来controller里的重定向用jquery重新写到views的xx.js.erb里）

* Ajax 是一种增强 UI 的方式，我们会先把基本功能完成，再根据需要改成 Ajax 效果。


* 接下来要介绍的 Ajax(Asynchronous JavaScript and XML) 异步的JavaScript与XML技术，则可以不需要整页替换，只更新部分网页，这可以大大的改进 UI 反应速度。目前已经不流行用 XML 了，因此常见的回传会用 JSON 和 Script 格式：
* 用 JSON 格式，必须写自定义的 JavaScript 去处理 Ajax 的发送和接收处理。JavaScript 强者或团队中有前端工程师会偏好这种方式。



2.2、

```
-  <%= link_to "Delete", post_path(post), :method => :delete, :class => "btn btn-danger" %>
+  <%= link_to "Delete", post_path(post), :method => :delete, :remote => true, :class => "btn btn-danger" %>
```

透过 `:remote => true` 就会变成 Ajax 送出了，不需要自己写 `$("xxx").click` 去绑事件。

```
app/controllers/posts_controller.rb
  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy

-   render :js => "alert('ok');"
  end

```

```
app/views/posts/index.html.erb
-  <div class="panel panel-default">
+  <div id="post-<%= post.id %>" class="panel panel-default">
```

```
app/views/posts/destroy.js.erb 
$("#post-<%= @post.id %>").remove();
```

解说：

- 针对要被移除的 `<div>` 区块，我们补上了一个 id，例如 `<div id="post-123">`，这样等会 jQuery 要移除的时候，就可以直接抓到要移除哪一个元素了
- 一个 action 如果没有写明 `redirect` 或 `render` 的话，就会默认去找 action 名称的样板。于是这里就会去找 `destroy.js.erb`
- `destroy.js.erb` 里面要写回传的 JavaScript 代码，这个档案也是 erb 样板，所以可以用 `<%= XXX %>` 内嵌 Ruby 语法

再次测试看看删除，你会发现删除的操作变成超级神速。



2.3、

`form_for` 也可以用这招。接下来做做看新增贴文：

```
$("#post-list").prepend("<%=j render :partial => "post", :locals => { :post => @post } %>");
```

其中 `j` 等同于 `escape_javascript`，这会做逸出好让 partial 字串可以变成合法的 JavaScript 字串：



## 3.1、ajax进阶用法

* 不用:remote => true，而是手写 jQuery 去绑事件送 Ajax，取得 JSON 回传并更新 DOM



3.1、Turbolinks的坑

加速换页，不重新载入 HTML 的 `head`，只载入新的 `body`的工具。

