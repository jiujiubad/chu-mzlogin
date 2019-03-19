# kube-openldap 实战

20180809【Kubernetes】【k8s】【Docker】【docker-compose】【openldap】【目录访问协议】【权限管理】

[TOC]

## 前提

Openldap 端口：389



## 正文

```
ldap-admin@muker.io
ldap-confluence@muker.io
```

osixia/openldap

```
最多 stars
能跑通

但，Dockerfile 是基于 osixia/light-baseimage:1.1.1，源于 debian:stretch-slim
```

```
version: '3'
services:
  openldap:
    container_name: openldap
    image: osixia/openldap:1.2.1
    ports:
      - "389:389"
      - "636:636"
    volumes:
      - /var/lib/ldap
      - /etc/ldap/slapd.d
      - /container/service/slapd/assets/certs/

  phpldapadmin:
    container_name: phpldapadmin
    image: osixia/phpldapadmin:0.7.1
    depends_on:
      - openldap
    ports:
      - "8080:80"
    environment:
      PHPLDAPADMIN_LDAP_HOSTS: "openldap"
      PHPLDAPADMIN_HTTPS: "false"
```

帖子：

https://www.ibm.com/support/knowledgecenter/en/SSPREK_9.0.4/com.ibm.isam.doc/admin/concept/con_docker_user_registry.html

日本教程：https://qiita.com/ir-shin1/items/12d0dbea40d1f1f06747



### 报错

1、The PersistentVolume "local-volume-2" is invalid: spec.persistentvolumesource: Forbidden: is immutable after creation 

原因：项目里 local-volume-2 分配 5G，而实际存在的是 12G 的，所以很有可能是上一个项目 confluence 留下来的数据库数据卷。

解决办法：

- 修改数据卷的名字比如 local-volume-5，不要跟以前留下的数据卷同名。
- 或停用另一个项目的 kubernetes。



### 更多需要做

1、ldap 查创建多公司用户、部门、用户（邮箱、姓名）

2、ldap 增加 https 配置

3、ldap 删除 pg 相关文件，重新测试

知识点：

1）kube/nginx 的内容是，https://raw.githubusercontent.com/admintome/ingress-config/master/ingress-controller.yml



## Openldap 部署在测试集群上

```r
# 登录 master 服务器
$ mosh ubuntu@staging-master

# 克隆项目
$ cd projects
$ git clone xxx

# 执行 kube/Makefile
$ cd xxx/kube
$ make all

# 开启 proxy 服务
$ kubectl proxy --accept-hosts='^.*$' --address=0.0.0.0

# 打开 k8s web页面
$ http://staging-master:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/

# 打开 ldap 主页
$ ldap.staging.muker.io
```





## 参考资源





