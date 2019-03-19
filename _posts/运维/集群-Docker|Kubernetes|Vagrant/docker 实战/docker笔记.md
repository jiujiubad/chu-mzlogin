20180718【docker】

# 一、docker入门视频

视频：https://www.youtube.com/watch?v=mbz_WgsItw0

## 1、部门冲突

1）原因是：不同机器配置环境的不同，导致开发/运维/测试部门冲突不断。

## 2、docker结构

### 2.1 特点

1）开箱即用

2）一次构建多次运行

### 2.2 四大成员

1）Dockerfile——构建脚本

2）Image镜像——Dockerfile构建的产物

3）Container容器——镜像运行时的临时状态

4）Registry仓库——托管镜像的地方

### 2.3 关系

![image-20180619110145964](https://ws1.sinaimg.cn/large/006tKfTcgy1fsgb2d4mioj30f508wn0n.jpg)

### 2.4 官方Demo

1）Dockerfile，官方最简版

```
# Dockerfile for installing and running Nginx
 
# Select ubuntu as the base image
FROM ubuntu
 
# Install nginx
RUN apt-get update
RUN apt-get install -y nginx
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
 
# Publish port 80
EXPOSE 80
 
# Start nginx when container starts
ENTRYPOINT /usr/sbin/nginx
```

- FROM 意味着从仓库中选择一个基础镜像
- RUN 意味着在容器中执行一个命令
- EXPOSE 表示映射一个端口到主机中
- ENTRYPOINT 是当容器运行时的一个初始化命令

2）Dockerfile制作的镜像几乎可以包含任何东西

- centos
- ubuntu
- debian
- mongo
- redis
- kafka
- 任何linux程序

## 3、docker使用

1）官方搜索nginx等基础镜像文件

```
vim Dockerfile

填写
FROM nginx
COPY index.html /usr/share/nginx/html
```

2）index页面

```
vim index.html

填写
<h2> hello docker </h2>
```

3）build，创建镜像

```
docker build -t test/mynginx:lastest . #-t是给镜像起名字，包括镜像名+标签名
```

4）查看，出现两个镜像test/mynginx和nginx

```
docker images
```

5）启动镜像

```
docker run -d --name=mynginx -p 8888:80 test/myngin #-i标准输入，-t会开启终端，-d后台执行
```

查看启动的容器，STATUS是启动时间

```
docker ps
```

输出

```
curl localhost:8888  #输出<h2> hello docker </h2>
```

6）nginx继承自debian，相当于一个小型操作系统

```
docker exec -it mynginx bash

uname -a
ls
cd /usr/share/nginx/html
cat index.html
```

查看docker官方写的nginx配置文件位置

```
cd /etc/nginx
ls
cat nginx.conf
```

7）更新index文件

```
<h2> hello docker update </h2>
```

让更改生效：

> 每一个容器，所依赖的镜像，镜像修改后容器不会变，变的只是它的tag。每一个镜像启动后，它的容器，会在原来的镜像最上层创建一个临时的读写层，所以你把原来老的容器停止后，其实整体的文件没消失，它依赖的还是原来老的镜像的那些基础文件，所以重启后它依赖的还是原来老的镜像。——必须重启开一个容器。

```
docker stop mynginx
docker rm mynginx
docker run -d --name mynginx -p 8888:80 test/mynginx
docker ps
curl localhost:8888

docker status #容器的消耗情况
```



另一种办法

```
docker ps -l #查看启动的容器，有docker的id
docker commit -m "Install Nginx" 54e8 steveltn:nginx #其中54e8是id前四位
docker images #查看镜像
```



# 二、docker部署视频教程

视频：https://www.youtube.com/watch?v=APq0H4wRWiY、https://www.youtube.com/watch?v=cHnLnr-kyn4

```
rails new xxx -d mysql
cd xxx
git init
rails g scaffolld Topic title:string content:text
rails s -p 3003

rails g --help
rails s --help

touch Dockerfile
FROM ruby:2.5.0
RUN apt-get update -y && apt-get install -y build-essential libmysqlclient-dev mysqlclient nodejs
WORKDIR /forum_example #工作目录
COPY Gemfile ./
COPY Gemfile.lock ./
RUN gem install bundler
RUN bundle install
COPY .. #copy docker环境里的工作目录
CMD bundle exec rails server -b '0.0.0.0' -p 8000 #bundle exec避免bundle版本不一样

docker ps
docker builde .
```





# Docker - 从入门到实践

https://yeasy.gitbooks.io/docker_practice/

## 安装

```
$ docker --version 
$ docker-compose --version 
$ docker-machine --version
```

## Dockerfile

docker run cmd entrypoint 的区别？

## 清理

```
docker image prune
docker container prune
docker volume prune

# 停止所有正在运行的容器
docker kill $(docker container ls -q)  
```



### 本地的镜像文件都存放在哪里？

答：与 Docker 相关的本地资源都存放在    /var/lib/docker/  目录下，以    aufs  文件系统为例，其中    container  目录存放容器信息，   graph  目录存放镜像信息，   aufs  目录下存放具体的镜像层文件。



### Docker 的配置文件放在哪里，如何修改配置？

答：使用    upstart  的系统（如 Ubuntu 14.04）的配置文件在    /etc/default/docker ，使用  systemd  的系统（如 Ubuntu 16.04、Centos 等）的配置文件在    /etc/docker/daemon.json 。