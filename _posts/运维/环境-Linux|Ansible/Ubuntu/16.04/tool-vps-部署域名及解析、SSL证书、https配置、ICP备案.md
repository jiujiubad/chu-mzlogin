---
title: tool-vps-部署域名及解析、SSL证书、https配置、ICP备案
date: '2017-12-22 00:10'
categories:
  - 工具
tags:
  - 工具
  - vps
  - 部署
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfdhnbgrrj308506bmx2.jpg'
abbrlink: 314d2142
top: 1
---

* 201712
* 编程+ubuntu



### ssl / tls / http / https 的区别

http：超文本传输协议，用来帮你传输 web 内容，所有的 www 文件都必须遵守这个标准

ssl：安全套接层，防止 http 传输内容被偷窥或篡改，1999 年时应用广泛

tls：传输层安全协议，1999 年后把 ssl 标准化后命名为 tls

https：http 协议和 ssl/tls 协议的组合，大致理解为 http over ssl 或 http over tls



1）mac显示隐藏文件夹和文件

```
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

2）再次隐藏输入

```
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```



# 一、域名解析

## 1、域名解析设置方法

参考网站https://www.cloudxns.net/Support/detail/id/918.html

要设置两个

```
www.codejie.net 指向网站IP

@.codejie.net 指向网站IP
```

## 2、测试域名解析是否成功的办法

不能访问经常是因为网站重定向到https。

1）域名解析设置后，先测试这个命令（网址自己替换），看status是不是`200 ok`。如果是就说明网站状态正常，显示不能访问是因为浏览器重定向的原因。

```
curl -I  http://www.luccake.top
```

2）ping ip、ping 网站，看看是不是全部指向云服务器ip，如果是就是已经解析成功。

```
ping 120.79.71.78
ping luccake.top
ping www.luccake.top
```

> 终端ping，可以用`ctrl+c`



# 二、Let's Encrypt安装SSL配置https（用acme.sh脚本）

用`curl -I  http://www.luccake.top`确认域名可以被成功解析后。

[参考acme.sh官网github，有中文说明](https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E)，但说明里给的代码略坑，但文件很短可以简单过一遍。



## 1、安装步骤

1）输入acme.sh --issue  -d luccake.top   --nginx

```
curl  https://get.acme.sh | sh
```

2）修改-d后的两个域名，修改最后面的专案目录一般是xxxx/current/public，执行

```
~/.acme.sh/acme.sh  --issue  -d luccake.top -d  www.luccake.top   --webroot  /home/deploy/rails-recipes/current/public
```

生成文件如下（本来以为下边要粘贴路径，最后才发现不用）

```
-----END CERTIFICATE-----
[Mon Dec 18 13:48:07 CST 2017] Your cert is in  /root/.acme.sh/luccake.top/luccake.top.cer
[Mon Dec 18 13:48:07 CST 2017] Your cert key is in  /root/.acme.sh/luccake.top/luccake.top.key
[Mon Dec 18 13:48:07 CST 2017] The intermediate CA cert is in  /root/.acme.sh/luccake.top/ca.cer
[Mon Dec 18 13:48:07 CST 2017] And the full chain certs is there:  /root/.acme.sh/luccake.top/fullchain.cer
```

3）修改命令，`<domain>`修改为购买时的域名（下面这堆是一个命令，用\是合并在一起的意思）

```
acme.sh  --installcert  -d  <domain>   \
        --key-file   /etc/nginx/ssl/<domain>.key \
        --fullchain-file /etc/nginx/ssl/fullchain.cer \
        --reloadcmd  "service nginx force-reload"
```

改后是`mkdir -p /etc/nginx/ssl`新建目录后，执行

```
~/.acme.sh/acme.sh  --installcert  -d  luccake.top   \
        --key-file   /etc/nginx/ssl/luccake.top.key \
        --fullchain-file /etc/nginx/ssl/fullchain.cer \
        --reloadcmd  "service nginx force-reload"
```

成功后提示如下：

```
[Mon Dec 18 14:10:52 CST 2017] Installing key to:/etc/nginx/ssl/luccake.top.key
[Mon Dec 18 14:10:52 CST 2017] Installing full chain to:/etc/nginx/ssl/fullchain.cer
[Mon Dec 18 14:10:52 CST 2017] Run reload cmd: service nginx force-reload
[Mon Dec 18 14:10:52 CST 2017] Reload success
```

4）配置文件`vi /etc/nginx/sites-enabled/rails-recipes.conf`

主要配置listen端口、两证书路径ssl_certificate和ssl_certificate_key、server_name可填多个域名、root网站文件夹一般是xxx/current/public，注意检查别改漏了。我的配置如下。

```
server {
  listen       443 ssl http2;
  ssl on;

  ssl_certificate   /root/.acme.sh/luccake.top/fullchain.cer;
  ssl_certificate_key  /root/.acme.sh/luccake.top/luccake.top.key;
  ssl_session_timeout 5m;
  ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;

  server_name luccake.top www.luccake.top;
  root /home/deploy/rails-recipes/current/public;
  index index.html index.htm;
  passenger_enabled on;

  passenger_min_instances 1;

  location ~ ^/assets/ {
    root /home/deploy/rails-recipes/current/public;
    index index.html index.htm;
    expires 1y;
    add_header Cache-Control public;
    add_header ETag "";
    break;
  }
}
server {
  listen 80;
  server_name luccake.top www.luccake.top;
  server_tokens off;
  location / {
    return 301 https://$host$request_uri;
  }
}
```

5）重启Nginx，`sudo service nginx restart`

OK，可以用域名访问网站了！！！可以在[Qualys网站检测SSL证书是否已安装](https://www.ssllabs.com/ssltest/index.html)，输入域名即可检测。

> 如果在Qualys检测不到域名，就要在vps上检查证书文件是否在以上提到的文件夹内；
>
> 如果域名无法访问，就要检查配置文件。

## 2、遇到的bug

在执行以下步骤2的时候遇到bug如下

```
[Tue Dec 19 00:46:47 CST 2017] new-authz error: {"type":"urn:acme:error:rateLimited","detail":"Error creating new authz :: Too many failed authorizations recently.","status": 429}
[Tue Dec 19 00:46:47 CST 2017] Please add '--debug' or '--log' to check more details.
[Tue Dec 19 00:46:47 CST 2017] See: https://github.com/Neilpang/acme.sh/wiki/How-to-debug-acme.sh
```

### 2.1 原因：

（2017年4月）推出了每个帐户每个主机名每小时5次失败的验证限制。这个限制会在分期上更高，所以你可以使用分段来调试连接问题。但是有的人几天过后也不行。

### 2.2 解法一：

如果在其他vps已经有证书，可以先备份到本地，然后拷贝到新的vps先用。

> 远程可能可以用到的命令
>
> cd ~，回到根目录
>
> cd 文件夹名，切换到文件夹
>
> ls，查看文件夹下的文件
>
> rm -r 文件名/文件夹名，删除文件/文件夹

1）、[参考vps scp对拷命令](http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/scp.html)，备份证书到本地

拷贝vps上的ssl证书文件夹到本地桌面

```
scp -r root@45.32.42.11:/etc/nginx/ssl /Users/apple/Desktop
```

拷贝ssl的https配置文件到本地桌面

```
scp root@45.32.42.11:/etc/nginx/sites-enabled/rails-recipes.conf /Users/apple/Desktop
```

2）准备工作

conf文件改成`新的vps数据库名即专案名称.conf`；

证书cer文件，根据官网说法在nginx下用`fullchain.cer`，其他系统用`购买的域名.cer`；

证书key文件，用`购买的域名.key`，比如`luccake.top.key；

把放以上cer和key证书的文件夹ssl，重命名为`购买的域名`。比如luccake.top；

修改配置文件，详见上边第一节安装步骤4；

3）、上传证书到vps

①、上传本地`购买的域名`目录到vps目录（注意检查ip）

```
scp -r /Users/apple/Desktop/luccake.top root@120.79.71.78:/root/.acme.sh
```

②、上传本地配置文件到vps目录（注意检查ip）

会覆盖vps上的原文件，必要时可以先进行备份。

```
scp -r /Users/apple/Desktop/rails-recipes.conf root@120.79.71.78:/etc/nginx/sites-enabled
```

③、执行上边第一节第三部的命令（详细设置方法见上）

```
~/.acme.sh/acme.sh  --installcert  -d  luccake.top   \
        --key-file   /etc/nginx/ssl/luccake.top.key \
        --fullchain-file /etc/nginx/ssl/fullchain.cer \
        --reloadcmd  "service nginx force-reload"
```

OK，可以用域名访问网站了！！！

如果有问题，请参考第一节第五步检查。

## 3、更新

1）证书更新

默认无需操作，acme.sh会帮我们在60天以后自动更新证书。

2）让acme.sh更新

```
acme.sh --upgrade
```

或让acme.sh自动更新

```
acme.sh  --upgrade  --auto-upgrade
```

## 4、备份证书、配置文件

详见上边第二节遇到的bug第一步



# 三、域名ICP备案

！！！！https搞定，然而还需域名ICP备案

## 1、知乎

国外空间在国内没办法备案，通过第三方免除icp不大可能，国内的icp监管很严的

直接租个百度还是阿里什么的 直接备案不到10天就下来了，VPS什么的也不贵~

## 2、各种问题

阿里云学生服务器用多久能不能续费？免费半年好像抢不到续费多少钱？最便宜的服务器多少钱？

腾讯云学生服务器用多久能不能续费？3元两个月，三年五折活动，最便宜的服务器多少钱？支持免费备案（当然备案是为了小程序能用，如果像3元套餐一样不备案就能用就不折腾了）吗？

用Let's Encrypt免费证书可以通过备案吗？

1）阿里云和腾讯云普通套餐约350/年，没有谁更优越。

2）[阿里云免费套餐1核2G内存60G硬盘1M带宽199元/年](https://www.wn789.com/6461.html)——非常全面的一个关于阿里云购买的帖子

①、每天早上10点抢免费套餐版（芝麻积分足够且是新用户）

②、直接买套餐版199/年

③、全民云计算22-28/月

3）[微信小程序详细图文教程-10分钟完成微信小程序开发部署发布（3元获取腾讯云服务器带小程序支持系统）](http://blog.csdn.net/wyx100/article/details/54319360)

4）小程序域名可更换5次/月、50次/年。

因此可以先买3元套餐用两个月，而且这个套餐的域名不用备案，先用这个走熟悉一下流程。然后再去买阿里云套餐和备案（备案需要先买3个月以上的服务，备案据说要10天），备案完成后再把项目转移到阿里云，域名改成阿里云的域名。

5）学生机要求学生信息和实名认证信息一致，麻烦，120/年。

#### 结论：用腾讯云的3元套餐是因为域名不用备案，可以马上上线。购买3元套餐后，感觉要折腾东西太多，还不如节省这点注意力，多等阿里云10天的备案，而且现在直接申请项目上线也不现实。直接选购阿里云199套餐（免费太难抢浪费注意力）、并提交备案信息。









==================申请SSL失败的方法==================

# 失败一、申请免费SSL证书（方法用错了，应该在云服务器操作自己弄成本地）

申请[Let's Encrypt免费SSL证书](https://gethttpsforfree.com/)，[参考教程](https://imququ.com/post/letsencrypt-certificate.html)

## 1、创建帐号

1）首先创建一个目录，例如 `ssl`，用来存放各种临时文件和最后的证书文件。进入这个目录，创建一个 RSA 私钥用于 Let's Encrypt 识别你的身份：

```
openssl genrsa 4096 > account.key
```

2）打印您的公钥。然后全部粘贴到输入框中
`openssl rsa -in account.key -pubout`

## 2、CSR证书签名请求

1）创建 RSA 私钥（兼容性好）：——我用的是这一步

```
openssl genrsa 4096 > domain.key

```

或者，创建 ECC 私钥（部分老旧操作系统、浏览器不支持。优点是证书体积小）：

```
#secp256r1
openssl ecparam -genkey -name secp256r1 | openssl ec -out domain.key

#secp384r1
openssl ecparam -genkey -name secp384r1 | openssl ec -out domain.key
```

2）教程和官网的代码都不太对，按下面的来。

```
openssl req -new -sha256 -key domain.key -subj "/" -reqexts SAN -config <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:luccake.top,DNS:www.luccake.top")) 
```

如果还是不行，也可以使用交互方式创建 CSR（需要注意 Common Name 必须为你的域名）：

```
openssl req -new -sha256 -key domain.key -out domain.csr
```



# 失败二、Let's Encrypt官网手动（不会再尝试的方法）

1）

```
PRIV_KEY=~/.ssh/id_rsa; echo -n "eyJub25jZSI6ImRTNFNCLU5sWjc4OGc0ckd1dmswWERVa09hOXhDR2pNenJyekNaNXVIYTQifQ.eyJyZXNvdXJjZSI6Im5ldy1yZWciLCJjb250YWN0IjpbIm1haWx0bzpqaXVqaXViYWRAZ21haWwuY29tIl0sImFncmVlbWVudCI6Imh0dHBzOi8vbGV0c2VuY3J5cHQub3JnL2RvY3VtZW50cy9MRS1TQS12MS4yLU5vdmVtYmVyLTE1LTIwMTcucGRmIn0" | openssl dgst -sha256 -hex -sign $PRIV_KEY
```

2）

```
PRIV_KEY=~/.ssh/id_rsa; echo -n "eyJub25jZSI6InBqbk15M0JDLVFfWHM5cVh1N2NMOE1Fa295Rmg4YW4yaS1NZUZMdnk3bXMifQ.eyJyZXNvdXJjZSI6Im5ldy1hdXRoeiIsImlkZW50aWZpZXIiOnsidHlwZSI6ImRucyIsInZhbHVlIjoibHVjY2FrZS50b3AifX0" | openssl dgst -sha256 -hex -sign $PRIV_KEY
```

3)

```
PRIV_KEY=~/.ssh/id_rsa; echo -n "eyJub25jZSI6IjRvR2UzUlVzTnlwUFl4eEQ3RlZ4WkNpTlE0RUY2WEtSRUdRLWZneGpYQmcifQ.eyJyZXNvdXJjZSI6Im5ldy1hdXRoeiIsImlkZW50aWZpZXIiOnsidHlwZSI6ImRucyIsInZhbHVlIjoid3d3Lmx1Y2Nha2UudG9wIn19" | openssl dgst -sha256 -hex -sign $PRIV_KEY
```

4）

```
PRIV_KEY=~/.ssh/id_rsa; echo -n "eyJub25jZSI6Ims4aXdBZmtSNzlqR3ctXzFuZEpFekN2eFlQQnhlT0hvTlptTTRwQWREeFUifQ.eyJyZXNvdXJjZSI6Im5ldy1jZXJ0IiwiY3NyIjoiTUlJRWZ6Q0NBbWNDQVFBd0FEQ0NBaUl3RFFZSktvWklodmNOQVFFQkJRQURnZ0lQQURDQ0Fnb0NnZ0lCQUo2WDBlVlBDS2ZibW94UjJGYVZHVmJWRTZXd1RXS2cxSzNtQ0c0aWFySmhsd0k4eFpzUndYVE5qQ0ZJWHFyMmhOdktHbXpIVHRXWmxaZjZEUmVrRUZTanlBc3h5VGJKaWFFQUxDSThqQkh6WVN4Y0E2Zl95aWxad1ZWUWFIbzYwRWxKNVI5NUdYeHNaMVMwVkZzcjlieFpudlEwUmlYVDhMUDRBQ3ZlbTYyYjBNbmh6dG5IbEdiQXQ0aFJ0VTUxVUpUWHVLUjlqWXV2Y2ZoN3c5bzl6Q3ZMU3hVNy1NUzFJWGo0N0FhVThoUkZnZTN4eVVDZk9STHFBQ1daSHFGa0xreFE2THZNQlNqbVIzbS1QaTYxWWlWem9TY3NpcUpjZ1NRLW4tMWFnY0VhcGc4ejVBN3Y1bzczYzRCbjBRcjRobVBWeHdOMnpTT1pGRDFidm1XUWZaX0N3cE5WTEk3UTFTUUpuVGZpVnc0VUpPUlUyZ1pGeXZlQXo2OWptbHljZnNIRENFSFpIcGVtTVRQTF9YblgxY1FlUXVDSTF4akpJWW12akJrbVdZVGJtYWFhaW00Sll2NTFBanU5UjlyamZGTVpDVVRGUTVSX081LV9LOERrOF9fV3pUMFJVektqbld3aUJuN2U2bWhSTTFHSUFBRU50Vl9kWHMzYmVmVDROUVBfQUdRbVFnZ2Z3a0tPSW9rNDhlREN4ZXhmc24yT0NMVTItMTE4akx3QnBxWmQ5anRTNmEyYWFxTUcxQkszQlY5eEw0VEZpTndFM3ZxSWpvb0wxQldzNzJmaFhTYnlOUXotX2NSSEZMLUJuV1d0dmpsWTdhLURsQWlPNEl4dVpGdWRBcS1kLVpNNnNQVWJQX0N2Sll6Si1TejNvSUpqNFktSUdZeDBsSkRuQWdNQkFBR2dPakE0QmdrcWhraUc5dzBCQ1E0eEt6QXBNQ2NHQTFVZEVRUWdNQjZDQzJ4MVkyTmhhMlV1ZEc5d2dnOTNkM2N1YkhWalkyRnJaUzUwYjNBd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dJQkFINVo5VHVwT3pwUF9MQXk0Mkx3SmVETkhNT3dlQjAtQlJVVGU0OUpNMjZjZjduenJLUnIxVHgzMFBldnRTNlliNHNjblY2Y1pJcWJQZ1NoTWpaZFdRRGlUZGJmZXNrbFVMWTF0ZVYzVHZ6UV8xTEh5dWxWRVlveWJFR0xTbGR5SjdUMTNyOFJjRTVMd3JzMERsdk1jLWdRTEIzMUNBcGQ1Nmd5Z3djNEM5YjJtUkNzOHNXUjU4WHNHa0VEdXA3SHNIU1h6QTYxZ09GbE9NVkFPbFZYOE5pSl9yT05MUUliSUE5eG8zWm1OTmJwVHd5S1c4bGtJV0xVNUhoSFpoZFdQcVUxYUIyQTcwOXdNb0VBNDA1UHhvc1VUTnVkeVBkNjZlZFRlVDNGZTY2ajNiYkJOQm9DU2tZMk1lVmFMd0NzMGxUQk1kR2dUdm1VTUZOTXRrLVRzOXhMalRmOTNNcGJ6Um5lem9lZ1RNa3F0cktXNWtFOXpSU2ozWEdXcmswUmNod2NRaGc1bTY0dUZXZDVIOWV1X3drZkhPdlNsM280N29pZXY5SkE3UzVqd2xhaW9ZOFdDMlVVVXlUNG1Hcy1KdzU4Nmp0NmZXRFJUOEhJb2xEMVhBNFhIdWZTcWsxNHNkX3dTbjNGMEhYU1BSUGt6ZTdxQl9DcHgyUTk2dXAtNWhrY0cwRWpBa2JmcnV1dGNXX3kzVWFvTWt6eVp6Z2JDdjBDeldWcWZQaVBURFIyZnM4a2JLWENlQlVLWHJabmx1VlQ0bHZYOTZwYy1yQXRhSVo5ZkdmRllIZVFOTGdKNnpodE5hMURTRU1fN3NCdDljZ0dRV2RlYWpmSDg3clBsbWY1SjFuZ2p0UGp0NnZtR2tPWVZkY0R5OEw3Z3FydFc5ek5aR0N3eUphMyJ9" | openssl dgst -sha256 -hex -sign $PRIV_KEY
```



# 失败三、Let's Encrypt官网工具Certbot申请免费SSL证书——成功！但首页被绑定成nginx的welcome页面，且配置修改可能导致网站打不开

## 1、证书更新

Let's Encrypt的证书有效期是90天，时间短了点儿，不过Let's Encrypt支持证书更新，到期前更新证书即可。certbot 提供了更新证书的命令`cerbot renew`，会自动更新所有已申请的ssl证书。

想要实现到期前自动更新的话，做个crontab任务，就不再多吧唧了。

sudo certbot --nginx -d luccake.top -d www.luccake.top

/etc/letsencrypt/live/luccake.top/fullchain.pem

4）检测是否成功安装https

### 2、问题：SSL证书安装后，ip访问显示不安全也进不去，用域名登录成功显示https但是一直停在Welcome to nginx!页面？？

很有可能是证书安装验证好域名，安装在主机里，但是还没有跟网站项目做关联配置。





