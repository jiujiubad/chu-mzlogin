---
layout: post
title: 'bootstrap【错误】下拉菜单/分页按钮冲突失效'
date: 2017-05-26 07:51
comments: true
categories: 
---
* 201705
* 编程+前端

# 是head里少了配置文件，或是js文件里少了bootstrap-sprockets

```.html app/views/layouts/application.html.erb
    <head>
      <title>TASTE LAVORATORY</title>
      <%= csrf_meta_tags %>
      <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
      <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
    </head>
```

20180602新建版本

读bootstrap-sass官方文档，安装gem jquery-rails，并添加//= require jquery和//= require bootstrap-sprockets，特别注意//= require jquery的位置会关系到下拉菜单dropdown能不能生效、以及flash能不能关闭。

```
//= require rails-ujs
//= require jquery
//= require bootstrap-sprockets
//= require bootstrap/dropdown
//= require activestorage
//= require turbolinks
//= require bootstrap/alert
//= require_tree .
```

1、其中，最重要的是//= require bootstrap-sprockets，在bootstrap官网有说，这个关系到alert.js or dropdown.js，所以下拉是受它影响的。

2、其次，插件是从上到下加载，插件的位置也会影响下拉成不成功。