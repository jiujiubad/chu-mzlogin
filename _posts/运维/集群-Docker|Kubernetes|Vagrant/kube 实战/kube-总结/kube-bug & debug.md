# kube-bug & debug

20180809【Kubernetes】【k8s】【Docker】【docker-compose】【bug】【debug】

[TOC]

## 前提



## 常见报错 error

> Dashboard: persistentvolumeclaim "ebay-selenium-web-uploads" not found
>
> Logs：The selected container has not logged any messages yet.

检查 kube/storages 和 kube/volumes 的 pv 名称、pvc 名称

检查 kube/deployments 引用的卷名称是否跟 pv 和 pvc 一致

如果有配置 docker hub 私有仓库，`kubectl -n namespace get secrets ` 检查 Secrets 有无开启。因为 push 或 pull 有问题会导致相应的 pod（比如 puma）开启不了，所以就没有 pod 去找卷



> Dashboard: nodes are available: 1 node(s) had taints that the pod didn't tolerate, 44 node(s) didn't match pod affinity rules, 44 node(s) didn't match pod affinity/anti-affinity
>
> Logs: The selected container has not logged any messages yet.

检查 kube/deployments 里的 affinity 亲和性配置

如果有配置 docker hub 私有仓库，`kubectl -n namespace get secrets ` 检查 Secrets 有无开启。因为 push 或 pull 有问题会导致相应的 pod（比如 puma）开启不了，所以不能给 pod 配置亲和性 



## 最隐秘的报错：kube 配置正确但不生成相应服务

原因：kube 的 yaml 文档最后需要换行。可以用`cat kube/volumes/*.yaml` ，查看代码是不是如下在 `---` 位置没有换行：

```
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: openldap-certs-claim
  labels:
    app: openldap
    component: sys
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 7Gi
  storageClassName: standard---
apiVersion: v1
kind: PersistentVolumeClaim
```



## 重点 debug 对象

- yaml 文件最后一行需要换行
- volumes 名称是否引用
- configmaps、secrets 是否在 deployments 里引用
- host 有没有指向具体的服务。比如，openldap 项目的 openldap 需要设置 `PHPLDAPADMIN_LDAP_HOSTS: "openldap-sys"`。
  - 环回ip——127.0.0.1、localhost
  - host 
  - 比如，LDAP_BACKEND，指定了数据库`mdb`
- 删除项目缓存文件 app/tmp/xxx， 删除 mac 缓存的持久卷 /tmp/xxx-data ，k8s web 页面左侧`持久化存储卷`手动删除
- 重新 `make test`，有时候需要等待 5 分钟才会生成 pod，在这个期间 k8s web 页面会一直报错，是正常的。如果不想等，可以删除项目 k8s 后重新 `make test`
- Dockerfile 镜像是不是基于项目代码制作的，如果是的话要重新生成镜像



## 删除项目 k8s 顺序

```
make clean
kubectl delete namespaces confluence-staging --ignore-not-found
```



## 本地安装 pg

docker-compose 的 pg 报错：checking for pg_config... no No pg_config... trying anyway.

解决办法：`brew install libpqxx `，帖子：https://teamtreehouse.com/community/ruby-on-rails-bundle-fails-cannot-gem-install-pg-not-yet-resolved-need-help



## debug 步骤之 master_key & database

### 本地 credentials.yml.enc 与 master.key 是否配对

如果配对失败，会报错

```
ActiveSupport::MessageEncryptor::InvalidMessage: ActiveSupport::MessageEncryptor::InvalidMessage
```

本地用 production，能跑通则说明 master_key 成功配对

```
# 运行 puma
RAILS_SERVE_STATIC_FILES=true rails s -e production

# 或加载静态文件
rails assets:precompile RAILS_ENV=production
```

查看 log

```
tail -f log/production.log
```

### 服务器 master：删除 k8s 集群和镜像

```
make clean
kubectl delete namespaces $(NAMESPACE) --ignore-not-found
docker rmi jiujiubad/amz-erp-sys:*
```

在 Dashboard 上确认『持久化数据卷』和『概况』里的 pod 是否已经被删除

### 服务器 node：删除 tmp 和镜像

删除数据卷资料前，要确认服务器、确认文件夹，最好用 trash 删除

```
rm -rf /tmp/amz-erp-data
docker rmi jiujiubad/amz-erp-sys:*
```

### 服务器 master：重新 clone 项目

```
rm -rf ~/projects/amz_erp_sys
git clone ssh://git@gitlab.muker.io:30022/Aron/amz_erp_sys.git
```

### 本地 scp 文件

```
scp config/credentials.yml.enc config/master.key ubuntu@staging-master:~/projects/amz_erp_sys/config

scp kube/secrets/*.yaml ubuntu@staging-master:~/projects/amz_erp_sys/kube/secrets
```

### 服务器 master：编辑 docker_hub_secret.yaml

登录 Docker Hub

```
docker login
```

生成集群秘钥

```
# 查看 registry
docker info | grep -i registry

# 生成秘钥
kubectl create secret docker-registry docker-registry-amz-erp --docker-server=https://index.docker.io/v1/ --docker-username=jiujiubad --docker-password=xxxxxx --docker-email=jiujiubad@gmail.com
```

复制 auths 下的 auth 的值（Mac 端没有 auth，auth 的值用 credsStore 的值）

```
cat ~/.docker/config.json
```

编辑 .dockerconfigjson

```
{"auths":{"https://index.docker.io/v1/":{"username":"username","password":"password","email":"youremail","auth":"yourauth"}}}

{"auths":{"https://index.docker.io/v1/":{"username":"jiujiubad","password":"xxxxxx","email":"jiujiubad@gmail.com","auth":"aml1aml1YmFkOlFhODYxNjAxNzg="}}}
```

加密。特别注意这里的 echo 要用单引号，否则加密后解密出来的不是 json

```
echo -n '{"auths":{"https://index.docker.io/v1/":{"username":"username","password":"password","email":"youremail","auth":"yourauth"}}}' | base64
```

替换 .dockerconfigjson 的值





## bug-数据库连接失败 time out（亲和性问题）

kube/job 的 `setup-db` 报错：time out

```
bash-4.4# bin/rails db:migrate:reset
D, [2018-08-09T12:06:03.591092 #34] DEBUG -- :    (5006.6ms)  DROP DATABASE IF EXISTS "amz_erp_production"
PG::ObjectInUse: ERROR:  database "amz_erp_production" is being accessed by other users
DETAIL:  There is 1 other session using the database.
: DROP DATABASE IF EXISTS "amz_erp_production"
Couldn't drop database 'amz_erp_production'
rails aborted!
ActiveRecord::StatementInvalid: PG::ObjectInUse: ERROR:  database "amz_erp_production" is being accessed by other users
DETAIL:  There is 1 other session using the database.
: DROP DATABASE IF EXISTS "amz_erp_production"
```

解决办法：

- 检查 web 页面上容器组的 pod 是否在当前节点上，如果跑到其他节点，则需要配置亲和性
- Docker Hub 上搜索 mysql 或 postgresql，查看对应的重点环境变量是否已经配置
- kube/deployments 检查 envFrom 是否引用相应的 kube/configmaps 和 kube/secrets 文件

![](https://ws2.sinaimg.cn/large/0069RVTdgy1fu3qya6zf3j31850e8wfh.jpg)





常见 bug：docker hub 私有仓库连接不上——检查 .dockerconfigjson，仔细对好解密出来的还是不是哈希，是不是跟原来一样

常见 bug：master_key 配对失败——检查 app/config/master_key.yml 和 app/kube/secrets/rails_env_secret.yaml 是否一致。再从页面上查看服务所在节点，确认该节点上是否存在旧的镜像（旧镜像要删除干净），因为 Dockerfile 里有 COPY ruby项目代码，所以 app/config 里的代码改变，就要重新 build 镜像。

常见 bug：数据库连接失败 time out——检查亲和性配置，在页面上检查该服务是否跑到其他节点上去。



## 参考资源





