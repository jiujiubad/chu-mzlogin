# Dockerfile-知识点

20180810【Kubernetes】【k8s】【Docker】【docker-compose】【Dockerfile】

[TOC]

## 前提





## Dockerfile 基础

编写 Dockerfile

```
# 清理编译软件、下载和展开的文件、apt 缓存文件
\ && apt-get purge -y --auto-remove $buildDeps 

# CMD 指令就是用于指定默认的容器主进程的启动命令的
CMD ["nginx", "-g", "daemon off;"]

# ARG 暂时的环境变量，在将来容器运行时是不会存在这些环境变量的
# ENV 环境变量

# COPY 和 ADD 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用  COPY  指令，仅在需要自动解压缩的场合使用 ADD

问题1：怎么进入 sudo 权限——基于 ubuntu 镜像不用 sudo
问题2：安装过程需要做选择和输入，在 Dockerfile 上怎么写
-y #默认yes
pass 'root'<<EOF
jiujiubad@gmail.com
EOF
```

增删改

```
docker build -t ubt16.04 .
docker rmi -f image_id
docker container run --rm --name ubuntu-test1 -it image_id /bin/bash

cat k8s/manifests-step0/*.yaml | kubectl apply -f -
docker-compose up -d --build --force-recreate

# 安装依赖项
sudo apt-get update
sudo apt-get install ca-certificates curl openssh-server postfix 
# 选择2. Internet Site, 输入 gmail.com

# 安装 Gitlab

apt-get install ufw
# 输入 y
apt-get update
apt-get upgrade
# 输入 y

```

用 ADD

```
bash-4.4# ls
atlassian-confluence-6.10.1  conf
```

用 COPY

```
bash-4.4# ls
atlassian-confluence-6.10.1.tar.gz  conf
```



## 参考资源





