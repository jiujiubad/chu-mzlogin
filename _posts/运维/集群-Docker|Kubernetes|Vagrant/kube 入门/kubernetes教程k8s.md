w大文件：docker images、minikube vm

[TOC]





#  一、Kubernetes 集群编排系统

作用：在集群上部署、更新、调试容器

特点：无需停机，随时更新，自动分发和调度容器应用程序，任何部署更新都可以恢复到以前的 (稳定) 版本

## 1.1	常用概念

Minikube，本地VM上构建k8s集群的工具

kubectl CLI 命令行工具，是Kubernetes 群组管理器

StatefulSet 有状态集，是用于管理有状态应用程序的工作负载 API 对象。

Persistent Volumes 持久卷/容量。容器中的磁盘文件是短暂的, 在容器中运行时会给非平凡的应用程序带来一些问题。首先, 当容器崩溃时, kubelet 将重新启动它, 但文件将丢失-容器以干净的状态开始。其次, 当在一个 Pod 中运行容器时, 通常需要在这些容器之间共享文件。Kubernetes 卷抽象解决了这两个问题。

Persistent volume provisioning，即PV，持久卷调配（配置）

Headless Services，无头服务是一个 REST 对象, 类似于一个 Pod。

Cluster DNS for Services and Pods，群组DNS通知各个容器使用 dns 服务的 IP 解析 dns 名称。

ConfigMaps，允许您将配置工件与镜像分离，以保持容器里应用程序的便携性。

# 二、Kubernetes 基础模块

## 2.1	创建Kubernetes集群

![image-20180702123102243](https://ws3.sinaimg.cn/large/006tNc79gy1fsvep8vfkpj30d609l756.jpg)

**Master** 是集群的调度节点，负责管理集群

**Nodes** 是应用程序实际运行的工作节点

## 2.2	部署应用程序

### 2.2.1	部署

![image-20180702124250507](https://ws4.sinaimg.cn/large/006tNc79gy1fsvf1he0ldj30ck09fdgv.jpg)

创建**Deployment**

Deployment 创建的app实例调度到各个节点

如果节点不可用或删除，则部署控制器将替换实例

### 2.2.2	服务器发布

![image-20180702130901403](https://ws1.sinaimg.cn/large/006tNc79gy1fsvfsqfn9fj30kf0jpad0.jpg)

![image-20180702130929566](https://ws2.sinaimg.cn/large/006tNc79gy1fsvft7kokyj30iu0jz41o.jpg)

Kubernetes服务使用 [标签和选择器](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels)，匹配一组 Pod

标签、标签选择器与Kubernetes服务关联

 ServiceSpec 中指定类型发布：*ClusterIP*(默认) 、*NodePort*、*LoadBalancer*、*ExternalName* 

## 2.3	应用程序探索、外部可见、可扩展、更新

 **Rolling updates** 允许通过使用新的 Pods 实例逐个更新来实现零停机的部署更新。



## 2.4	Pods是什么？

Pod 模型可以理解为应用程序特定的 "逻辑主机"，并且可以包含相对紧密耦合的不同应用程序容器。

我们可以将命名空间和cgroups与多个线程结合起来，而这正是Kubernetes Pods的本质。Pods让你可以指定想要运行的容器，而Kubernetes自动地建立相应的命名空间和cgroups。实际上还要复杂一些，因为Kubernets并不使用Docker网络（Kubernetes使用[CNI](https://github.com/containernetworking/cni)，Container Network Interface，容器网络接口），但是本质是类似的。

![](https://ws1.sinaimg.cn/large/006tNc79gy1fsvfv3xg5sj30we0pemyd.jpg)



Kubelet 是负责 Kubernetes Master 和 所有节点之间通信的进程，它管理机器上运行的 Pod 和容器。



![image-20180702141112515](https://ws4.sinaimg.cn/large/006tNc79gy1fsvhof5e16j30ld0ghdip.jpg)



**Scaling** 是通过更改 Deployment 中的副本数量实现的。



# 一、[马铃薯筷子k8s教程](https://chopschips.net/blog/2018/05/30/docker-with-rails/#docker-image-ls-docker-images-%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%81%AE%E4%B8%80%E8%A6%A7%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B)

> 第一遍：跑通demo，遇到的问题和解决办法

confluence、ldap、gitlab、**自建邮箱服务stmp协议+域名**、pop3获取邮件（几行代码脚本）

docker，版本有很多个 CE社区版——稳定版18.3、探索版18.5（集成k8s）

miniku，用vm，但版本也有很多个



头盔：helm工具

图像：image

容器：container

泊坞|泊坞窗|泊坞集装箱|多克尔|码头工人：docker

## 1.1	Docker增删改

```
docker image xxx
docker container xxx
```

## 1.2	Docker Compose 和 Dockerfile

docker-compose.yml，是一次在YAML格式配置文件中管理多个容器的工具。

作用：开发环境执行mysql和redis等；执行已完成rails应用程序；

### ==1.2.1	error报错==	 

1）yarn install error报错： docker-compose up -d Cannot start service puma  Bind for 0.0.0.0:3306 failed: port is already allocated

```
 netstat -an | grep 3306  #查看端口占用
 
 关闭本地mysel：
 ①如果是brew安装的：brew service stop mysql
 ②如果是dmg安装的：打开系统偏好设置-mysql-stop mysql按钮
 
 重新运行：
 docker-compose up -d  
```

2）error报错：yarn install Expected version ">=4 <=9"

```
Instead, the proper solution is to delete node_modules/, package-lock.json & yarn.lock and run yarn install or npm i again.
```

3）foreman start -f Procfile 后error报错：

```
 ~/Documents/ror/clone/rails-k8s-demoapp ⮀ ⭠ master± ⮀  foreman start -f Procfile
21:09:36 web.1    | started with pid 19670
21:09:36 worker.1 | started with pid 19671
21:09:36 client.1 | started with pid 19672
21:09:38 web.1    | => Booting Puma
21:09:38 web.1    | => Rails 5.2.0 application starting in development 
21:09:38 web.1    | => Run `rails server -h` for more startup options
21:09:39 web.1    | Puma starting in single mode...
21:09:39 web.1    | * Version 3.11.3 (ruby 2.5.0-p0), codename: Love Song
21:09:39 web.1    | * Min threads: 5, max threads: 5
21:09:39 web.1    | * Environment: development
21:09:39 web.1    | * Listening on tcp://localhost:3000
21:09:39 web.1    | Use Ctrl-C to stop
21:09:39 client.1 |  10% building modules 1/1 modules 0 active                                         
21:09:39 client.1 | Project is running at http://localhost:3035/
21:09:39 client.1 | webpack output is served from /packs/
21:09:39 client.1 | Content not from webpack is served from /Users/apple/Documents/ror/clone/rails-k8s-demoapp/public/packs
21:09:39 client.1 | 404s will fallback to /index.html
21:09:40 worker.1 | exited with code 1
21:09:40 system   | sending SIGTERM to all processes
21:09:40 web.1    | terminated by SIGTERM
21:09:45 system   | sending SIGKILL to all processes

~/Documents/ror/clone/rails-k8s-demoapp ⮀ ⭠ master± ⮀  netstat -an | grep 3035
9796d713452269ed stream      0      0 9796d71345fc3035                0                0                0 /var/run/pppconfd
```

解决办法：

打开日志，查看error或success logs，看puma是否运行

```
docker-compose -f docker-compose-preview.yml up
或
docker-compose -f docker-compose-preview.yml logs -f
```

执行docker-compose，等待约30秒后重新打开http://localhost:3000/

```
docker-compose -f docker-compose-preview.yml up -d   #开启
docker-compose -f docker-compose-preview.yml down -v #关闭
```

### 1.2.2	扩展阅读：dockerfile 与 docker-compose的区别

帖子：https://blog.csdn.net/DDFFR/article/details/77049118

结论：docker container管理一个docker镜像容器；docker compose，管理多个docker镜像容器；与Docker Compose一样，k8s是一个管理多个容器的工具。

虽然Docker Compose能够在一个主机上激活多个容器，但是k8s允许多个Docker服务器构建一个集群，并且可以在其上分布多个容器。

## 1.3	kubernetes增删改

```
minikube status #查看minikube的状态
minikube dashboard  #要等几十秒，才能打开网页
```

### 1.3.1	error报错：minikube start Could not find an IP address

帖子：https://github.com/kubernetes/minikube/issues/1926， https://github.com/kubernetes/minikube/issues/521

```elm
方法一：
先执行：
minikube delete  
然后重新执行：
minikube start --cpus=3 --memory=2048 --vm-driver=hyperkit --disk-size=12g

方法二：
删除~/.minikube/machines/minikube/hyperkit.pid，然后重新执行minikube start --cpus=3 --memory=2048 --vm-driver=hyperkit --disk-size=12g

方法三：
this worked after rebooting my MacBook. 
minikube delete and retry solved the problem for me.
```

## 1.4	ConfigMap配置mysql、redis、sidekiq.yaml

deploy、configmap、service、secret，四个api对象。

~~在什么平台服务上，做k8s集群：Amazon EBS、GCE、VM+minikube~~

## 1.5	高级版：滚动更新、有状态集、证书、DNS

查看log几种方法：

```replicasets
watch -n 1 kubectl get deployments,replicasets,pods
stern "demoapp*"
kubectl get deployments,replicasets,pods
```

1】error报错：运行cat *.yaml | sed s/\${MINIKUBE_IP}/$MINIKUBE_IP/ | kubectl apply -f -，redis-deploy.yaml报错：Deployment.apps "demoapp-redis" is invalid: spec.strategy.rollingUpdate: Forbidden: may not be specified when strategy `type` is 'Recreate' 

## 1.6	helm打包和管理应用程序

# 三、三刷

> 第三遍：demo项目使用
>
> 重要概念
>
> 重要配置文件、及相应的命令

## 第一章

### 3.1.1	镜像增删改

```
docker image pull xx  #获取镜像
docker image ls       #显示镜像
docker image rm 5195076672a7  #删除镜像
```

### 3.1.2	容器增删改

```
docker container ls -a  #显示容器。-a一并显示已停止的容器
docker container run -it --rm mysql:5.7.21 /bin/bash  #激活容器。-it调用shell，--rm结束时删除容器
docker container run --rm -d -p 3306:3306 -v $(pwd)/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql --name db1 mysql:5.7.21 40a551e33878d12c0c2fff330e6af0ad487be2235919a49ebc29dd4c084ddcf1  #-p端口，-v将主机侧路径映射到容器上的路径（涉及持久卷），-e添加环境变量并启动容器，--name容器的名称（如果省略，则自动给出随机值）
docker container exec -it db1 /bin/bash  #在活动容器中执行另一个命令
docker container logs -f db1  #容器日志。-f继续显示新日志
docker container stop db1  #停止容器
docker container rm db1  #删除容器
docker container rm -f db1  #停止并删除
```

## 第二章

要等几十秒，open http://localhost:3000/

```
docker-compose up -d  #创建
docker-compose down -v  #删除，-v是同时删除挂载的卷
docker-compose ps  #显示
```

==问题：为什么只有这个指令可以启用localhost:3000？==

```
docker-compose -f docker-compose-preview.yml up -d

这两个不能启用页面
docker-compose -f docker-compose.yml up -d
docker-compose up -d
```

dockerfile常用

```
FROM #指定基本镜像
ARG	 #环境变量
ENV  #环境变量
WORKDIR	#目录

COPY
RUN
```

dockerfile使用

```
docker image build . -t demoapp:latest  #新建镜像。.是构建上下文，-t镜像名称
docker container run -it --rm demoapp:latest ls  #新建容器。ls显示容器文件
```

### 报错error：yarn install The engine "node" is incompatible with this module. Expected version ">=4 <=9"

解决办法：

```
yarn install --ignore-engines
```

## 第三章

==问题：minikube要在vm上运行，需要一个制作好rails环境的镜像，如果不用minikube要用什么工具做什么额外配置？==

minikube使用

```
minikube start --cpus=3 --memory=2048 --vm-driver=hyperkit --disk-size=12g
```

kubectl使用

```
kubectl apply -f xx.yaml  #创建和更新api对象
cat *.yaml | kubectl apply -f -  #创建和更新api对象
cat *.yaml | kubectl delete -f -  #删除api对象
kubectl get deployments,replicaset,pods  #显示状态
kubectl logs deployments/mysql  #deployment容器的日志
kubectl logs --selector "app=mysql"  #用配置文件里的matchLabels设置来指定
kubectl port-forward deployment/mysql 3306:3306  #使用ssh连接到k8s群集的节点
kubectl delete -f k8s/manifests-step0/mysql-deploy.yaml  #删除api对象
kubectl explain --api-version=apps/v1 deployment  #引用指定对象的API引用
```

pod用selector指定比如app: mysql，pod的type分为四种

* ClusterIP
* NodePort
* LoadBalancer
* ExternalName

`kubectl run`，临时容器，没有YAML文件方便，可用于排除故障。

## 第四章

构建rails image的几种方法：Docker Hub、AWS ECR、私人注册服务、miniku vm docker build

四个对象的关系（语言表达可能有误）：

* Deployment，启动和管理pod
* Service，为pod提供访问接口
* Configmap 和 Secret，设置Deployment的环境变量

Makefile的使用，建议再简单的也用这种方式。

# 二、二刷

> 第二遍：解决什么问题？有什么局限？

1、常用docker命令

2、Docker Compose构建本地预览环境。

3、最小k8s和kubectl命令：deployment对象和service对象、minikube的使用。

4、rails on docker compose/k8s 

deploy、configmap、service、secret，四个api对象。

 k8s/step1/docker-compose-preview.yml，本章遗留三个问题：

- 激活多个puma容器并行执行`rails db:setup`，导致错误。
- MySQL和Redis上的数据不会持久化，因此如果停止容器，数据也会消失。
- 在生产环境中，从外部访问puma的节点很困难。

5、 k8s/step2-4分别解决第四章遗留的三个问题。本行遗留两个问题：

- 创建仅更改某些设置的环境很困难，例如登台环境和QA环境
- `Secret`在定义文件中读取/写入base64编码值很麻烦

6、helm工具解决第五章的两个问题。

# 四、四刷

打开黑盒子：这个功能需要修改什么文件，以及对应的代码

### 4.1	docker-compose验证dockerfile能不能跑通

docker-compose.yml

docker-compose-preview.yml

.envrc 或 .env

Dockerfile

* [Dockerfile参考| Docker文档](https://docs.docker.com/engine/reference/builder/)
* [Dockerfile参考|日文文档](http://docs.docker.jp/engine/reference/builder.html)

```
./bin/setup-db-and-start-puma
./bin/start-sidekiq
	./bin/wait-for
	lib/tasks/db.rake
	
.dockerenv/rails
.dockerenv/mysql

config/cable.yml
config/database.yml
```



### 4.2	已验证的docker-compose翻译成k8s的yaml

k8s镜像的`configmap`和`secret文件`w