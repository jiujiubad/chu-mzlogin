---
title: tool-vps-部署vps云服务器
date: '2017-12-22 00:10'
categories:
  - 工具
tags:
  - 工具
  - vps
  - 部署
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfdhnbgrrj308506bmx2.jpg'
abbrlink: 36d18d51
---

* 201712
* 编程+ubuntu



# 【问题】云服务器项目备份？梯子项目备份？vultr镜像？linux也可以用git？

# 一、常用命令

1）`ssh root@45.32.42.11`，使用root权限登录

2）部署更新：本地git commit 保存，重新上传到github，然后再执行`cap production deploy`

3）heroku部署会用figaro提交配置：`heroku config` 、`figaro heroku:set -e production`、`git push heroku master`

4）`cat ~/.ssh/id_rsa.pub` 显示本机公钥，pub就是public

5）Linux删除文件命令

```
rm -r /home/ftk/apache-tomcat-5.5.20/work  #不管它是文件还是目录都删掉了
```

6）Linux新建文件命令

12课，在远端新增 `/home/deploy/rails-recipes/shared/config/secrets.yml` 这个档案。执行`vi 文件名`，如果文件存在就是打开，不存在就是新建文件。



# 二、部署中的问题和bug

## 1、安装vim（vi模式下可以编辑，否则无法输入，按方向键会变成A、B字幕）：`sudo apt-get install vim`

### 问题：gnu nano如何保存退出

```
　linux下在编辑状态下退出请按Ctrl+X，会有两种情形：
            如果文件未修改，直接退出；
            如果修改了文件，下面会询问是否需要保存修改。输入Y确认保存，输入N不保存，按Ctrl+C取消返回。如果输入了Y，下一步会提示输入想要保存的文件名。如果不需要修改文件名直接回车就行；若想要保存成别的名字（也就是另存为）则输入新名称然后确定，这个时候也可用Ctrl+C来取消返回。
```



## 2、【bug】mac上的rails项目安装`gem 'mysql2'`报错

```
An error occurred while installing mysql2 (0.4.10), and Bundler cannot
continue.
Make sure that `gem install mysql2 -v '0.4.10'` succeeds before bundling.

In Gemfile:
  mysql2
```

解决办法：报错是因为这个gem需要mysql的支持，执行安装`brew install mysql`。



## 3、【bug】使用 Capistrano 部署项目时，执行`cap production deploy:check`后报错如下：

```
cap aborted!
NoMethodError: undefined method `h' for main:Object
```

原因：打错字。



## 4、【bug】cap production deploy报错 An error occurred while installing pg (0.21.0), and Bundler cannot continue.

解决办法：参考https://stackoverflow.com/questions/30162572/error-message-make-sure-that-gem-install-pg-v-0-18-1-succeeds-before-bundl，在linux执行`sudo apt-get install libpq-dev`

> | 73[down vote]() | If you're on **Ubuntu**, most likely you're missing a hidden dependency`sudo apt-get install libpq-dev`If you are on **OS X**, try these stepsInstall Xcode command line tools (Apple Developer site). If you have it already installed, update it using `brew update`.`brew uninstall postgresql``brew install postgresql``gem install pg` |
> | --------------- | ---------------------------------------- |
> |                 |                                          |



## 5、【bug】cap production deploy报错  DEBUG [b5ba7f35] 	Tasks: TOP => environment

【bug！！重复出现】

```
-5.0.6/lib/rails/application.rb:328:in `require_environment!'
/home/deploy/rails-recipes/shared/bundle/ruby/2.4.0/gems/railties-5.0.6/lib/rails/application.rb:448:in `block in run_tasks_blocks'
/home/deploy/rails-recipes/shared/bundle/ruby/2.4.0/gems/sprockets-rails-3.2.1/lib/sprockets/rails/task.rb:62:in `block (2 levels) in define'
/home/deploy/rails-recipes/shared/bundle/ruby/2.4.0/gems/rake-12.3.0/exe/rake:27:in `<top (required)>'
Tasks: TOP => environment
(See full trace by running task with --trace)


** DEPLOY FAILED
** Refer to log/capistrano.log for details. Here are the last 20 lines:


/home/deploy/rails-recipes/shared/bundle/ruby/2.4.0/gems/railties-5.0.6/lib/rails/application.rb:328:in `require_environment!'

/home/deploy/rails-recipes/shared/bundle/ruby/2.4.0/gems/railties-5.0.6/lib/rails/application.rb:448:in `block in run_tasks_blocks'

/home/deploy/rails-recipes/shared/bundle/ruby/2.4.0/gems/sprockets-rails-3.2.1/lib/sprockets/rails/task.rb:62:in `block (2 levels) in define'

/home/deploy/rails-recipes/shared/bundle/ruby/2.4.0/gems/rake-12.3.0/exe/rake:27:in `<top (required)>'

 DEBUG [dc51dc81] 	Tasks: TOP => environment

 DEBUG [dc51dc81] 	(See full trace by running task with --trace)

 ✘ apple@bogon ⮀ ~/rails/jdstore1130 ⮀ ⭠ master± 
```

解决办法：

1）参考stackoverflow上的答案，linux执行`sudo apt-get install libpq-dev`、

`sudo apt-get install libpq-dev build-essential`

2）本地检查git commit要保存，并上传到github，执行`cap production deploy`



## 6、观察部署过程发现：

1）做到第12章，网站首页变成nginx的welcome

2）做到第13章，如果只修改``/etc/nginx/sites-enabled/rails-recipes.conf` `，首页变成403Forbidden

3）再修改`/etc/nginx/nginx.conf`，页面成功换成首页



## 7、最大的坑：application的密钥如何配置给云服务器？

### 1、参考12课安装 Capistrano

1）`/home/deploy/rails-recipes/shared/config/database.yml` 

2）`/home/deploy/rails-recipes/shared/config/secrets.yml`，[生成一份就够了](https://ihower.tw/rails/environments-and-bundler.html)

[开始做如下](https://forum.qzy.camp/t/linode/1270/6)

### 2、实作

1）修改`config/deploy.rb`，让它加载防止密钥的`application.yml`

```
append :linked_files, "config/database.yml", "config/secrets.yml", "config/application.yml"
```

2）在远程，`vi /home/deploy/rails-recipes/shared/config/application.yml` ，把本地的密钥代码等整个application.yml，copy到vps云服务器



# 三、部署完成后的问题

要部署新代码上服务器，记得需要先 `git push` 到 Github 上，再执行 `cap production deploy`

1）seed档怎么载入？

先`cd ~/rails-recipes/current`，然后`RAILS_ENV=production bundle exec rake db:seed`

2）原来用fagiro设置的密钥怎么管理？

figaro 只有對應 heroku 而已哦，application.yml按上面第7点copy到服务器。

Nic说，管理 key 我都是用 dotenv 这只 gem

3）github提示安全漏洞？

![](https://ws4.sinaimg.cn/large/006tNc79gy1fmjhqn1dnpj31hu0bq3z4.jpg)

4）为什么gitignore指定的文件会被上传到github？怎么处理？

详见帖子《为什么文件gitignore后还会被上传到github？gitignore文件被上传到github怎么办？》



