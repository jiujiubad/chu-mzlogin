# kube-tls 实战

20180809【https】【tls】【自动更新】【Kubernetes】【k8s】【Docker】【docker-compose】

[TOC]

## 选用

[kube-lego](https://github.com/jetstack/kube-lego) 项目可用于 https 证书自动更新，但 README 里强调以后可能不维护。所以暂不选用。



## 配置 tls 步骤

Godaddy 购买域名

证书网站 https://freessl.org 用购买的域名申请 https key，有一个 id 号

把 id 号粘贴到域名网站的 DNS 配置中（DNS 配置-ADD-type填写txt-host填写『txt记录』的内容-txt value填写『记录值』的内容）

网站上生成两个 https key 文件

把 https key 上传到服务器 ubuntu@master 的项目文件夹 kube/tls，并在文件夹里配置 xx_tls_ing.yaml

Makefile 加入 kube-secret-tls

执行 make all

执行 make kube-secret-tls



## 参考资源





