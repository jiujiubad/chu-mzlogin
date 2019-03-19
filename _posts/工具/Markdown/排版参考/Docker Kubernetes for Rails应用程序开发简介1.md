



[TOC]

Docker / Kubernetes for Rails 应用程序开发简介1 Docker

```
# 标题
【标签1】【标签2】【标签3】

​```
目录
​```

# 摘要
xxxxxxxxxxxxxxxxxxxx
整个系列结构如下：
* 斜向发达
	* 放大放大
* 扥阿凡达
	* 放大放大
	* 放大放大
	
# 前提
xxxxxxxxxxx
table

# 最小的Docker简介

## 什么是 Docker？

## 关于 Docker 的命令系统

## 参考信息

有关如何使用它的更多详细信息，请参阅以下文档。

* 使用Docker命令行| Docker文档

* 此外，虽然相应的版本有点旧，但也有日文文件。

```





# Docker / Kubernetes for Rails应用程序开发简介1

【kubernetes】【docker】【rails】

```
目录
1. 概述
2. 假设
3. 最小Docker简介
3.1。 什么是Docker
3.2。 关于docker的命令系统
3.3。 关于贝壳补充
3.4 泊坞窗图片拉（码头工人拉）：获取图像
3.5 泊坞窗图像LS（泊坞窗图像）：要查看图像的列表
3.6 泊坞图像室（泊坞RMI）：删除图像
3.7 泊坞容器中运行（泊坞执行命令）：启动容器（壳编）
3.8 泊坞容器中运行（泊坞执行命令）：启动容器（mysqld的编）
3.9 泊坞集装箱LS（泊坞Ps）的：以获得容器的列表
3.10 多克尔集装箱Exec的（泊坞执行）：向启动期间运行在容器的另一命令
3.11 泊坞窗集装箱日志（码头工人日志）：获取该日志的容器
3.12 多克尔容器室（泊坞RM）：移除容器
3.13。 参考信息
```

编写程序以使Rails应用程序能够在Kubernetes（k8s）上运行。



# 摘要

本文是系列丛书中的第一篇。整个系列的概要如下。

首先，让我们简要介绍一下Docker和Kubernetes的概述， 并介绍具有教程风格的`docker`命令和`kubectl`命令的基本用法。

然后，作为题材非常小的说明书的具体Rails应用程序，它显示了一个具体的样品和使用配置文件和泊坞撰写的Kubernetes的清单的，如何使用最终头盔解释部署到Kubernetes簇我会的。

因为如果泊坞窗和Kubernetes全面的所有功能，试图通过一个学习需要的大量时间，这篇文章的一个细节中注重“Rails应用程序中Kubernetes操作”的概念和功能缩小到必要的最小值，并继续指向更详细的材料。

整个系列的结构如下。

- 第一个

  Docker版

  - 最小的Docker简介
  - `docker`命令教程

- 第二个

  Docker Compose / Dockerfile版

  - Docker Compose的最小介绍
  - 使用Docker Compose安装和管理各种中间件
  - 如何制作Rails应用程序的Docker镜像
  - Docker Compose构建本地预览环境

- 第3届

  Kubernetes介绍

  - 介绍最小k 8s
  - 如何使用minikube
  - `kubectl`命令教程

- 第四届

  Kubernetes基础知识

  - `kubectl`如何使用YAML格式的命令和清单文件将Rails应用程序部署到k8s

- 第5个

  Kubernetes应用版本

  - 解决基本部分留下的问题

- 第六届

  赫尔姆版

  - 最小头盔简介
  - 如何使用Helm将Rails应用程序部署到k8s



所有示例代码都在这里。

[https://github.com/kwhrtsk/rails-k8s-demoapp](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fgithub.com%2Fkwhrtsk%2Frails-k8s-demoapp)

# 前提

- 各种工具的安装过程基于macOS的工作。

- 我

  将使用[Homebrew](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.brew.sh%2FInstallation)和

  Homebrew-Cask

  。

  - 安装Homebrew - Cask`brew tap caskroom/cask`

- 我将使用Docker for Mac。

  - 单击[Docker Community Edition for Mac](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fstore.docker.com%2Feditions%2Fcommunity%2Fdocker-ce-desktop-mac)上的获取Docker

- 稍后将描述k8s相关工具的安装过程。

- 除了工具的安装过程外，我认为可以通过Linux上的相同程序大致确认操作。

下面的每个版本都确认了该操作。

| 名                | 版本                   |
| ----------------- | ---------------------- |
| MACOS             | 高山脉（10.13.4）      |
| 适用于Mac的Docker | 18.0.3.1-CE-mac65      |
| 红宝石            | 2.5.1                  |
| 轨道              | 5.2.0                  |
| minikube          | 0.27.0（k 8 s 1.10.0） |
| kubectl           | 1.10.2                 |
| 舵                | 2.9.1                  |
| hyperkit          | v0.20171204-60-g0e5b6b |
| VirtualBox的      | 5.2.8                  |



# 最小的Docker简介

Docker初学者将`docker`编写Docker的知识和命令的操作方法，这些是在k8s上运行Rails应用程序所必需的最小值。如果您想了解Rails特有的主题，请跳至[Docker Compose / Dockerfile](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fchopschips.net%2Fblog%2F2018%2F05%2F30%2Fdocker-compose-with-rails%2F)。

## 什么是Docker？

它是使用称为LXC（Linux容器）的技术开发和部署应用程序的工具和平台。由于有许多文档可以解释LXC和Docker，因此这里省略了细节。

- [LXC（Linux容器）的结构和基本用法在15分钟内|樱花知识](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fknowledge.sakura.ad.jp%2F2108%2F)
- [第一个Docker是：Super Introductory Docker - @ IT](http://www.atmarkit.co.jp/ait/articles/1701/30/news037.html)



## 关于docker的命令系统

在2017年1月发布的Docker 1.13中，`docker`命令的组成已经整理出来。公告[介绍泊坞窗1.13 -泊坞窗博客](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fblog.docker.com%2F2017%2F01%2Fwhats-new-in-docker-1-13%2F)的`CLI restructured`是的一部分。

“我们将继续支持旧命令，但建议使用新命令”，因此本文档将使用新的命令方案进行解释。但是，由于许多旧文档都是在旧的命令系统中编写的，因此我们还介绍了相应的旧命令。

本文档中介绍的命令的新旧对应关系如下。基本上，它移动到图像或容器的子命令，但它是粗体，因为有一些差异。

| 老命令       | 新命令                | 说明                   |
| ------------ | --------------------- | ---------------------- |
| 码头工拉     | 码头图像拉            | 获取图像               |
| 码头**图片** | 码头图像**ls**        | 显示图像列表           |
| 码头工人rmi  | 码头图像**rm**        | 删除图片               |
| 码头运行     | docker container run  | 启动容器               |
| 泊坞窗**诗** | 集装箱码头工人**LS**  | 显示容器列表           |
| 码头工人     | docker container exec | 在活动容器中执行新命令 |
| 码头日志     | 码头工人集装箱日志    | 显示容器日志           |
| 码头工人     | 码头工人集装箱公司    | 删除容器               |

以下部分说明如何按顺序使用这些命令。标题的括号是旧命令。

此外，在每个部分的末尾都有一个指向参考的链接，但至少在撰写本文时，旧命令更详细，因此请在必要时参考。在日文版的文档中还没有新命令版本的引用。

## 关于shell补充

`docker`子命令接受`861162a44`哈希值，例如，或`romantic_neumann`由随机英语单词组合自动生成的容器名称， 例如，作为参数。

Docker for Mac附带了一个脚本，用于使用bash和zsh完成命令，但只有安装它才会生效。我写了一篇关于设置完成的单独文章，所以请参考这里。

[如何用bash / zsh和fzf补充与Docker相关的命令](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fchopschips.net%2Fblog%2F2018%2F04%2F17%2Fdocker-completion%2F)

## docker image pull（docker pull）：检索图像

图像是容器的模型。`docker image pull`使用命令指定存储库和标记并获取映像。`5.7.21`要获取从官方MySQL存储库标记的图像，请执行以下操作。

```
$ docker image pull mysql:5.7.21
5.7.21: Pulling from library/mysql
2a72cbf407d6: Pull complete
38680a9b47a8: Pull complete
4c732aa0eb1b: Pull complete
c5317a34eddd: Pull complete
f92be680366c: Pull complete
e8ecd8bec5ab: Pull complete
2a650284a6a8: Pull complete
5b5108d08c6d: Pull complete
beaff1261757: Pull complete
c1a55c6375b5: Pull complete
8181cde51c65: Pull complete
Digest: sha256:691c55aabb3c4e3b89b953dd2f022f7ea845e5443954767d321d5f5fa394e28c
Status: Downloaded newer image for mysql:5.7.21
```

标签通常被称为版本。不过，这里提到的版本不是图像的一个版本，因为它往往是该应用程序的版本，您一定要小心那里是获得的图像取决于即使您指定的同一个标签的时机是不同的情况下的点。

例如，它指的是`mysql:5.7`与此刻`mysql:5.7.21`相同的图像，但它用于`mysql:5.7.20`指代过去。`latest`假设您指定了未指定标记的标记。

管理存储库的服务称为注册表。主要产品如MySQL和Redis的正式图像分布在多克尔集线器的注册表，在上面的例子中已经从在集线器多克尔存储库获取的图像。可以在下一页上找到Docker Hub上的存储库。

[https://hub.docker.com/explore/](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fhub.docker.com%2Fexplore%2F)

要使用Docker Hub以外的注册表，请在存储库前面写入注册表的主机名和端口号，如下所示。例如，`myregistry.local:5000`要从本地注册表`testing/test-image`获取它将如下。

```
$ docker image pull myregistry.local:5000/testing/test-image
```

- [docker image pull | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fimage_pull%2F)

- 旧的命令名称是

  ```
  docker pull
  ```

  。本文档详细介绍了该文档。

  - [docker pull | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fpull%2F)
  - [docker pull |日文文档](http://docs.docker.jp/engine/reference/commandline/pull.html)



## docker image ls（docker images）：显示图像列表

它显示您拥有的图像列表。

```
$ docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mysql               5.7.21              5195076672a7        3 weeks ago         371MB
```

- [docker image ls | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fimage_ls%2F)

- 旧的命令名称是

  ```
  docker images
  ```

  。本文档详细介绍了该文档。

  - [docker图像| Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fimages%2F)
  - [docker图像|日文文档](http://docs.docker.jp/engine/reference/commandline/images.html)

## docker image rm（docker rmi）：删除图像

`docker image ls``IMAGE ID`指定显示的内容。

```
$ docker image rm 5195076672a7
Untagged: mysql:5.7.21
Untagged: mysql@sha256:691c55aabb3c4e3b89b953dd2f022f7ea845e5443954767d321d5f5fa394e28c
Deleted: sha256:5195076672a7e30525705a18f7d352c920bbd07a5ae72b30e374081fe660a011
Deleted: sha256:bc52f6d08bc65c22baab4384ae534d4c5ba8c988197de49975e0a0f78310dd89
Deleted: sha256:b2590548a0917767b420cf20d0cef3aae8912314de216f624c0840f3ad827aa7
Deleted: sha256:756d63a7d5896b52d445ea84ee392cb08a7c119322cfcdfed6303de1ed0d0eab
Deleted: sha256:8e4736576db75536185beba95c5877deeb3915740688cbbc17fe04aed3632282
Deleted: sha256:e6e6e1bb8a16eadbe6628770767615fbc8d67bf11dde69a902116efe847baa7e
Deleted: sha256:080b6c4ec1d55d91a7087e12ae3bd4df252148d94f9911209e0a83d50dc63784
Deleted: sha256:58b97da9f98f75af01ae59c3cb1fdd07a07297015459f3f9f88b140699b29147
Deleted: sha256:3918448e7fe95f36f67a55c938559bab787249b8fa5c7e9914afd46994d045b0
Deleted: sha256:fac8373d1ec4f5bb6c13f12170f558edc3cfbfe8215ae3d1c869940401bc14cf
Deleted: sha256:130f3e567e288fdbbc3ae7cd7aa6c8b3d952bebd3eae58f0a7da93acbb22a258
Deleted: sha256:3358360aedad76edf49d0022818228d959d20a4cccc55d01c32f8b62e226e2c2
```

- [docker image rm | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fimage_rm%2F)

- 旧的命令名称是

  ```
  docker rmi
  ```

  。本文档详细介绍了该文档。

  - [docker rmi | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Frmi%2F)
  - [docker rmi |日本文件](http://docs.docker.jp/engine/reference/commandline/rmi.html)

## docker container run（docker run）：激活容器（Shell）

`docker container run`使用该命令。它具有以下格式。

```
$ docker container run [OPTIONS] IMAGE [COMMAND] [ARGS...]
```

使用指定的IMAGE启动一个新容器并执行COMMAND。ARGS是COMMAND的一个参数。

如果省略COMMAND，则执行为该映像定义的默认命令。

`mysql:5.7.21` 要在图像中执行bash，请执行以下操作。

```
$ docker container run -it --rm mysql:5.7.21 /bin/bash
```

每个选项具有以下含义。

- `-it`：在调用shell等交互式CLI命令时指定此项。
- `--rm`：如果要在流程结束时删除容器，请指定此项。（如果您没有指定它，容器的剩余部分将保留）

`-i`虽然它`-t`是一个单独的选项，但它是一个经常在集合中指定的选项。有关详细信息，请参阅[参考资料](http://docs.docker.jp/engine/reference/commandline/run.html#tty-name-it)。

如果没有指定的图像，它将自动从注册表下载，因此`docker image pull`您无需提前执行。

- [docker container run | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcontainer_run%2F)

- 旧的命令名称是

  ```
  docker run
  ```

  。本文档详细介绍了该文档。

  - [docker run | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Frun%2F)
  - [docker run |日文文档](http://docs.docker.jp/engine/reference/commandline/run.html)

## docker container run（docker run）：激活容器（mysqld）

`mysql:5.7.21` 使用图像启动容器并尝试从本地连接。

```
$ docker container run --rm -d -p 3306:3306 -v $(pwd)/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mysql --name db1 mysql:5.7.21
40a551e33878d12c0c2fff330e6af0ad487be2235919a49ebc29dd4c084ddcf1
```

显示的`CONTAINER ID`是。在稍后描述的容器上操作时`--name`，请指定此ID 指定的名称。由于此次未指定COMMAND，因此`mysqld`将自动执行该命令。 可以通过[Docker Hub](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fhub.docker.com%2F_%2Fmysql%2F)的[mysql页面](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fhub.docker.com%2F_%2Fmysql%2F)上的Dockerfile链接来确认`mysql`图像的内容。

每个选项具有以下含义。

- `--rm`：如果要在流程结束时删除容器，请指定此项。（如果您没有指定它，容器的剩余部分将保留）
- `-d`：在后台启动容器。
- `-p 3306:3306`：将容器的端口映射到主机端的端口。左侧是主机端口。
- `-v $(pwd)/data:/var/lib/mysql`：将主机侧路径映射到容器上的路径。左侧的路径是主机侧的路径，必须将其指定为绝对路径。
- `-e MYSQL_ROOT_PASSWORD=mysql`：添加环境变量并启动容器。
- `--name db1`：容器的名称。如果省略，则自动给出随机值。

`MYSQL_ROOT_PASSWORD`根据图像，您可以通过指定环境变量来更改容器的行为。 `mysql`图像中的环境变量的规格是[页面](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fhub.docker.com%2F_%2Fmysql%2F)的`Environment Variables`下面写的。在大多数情况下，Docker Hub存储库页面上有一个解释。

`-v`该选项`Data Volume`用于指定。已写入在所述容器和取出容器数据被去除所有但，烦乱不安，它是它是在产品中，如一个数据库中，有一个机构（数据量）与一个持久数据到容器的外部。在这种情况下，我们将目录挂载在`data/`容器上主机端的当前目录下`/var/lib/mysql/`。 `mysql`图像的默认设置`/var/lib/mysql/`既然是MySQL数据目录，主机端`data/`只要开始加入容器中，并安装在同一路径上，当你不删除该目录，删除容器能够保持数据库的内容。有关数据卷的详细信息，请参阅以下文档。

- [了解图像，容器，存储驱动程序 - Docker-docs-ja 17.06.Beta文档](http://docs.docker.jp/engine/userguide/storagedriver/imagesandcontainers.html#data-volumes-and-the-storage-driver)
- [使用卷| Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fstorage%2Fvolumes%2F%23create-and-manage-volumes)

您可以使用以下命令连接到已启动容器上的mysqld。（如果没有mysql命令，`brew install mysql`可以安装。）

```
$ mysql --host 127.0.0.1 -uroot -pmysql
```

- [docker container run | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcontainer_run%2F)

- 旧的命令名称是

  ```
  docker run
  ```

  。本文档详细介绍了该文档。

  - [docker run | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Frun%2F)
  - [docker run |日文文档](http://docs.docker.jp/engine/reference/commandline/run.html)

## docker container ls（docker ps）：获取容器列表

```
$ docker container ls -a
CONTAINER ID        IMAGE               COMMAND                  CREATED                  STATUS              PORTS                    NAMES
40a551e33878        mysql:5.7.21        "docker-entrypoint.s…"   Less than a second ago   Up 2 seconds        0.0.0.0:3306->3306/tcp   db1
```

`-a` 该选项意味着您还显示已停止的容器。

- [docker container ls | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcontainer_ls%2F)

- 旧的命令名称是

  ```
  docker ps
  ```

  。本文档详细介绍了该文档。

  - [docker ps | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fps%2F)
  - [docker ps |日文文档](http://docs.docker.jp/engine/reference/commandline/ps.html)

## docker container exec（docker exec）：在活动容器中执行另一个命令

`CONTAINER ID``docker container run`使用或启动容器时`--name`，使用选项指定的名称指定容器。在下面的例子中，开始在开始在前面的背景下，您正在从终端mysqladmin命令mysql的容器在bash。选项`-it`的含义`docker container run`与。相同。

```
% docker container exec -it db1 /bin/bash
root@40a551e33878:/# mysqladmin status -pmysql
mysqladmin: [Warning] Using a password on the command line interface can be insecure.
Uptime: 43  Threads: 1  Questions: 4  Slow queries: 0  Opens: 105  Flush tables: 1  Open tables: 98  Queries per second avg: 0.093
root@40a551e33878:/# exit
```

- [docker container exec | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcontainer_exec%2F)

- 旧的命令名称是

  ```
  docker exec
  ```

  。本文档详细介绍了该文档。

  - [docker exec | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fexec%2F)
  - [docker exec |日文文档](http://docs.docker.jp/engine/reference/commandline/exec.html)

## docker container logs（docker logs）：检索容器日志

`docker container logs`使用该命令，可以在终端上显示BG执行容器的日志。 使用`CONTAINER ID`或`docker container run`启动容器时`--name`，使用选项指定的名称指定容器。

```
$ docker container logs -f db1
(省略)
2018-04-08T05:04:39.040525Z 0 [Note] Event Scheduler: Loaded 0 events
2018-04-08T05:04:39.041069Z 0 [Note] mysqld: ready for connections.
Version: '5.7.21'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
```

`-f(--follow)`如果指定选项，它将继续显示容器的STDOUT和STDERR的任何新输出。

- [docker容器日志| Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcontainer_logs%2F)

- 旧的命令名称是

  ```
  docker logs
  ```

  。本文档详细介绍了该文档。

  - [docker logs | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Flogs%2F)
  - [docker logs |日文文档](http://docs.docker.jp/engine/reference/commandline/logs.html)

## docker container rm（docker rm）：删除容器

`CONTAINER ID``docker container run`使用或启动容器时`--name`，使用选项指定的名称指定容器。

```
# コンテナの停止
$ docker container stop db1

# コンテナの削除
$ docker container rm db1
```

或

```
# コンテナを停止して削除
$ docker container rm -f db1
```

- [docker container stop | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcontainer_stop%2F)

- 旧的命令名称是

  ```
  docker stop
  ```

  。本文档详细介绍了该文档。

  - [docker stop | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fstop%2F)
  - [docker stop |日文文件](http://docs.docker.jp/engine/reference/commandline/stop.html)

- [docker container rm | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcontainer_rm%2F)

- 旧的命令名称是

  ```
  docker rm
  ```

  。本文档详细介绍了该文档。

  - [docker rm | Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Frm%2F)
  - [docker rm |日文文档](http://docs.docker.jp/engine/reference/commandline/rm.html)

## 参考信息

有关如何使用它的更多详细信息，请参阅以下文档。

- [使用Docker命令行| Docker文档](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fdocs.docker.com%2Fengine%2Freference%2Fcommandline%2Fcli%2F)

此外，虽然相应的版本有点旧，但也有日文文件。

- Docker Document日语项目
  - [词汇表](http://docs.docker.jp/glossary.html)
  - [docker命令参考](http://docs.docker.jp/engine/reference/commandline/toc.html)

 下次是[Docker Compose / Dockerfile编译](https://app.yinxiang.com/OutboundRedirect.action?dest=https%3A%2F%2Fchopschips.net%2Fblog%2F2018%2F05%2F30%2Fdocker-compose-with-rails%2F)。这里还介绍了推荐书籍。