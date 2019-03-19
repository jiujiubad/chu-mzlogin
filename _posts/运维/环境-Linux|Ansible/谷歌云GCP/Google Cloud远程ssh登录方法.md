

1）切换到 root

```
sudo -i
```

2）编辑ssh配置文件

```
vi /etc/ssh/sshd_config
```

3）使用公钥登录则修改 `PermitRootLogin yes`，使用密码登录则修改 `PasswordAuthentication yes`

4）重启ssh

```
service sshd restart
```



生成公钥

```
ssh-keygen
cd ~/.ssh 
cp id_rsa.pub authorized_keys
chmod 600 authorized_keys

vi ~/.ssh/id_rsa.pub
```

粘贴 mac 公钥

```
# xiaochu
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDaUtzC1/ombZBrDG8oBTKOQ8lmmaOXq2v/+bELrt6g+P/i5KzwTZjIDopRxQqZxHKHe1xZo6IdExVvBDD6r8QX7y32nk0Vz5H8ij98GqIhbDfRqXLW078qKO8jaN/cgg9UzLHxlPMgHEF5uwiYHtcDx/M44GW3yxK4VpRZcYEy3mdrjfpk0qqoMjCyP7hmMyjwNnu79ngOwkFE/nE9p2TgaeX00C5Ziaw9KzFPTZNGI2AN58pHUWnCKEQEkViivvasA87Khv3M/iHei1F5LPlyHIVHpVP8gVkNaFP3PRK9vC/WmkroDTZ6x+yoMCyRJz1ABHWU7RgxNfcmgVXW5hjL jiujiubad@gmail.com
```

