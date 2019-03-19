# kube-知识点

20180809【Kubernetes】【k8s】【Docker】【docker-compose】

[TOC]

## 前提





## Dockerfile、docker-compose、Kubernetes、Ansible 之间的关系？

Dockerfile to docker-compose to kubernetes

写 Dockerfile 是为了用 Docker-compose 来开启相关服务，来验证这些命令安装出来的环境能不能跑通

用同一套代码，翻译成不同的技术栈 Ansible 和 Kubernetes



## 如何搜索和 hack 别人的项目

### 步骤1 docker-hub 找相关镜像，按 star 排名

1）搜索，https://hub.docker.com/r/gitlab/gitlab-ce/，依次打开描述里的链接，找到相应的 github 项目以及使用方法

2）主要看基础镜像的 Dockerfile FROM 什么，尽量选官方的，因为个人的项目不知道被人植入了什么东西。包管理工具最好是 Ubuntu 16.04。

### 步骤2 Docker-compose | k8s | ansible 迁移

1）搜索`site:github.com docker gitlab-ce/ldap/confluence`，找到`github`的项目

2）筛选项目

- 找 FROM 的镜像是 ubuntu:16.04 官方镜像的；
- 找项目时间是今年的；
- 如果是破解版的，比如 confluence，要按照破解教程，修改 Dockerfile

3）在本地跑，跑的起来就可以迁移到项目



## 配置 affinity（亲和性）

> 参考 kube-openldap、kube-confluence 项目

### 目的

不论是 node 的亲和性设置，还是 pod 的亲和性或非亲和性设置，目的都是为了让 deployment 或 job 找到 node 节点。

- 先设置数据库 sql 的亲和性，找到 node 节点（对于整个集群来说，每个项目的设置基本是一样的）
- 再设置自己的反亲和性，不跟自己在同个 node 节点
- 在设置自己的亲和性，跟数据库 sql 在一起

### 设置

以数据库为准，设置 node 亲和性

其他的跟着数据库，设置 pod 亲和性。首先对于自己是反亲和性，其次对于数据库是亲和性



## 配置 kube/services

设置 NodePort，才能在本机开放端口以访问页面



## 配置 kube/volumes

var/opt/xx 对应 data，7 G

var/log/xx 对应 log

etc/xx 对应 config，5 G

database，10 G

redis，12 G



## rails key 和 环境变量

### 本地环境变量用 application.yml

用 gem figaro，相当于执行 `source xx`，把环境变量加载到本地环境中

### 服务器如果没有 kube ，环境变量放哪——credential.yml

### 如果有 kube，环境变量放哪——kube/secrets，好处是什么？

放在 credential.yml，环境变量是写死的，如果要修改某个环境变量，就要重新 build 镜像，至少花十多分钟。

放在 kube/secrets，环境变量修改后，只要重新 `maek clean` 和 `make all`，几十秒就搞定。并且，kubernetes 适用任何语言，不会局限于 ruby。



## kube 数据库连接

环境变量大部分服务连接靠 host，有的靠 xx_backedn（比如 confluence）

大部分是在页面服务如 puma、phpldapadmin 前完成连接，就必须配置好环境变量。也可以在页面上进行数据库连接，比如 confluence 



## 参考资源





