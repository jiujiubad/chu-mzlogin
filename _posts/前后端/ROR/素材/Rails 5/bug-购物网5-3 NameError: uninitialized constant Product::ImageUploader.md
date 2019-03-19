---
title: bug-购物网5-3 NameError/ uninitialized constant Product//ImageUploader
date: '2017-11-30 04:30'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 3abd616e
---

* 201711
* 编程+rails



## NameError: uninitialized constant Product::ImageUploader

### 错误：执行rails c，输入Product.last报错

```
 apple@apple ⮀ ~/rails/jdstore1130 ⮀ ⭠ test± ⮀ rails c
Running via Spring preloader in process 6299
Loading development environment (Rails 5.0.6)
2.3.1 :001 > Product.last
NameError: uninitialized constant Product::ImageUploader
	from /Users/apple/rails/jdstore1130/app/models/product.rb:4:in `<class:Product>'
	from /Users/apple/rails/jdstore1130/app/models/product.rb:1:in `<top (required)>'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies/interlock.rb:12:in `block in loading'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/concurrency/share_lock.rb:150:in `exclusive'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/activesupport-5.0.6/lib/active_support/dependencies/interlock.rb:11:in `loading'
	from (irb):1
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console.rb:65:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/console_helper.rb:9:in `start'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:78:in `console'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands/commands_tasks.rb:49:in `run_command!'
	from /Users/apple/.rvm/gems/ruby-2.3.1/gems/railties-5.0.6/lib/rails/commands.rb:18:in `<top (required)>'
	from /Users/apple/rails/jdstore1130/bin/rails:9:in `<top (required)>'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Users/apple/.rvm/rubies/ruby-2.3.1/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from -e:1:in `<main>'
```



### 解决办法：

因为CarrierWave在ORM (ActiveRecord)之前加载了，解决的方案是在environment.rb中加入
`require 'carrierwave/orm/activerecord'`
重启下server后错误消失。