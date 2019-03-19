* 201803
* 编程+ubuntu

```
账号
confluence
confluence

管理员账号
admin@muker.io
muker
```



参考链接：https://www.cnblogs.com/kevingrace/p/7607442.html，因为参考文章用的是centos而不是ubuntu，所以java的安装、mysql的配置完全不同，confluence的安装位置也不一样。



本文适用系统：ubuntu16.04桌面版、内存8G、jdk8、mysql5.7、confluence6.3。

★★★特别注意：服务器内存小于等于2G的最好别折腾，经测试会在网页配置过程因内存占用，访问服务器会巨慢（只有卸载confluence才能恢复正常访问速度）。虽然可以针对内存不足修改配置，但作用有限。



1）上传文件到服务器上

* [atlassian-confluence-6.3.1-x64.bin](https://pan.baidu.com/s/15Qtdq294TpzY_BI2UHH5ZQ)，是confluence的安装文件。
* [atlassian-extras-decoder-v2-3.2.jar](https://pan.baidu.com/s/1PVBxXekNT5Pvnaur84QVng)，是用来替换的破解文件。
* [atlassian-universal-plugin-manager-plugin-2.22.jar](https://pan.baidu.com/s/1Vry877pCz6p2O8fr9fX-Wg)，是用来替换的破解文件。
* [mysql-connector-java-5.0.8-bin.jar](https://pan.baidu.com/s/1c2CQzcO)，提取密码ku8s，是mysql驱动，在网页上配置confluence的时候会用到。

2）cd到上面文件所在的文件夹上

给安装文件授权

```
chmod +x atlassian-confluence-6.3.1-x64.bin
```

安装confluence

```
./atlassian-confluence-6.3.1-x64.bin
```

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fpq4agudblj30xg0kt0u8.jpg" width="700">



3）查看端口是否启用

```
lsof -i:8090
```

<img src="https://ws3.sinaimg.cn/large/006tNc79gy1fpr5b9cq48j30f10163yc.jpg" width="600">

4）重启confluence

方法一：在linux上

```
service confluence restart
```

方法二：shell方式

```
/etc/init.d/confluence restart
```

方法三：如果上述都不能使用，则直接访问文件

```
/home/muker/atlassian/confluence/bin/stop-confluence.sh
/home/muker/atlassian/confluence/bin/startup.sh
```

5）访问端口，比如在浏览器里输入

```
192.168.0.8:8090
```

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fpr5fz5444j31am0u80x0.jpg)

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5fx534ij318u0sen0l.jpg)

选择产品安装并点击下一步，继续安装

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fpr5fv5336j30lp0bsmz0.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5fsw2y4j31kw0nxdjl.jpg)

**通过上图可以看出需要输入授权码，下面介绍下破解confluence授权码的操作：**

①、做备份，把文件名改为atlassian-extras-decoder-v2-3.2.jar.bak

```
sudo mv ~/atlassian/confluence/confluence/WEB-INF/lib/atlassian-extras-decoder-v2-3.2.jar ~/atlassian/confluence/confluence/WEB-INF/lib/atlassian-extras-decoder-v2-3.2.jar.bak
```

②、复制破解文件，atlassian-extras-decoder-v2-3.2.jar

```
sudo cp ~/Documents/confluence/atlassian-extras-decoder-v2-3.2.jar ~/atlassian/confluence/confluence/WEB-INF/lib/atlassian-extras-decoder-v2-3.2.jar
```

③、做备份，把文件名改为atlassian-universal-plugin-manager-plugin-2.22.1.jar.bak

```
sudo mv ~/atlassian/confluence/confluence/WEB-INF/atlassian-bundled-plugins/atlassian-universal-plugin-manager-plugin-2.22.1.jar ~/atlassian/confluence/confluence/WEB-INF/atlassian-bundled-plugins/atlassian-universal-plugin-manager-plugin-2.22.1.jar.bak
```

④、复制破解文件，atlassian-universal-plugin-manager-plugin-2.22.1.jar

```
sudo cp ~/Documents/confluence/atlassian-universal-plugin-manager-plugin-2.22.jar ~/atlassian/confluence/confluence/WEB-INF/atlassian-bundled-plugins/atlassian-universal-plugin-manager-plugin-2.22.1.jar
```

然后继续访问[](192.168.0.8:8090)，接着注册confluence的key

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5fr3jzgj31kw0nxdjl.jpg)

### 敲黑板：实测，可以不注册 key ，直接点击下一步（成功的话说明成功破解）

### 下面的操作是注册 key（如果破解成功想要试用才看）

 下面的操作需要在FQ的前提下进行（我使用的是天眼通的浏览器插件方式进行FQ，[http://www.tianyantong.org.cn](http://www.tianyantong.org.cn/)），使用google邮箱注册![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5fnbynsj30s20v6gnt.jpg)

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5flfoi0j30rq11idiu.jpg)

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fpr5fjouw0j30ui0zcmzs.jpg)

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5fhd637j31gu14811f.jpg)

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5ft9ansj30s20v6gnt.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5ff02yxj31kw0o8tf8.jpg)

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5fd4rknj30z81520y5.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5f8epd1j314i0o278t.jpg)

**稍微等一会儿，就会自动弹出下面的信息，点击"Yes"**

![img](https://ws3.sinaimg.cn/large/006tNc79gy1fpr5f63ho4j31440xkq8q.jpg)

 **如上，右边可以看到这个confluence的license key（把这些key手动粘贴到上面confluence安装中"授权码"的"服务器ID"下面的空白框里即可）**

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5f42ou5j31kw0o9gq3.jpg)



### 开始配置数据库

如下，选择外界数据库

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5f2btcsj31kw12a7ec.jpg)

**-------------------------------------------------------------------------------------------------------------------** 

如果出现下面报错（缺少java的mysql驱动）：

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5fg334bj31kw155gwa.jpg)

**解决办法：**

（1）mysql没有驱动，安装相应驱动

```
cp ~/Documents/confluence/mysql-connector-java-5.0.8-bin.jar ~/atlassian/confluence/lib/
```

（2）重启confluence

方法一：在linux上

```
service confluence restart
```

方法二：shell方式

```
/etc/init.d/confluence restart
```

方法三：如果上述都不能使用，则直接访问文件

```
/home/muker/atlassian/confluence/bin/stop-confluence.sh
/home/muker/atlassian/confluence/bin/startup.sh
```

**-------------------------------------------------------------------------------------------------------------------** 

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5exkqbtj31kw0qa0vs.jpg) 

**下面在首次连接mysql的时候(使用上面MariaDB里面授权的信息连接，即用户名:confluence，密码:confluence)，可能有点慢，耐心等待～**

★★★注意：confluence非常吃内存，经测试，在内存2G的服务器上，后续的几步操作基本上都会在某一步上卡死，而且内存的占用会让服务器访问和操作变得特别慢，即使多次重启服务器也是一样，只有把confluence彻底卸载后才能恢复正常的访问速度。——因此，服务器内存没有大于2G的谨慎折腾！！！

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5ewnt52j31kw0snwjz.jpg)

![img](https://images2017.cnblogs.com/blog/907596/201709/907596-20170928192217606-575327038.jpg)

![img](https://images2017.cnblogs.com/blog/907596/201709/907596-20170928192225622-2142637847.jpg)

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5eswf91j31kw0usq7a.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5eumxdhj31kw0i30vd.jpg)

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5ezwtjoj31k61000w0.jpg)

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5eluppzj30ty0yyac4.jpg)

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5efe2fvj31kw0x3n0q.jpg)

![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5ehrkodj31kw0nltek.jpg)

**------------------------------------------------------------------------------------------------**

**下面说下confluence邮箱功能（不多赘述，直接看截图）：**

**![img](https://ws3.sinaimg.cn/large/006tNc79gy1fpr5eat359j31kw0ip452.jpg)**

**![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5e8wd4lj31kw0nbn33.jpg)**

**![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5e6yme6j313s15aq9k.jpg)**

**![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5e4yxkrj31kw0i0q80.jpg)**

**![img](https://ws4.sinaimg.cn/large/006tNc79gy1fpr5e345haj311w0wmaez.jpg)**

**![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5e18f0ej31kw0ftdld.jpg)**

**![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5dzdpvwj30uw0zwq51.jpg)**

![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5dx07jpj30x80datac.jpg)

**有上面配置后，就已经配置好了confluence的邮件功能了。下面说下在管理员账号下创建或邀请其他用户的做法：**

**![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5dusal3j31kw0d1jwc.jpg)**

**一般要禁止用户注册自己注册，要在管理员账号下创建新用户或邀请新用户（通过邮件的方式）**

**![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5dsafdmj319a0mcwi4.jpg)**

**如下在管理员账号下"添加用户",添加后给用户设置一个初始密码，用户收到邮件后，可以登陆修改密码。**

**![img](https://ws3.sinaimg.cn/large/006tNc79gy1fpr5dqcwt6j31260nitbv.jpg)**

**![img](https://ws2.sinaimg.cn/large/006tNc79gy1fpr5dogpsqj31060og77c.jpg)**

**-----------------------------------------------------------------------------------------------------------**
**也可以通过"邀请用户"的方式来创建新用户，用户收到邮件后，按照邮件提示进行用户创建**

**![img](https://ws3.sinaimg.cn/large/006tNc79gy1fpr5dmdlcnj31be0y0dmk.jpg)**

**-----------------------------------------------------------------------------------------------------------**
**邮件功能设置后，在分享文章的时候，可以以邮件的方式分享到用户的邮箱里。**

![img](https://ws1.sinaimg.cn/large/006tNc79gy1fpr5dk0g0yj31kw0jigqm.jpg)

注意：在创建文章时 ，左边的页面或子页面的创建时，可以点击左下角的"空间管理"-"配置侧边栏"
**到此，confluence的安装破解已经完全搞定！后续再介绍下confluence跟jira接连、及其它们对接LDAP的做法！**





安装后遇到的bug

<img src="https://ws2.sinaimg.cn/large/006tNc79gy1fpr5dhnwttj30yn0ir40z.jpg" width="700">

