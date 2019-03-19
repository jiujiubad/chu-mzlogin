# 一、ruby on rails

## 1、rails api

### 1】enum error报错

帖子：https://apidock.com/rails/ActiveRecord/Enum

ActiveRecord enum: use validation if exists instead of raising ArgumentError，https://github.com/rails/rails/issues/13971

### 2】underscore

帖子：https://apidock.com/rails/String/underscore

> 详见功能需求3】

### 3】flatten

> 场景1：嵌套数组，或嵌套哈希平躺，即ruby flatten array。

### 4】form_with

rails 5.1发布记，`form_for` 和 `form_tag` 统一为 `form_with`。

https://ruby-china.github.io/rails-guides/5_1_release_notes.html

## 2、ruby api

## 3、rails调试工具

1）自定义代码片段

```
 puts "="*50+"征途开始"+"="*50
 puts "【"*20+"征途结束"+"】"*20
```

2）rescue

```
rescue StandardError => e 
  puts e.message
  binding.pry
rescue Exception => e
  puts "ctrl+c 或 意外中断"
end

def A
  tries = 10
  begin
  rescue StandardError => e 
    puts "="*50+"#{e.message}"+"="*50
    tries -= 1
    sleep 2
    retry if tries > 0
  rescue Exception => e
  	puts "="*50+"ctrl+c 或 意外中断"+"="*50
  end
end
```

3）rails server日志

```
logger.info "success!"
```

## 4、功能需求demo

### 1】嵌套表单，一个表单有多个model选项

1）猎豹项目-邮件任务task/form的new.html.erb

2）rails_api_select

### 2】队列任务——sidekiq

1）设置sidekiq线程，运行用sidekiq xxxsidekiq.yml

### 3】xml to hash（嵌套哈希）

> 场景：请求xml，转为hash，把驼峰式命名转为蛇形命名，然后入库。
>
> 关键词：xml to hash、嵌套哈希、nested hash flatten

1）underscore方法，<https://apidock.com/rails/String/underscore> 

* 处理xml的方法，转为hash
* Order.create(hash)

```
Job.find(task_id)
xx.yy_job
$redis lpull

```

```
      res4 = client3.get_report(report_id)
      data_arr = res4.data[:body].split(/\r\n/).map { |i| i.split(/\t/) }
      i = 1
      while i < data_arr.count
        h1 = Hash[*data_arr[0].zip(data_arr[i]).flatten]
        puts h1
        i += 1
        if h1["fnsku"] == @inventory.fnsku
          @inventory.update_columns(
            product_name: h1["product-name"],
            reserved_qty: h1["reserved_qty"],
            reserved_customerorders: h1["reserved_customerorders"],
            reserved_fc_transfers: h1["reserved_fc-transfers"],
            reserved_fc_processing: h1["reserved_fc-processing"],
          )
        end
      end

```

3）nested hash，嵌套哈希的处理

https://raycodingdotnet.wordpress.com/2013/08/26/nested-hash-to-dotted-notation-hash-in-ruby/

4）gem nori

```
xml = '<member><NameSp>Aaron</NameSp><InboundQuantity>3</InboundQuantity></member>'

```

### 4】activity的实时更新显示

### 5】notification的提醒功能

### 6】actioncable和验证码

### 7】xposed:

Xposed框架是一款可以在不修改APK的情况下影响程序运行(修改系统)的框架服务，基于它可以制作出许多功能强大的模块，且在功能不冲突的情况下同时运作。

<http://xposed.appkg.com/>

### 8】DNK:

<https://developer.android.com/ndk/guides/cpu-features?hl=zh-cn> 

### 9】WebSocket 和 ActionCable 相关的序列文章:

小demo，https://www.rails365.net/articles/websocket-zhi-actioncable-ru-men-qi

英文版，https://www.sitepoint.com/rails-and-actioncable-adding-advanced-features/

前因后果，https://ruby-china.org/topics/29927

### 10】手机模拟器 Genymotion

1）Working with Appium Desktop for Windows 10 OS:

<https://www.youtube.com/watch?v=1ot8cZoUk6o>

2）Windows 10 Bash & Linux Subsystem Setup:

<https://www.youtube.com/watch?v=Cvrqmq9A3tA>

### 11】服务器管理k8s+docker+capistrano

docker hub被挖矿，https://mp.weixin.qq.com/s/plPGFIKxZOdePKD7l1gbug

### 12】五分钟搭建电商rails+spree

### 13】安卓和ios开发flutter

谷歌Flutter跨平台应用开发SDK迎来首个发行预览版本，http://www.cocoachina.com/programmer/20180622/23908.html



## 5、rails知识点

### 1】回调：after_initialize 和 after_find

1）当 Active Record 对象被实例化时，不管是通过直接使用 new 方法还是从数据库加载记录，都会调用 after_initialize 回调。使用这个回调可以避免直接覆盖 Active Record 的 initialize 方法。

2）当 Active Record 从数据库中加载记录时，会调用 after_find 回调。如果同时定义了 after_initialize 和 after_find 回调，会先调用 after_find 回调。

3）after_initialize 和 after_find 回调没有对应的 before_* 回调，这两个回调的注册方式和其他 Active Record 回调一样。

### 2】回调：after_create :foo vs after_commit :bar, :on => :create

https://stackoverflow.com/questions/15746362/after-create-foo-vs-after-commit-bar-on-create

### 3】回调：原来 after_commit 和 after_save 有这样的区别

https://ruby-china.org/topics/29503

### 4】悲观锁

<https://ruby-china.org/topics/28963>

### 5】rails db命令，英文解释

https://stackoverflow.com/questions/10301794/difference-between-rake-dbmigrate-dbreset-and-dbschemaload

## 7、ruby元编程

### 1】concerns

<https://ruby-china.org/topics/26208>

<https://ruby-china.org/topics/19812>

### 2】scope 过滤参数

<https://www.justinweiss.com/articles/search-and-filter-rails-models-without-bloating-your-controller/> 









## Proc和lambda，传参

Proc，可调用对象

```
p = Proc.new {puts "xxx"}
p.call
```

```
def bar(*arg, &blk)
	puts arg
	puts blk
	blk.call
end

bar do
	puts "xxx"
end
```

lambda

```
l = lambda {puts "xxx"}
l.call
```



## 随机数：sample 和 SecureRandom 和 random/rand

```
a = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
a.sample         #=> 7 
a.sample(4)      #=> [6, 4, 2, 5]

chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a
chars.sample     #=> "z" 
chars.sample(4)  #=> ["X", "s", "c", "v"]
chars.sample(4).join #=> "Xscv"
```

```
SecureRandom.hex => “93dcf2eb24591d8846f6a9ec804eceff"
SecureRandom.random_number //默认为0～1之间随机数 => 0.2754022060318716
SecureRandom.random_number(100) //0～100之间的随机数 => 6
SecureRandom.urlsafe_base64 => “xCHCIA7qpCYJwBBFiddUTg"
SecureRandom.uuid => "a79b9a7a-2f1f-4dc1-a0f1-8136b9f919ac"
```

```
rand(10..20)  => 10
```



## try(sym, &blk)

> 参考：天马项目shop_region.rb、product.rb

要是一个sym，否则会报错：rails is not a symbol nor a string

```
try(:shop_region, shop(shop_region))
```



## instance_eval 和 class_eval

```
class A
  puts "I am a A"
end

a = A.new  => #<ShopRegion::A:0x00007fc1b0b38660>             
a.instance_eval{@a}  => nil
a.instance_eval{@a = 3}  => 3
a  => #<ShopRegion::A:0x00007fc1b0b38660 @a=3>
```

