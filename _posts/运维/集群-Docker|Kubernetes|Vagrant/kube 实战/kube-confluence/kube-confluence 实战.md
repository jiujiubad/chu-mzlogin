# kube-confluence 实战

20180809【Kubernetes】【k8s】【Docker】【docker-compose】【confluence】【企业 wiki】【知识管理】

[TOC]

## 前提

confluence 端口：8090



### how to Disable the Confluence Base URL plugin system add-on

提示要配置 **Add-ons**：

https://confluence.atlassian.com/confkb/can-t-check-base-url-warning-in-confluence-6-6-or-later-939718433.html

**Add-ons** 配置项在哪：

system - "add-ons" - "Manage add-ons" - 筛选 "system" - 搜索"**Confluence Base URL plugin**" - Disable

配置-插件管理-筛选”过滤可见的插件“、”系统“ - 搜索"**Confluence Base URL plugin**" - 禁用

https://docs.refinedwiki.com/display/FAQ/Disable+the+default+Confluence+mobile+plugin



### 遗留问题

pod 死掉后要重新配置 confluence，而且数据库不能继续使用，而是要覆盖

![](https://ws3.sinaimg.cn/large/006tNc79gy1fvniuu93laj31kw0zkapb.jpg)



### 连接已有数据库 Connect existing MySQL database to Jira or Confluence

https://community.atlassian.com/t5/Jira-questions/Connect-existing-MySQL-database-to-Jira-or-Confluence/qaq-p/332790



### http status 500 连接数据库报错

是否跟 tls/https 的设置有关：无关

是否跟数据库的版本有关：有关 Connect existing MySQL database to Jira or Confluence

是否跟 jira 驱动版本有关：貌似有关但在本教程中没有涉及 jira 的配置



### confluence postgresql jdbc driver：支持 postgresql 9.4 和 mysql 5.1.42

https://confluence.atlassian.com/doc/database-jdbc-drivers-171742.html



### 修改思路

```
'POSTGRES_ENCODING=UTF8'
POSTGRES_DB=confluencedb
```





## 正文

搜索 `docker confluence decode`，得到 “基于Docker安装、部署、破解Confluence 6.6图文教程： <https://zhuanlan.zhihu.com/p/32120741>  

> 注意：第一次配置，需要获得试用授权码。是否破解成功，则在配置完成后查看，配置-一般配置-授权细节-授权用户数，如果是『无限的』说明破解成功！

官网下载：https://www.atlassian.com/software/confluence/download-archives

LearnKubernetes：参考 kube、Dockerfile（基于 Debian）

```
dba080fe7b91 531d3d258c0d 7293d8e9ecc8 c5cdd7c5ae7e 429206e06cd8 e12cfe9a607a ee4a72d9db25 f8fc8038a263 5330010583ba 5330010583ba fb341f1691da 77bcf92bfeae 9eb7f628ccf9
# 测试 Dockerfile
docker image build . -t confluence:2.0.0
docker image build . -f Dockerfile -t confluence:7.0.1
docker container run --detach --publish 8090:8090 confluence:2.0.0
docker container run -p 25:25 -e maildomain=mail.example.com -e smtp_user=user:pwd --name postfix -d catatnight/postfix

# 测试 docker-compose
docker-compose up -d --build --force-recreate
docker-compose ps
docker-compose down -v

# 测试 kubernetes

command: bash -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"
```



### 问题

1）ADD 的用法，怎么解压文件夹层数？

Postsql URL 格式为：jdbc:Database Type://IP Address:Port/Database Name

jdbc:postgresql://confluence-postgresql:5432/confluence_production，原来 jdbc:postgresql://db:5432/confluencedb

2）Makefile 可以加上清空 tmp 文件夹？

3）kube/configmaps 小项目写在同个文件上？

4）昨天的 openldap 是通过 phpldapadmin_host 来跟 phpldapadmin 连接的，为什么数据库不用通过 POSTGRESQL_HOST 跟 PG数据库关联？

5）confluence 运行非常慢？ confluence 删除命名空间重新 make test 会报错 `pod has unbound PersistentVolumeClaims` ？



### 报错

1、confluence web页面 system error Spring Application context has not been set

解决办法：清空 tmp 文件夹

![](https://ws1.sinaimg.cn/large/0069RVTdgy1fu19e9nnwoj30yf0qdacn.jpg)

2、Error occurred during initialization of VM Initial heap size set to a larger value than the maximum heap size

原因：环境配置的 xms 和 xms，见帖子：https://stackoverflow.com/questions/9350437/incompatible-initial-and-maximum-heap-sizes-specified。



### 解码

```
echo -n "confluence" | base64 -D 
```



## 参考资源





