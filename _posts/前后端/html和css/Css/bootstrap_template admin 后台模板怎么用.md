* 201804/201903

## 下载模板
搜索：free bootstrap multi page website templates    
壹成购买模板链接:https://pan.baidu.com/s/1ZLgT2ecrfW3aiUX2eR6UTg  密码:ogaz   
网络免费模板链接:https://pan.baidu.com/s/1yfwBfBlPLV98zAAc6TYoBg  密码:kfpc   

### 步骤 1 复制代码
整个Filis/assets文件夹复制到 vendor/assets。

### 步骤 2 设置assets
引入 assets precompile：<https://ruby-china.github.io/rails-guides/asset_pipeline.html>    
assets precompile 加载不到图片的解决办法：<https://gist.github.com/mrbongiolo/63cce06b1b49c99fdb9a> 

rails默认可以识别vendor/aseets的stylesheets、javascripts、images文件夹，所以要把相应的文件夹重命名为stylesheets、javascripts、images。另外，其他不能默认识别的文件夹要在config/application.rb里声明，代码如下：   
```
# 引入第三方静态文件
config.assets.paths << Rails.root.join('vendor', 'assets', 'demo')
config.assets.paths << Rails.root.join('vendor', 'assets', 'fonts')
config.assets.paths << Rails.root.join('vendor', 'assets', 'plugins')
config.assets.precompile << Proc.new { |path, fn| fn =~ /vendor\/assets\/images/ }
```

### 步骤 3 全局html
按照模板里的index.html代码，把手机自适应、字体、全局css、全局js样式代码粘贴到application.html.erb中   
1）app/views/layouts/application.html.erb
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="assets/img/favicon.png">
    <title>Bootstrap 4 Dashboard Template</title>
	  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&amp;subset=latin-ext" rel="stylesheet">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track': 'reload' %>
  </head>

  <body>
    <div class="container-fluid">
      <div class="row">
        <%= render "common/sidebar" %>
        <%= yield %>
      </div>
    </div>
    <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
  </body>
</html>

```
* 其中common/sidebar用来放左侧栏的代码，yield是div class="right-column"的代码

### 步骤 4 引用css
按照index.html代码head标签内的css，改写成@import    
app/assets/stylesheets/application.css
```
*= require_self
*= require static_pages
```   
app/assets/stylesheets/static_pages.scss
```
// import lib from wrapbootstrap
@import "batch-icons/batch-icons";
@import "bootstrap/bootstrap.min"; //111
@import "bootstrap/mdb.min";
@import "custom-scrollbar/jquery.mCustomScrollbar.min.css";
@import "hamburgers/hamburgers.css";
@import "font-awesome/css/font-awesome.min.css";
@import "jvmaps/jqvmap.min.css";
@import "quillpro/quillpro.css";
```

### 步骤 5 引用js
按照index.html代码body标签结束前的js，改写成 //= require   
app/assets/javascripts/application.js
```
// ** import lib from wrapbootstrap ** //
//= require jquery/jquery-3.1.1.min.js
//= require bootstrap/popper.min.js
//= require bootstrap/bootstrap.min.js
//= require bootstrap/mdb.min.js
//= require velocity/velocity.min.js
//= require velocity/velocity.ui.min.js
//= require custom-scrollbar/jquery.mCustomScrollbar.concat.min.js
//= require jquery_visible/jquery.visible.min.js
//= require misc/ie10-viewport-bug-workaround.js
//= require chartjs/chart.bundle.min.js
//= require jvmaps/jquery.vmap.min.js
//= require jvmaps/maps/jquery.vmap.usa.js
//= require misc/holder.min.js
//= require scripts.js
```

### 步骤 6
模板index.html，左侧代码放入 `common/sidebar`，右侧代码 `div class="right-column"` 不同页面放在不同的html文件中

### 步骤 7
重启rails s，此时网站大体出来了，剩下图片还是挂掉的。

### 步骤 8
替换掉照片路径的 /img，`images_tag` 用法：<https://apidock.com/rails/ActionView/Helpers/AssetTagHelper/image_tag>
```
<!--<img src="assets/logo-white.png" width="145" height="32.3" alt="QuillPro">-->
image_tag("icon.png", size: "16x10", alt: "Edit Entry")
<!--生成 <img src="/assets/icon.png" width="16" height="10" alt="Edit Entry" />-->
```