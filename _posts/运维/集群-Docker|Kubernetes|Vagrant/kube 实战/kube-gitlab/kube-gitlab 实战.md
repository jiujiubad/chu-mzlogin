# kube-gitlab 实战

20180809【Kubernetes】【k8s】【Docker】【docker-compose】【gitlab】【代码仓库】

[TOC]

## 前提

gitlab 端口：80



## 正文

Gitlab 的 Dockerfile 参考：https://github.com/geerlingguy/ansible-role-gitlab/blob/master/tasks/main.yml

找小文要成功搭建 Gitlab 的教程：https://www.jianshu.com/p/49f60698b411

```
双核 + 4G RAM

# 扩展 Swap 虚拟内存
# 安装 Gitlab

# 只有 docker-compose，https://github.com/mgcrea/docker-compose-gitlab-ce/blob/master/docker-compose.yml
mgcrea/docker-compose-gitlab-ce

# 只有 Dockerfile，https://github.com/toshi0123/gitlab-ce/blob/master/Dockerfile
toshi0123/gitlab-ce
```

[IBM/Kubernetes-container-service-GitLab-sample](https://github.com/IBM/Kubernetes-container-service-GitLab-sample)



### 报错error：gitlab configure unix listener: listen unix /var/opt/gitlab/gitaly/gitaly.socket: bind: file name too long

```
挂载的问题 subPath、mountPath: /var/opt/gitlab

http://gitlab.example.com:30080 配置 type: NodePort、type

nginx作用：配置域名、负载均衡

修复Kubernetes中的子路径卷 subpath 漏洞：
https://kubernetes.io/blog/2018/04/04/fixing-subpath-volume-vulnerability/
```



### 怎样才能绕过那些坑

```
# 二八定律：
找到跟官方相关的能正确运行的项目最重要，所以才说使用 google 的能力直接反映程序员的水平。
（docker hub 搜索 gitlab，打开 gitlab/gitlab-ce，通过 description 的链接找到 Omnibus-gitlab 项目，测试不能跑通。再搜索 Omnibus-gitlab docker，第五个搜索结果 A step-by-step guide to running GitLab CE in Docker - IBM Code，评判项目，跑通了项目，就拿这个改造为 k8s。）
其次，才是 DIY 或叫 Hack 能力。

# 好项目的评判标准：
1、源于官方镜像，比如 ubuntu:16.04 或 gitlab-ce:11.1.1-ce.0；或 IBM、Medium、Digitalocion、StackOveflow 等大型问答网站 及 Github、Bitbucket、Gitlab 等代码仓库
2、star 数量多
3、今年有更新；
4、有我们要的 Dockerfile | Docker-compose | kubernetes 文件

# 如何有效地 Hack ？
1、Docker-compose 的语法，参考已有项目写法外，多阅读 Docker 教程的 Docker-compose 一章，对现有用到的写法，和没有用到的写法有个印象。
```



==更多搜索：gitlab 禁用对外注册、汉化==



帖子：

https://developer.ibm.com/code/2017/07/13/step-step-guide-running-gitlab-ce-docker/

https://developer.ibm.com/code/patterns/run-gitlab-kubernetes/

![](https://ws4.sinaimg.cn/large/006tKfTcgy1ftoabmp7iyj31kw13wq4b.jpg)





### gitlab 配置可以 git push -u origin master

问题：GitLab: You are not allowed to force push code

解决办法：Settings-Repository-Protected Branches-展开后点击最下面的 `Unprotect` 按钮

### gitlab 删除项目

进入项目-Settings-General-Advanced 展开后拉倒最下面-Remove project



