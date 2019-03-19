## vps服务器入手后首先要做的事

### 登录服务器

```
ssh root@xxx.xxx.x.x
sudo -i
```

### 修改密码

```
passwd
```

### 升级系统、安装组件

更新包工具、更新所有组件

```
apt-get update
apt-get upgrade
```

安装编辑器、curl 工具、sudo权限工具、内存cpu测试工具（用法是执行 `htop`，按 `q` 退出）

```
apt-get install vim curl sudo htop -y
```

### 创建公钥

本地电脑，查看公钥

```
cat ~/.ssh/id_rsa.pub

# xiaochu
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDaUtzC1/ombZBrDG8oBTKOQ8lmmaOXq2v/+bELrt6g+P/i5KzwTZjIDopRxQqZxHKHe1xZo6IdExVvBDD6r8QX7y32nk0Vz5H8ij98GqIhbDfRqXLW078qKO8jaN/cgg9UzLHxlPMgHEF5uwiYHtcDx/M44GW3yxK4VpRZcYEy3mdrjfpk0qqoMjCyP7hmMyjwNnu79ngOwkFE/nE9p2TgaeX00C5Ziaw9KzFPTZNGI2AN58pHUWnCKEQEkViivvasA87Khv3M/iHei1F5LPlyHIVHpVP8gVkNaFP3PRK9vC/WmkroDTZ6x+yoMCyRJz1ABHWU7RgxNfcmgVXW5hjL jiujiubad@gmail.com
```

服务器上，创建（创建时的选项全部按回车）并修改权限，然后粘贴本地电脑公钥

```
ssh-keygen
cp ~/.ssh/id_rsa.pub ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys && vi ~/.ssh/authorized_keys
```

### 创建普通用户

以用户名 hello 为例，创建用户名、密码

```
useradd -m xiaochu && passwd xiaochu
```

给用户添加 sudo 命令的使用权限（替换 xiaochu 为自己的用户名），添加成功会返回 `xiaochu ALL=(ALL) ALL`

```
echo -e "\nxiaochu ALL=(ALL) ALL\n" >> /etc/sudoers && tail -3 /etc/sudoers
```

~~删除普通用户，原文 https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-debian-8~~

```
deluser --remove-home username
```

### 禁用 root 登录及密码认证登录

```
vi /etc/ssh/sshd_config
```

* `PermitRootLogin yes` 
* 禁用密码登录，`#PasswordAuthentication yes` 改为 `PasswordAuthentication no`
* 修改 ssh 端口（建议不改，修改后登录要用 ssh -p 参数），``#Port 22` 改为 `Port 端口号数字`(比如： `Port 23`)

重启 ssh 服务，然后退出服务器后重新连接

```
service sshd restart
```

### 配置防火墙 iptables（谷歌云、阿里云、测试机器不需要）

>   UFW，是*Ubuntu*系统上配置*iptables防火墙*的工具。

安装 iptables，查看配置

```
apt-get install iptables && iptables -L -n
```

配置 iptables

```
$ vi /etc/iptables.up.rules

# 参数详解：https://blog.csdn.net/leidengyan/article/details/46519789
# 开启常用端口：22是ssh；53是作为DNS服务使用；
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 53 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 80 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 443 -j ACCEPT
-A INPUT -m state --state NEW -m udp -p udp --dport 443 -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
-A INPUT -j DROP
COMMIT
```

配置 iptables-restore

```
$ vi /etc/network/interfaces

# 在iface xxx inet xxx下添加一行
pre-up iptables-restore < /etc/iptables.up.rules
```

应用防火墙规则，查看配置结果

```
iptables-restore < /etc/iptables.up.rules && iptables -L -n
```

开机启动 iptables

```
apt-get install sysv-rc-conf -y
sysv-rc-conf iptables on
```



## 更多设置 iptables

>  Linux iptables 参数详解：https://blog.csdn.net/leidengyan/article/details/46519789
>
> 用 iptables 只开启常规端口：https://blog.liyuans.com/archives/use-iptables-to-open-the-normal-port-only.html

`-A` 追加规则、`-D` 删除规则、`-R` 修改规则、`-I` 插入规则、`-L` 查看规则

`-m`，附加模块。

* `-m state` 按包状态匹配
* `-m mac` 按来源 MAC 匹配
* `-m limit` 按包速率匹配
* `-m multiport` 多端口匹配
* `-m state --state` 状态，分别有 `NEW，有别于tcp 的syn`，`ESTABLISHED，连接态`，`RELATED，衍生态，与conntrack 关联（FTP）`，`INVALID，不能被识别属于哪个连接或没有任何状态`
* `-m tcp` 装入tcp的协议，而`-p tcp` 指按照tcp协议操作 

`-t`，指定规则表，内建的规则表有三个，分别是：filter、nat、mangle。默认 filter，拥有 INPUT、FORWARD 和 OUTPUT 三个规则链，用来进行封包过滤的理动作（例如：DROP、 LOG、 ACCEPT 或 REJECT）

`-p`，指定协议

`-j`，对包的处理动作（ACCEPT、DROP、REJECT、REDIRECT等）

`-s`，源地址 ip

`-d`，目的地址

`--port`，源端口

`--dport`，目的端口

