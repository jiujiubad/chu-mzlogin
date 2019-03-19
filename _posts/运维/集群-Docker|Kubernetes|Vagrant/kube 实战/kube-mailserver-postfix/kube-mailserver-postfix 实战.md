# kube-mailserver-postfix 实战

20180809【Kubernetes】【k8s】【Docker】【docker-compose】【postfix】【邮件】【邮件服务】【SMPT】

[TOC]

## 过程中的问题和解决思路

### 做不出的原因

1、docker-compose 用了环境变量，但却没有加载 `.env` 文件，导致环境变量全部为空。检查办法如下：

```
docker exec -it <container_name> bash
```

2、docker-compose 的 log 显示 mailserver 已经成功搭建，但是不知道要如何用账号连接。

尝试用『邮件.app』『foxmail.app』连接失败

### 解决问题的关键

1、没有理解客户端和服务器端。

* 首先，本地没有外网 ip，不适合用来做服务器端。

* 其次，邮件服务需要一个邮件服务器，可以用『谷歌云』或『本地 vagrant』开一台，最终域名都要指向服务器 ip，所以需要给客户端的 `/etc/hosts` 配置 `ip地址 mail.domain.com domain.com`

* 最后，邮件的收发模拟，除了用『邮件.app』『foxmail.app』，还可以用『ruby 的 mail 库』，前者只有简单的连接不成功的报错无法进一步 debug，所以要用『ruby 的 mail 库』进行调试

  > Install a Complete Mail Server with Postfix and Webmail in Debian 9：https://www.tecmint.com/install-postfix-mail-server-with-webmail-in-debian/comment-page-2/



## 端口

SMTP 发件：25，SSL端口：465 / 587

POP3 收件：110，SSL端口：995

IMAP4 收件：143，SSL端口：993



## 前提

痛点：第三方的邮件发送服务普遍都是共享IP（后面还试过SendCloud、），而共享IP并不能确定是否已经达到接收方的数量限制，一旦达到了就无法再发送。解决办法：

- 购买独立IP，但是贵
- 搭建 postfix 邮件服务器



## 使用

myhostname = sample.centospub.com　 ← 变为此状态，设置系统的主机名

mydomain = centospub.com　 ← 变为此状态，设置域名（我们将让此处设置将成为E-mail地址“@”后面的部分）

inet_interfaces = all　 ← 变为此状态，接受来自所有网络的请求

mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain　 ← 变为此状态，指定发给本地邮件的域名

SMTP 认证密码：saslpasswd2 -u sample.centospub.com -c centospub　 ← 为centospub用户设置SMTP认证密码

alternatives --config mta　 ← 设置默认MTA

chkconfig saslauthd on　 ← 将SMTP-Auth设置为自启动



### SMTP 配置

SMTP服务器方面的配置，但目前只具从备客户端通过服务器**『发送邮件』**的功能。



### POP / IMAP 配置

pop/imap是 MUA 从邮件服务器中**『接收邮件』**时使用的协议。

​       其中，与 POP3 是从邮件服务器中下载邮件比起来，IMAP4 则是将邮件留在服务器端直接对邮件进行管理、操作。

可以用 **『Dovecot』** 来实现对 POP3 及 IMAP4 等协议支持的邮件接收服务器的搭建。



```
docker run -p 25:25 -e maildomain=127.0.0.1 -e smtp_user=aaron99@localhost.com:Qq112233 --name postfix -d catatnight/postfix  
```



### 测试 ip

35.221.238.101.nip.io



## 参考资源





