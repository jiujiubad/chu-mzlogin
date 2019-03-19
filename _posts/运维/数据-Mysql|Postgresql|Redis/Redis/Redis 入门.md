## 1.1 Redis 安装与用法
Redis 数据类型-列表：http://www.redis.cn/topics/data-types-intro.html#lists
EVAL 简介之 Lua 脚本：http://www.redis.cn/commands/eval.html

遗留问题：
1、Redis 是一个集群？
2、`eval "return redis.call('get','foo')" 0` 的 0 是什么意思？
3、Redis 没有状态？sql 是文本存储，Redis 导出数据是从内存导出到文本。

### 1.1.1 安装
用homebrew安装，默认开机自启动
```
brew update
brew install redis  #安装
redis-server -v     #查看版本
```
### 1.1.2 修改密码
```
vim /usr/local/etc/redis.conf
```
用 `/requirepass mypassword` 搜索密码位置，按 n（或shift+n）切换下一个
```
requirepass 123456
```
重启生效
```
brew services restart redis  #重启
```
### 1.1.3 Redis 数据类型 - List 列表
```
redis-cli -h 127.0.0.1 -p 6379 -a myPassword  #进入redis
PING                #检测登录，返回PONG表示已连接
set mykey 10        #设置字符串的值
get mykey           #获取字符串的值
set key 10 ex 60    #设置 key 的值和超时时间
get key             #查看 key 的值
ttl ex              #查看剩余时间
lpush mylist value  #从左添加元素
lrange mylist 0 -1  #查看第一到最后一个元素
rpop mylist         #取出右边最后一个元素，并返回元素的值
redis.flushall      #危险动作！删除所有 key！
```
### 1.1.4 Resid 项目实战
指定 redis 使用第 1 个数据库，设置常用 key 全局变量 `$key_xx`
```
url = "redis://:#{ENV['REDIS_PASSWORD']}@#{ENV['REDIS_HOST']}:#{ENV['REDIS_PORT']}"
redis_url    = "#{url}/1"
$redis       = Redis.new(url: redis_url )
$key_public  = "public_exec_tasks"
$key_execute = "execute_tasks"
```
常用 Redis List（列表）
```
$redis.lpush(key, data.to_json)  # 从左边加入
$redis.rpop(key)                 # 从右边取出
$redis.rename(key, key2)         # 重命名
$redis.dbsize                    # 显示不同名key的数量
$redis.llen(key)                 # 显示同名key的数量
$redis.lrange(key, 0, -1)        # 显示key的值(第一个到最后一个)
$redis.lrem(key, x, value)       # 删除从左开始，值为value的x个值（0表示全部）
$redis.flushdb                   # 清空当前数据库（！危险）
$redis.flushall                  # 清空所有即16个数据库（！危险）
```
常用 Redis Sets（集合：是 String 的无序排列）
```
$redis.sadd("public_set", 1)  # 为集合添加元素
$redis.smembers(:public_set)  # 返回该集合所有的元素
```

## 1.2 EVAL 简介之 Lua 脚本
Eval 第一个参数是一段 Lua 5.1 脚本，Eval 第二个参数是参数个数，Eval 第三个参数是 Lua 脚本中用到的 Redis key
```
eval "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second
```
* Lua 类型和 Redis 类型之间存在着一一对应的转换关系
* 从 Lua 转换到 Redis 有一条额外的规则，这条规则没有和它对应的从 Redis 转换到 Lua 的规则：
* Lua boolean true -> Redis integer reply with value of 1. / Lua 布尔值 true 转换成 Redis 整数回复中的 1
* Lua 中整数和浮点数之间没有什么区别。因此，我们始终 Lua 的数字转换成整数的回复，这样将舍去小数部分。如果你想从 Lua 返回一个浮点数，你应该将它作为一个字符串（见比如 ZSCORE 命令）。
* 脚本的原子性： Redis 也保证脚本会以原子性(atomic)的方式执行： 当某个脚本正在运行的时候，不会有其他脚本或 Redis 命令被执行。
### 1.2.1 EVALSHA 减少带宽消耗
### 1.2.2 脚本缓存
缓存可以长时间储存而不产生内存问题的原因是，它们的体积非常小，而且数量也非常少，储存这些脚本的内存是微不足道的。执行过一次的脚本会一直保留在内存当中，因此它可以在流水线中使用 EVALSHA 命令而不必担心因为找不到所需的脚本而产生错误。
### 1.2.3 纯函数脚本
math.random 和 math.randomseed 
```
RandomPushScript = <<EOF
    local i = tonumber(ARGV[1])
    local res
    math.randomseed(tonumber(ARGV[2]))
    while (i > 0) do
        res = redis.call('lpush',KEYS[1],math.random())
        i = i-1
    end
    return res
EOF
r.del(:mylist)
puts r.eval(RandomPushScript,1,:mylist,10,rand(2**32))
```
### 1.2.4 全局变量保护
Redis 脚本不允许创建全局变量
### 1.2.5 可用库