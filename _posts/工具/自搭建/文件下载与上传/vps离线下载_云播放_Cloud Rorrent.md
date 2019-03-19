

安装 Cloud Rorrent

```
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/cloudt.sh && chmod +x cloudt.sh && bash cloudt.sh
```

选择 1，IP 用默认（或填写 vps 的 IP），端口比如 2019，账号密码



## 出现的 Bug

`listen tcp xx.xx.xx.xx​:xx:​ bind: cannot assign requested address`

解决办法：目前只有谷歌云会出现，安装 `Cloud Rorrent` 时不要填写 `IP`，按默认的 `0.0.0.0` 即可成功启动。