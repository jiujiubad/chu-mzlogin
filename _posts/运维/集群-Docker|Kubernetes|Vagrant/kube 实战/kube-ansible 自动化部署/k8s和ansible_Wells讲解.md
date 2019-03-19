# 一、Ansible小项目

20180712

> 功能：一键部署工具，取代capistrano

`inventories/development.hosts`，开发环境的节点测试用的。通过`-i`的命令把host改掉，然后指定目录运行。——因为默认是找`hosts.ini`配置文件

## 1.	部署服务和添加节点

### 步骤	1.1清空集群reset.yaml

```
ansible-playbook reset.yaml
kubectl version  #只有Client Version，而没有其他version
```

### 步骤	1.2部署用deploy.yaml

```
kubectl get nodes   #成功后，可以看到
```

### 步骤	1.3开启服务

```
kubectl proxy --accept-
```

### 步骤	1.4添加节点

```
ansible-playbook add.yaml
```

刷新页面，看到新增了节点

## 2.	测试sample项目（内容是nginx）

步骤	1.测试，验证新增的节点能不能用

```
ansible-playbook test.yaml
```

## 3.	docker文件夹、kubernetes文件夹执行顺序

docker/default配置，先main.yml文件再tasks文件夹，再handlers文件夹。

docker/templates，自定义页面，默认用group_vars/all.yml。

main.yml文件，检测系统版本，用户检测，用户创建；安装常用工具。

## 4.	roles文件夹

检测系统版本，用户检测，用户创建

## 5.	图片

通过kube-proxy来通讯，配置保存在etcd

通讯工具四种：

kubectl只在主节点安装，其他节点只安装kubelet

## 6.	负载分配

nginx

pod

ingress



# 二、amz_selenium 和 amz_selenium_web 项目

20180716	【seminium】【ruby】

主节点一定要超过2G，否则跑的起来k8s，但是部署后跑不起来其他服务

好处：让我们专注于开发，而不用花太多精力在运维

docker-compose是为了验证dockerfile能不能跑通，然后再翻译成k8s的yaml

## 1.	文件分管

服务和端口拆分成两个，即deploy和services（暴露端口）

配置configmap、secret

## 2.	本地跑amz_selenium

```
docker-compose up
xx ps
xx log
```

### 方法一：用一个文件standord

### 方法二：扩展性好，拆分节点的方式

`docker-compose.yml`的`selenium-hub`配置是用来驱动浏览器的

配置hub和chrome——hub结合nodefirefox，前者专门跑java

### 注意：

跑起这个项目需要修改application.yml文件的redis密码

## 3.	部署方式

### 3.1	以前的方式

### 3.2	现在的方式

`.env`文件是给`docker-compose`用的，写了原本一些环境变量

`configmap`和`secret文件`是给k8s的镜像用的

`gem figaro`本来是给rails用的，需要在初始化时写`app/us/main_operate.rb的def init_figaro`，是本地开发用的

`docker-compose.yml/selenium-chrome`的配置：节点里面的debug版本，很强大，部署在线上也能用`vnc`服务，虽然是无头浏览器，但能看到docker是怎么运行的。指定版本，确保浏览器和驱动的版本是一致的。



注意：需要指定相应的节点，否则就是k8s随机分配。`nodeName` 和 `nodeselecter` 比较旧，比较死板（只能指定给谁，2️而不能指定不给谁），但能满足；`affinity` 可以指定某服务给谁、不给谁，更自由以后会主流。

## 4.	amz_selenium_web里的ansible

一键部署，除了有时master服务器，用跳板机来部署

这套东西可以迟一点再看

不是用push，而不需要服务端和客户端，只要对方服务器有python就可以

## 5.	防止集群被删除：阿里云的持久卷方案

nfs方案（或flocker），需要自己搭建nfs服务器

docker hub 私有仓库



