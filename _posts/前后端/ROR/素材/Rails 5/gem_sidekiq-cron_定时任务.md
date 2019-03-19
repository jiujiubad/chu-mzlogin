* 201805
* 编程+rails+定时任务



## 参考阅读

1）周期性任务工具对比

http://qjpcpu.github.io/blog/2014/02/14/rubyzhi-zhou-qi-xing-ren-wu/

2）rubygems人气对比

https://rubygems.org/search?utf8=%E2%9C%93&query=sidetiq

3）定时任务的问题

https://ruby-china.org/topics/29407

https://ruby-china.org/topics/32154



## 一、网上视频教程

youtube视频，sidekiq-cron教程https://www.youtube.com/watch?v=LCwACWLkeFo

帖子：https://www.jianshu.com/p/e14e0702e359

![Snip20180528_6](https://ws3.sinaimg.cn/large/006tNc79gy1frs676tpxnj30zb0fe7e8.jpg)

![Snip20180528_7](https://ws4.sinaimg.cn/large/006tNc79gy1frs675ex9oj30lq0a1n0y.jpg)

![Snip20180528_8](https://ws2.sinaimg.cn/large/006tNc79gy1frs676doz6j30x90e10zx.jpg)

![Snip20180528_9](https://ws2.sinaimg.cn/large/006tNc79gy1frs677rkznj30w20dtwll.jpg)

![Snip20180528_10](https://ws1.sinaimg.cn/large/006tNc79gy1frs67457gvj30zy0dowkx.jpg)

![Snip20180528_12](https://ws1.sinaimg.cn/large/006tNc79gy1frs677cizzj30p30e67av.jpg)

![Snip20180528_13](https://ws1.sinaimg.cn/large/006tNc79gy1frs674xk0vj30qf0f5tgq.jpg)





# 二、99步骤

1）Gemfile，必须制定rufus-scheduler版本为3.4.0，否则定时任务出不来

```
gem "sidekiq-cron", '~> 0.6.3'
gem 'rufus-scheduler', '~> 3.4.0'
```

```
bundle
```

2）/Users/apple/Documents/ror/company/tianma/config/initializers/sidekiq.rb

```
Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://127.0.0.1:6379/0' }
  schedule_file = "config/schedule.yml"
  if File.exist?(schedule_file) && Sidekiq.server?
    Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://127.0.0.1:6379/0' }
end
```

3）/Users/apple/Documents/ror/company/tianma/config/schedule.yml

```
batch_job:
  cron: "* * * * * Asia/Shanghai"  #注意：可以加上时区，否则要换算时间
  class: "BatchJob"
  queue: 'default'
```

* https://crontab.guru，cron时间工具"* * * * *"
* 更多时间格式：http://www.nncron.ru/help/EN/working/cron-format.htm

4）/Users/apple/Documents/ror/company/tianma/config/routes.rb

```
require 'sidekiq/cron/web'
```

5）/Users/apple/Documents/ror/company/tianma/app/jobs/batch_job.rb

```
class BatchJob
  include Sidekiq::Worker
  def perform
    Batch.create
    sleep 2
  end
end
```

6）启动

```
sidekiq
```

进入http://localhost:3000/sidekiq/cron，出现下图Cron Jobs

![image-20180530173826157](https://ws3.sinaimg.cn/large/006tKfTcgy1frti5uuaszj31g00cpwjj.jpg)



![image-20180530173740681](https://ws3.sinaimg.cn/large/006tKfTcgy1frti5x7otqj31g60gtwmi.jpg)



* 注意：如果运行sidekiq后，一次性自动添加多次任务，就要进入web页面，看Queues是不是有队列任务，把任务删除再重新运行sidekiq。