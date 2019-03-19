

## Vagrant、Virtualbox、Docker 的区别？

Virtualbox，虚拟机

Vagrant，适合用来管理多个虚拟机（**针对开发分布式环境**）

Docker，适用于应用的打包、构建、部署（**针对应用**）



## 搭建 kubernetes 分布式开发环境：

https://github.com/rootsongjc/kubernetes-vagrant-centos-cluster



## 给 Vagrant 换用 VMware 或 Parallels 虚拟机

https://segmentfault.com/a/1190000016053215



## 开始配置

virtualbox 下载：https://www.virtualbox.org/wiki/Downloads

vagrant 下载：https://www.vagrantup.com/downloads.html

vagrant box 镜像下载：https://app.vagrantup.com/boxes/search



### vagrant box 下载慢怎么办

方法一： `vim ~/.zshrc`，开启 http 和 https 代理，`source ~/.zshrc`

```
# 终端配置科学上网 proxy list
## 让Shadowsocks代理（其中1086是Shadowsocks-偏好设置-高级-本地Socks5监听端口）
alias proxy='export all_proxy=socks5://127.0.0.1:1086'
## 不要让Shadowsocks代理
alias unproxy='unset all_proxy'
```

方法二：找到最新版本，在后面加上 `/providers/virtualbox.box` 自己下载，比如：

https://vagrantcloud.com/ubuntu/boxes/xenial64/versions/20180917.0.0/providers/virtualbox.box



### Vagrant 常用命令

mac 安装

```
brew cask install vagrant
```

入门

```
# 添加 box
vagrant box add ubuntu/xenial64
vagrant box add name file_path

# 生成 Vagrantfile(指定所用的 box)
vagrant init ubuntu/xenial64

# 开启虚拟机
vagrant up

# ssh 登录虚拟机
vagrant ssh

# 重启虚拟机（重新载入配置文件）
$ vagrant relaod
```

更多

```
# 查看所有 box
vagrant box list

# 删除指定 box
vagrant box remove NAME

# 查看虚拟机状态
vagrant status

# 挂起虚拟机
vagrant suspend

# 重启虚拟机
vagrant reload

# 关闭虚拟机
vagrant halt

# 删除虚拟机
vagrant destroy

# 打包分发
vagrant package --output xxx.box
```



### Vagrantfile

inline 表示 script 直接写在 Vagrantfile 中

```
Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: "echo Hello, World"
  config.vm.provision "shell", path: "script.sh"
end
```



### scp localfile to vagrant

```
# install plugin
vagrant plugin install vagrant-scp

# use vagrant scp
vagrant scp <some_local_file_or_dir> [vm_name]:<somewhere_on_the_vm>
```

