# Rails 5 asset pipeline add vendor/assets/images to precompine

20180810【bug】【error】【报错】【rails 5】【asset】【asset pipeline】

[TOC]

## 前提





## bug1：不能加载静态文件 vendor/assets/images

```
ActionView::Template::Error (Asset was not declared to be precompiled in production.

Add Rails.application.config.assets.precompile += %w( logo-dark.png ) to config/initializers/assets.rb and restart your server):


ActionView::Template::Error (The asset "logo-white.png" is not present in the asset pipeline.): 
```

### 解决办法：

修改 app/config/initializers/assets.rb

```
Rails.application.config.assets.precompile << Proc.new { |path, fn| fn =~ /vendor\/assets\/images/ }
```

重新编译静态文件

```
rails assets:precompile
RAILS_SERVE_STATIC_FILES=true rails s -e production
```

html.erb 文件用 image_tag 标签

```
<%= image_tag('logo-white.png', size: '145x32', alt: 'QuillPro') %>
```





## 参考资源

* [HOW TO: Rails 4.2 add 'vendor/asset' to precompile list](https://gist.github.com/mrbongiolo/63cce06b1b49c99fdb9a)


