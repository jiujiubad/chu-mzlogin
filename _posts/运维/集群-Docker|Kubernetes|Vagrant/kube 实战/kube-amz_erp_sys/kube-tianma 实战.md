# kube-tianma 实战

20180809【Kubernetes】【k8s】【Docker】【docker-compose】【tianma】【erp】

[TOC]

## 搜索 谷歌云 数据可视化

参考https://mp.weixin.qq.com/s/7m4wu7RsAK0AjLIC_m9e4g

redis url 格式：redis://:password@hostname:port/db_number

```
# 进入 kubernetes 容器
kubectl -n tianma-staging exec -it amz-erp-puma-77df94947c-jzfdx -- bash

# 在 kubernetes 容器中执行
bing/rails c 

# Docker Hub 私有仓库加密
{"auths":{"https://index.docker.io/v1/":{"username":"jiujiubad","password":"Qa86160178","email":"jiujiubad@gmail.com","auth":"aml1aml1YmFkOlFhODYxNjAxNzg="}}}

# Ubuntu 环境
{auths:{https://index.docker.io/v1/:{username:jiujiubad,password:Qa86160178,email:jiujiubad@gmail.com,auth:aml1aml1YmFkOlFhODYxNjAxNzg=}}}

e2F1dGhzOntodHRwczovL2luZGV4LmRvY2tlci5pby92MS86e3VzZXJuYW1lOmppdWppdWJhZCxwYXNzd29yZDpRYTg2MTYwMTc4LGVtYWlsOmppdWppdWJhZEBnbWFpbC5jb20sYXV0aDphbWwxYW1sMVltRmtPbEZoT0RZeE5qQXhOemc9fX19

# Mac OS 环境
{auths:{https://index.docker.io/v1/:{username:jiujiubad,password:Qa86160178,email:jiujiubad@gmail.com,auth:osxkeychain}}}

{"auths":{"https://index.docker.io/v1/":{"username":"jiujiubad","password":"Qa86160178","email":"jiujiubad@gmail.com","auth":"aml1aml1YmFkOlFhODYxNjAxNzg="}}}


```



## 报错 1

./kube/bin/start-sidekiq: line 7: POSTGRES_HOST: unbound variable

解决办法：

```
POSTGRES_HOST
start-sidekiq
```



## 报错 2

```
The Secret "docker-registry-amz-erp" is invalid: data[.dockerconfigjson]: Invalid value: "<secret contents redacted>": invalid character 'a' looking for beginning of object key string
Makefile:71: recipe for target 'kubectl-apply' failed
```

解决办法：

在集群中创建密钥

```
kubectl create secret docker-registry xxxxxx --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>
```



```
{"auths":{"https://index.docker.io/v1/":{"username":"jiujiubad","password":"Qa86160178","email":"jiujiubad@gmail.com","auth": "aml1aml1YmFkOlFhODYxNjAxNzg="}}}

{"auths":{"https://index.docker.io/v1/":{"username":"janedoe","password":"xxxxxxxxxxx","email":"jdoe@example.com","auth":"c3R...zE2"}}}


kubectl create secret docker-registry docker-registry-amz-erp --docker-server=https://index.docker.io/v1/ --docker-username=jiujiubad --docker-password=Qa86160178 --docker-email=jiujiubad@gmail.com

返回
eyJhdXRocyI6eyJodHRwczovL2luZGV4LmRvY2tlci5pby92MS8iOnsidXNlcm5hbWUiOiJqaXVqaXViYWQiLCJwYXNzd29yZCI6IlFhODYxNjAxNzgiLCJlbWFpbCI6ImppdWppdWJhZEBnbWFpbC5jb20iLCJhdXRoIjoiYW1sMWFtbDFZbUZrT2xGaE9EWXhOakF4TnpnPSJ9fX0=

{"auths":{"https://index.docker.io/v1/":{"username":"jiujiubad","password":"Qa86160178","email":"jiujiubad@gmail.com","auth":"osxkeychain"}}}

e2F1dGhzOntodHRwczovL2luZGV4LmRvY2tlci5pby92MS86e3VzZXJuYW1lOmppdWppdWJhZCxwYXNzd29yZDpRYTg2MTYwMTc4LGVtYWlsOmppdWppdWJhZEBnbWFpbC5jb20sYXV0aDpvc3hrZXljaGFpbn19fQ==
e2F1dGhzOntodHRwczovL2luZGV4LmRvY2tlci5pby92MS86e3VzZXJuYW1lOmppdWppdWJhZCxwYXNzd29yZDpRYTg2MTYwMTc4LGVtYWlsOmppdWppdWJhZEBnbWFpbC5jb20sYXV0aDpvc3hrZXljaGFpbn19fQ==
```

```
apiVersion: v1
data:
  .dockerconfigjson: eyJhdXRocyI6eyJodHRwczovL2luZGV4LmRvY2tlci5pby92MS8iOnsidXNlcm5hbWUiOiJqaXVqaXViYWQiLCJwYXNzd29yZCI6IlFhODYxNjAxNzgiLCJlbWFpbCI6ImppdWppdWJhZEBnbWFpbC5jb20iLCJhdXRoIjoiYW1sMWFtbDFZbUZrT2xGaE9EWXhOakF4TnpnPSJ9fX0=
kind: Secret
metadata:
  creationTimestamp: 2018-08-07T12:25:52Z
  name: docker-registry-amz-erp
  namespace: default
  resourceVersion: "742355"
  selfLink: /api/v1/namespaces/default/secrets/docker-registry-amz-erp
  uid: 06a074d4-9a3d-11e8-acb9-00163e00a9c6
type: kubernetes.io/dockerconfigjson
```



## 报错 3

![Snip20180808_4](https://ws2.sinaimg.cn/large/0069RVTdgy1fu2h3d9xx3j318g0koais.jpg)

![Snip20180808_5](https://ws4.sinaimg.cn/large/0069RVTdgy1fu2h46ph5gj318j0ly475.jpg)

```
++ dirname ./kube/bin/setup-db
+ cd ./kube/bin/../..
+ ./kube/bin/wait-for amz-erp-postgresql 5432
+ bundle exec rails db:setup_if_not_yet
rails aborted!
ArgumentError: Missing `secret_key_base` for 'production' environment, set this string with `rails credentials:edit`
```

！！很典型的问题

本地的 master_key 可以不断地改，因为 build 一个镜像的时候都是在本地跑的，build 的时候是基于当时的本地项目（包括 master_key 的信息）。

而线上环境是没有重新 build 镜像，直接拉去本地 build 的镜像就会不断出现 master_key 不匹配的问题。即使是从本地 scp 复制 config/credentials.yml.enc、config/master.key、kube/secrets/rails_env_secret.yaml 到服务器上，也一样会报错。

解决办法：在服务器上 make update 更新镜像，或是把 Doker Hub 的镜像删掉，然后在服务器上重新 build 镜像。



## 参考资源