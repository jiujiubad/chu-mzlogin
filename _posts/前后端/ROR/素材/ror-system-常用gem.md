---
title: ror-system-常用gem
date: '2017-11-15 00:10'
categories:
  - ror系统
tags:
  - ror系统
  - 常用
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 8e9b1ad8
---

* 201711
* 编程+ruby



## 10、debug断点测试

gem pry-debug

## 11、gem 'awesome_rails_console'

console样式，包括debug断点测试模式，Rails c 的代码很乱，可以重新排版

![](http://ww2.sinaimg.cn/large/006tNc79gy1ffh5van818j313x06jdi0.jpg)



## 2、gem 'annotate'

- 会在每个模型文件的顶部自动添加和更新注释，这些注释是对当前数据库模式的概述。



## 3、网站安全 gem 'rack-attack'

- 可以设定当特定 IP 位址就某一段时间内存取太多次的话，自动进行封锁。

```
  config/application.rb
  +     config.middleware.use Rack::Attack
```
  ```
  config/initializers/rack-attack.rb
class Rack::Attack
  throttle('req/ip', :limit => 180, :period => 1.minutes) do |req|
    req.ip
  end
  ### Prevent Brute-Force Login Attacks ###
  # The most common brute-force login attack is a brute-force password
  # attack where an attacker simply tries a large number of emails and
  # passwords to see if any credentials match.
  #
  # Another common method of attack is to use a swarm of computers with
  # different IPs to try brute-forcing a password for a specific account.
  # Throttle POST requests to /login by IP address
  #
  # Key: "rack::attack:#{Time.now.to_i/:period}:logins/ip:#{req.ip}"
  throttle('logins/ip', :limit => 5, :period => 20.seconds) do |req|
    if req.path == '/users/sign_in' && req.post?
      req.ip
    end
  end
  # Throttle POST requests to /login by email param
  #
  # Key: "rack::attack:#{Time.now.to_i/:period}:logins/email:#{req.email}"
  #
  # Note: This creates a problem where a malicious user could intentionally
  # throttle logins for another user and force their login requests to be
  # denied, but that's not very common and shouldn't happen to you. (Knock
  # on wood!)
  throttle("logins/email", :limit => 5, :period => 20.seconds) do |req|
    if req.path == '/users/sign_in' && req.post?
      # return the email if present, nil otherwise

      req.params['email'].presence
    end
  end
end
  ```

* 重启服务器。以上设定包括：
* 1、一分钟内，一个 IP 位址只能存取 180 次
* 2、针对 /users/sign_in 这个登入网址，20 秒内只能尝试登入 5 次
* 3、针对 /users/sign_in 这个网址，同一 email 在 20 秒内只能尝试登入 5 次

 ​

## 4、网站安全 gem 'brakeman'

- [brakeman](https://github.com/presidentbeef/brakeman) 是一个 Rails 的工具可以分析代码，找出可能有漏洞的地方。

- 执行 `brakeman`，就会分析你的代码，列出"可能"有漏洞的地方：brakeman 报表结果仅供参考，不表示必然有漏洞。需要一条一条实际检查看看。

  ![](https://ws2.sinaimg.cn/large/006tNc79gy1flpyl1z4yyj30mb0hggoc.jpg)




## 5、网站安全 gem 'bundler-audit'

- 安装 `gem 'bundler-audit'` 检测套件，执行 `bundle-audit`检查已装gem是否有安全漏洞需要升级。`bundle update 套件名称` 就可以进行升级。




6、gem 'bootstrap-sass'

7、gem 'devise'

8、gem 'simple_form'

9、gem 'font-awesome-rails'

gem 'carrierwave'
gem 'mini_magick'

gem 'letter_opener', group: :development

gem 'aasm'



