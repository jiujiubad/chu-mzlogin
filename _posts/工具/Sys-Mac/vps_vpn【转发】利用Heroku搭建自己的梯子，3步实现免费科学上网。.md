

* 201711
* 工具+mac+vps+vpn



原文by黄鸿亮：http://hongliang.site/2017/10/20/%E5%88%A9%E7%94%A8Heroku%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A2%AF%E5%AD%90%EF%BC%8C3%E6%AD%A5%E5%AE%9E%E7%8E%B0%E5%85%8D%E8%B4%B9%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91%E3%80%82/

# 利用Heroku搭建自己的梯子，3步实现免费科学上网。

```
kill -9 $(lsof -i tcp:1080 -t)      #占用1080端口的程序会被干掉！
cd ~/shadowsocks-over-websocket
node local.js -s vpn999.herokuapp.com -l 1080 -m aes-256-cfb -k Qq112233 -p 80

```

** 发表于 2017-10-20 | ** 分类于 [mac ](http://hongliang.site/categories/mac/)| ** [0 Comments](http://hongliang.site/2017/10/20/%E5%88%A9%E7%94%A8Heroku%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A2%AF%E5%AD%90%EF%BC%8C3%E6%AD%A5%E5%AE%9E%E7%8E%B0%E5%85%8D%E8%B4%B9%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91%E3%80%82/#comments)

##### 网速如何？请看图！

##### [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-19-193501.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-19-193501.jpg)

##### 简单粗暴的小教程开始：

1. 下载项目并部署，打开终端机，执行指令：

   > 登录Heroku**删app**需要等很久？怎么删app最快捷？这样做：
   >
   > ```
   > $ heroku apps           #列出您所有的app
   > $ heroku apps:destroy appname --confirm appname     #两处appname自行替换成您想删的app名，完成。
   > ```

   ```
   $ git clone git@github.com:activeliang/shadowsocks-over-websocket.git
   $ cd shadowsocks-over-websocket
   $ heroku create
   $ git push heroku master
   ```

   (注意：指令前的字符`$`代表这是一条指令，请不要跟着复制)

2. 设置密码并启动：

   （请自行替代指令中的**中文提示**）!!!

   ```
   $ heroku config:set METHOD=aes-256-cfb PASSWORD=设置密码 SERVER_ADDRESS=0.0.0.0
   $ brew install node    #这一步是安装nodejs，已安装可跳过。如遇错，请看下文提示。
   $ npm install
   $ node local.js -s 第一步中生成的Herokuapp名称.herokuapp.com -l 1080 -m aes-256-cfb -k 设置的密码 -p 80
   ```

   > 安装nodejs遇错，怎么办？直接[去官网下载安装包](https://nodejs.org/zh-cn/)

3. 下载安装客户端并配置 [点击下载](http://opxagqii1.bkt.clouddn.com/ShadowsocksX-NG.1.6.1.zip)

   - 打开软件，配置密码（前面设置的密码）[![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-023141.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-023141.jpg)

     [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-023430.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-023430.jpg)

     [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-023809.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-023809.jpg)

   - 进入客户端 **Shadowsocks** 的 偏好设置：

     [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-075739.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-075739.jpg)

   - 完成，测试：

     打开http://ip111.cn/，如果谷歌网站那一行有出现ip地址，说明科学上网成功。

     打开www.google.com试试吧。

     [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-025021.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-025021.jpg)

##### 搞定。可以自由上网了~

> 成功后刷新本教程，你会发现底部有个留言板，欢迎留下您的足迹~

------

##### 无法上网？自行排查… (遇错解决后，请底部留言反馈~）

- 一切正常，打开 [Google](http://www.google.com/) 时，终端机无log生成，连接失败。

  > 原因：请求没有被扶上梯子。
  >
  > 解法：**Shadowsocks客户端** 切换 **全局模式**。再不行的话，写进入 [这篇教程](https://github.com/VincentChanX/shadowsocks-over-websocket) 尝试Chrome插件。
  >
  > 最后：成功连接后，建议关闭Chrome插件，Shadowsocks切换回**PAC模式**。

> 感谢前人铺好了路：[相关教程](https://github.com/VincentChanX/shadowsocks-over-websocket)

------

#### 进阶教程：

1. 下次如何启用？

   - 开启`终端 service` ，执行以下代码：

     ```
     cd ~/shadowsocks-over-websocket
     node local.js -s 您的herokuapp名称.herokuapp.com -l 1080 -m aes-256-cfb -k 您的密码 -p 80
     ```

   - 开启`Shadowsocks` 。

   > - 科学上网期间，终端开启的service不要关闭（`control + c`可以关闭`service`）。
   >
   > - 遇到启用`service` 失败，提示端口已占用？先执行：
   >
   >   ```
   >   $ kill -9 $(lsof -i tcp:1080 -t)      #占用1080端口的程序会被干掉！
   >   ```

2. 如何停下来？关闭终端`service`或`Shadowsocks`。

#### 重要提示：

1. 如果遇到：打开某个链接，很慢，怎么办？

   > 原因：此请求中有链接被墙。而这个链接没被扶上梯子~
   >
   > 客户端里有三种模式：
   >
   > - PAC自动模式（自动识别,只把被墙的链接扶上梯子！这个好。）列表可以前行**偏好设置** > **常规** > **GFW List URL** 中查看所有被墙的链接。
   > - 全局模式 （所有链接扶上梯子）
   > - 手动模式 （自定义的扶墙名单：**PAC用户自定规则…**）
   >
   > [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-031236.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-031236.jpg)

   **解法**：（二选一）

   - 将链接手动增加到 **编辑PAC用户自定规则** (扶墙名单) 中 （优先）
   - 开启全局模式

#### 如何做得更好：

- 开机全自动启用梯子（写个脚本），这样做：

  1. 新建一个脚本：

     ```
     $ touch ~/开机自启heroku梯子脚本.sh
     $ chmod +x ~/开机自启heroku梯子脚本.sh     #此举进行引用
     ```

     填入：

     ```
     cd ~/shadowsocks-over-websocket
     node local.js -s 您的herokuapp名称.herokuapp.com -l 1080 -m aes-256-cfb -k 您的密码 -p 80
     ```

  2. 设置脚本的的打开方式，选择`终端`（`Iterm`留着编程用）[![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-051123.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-051123.jpg)

     [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-050825.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-050825.jpg)

  3. 加入登录项：打开 **系统偏好设置…** > **用户与群组**

     [![img](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-045426.jpg)](http://olmrxx9ks.bkt.clouddn.com/2017-10-20-045426.jpg)

  4. 打开 **Shadowsocks客户端** > **偏好设置** > **开机启动** （选中）

  5. 完成！下次重开机，全自动开启~！😄



# 99增加：

# 一、heroku绑定信用卡（免费小时数增加）

## 1、淘宝买heroku虚拟信用卡

https://item.taobao.com/item.htm?spm=a1z09.2.0.0.7f3b4477VFLc9s&id=551379781399&_u=e2kcaibbe78，我买了7块钱

## 2、到heroku官网设置里，绑定信用卡

> 注意：heroku官网经常被墙，可能要开Shadowsocks的全局模式。

绑定后，每个月免费小时数由700变成1000小时。

# 二、让heroku不会休眠

1、http://kaffeine.herokuapp.com/，到这个网站添加自己的heroku项目网址，就会会每30分钟ping专案一次，让它不会休眠

> 注意：heroku的设置里可以看到免费小时数的使用情况，如果还有其他项目在使用，可以考虑另开一个账号专门用作科学上网。