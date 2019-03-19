# 终端工具 percol

## percol 安装
用于 `command + r` 显示所有输⼊入过的命令 
安装及使用：https://github.com/mooz/percol
```
# 安装percol
pip install percol

# 拼音支持
percol --match-method pinyin

# 指定文件名
sudo touch /var/log/syslog
percol /var/log/syslog 

# 指定重定向
ps aux | percol
```