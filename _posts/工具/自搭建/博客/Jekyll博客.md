

## 博客对比

❌kasper：没有 Gemfile；高亮特丑；字体丑；

❌so-simple：有 Gemfile；没有目录导航；存放文章路径不同；英文博客首页中文斜体字很丑；



huxpro：没有 Gemfile；没有目录导航；一二三号粗字都是用#号开头很乱；

✔️mzlogin：有 Gemfile；标题图片会变很酷；代码高亮颜色很稀疏；有目录导航且很舒服；黑字太深字上下左右间距要加大；





## 使用主题

### 安装主题

1）打开终端，下载主题

```
git clone https://github.com/xxxxxx
```

2）安装环境

```
bundle install
```

>  如果下载不动请打开 `Gemfile` ，在第一行添加或修改 `source 'https://rubygems.org` 改成 `source https://gems.ruby-china.com`，重新执行 `bundle install`。
>
> 过程中需要输入的密码是你 Mac 电脑的登录密码

3）启动 Jekyll，

```
bundle exec jekyll s
或
jekyll s
```

返回 `Server running` 表示启动成功

```
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```

打开博客 http://127.0.0.1:4000/

### 安装主题 - 常见问题

1）安装 `Gemfile` 文件里的 `gem jemoji` 时有一些问题，解决办法是执行：

```
gem install nokogiri -v 1.6.8.1 -- --use-system-libraries=true --with-xml2-include="$(xcrun --show-sdk-path)"/usr/include/libxml2
```

>  参考：How to install nokogiri on mac os sierra，https://stackoverflow.com/questions/40038953/how-to-install-nokogiri-on-mac-os-sierra-10-12

2）执行 `bundle exec jekyll s` 启动博客失败

解决办法：按照返回的信息，会提示你缺乏某个 gem 包。执行一下命令安装 gem 包，然后重新执行 `bundle exec jekyll s`

```
gem install gem包名称
```

