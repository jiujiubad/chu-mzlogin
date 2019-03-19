---
title: tool-vps-部署-heroku之figaro七牛云sendcloud
date: '2017-12-22 00:10'
categories:
  - 工具
tags:
  - 工具
  - vps
  - 部署
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfdhnbgrrj308506bmx2.jpg'
abbrlink: 69bbe6ac
---

* 201712
* 编程+ubuntu



# 部署@七牛云-Figaro-Sendcloud-heroku

# 一、七牛云注意事项

## 1、免费流量

https://www.qiniu.com/

后台-财务统计，可以看到每月10G，足够用了。

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmhfn4c267j30t009vaa5.jpg)

## 2、存储区域

1）[七牛云存储区域](https://developer.qiniu.com/kodo/manual/1671/region-endpoint)

2）准备工作

```
gem 'carrierwave-qiniu'
gem 'qiniu-rs'
```

`bundle`

`bundle update`

`touch config/initializers/carrierwave.rb`

3）config/initializers/carrierwave.rb代码，根据上边的存储区域文档修改区域网址。

```
CarrierWave.configure do |config|
  config.storage             = :qiniu
  config.qiniu_access_key    = ENV["qiniu_access_key"]
  config.qiniu_secret_key    = ENV["qiniu_secret_key"]
  config.qiniu_bucket        = ENV["qiniu_bucket"]
  config.qiniu_bucket_domain = ENV["qiniu_bucket_domain"]
  config.qiniu_block_size    = 4*1024*1024
  config.qiniu_protocol      = "http"
  config.qiniu_up_host       = "https://up-z2.qiniup.com"  #选择不同的区域时，"up.qiniu.com" 不同
end
```

## 3、设置不同环境evn

1）app/uploaders/image_uploader.rb，注解掉`storage :file`，加入

```
  if Rails.env.production? #远端
    storage :qiniu
  elsif Rails.env.development? #本地
    storage :file
  end
```



# 二、Figaro

## 1、步骤

`gem 'figaro'`

`bundle`

`figaro install`，会自动生成 config/application.yml 文件并自动添加到 .gitignore 档案里。

`cp config/application.yml config/application.yml.example`

```
config/application.yml
...(略)

 production:
   qiniu_access_key: xxxx  # 你的 qiniu AccessKey

   qiniu_secret_key: xxxx  # 你的 qiniu SecretKey

   qiniu_bucket: xxxx  # 你的 qiniu bucket

   qiniu_bucket_domain: xxxx  # 你的 qiniu bucket domain



 development:
   qiniu_access_key: xxxx  # 你的 qiniu AccessKey

   qiniu_secret_key: xxxx  # 你的 qiniu SecretKey

   qiniu_bucket: xxxx  # 你的 qiniu bucket

   qiniu_bucket_domain: xxxx  # 你的 qiniu bucket domain
```

> 注意，这里填写时不能用tab，而是要按空格键，空两格。否则会报错。

## 2、部署到heroku

1）把 sqlite3 从第7行搬到 group :development, :test do 中间

2）在末尾新增一个 production group，加上 pg 这个 gem

```
group :production do 
  gem 'pg'
end 
```

``bundle install``

3）创建heroku app

`heroku create` 先创建一个heroku app

`figaro heroku:set -e production`

`heroku config` 可以列出目前所有的设定

4）上传

`git push heroku master`

`heroku rake db:migrate`



# 三、Sendcloud邮件

[http://sendcloud.net/](http://sendcloud.net/)

免费用户享有30封/天的发送额度。完善信息后，免费用户60/天的发送额度。

## 1、步骤

1）将生成的`API_USER`和`API_KEY`信息保存下来。

如果忘记 `API_KEY`，可以到 `发送设置` 生成一个新的。

2）修改开发环境用于本地测试

```
config/environments/development.rb
Rails.application.configure do
...(略)
－    config.action_mailer.delivery_method = :letter_opener
＋  # config.action_mailer.delivery_method = :letter_opener

＋  config.action_mailer.delivery_method = :smtp
＋  ActionMailer::Base.smtp_settings = {
＋    address: "smtpcloud.sohu.com",
＋    port: 25,
＋    domain: "heroku.com",
＋    authentication: "login",
＋    enable_starttls_auto: true,
＋    user_name: ENV["SEND_CLOUD_USER_NAME"],
＋    password: ENV["SEND_CLOUD_USER_KEY"]
＋    }
end
```

3）修改生产环境用于heroku使用

```
config/environments/production.rb
Rails.application.configure do
...(略)

+  config.action_mailer.default_url_options = { :host => '你的herokuapp地址'}

+  config.action_mailer.delivery_method = :smtp
+  ActionMailer::Base.smtp_settings = {
+    address: "smtpcloud.sohu.com",
+    port: 25,
+    domain: "heroku.com",
+    authentication: "login",
+    enable_starttls_auto: true,
+    user_name: ENV["SEND_CLOUD_USER_NAME"],
+    password: ENV["SEND_CLOUD_USER_KEY"]
+    }
end
```

把密钥key加入`figaro`用的`config/application.yml`中

```
​```
```

4）本地测试

重开rails server

请用真实邮箱注册登录你的网站，生成订单后查收注册邮箱，收到邮件即可确认成功

如果出现下图报错，请断开VPN再测试

![](https://ws1.sinaimg.cn/large/006tNc79gy1fmhg48u121j30m807ejrj.jpg)

## 2、部署到heroku

```
git add .
git commit -m "sendcloud settings"
figaro heroku:set -e production
git push heroku story5:master
```

同样请用真实邮箱注册登录你的网站，生成订单后查收注册邮箱，收到邮件即可确认成功