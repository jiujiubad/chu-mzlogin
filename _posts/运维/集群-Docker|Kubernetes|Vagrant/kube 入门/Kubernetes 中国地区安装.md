# Kubernetes 中国地区安装

20180902【docker】【kubernetes】【k8s】【安装】【代理】



## docker-ce-edge 版安装

官网下载



## kubernetes 安装问题

> 原因：gcr.io 被墙，不能拉取到镜像

### 报错 error

kubernetes is starting docker for mac

waiting for kubernetes to be up and running

Kubernetes is starting

### 解决办法

参考：https://github.com/docker/for-mac/issues/2720

docker 偏好设置-Proxies-选择 Manual proxy configuration-设置 http 和 https 为 `http://127.0.0.1:1087` （端口改为 shadowsocks 偏好设置里的 http 代理端口）

![](https://ws2.sinaimg.cn/large/006tNbRwgy1fuvjxe302rj30rm0sa0ww.jpg)

