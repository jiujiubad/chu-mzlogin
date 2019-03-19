* 201805
* 工具+mac+vps



```
xiaoyu (v2ray_8381):
ssh root@67.218.148.196 -p 29506

google1 (v2ray_456):
35.185.159.20

google2 (v2ray_456):
35.234.62.90

amazon ec2 (Brook_456):
13.209.19.115
ssh -i "miyaodui.pem" ubuntu@ec2-13-209-19-115.ap-northeast-2.compute.amazonaws.com

使用v2ray，配置Websocket+cdn，满血复活http://ping.pe/  或ipip.net
```

### 2018年4月4日发布

视频地址：https://www.youtube.com/watch?v=pgGK5W1z3jg

v2ray服务端安装脚本：[https://233blog.com/post/16/](https://www.youtube.com/redirect?v=pgGK5W1z3jg&event=video_description&redir_token=F6sIQX9ZL7dMf4xR2tO6zIToBj18MTUyNjI4OTg2NEAxNTI2MjAzNDY0&q=https%3A%2F%2F233blog.com%2Fpost%2F16%2F)  

MAC客户端:[https://233blog.com/post/25/](https://www.youtube.com/redirect?v=pgGK5W1z3jg&event=video_description&redir_token=F6sIQX9ZL7dMf4xR2tO6zIToBj18MTUyNjI4OTg2NEAxNTI2MjAzNDY0&q=https%3A%2F%2F233blog.com%2Fpost%2F25%2F) 

Windows客户端:[https://233blog.com/post/24/](https://www.youtube.com/redirect?v=pgGK5W1z3jg&event=video_description&redir_token=F6sIQX9ZL7dMf4xR2tO6zIToBj18MTUyNjI4OTg2NEAxNTI2MjAzNDY0&q=https%3A%2F%2F233blog.com%2Fpost%2F24%2F) 

路由器梅林（未亲测，需离线安装） [https://pan.baidu.com/s/1_VPcolRErQUp...](https://www.youtube.com/redirect?v=pgGK5W1z3jg&event=video_description&redir_token=F6sIQX9ZL7dMf4xR2tO6zIToBj18MTUyNjI4OTg2NEAxNTI2MjAzNDY0&q=https%3A%2F%2Fpan.baidu.com%2Fs%2F1_VPcolRErQUpAbO3uA8ERg)

### 更多阅读：

V2Ray 一键安装脚本疑问集合，https://233blog.com/post/27/

使用 Cloudflare 中转 V2Ray WebSocket 的流量来避免 IP 被墙，https://233blog.com/post/22/



### 谷歌云配置

地区：asin-east1-a

机器类型：微型（最小的）

启动磁盘：默认 Debian GNU/Linux 9

勾选： HTTP、HTTPS  流量

![](https://ws2.sinaimg.cn/large/0069RVTdgy1fv1n72nqtvj30t30pw45t.jpg)

开启端口：VPC network-Firewall rules-[default-allow-http](https://console.cloud.google.com/networking/firewalls/details/default-allow-http?project=empyrean-caster-215720) 和 [default-allow-https](https://console.cloud.google.com/networking/firewalls/details/default-allow-http?project=empyrean-caster-215720) 添加端口

```
tcp:80; tcp:234; tcp:456
```



## 一、安装或卸载

系统要求：Ubuntu 14+ / Debian 7+ / CentOS 7+ 系统的小鸡鸡 

推荐使用：**Debian 9 x64系统**，脚本会自动启用 BBR 优化（其他系统要在第二步手动安装启用）。 

### 步骤1 v2ray服务端安装

```
sudo -i
或
ssh root@ip地址
```

使用 root 用户输入下面命令安装或卸载

```
bash <(curl -s -L https://233blog.com/v2ray.sh)
```

> 如果提示 curl: command not found ，那是因为你的小鸡没装 Curl ubuntu/debian 系统安装 Curl 方法: `apt-get update -y && apt-get install curl -y` centos 系统安装 Curl 方法: `yum update -y && yum install curl -y` 安装好 curl 之后就能安装脚本了

#### BIG东东的安装选项：

* TCP
* v2ray端口234
* 广告拦截n
* 是否配置shadowsocks，选y
* ss端口456（注意：这里安装的是ss，而不是ssr，客户端要选ss的）
* 加密ase-256-cfb

![image-20180513193947777](https://ws3.sinaimg.cn/large/006tKfTcgy1fr9y3yjlqsj30hn0f70vc.jpg)

### 步骤2 快速管理（非Debian安装加速器）

```
v2ray
```

选择9 `其他`，选择1 `安装BBR`。

* 如果已安装会提示 `BBR 已经启用啦...无需再安装 `。
* 如果未启用，需要按流程安装，注意安装完成时提示 `Do you want to restart system? `，一定要选择 `n`。完成安装后再重启服务器，执行 `reboot`

`v2ray info` 查看 V2Ray 配置信息
`v2ray config` 修改 V2Ray 配置
`v2ray link` 生成 V2Ray 配置文件链接
`v2ray infolink` 生成 V2Ray 配置信息链接
`v2ray qr` 生成 V2Ray 配置二维码链接
`v2ray ss` 修改 Shadowsocks 配置
`v2ray ssinfo` 查看 Shadowsocks 配置信息
`v2ray ssqr` 生成 Shadowsocks 配置二维码链接
`v2ray status` 查看 V2Ray 运行状态
`v2ray start` 启动 V2Ray
`v2ray stop` 停止 V2Ray
`v2ray restart` 重启 V2Ray
`v2ray log` 查看 V2Ray 运行日志
`v2ray update` 更新 V2Ray
`v2ray update.sh` 更新 V2Ray 管理脚本
`v2ray uninstall` 卸载 V2Ray

 

## 二、配置文件路径

V2Ray 配置文件路径：/etc/v2ray/config.json
Caddy 配置文件路径：/etc/caddy/Caddyfile
脚本配置文件路径: /etc/v2ray/233blog_v2ray_backup.conf

> 警告，请不要修改脚本配置文件，免得出错。。
> 如果你不是有特别的需求，也不要修改 V2Ray 配置文件
> 不过也没事，若你实在想要瞎折腾，出错了的话，你就卸载，然后重装，再出错 ，再卸载，再重装，重复到自己不再想折腾为止。。

## 三、测试工具

1）安装htop

```
apt-get install htop
```

2）使用htop

```
htop
```



### debug

打开 shadowsocks 配置

```
# 查看日志文件大小
ls -lht /var/log/v2ray

# 打开配置文件
vi /etc/v2ray/config.json
```

如果 log 文件太大，可以设置 success.log 为空

```
# 修改配置
"log": {
  "access": "",
  "error": "错误日志文件地址",
  "loglevel": "warning"
}
```

