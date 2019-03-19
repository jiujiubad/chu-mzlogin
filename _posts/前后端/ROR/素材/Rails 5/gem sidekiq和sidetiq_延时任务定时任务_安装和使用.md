* 201804
* 项目+mws
* 编程_rails

[TOC]



# 一、sidekiq异步任务、sidetiq定时任务-安装及使用

### 踩过的各种坑

* 不要按sidekiq官方wiki做，做法太老，一定会报错。sidetiq的官方wiki已关闭
* 不要用sidekiq最新版本，否则sidetiq定时任务不能生成。

### 1.1 安装sidekiq4.1.4、sidetiq0.7.2

1）安装gem，并执行`bundle`

```
gem 'redis', '~> 3.0' #依赖
gem 'sidekiq', '~> 4.1', '>= 4.1.4'
gem 'sidetiq', '~> 0.7.2'
gem 'sinatra', require: false  #在web界面显示sidekiq和sidetiq任务
```

> 注意：要查看bundle日志里sidekiq的版本，如果不是4.1.4，要先删除其他版本`brew uninstall sidekiq`，再重新bundle。

2）配置web版路径，config/routes.rb

```
  require 'sidekiq/web'
  require 'sidetiq/web'
  mount Sidekiq::Web, at: '/sidekiq'
```

### 1.2 配置文件

1）默认的*ActiveJob Adapter*是*:inline*，也就是没有异步。我们必须编辑*config/environments/production.rb*切换成改用`:sidekiq`如下:

```
config.active_job.queue_adapter = :sidekiq
```

2）编辑*config/application.rb*加入一行设定让*Rails*可以找到*job*档案：

```
config.eager_load_paths += %W( #{config.root}/app/jobs )
```

3）新增config/sidekiq.yml，才能查看web版sidekiq和sidetiq工作日志

```
---
:queues:
  - default
  - mailers
```

查看日志的命令如下

```
tail -f log/development.log
```

### 1.3.1 异步任务使用方法

特点：用sidekiq，有继承，可以传参数，需要被调用，比如在controller#new里调用。

> 验证方法有没有成功生效，可以用脚手架，比如`rails g scaffold email text:string`并`rake db:migrate`

1）`rails g job hard_worker`会产生*app/jobs/hard_worker_job.rb*

```
class HardWorkerJob < ActiveJob::Base
  queue_as :default

  def perform(import_id)
    u = Email.new(:text => "可以了#{import_id}！")
    u.save!
  end
end
```

2）接着在需要异步的地方使用以下程式，就会将工作排程进*sidekiq*：

```
HardWorkerJob.perform_later
```

或是你也可以设定延迟多久才执行：

```
HardWorkerJob.set( wait: 20.minutes ).perform_later
```

示例代码如下，emials_controller.rb#create

```
  def new
    ImportWorkerJob.set(wait: 1.minutes).perform_later
    flash[:notice] = "汇入已在背景执行，请稍候再来看结果"
  end
```

3）重启sidekiq生效。也可打开web版sidekiq，http://localhost:3000/sidekiq

### 1.3.2 定时任务使用方法

特点：主要用sidetiq，没有继承，不能传参数，不需要被调用。

> 验证方法有没有成功生效，可以用脚手架，比如`rails g scaffold email text:string`并`rake db:migrate`

1）`rails g job daily`，会生成*app/jobs/dailyrker.rb*

```
class DailyWorker
  include Sidekiq::Worker
  include Sidetiq::Schedulable

  recurrence { secondly(2) }

  def perform
    puts "碉堡了"
  end
end
```

其中，recurrence是最重要的，每次修改时间，才会在sidetiq里添加新任务，更多写法如下

```
recurrence do
  hourly.minute_of_hour(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,59).in_time_zone('Sydney')
end

daily #每天
secondly(1) #每秒
minutely(1) #每分钟

recurrence { daily.hour_of_day(15).minute_of_hour(15) } #每天的15点15分

```

2）`bundle`检查已安装的sidekiq版本是不是4.1.4

3）重启sidekiq，就会在这个窗口看到数据动态。也可打开web版sidekiq，http://localhost:3000/sidekiq

### 参考文档：

1）rails实战圣经，https://ihower.tw/rails/background-process-cn.html

2）youtube视频，https://www.youtube.com/watch?v=Sud26HsSACo用脚手架做的，测试很方便。



# 20180525 测试案例

### 99的步骤，测试sidekiq

https://github.com/mperham/sidekiq/wiki/Getting-Started，官网用法太老了，全部报错

https://ihower.tw/rails/background-process-cn.html，实战圣经用法还能用

```
rails g scaffold product name:string price:float

gem 'sidekiq', '~> 4.1.4'
bundle

rails g job product

class ProductJob < ApplicationJob
  queue_as :default
  def perform
    name = Product.create(name: "jaja", price: 2.2)
    puts name
  end
end

def index
  @products = Product.all
  ProductJob.perform_later
  # 传参或延时的写法：ProductJob.set(wait: 5.seconds).perform_later("Bob", 5.2)
end

redis-server
bundle exec sidekiq
刷新首页，发现新增了一笔数据，观察redis、sidekiq界面不变，只有rails s里执行了相应的动作。
```

* 注意：如果运行sidekiq后，一次性自动添加多次任务，就要进入web页面，看Queues是不是有队列任务，把任务删除再重新运行。



### 99的步骤，测试sidetiq

https://www.youtube.com/watch?v=Sud26HsSACo，youtube视频，用法正确，但要注意sidekiq版本一定要是4.1.4，否则刷新sidekiq后不会出现定时任务

```
gem 'sidetiq', '~> 0.7.2'
bundle

rails g job daily

class DailyJob
  include Sidekiq::Worker
  include Sidetiq::Schedulable
  recurrence { secondly(2) }
  # recurrence { minutely(1) }
  # recurrence { hourly.minute_of_hour(50, 51, 52) }
  # recurrence { daily.hour_of_day(13).minute_of_hour(1, 2, 3, 4, 38, 39, 40) }

  def perform
    puts "碉堡了！！！"
  end
end

redis-server
bundle exec sidekiq
重启sidekiq后，在sidekiq界面看到任务正在执行，日志如下
2018-05-25T12:58:52.570Z 82938 TID-ovng6plek INFO: Starting processing, hit Ctrl-C to stop
2018-05-25T12:58:54.485Z 82938 TID-ovng5j250 INFO: [Sidetiq] Enqueue: DailyJob (at: 1527253136.0) (last: 1527253134.0)
2018-05-25T12:58:56.486Z 82938 TID-ovng5js04 INFO: [Sidetiq] Enqueue: DailyJob (at: 1527253138.0) (last: 1527253136.0)
```

### 99运用，用sidetiq定时任务，并用sidekiq延迟执行

https://www.jianshu.com/p/80d481292c3c，时间的写法可以参考

```
class DailyJob
  include Sidekiq::Worker
  include Sidetiq::Schedulable
  recurrence { secondly(10) }
  def perform
    ProductJob.set(wait: 7.seconds).perform_later
    puts "碉堡了！！！"
  end
end
```

### 问题：只设置一个任务，但是sidekiq一次触发多个任务？

sidekiq.yml文档，配置线程





# 前端怎么传送时间给后端？

### mws传递时间对象

```
res = client.list_orders(opts = {created_after: current_date})
current_date = (Time.now - 1.days).to_date
```

rails c

```
d1 = Date.new 2018, 4, 9
d2 = Time.now.to_date
d1 == d2 ? true:false
```


### 前端传递的参数都是字符串。

```
(1..10).each {|d| p (Time.now - d.to_i.days).to_date}
```

```
  def perform(date)
    date = "2018/04/08" #前端传递字符串
    parse_date = Date.parse date
  end
```


