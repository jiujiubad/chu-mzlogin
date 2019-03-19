# kube-ansible 实战——部署集群 master & node 节点

20180809【Kubernetes】【k8s】【Docker】【docker-compose】【ansible】【自动化部署】【一键部署】

[TOC]

## 前提





## 正文

一、第一次登录 master 服务器

```r
# 登录 master 服务器
$ mosh root@staging-master

# 生成目录
$ mkdir projects
$ cd projects

# 生成公钥
$ ssh-keygen -t rsa

# 查看公钥
$ cat ~/.ssh/id_rsa.pub

# 查看域名是否已经被解析
$ nslookup ldap.staging.muker.io
```

二、ansible 安装 master 和 node 节点的过程（用 ansible-kube-cluster 项目部署 master 和 node 节点）

```r
# 查看日志
$ tail -f log/ansible.log 

# k8s 自动补全（搜索 kubernetes bash completion，mac zsh vscode，kubectl bash completion）
$ echo "source <(kubectl completion bash)" >> ~/.bashrc

# 贴标签
$ kubectl label node staging-node serverType=ldap
$ kubectl label node staging-node serverType=web-app app=services

# 显示标签
$ kubectl get nodes --show-labels
```



## 参考资源





