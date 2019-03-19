* 201803
* 编程+ubuntu 桌面版+ubuntu desktop


### 步骤 1

登录桌面版服务器，其中muker是用户名，@后面是ip

```
ssh muker@192.168.0.8
```

### 步骤 2

更新apt，以及安装curl

```
sudo apt-get update

sudo apt-get install curl

\curl -L https://get.rvm.io | bash -s stable
```

### 步骤 3

到rvm官网https://rvm.io/，安装rvm，并让rvm指令生效

```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

\curl -sSL https://get.rvm.io | bash -s stable

ctrl+d退出，重新开启terminal

source ~/.rvm/scripts/rvm

rvm requirements
```

### 步骤 4

安装ruby2.5.0，安装rails5.1.5

```
rvm install 2.5.0

rvm use 2.5.0 --default

rvm rubygems current

gem install rails -v 5.1.5

ruby -v

rails -v
```

