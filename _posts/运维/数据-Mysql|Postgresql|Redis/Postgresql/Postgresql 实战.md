# Postgresql 实战

20180810【数据库】【postgresql】【pg】【Mac OS】

[TOC]

## 安装配置

安装 postgresql

```
brew install postgresql
```

查看版本

```
postgres -V
```



## 语法

进入 postgresql

```
psql postgres
```

### 数据库

创建数据库

```
CREATE DATABASE databasename;
```

查看所有数据库

```
\list
```

进入数据库

```
\connect databasename
```

### 表

查看所有表

```
\dt
```

### 用户

查看所有用户 role

```
\du
```

新增用户 role

```
CREATE ROLE username WITH LOGIN PASSWORD 'user password'; 
```

增加用户权限：CREATEDB、Superuser

```
ALTER ROLE username CREATEDB; 
ALTER ROLE username Superuser; 
```

删除用户

```
DROP ROLE username;
```

查看当前用户

```
select user;
```

切换用户

```
\c - username;
```





## 遇到的 bug

问题：执行 `psql postgres` 连接数据库时报错 error

```
psql: could not connect to server: No such file or directory
        Is the server running locally and accepting
        connections on Unix domain socket "/tmp/.s.PGSQL.5432"?
```

解决办法：https://stackoverflow.com/questions/13410686/postgres-could-not-connect-to-server

```
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```





## 参考资源

Mac OS 第一次配置 Postgresql

* [Getting Started with PostgreSQL on Mac OSX](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)



