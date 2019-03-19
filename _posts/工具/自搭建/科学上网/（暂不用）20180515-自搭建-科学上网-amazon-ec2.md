* 201805
* 工具+mac+vps



图文教程：https://www.freehao123.com/amazon-ec2-vps/

注意的点：

1、选区：韩国首尔（现在在用，速度还ok），或新加坡。

1、Amazon EC2有750 小时的 [Amazon EC2](https://www.freehao123.com/tag/amazon-ec2/) Linuxt.2micro 实例使用时间，一天24小时，基本上开一个实例跑一个月是没有任何问题的（下个月自动清零）。VPS主机在 AWS 免费套餐 12 个月的期限到期后不会自动过期，而是无期限地提供给现有的和新的 AWS 客户。

2、开放的端口（端口设置在左侧Security Groups）-右键-edit inbound routes

* https
* http
* ssh
* all ICMP IPV4，这样才可以ping的通

![image-20180515010820128](https://ws1.sinaimg.cn/large/006tKfTcgy1frbd82p1ugj30tr08676g.jpg)

3、密钥pem文件，要把它放到根目录，才能用这个密钥文件连接服务器

这段代码，在实例上面的“Connect”按钮展开：

```
chmod 400 miyaodui.pem
ssh -i "miyaodui.pem" ubuntu@ec2-13-209-19-115.ap-northeast-2.compute.amazonaws.com
```

4、设置超流量使用时提醒：

右上角用户名-My Billing Dashboard-左侧Preferences-勾选“Receive Billing Alerts”