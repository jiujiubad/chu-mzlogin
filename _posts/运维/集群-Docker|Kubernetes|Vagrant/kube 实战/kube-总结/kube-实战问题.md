

### mysql 或 postgresql 的 pod 删除后服务连接不上

https://www.jianshu.com/p/792418f4abf6

需要用到：Init Container，在主容器启动前执行，检查数据库是否准备好，直到数据库可以连接才结束。然后其他的容器才被启动，和发起数据连接请求。

对于 mysql

```
initContainers:
  - name: "remove-lost-found"
    image: "busybox:1.28.4"
    command: 
      - rm
      - -fr
      - /var/lib/postgresql/data/pgdata/lost+found
    volumeMounts:
      - name: postgresql-pv
        mountPath: /var/lib/postgresql
```

对于 postgresql：https://github.com/helm/charts/issues/405

```
initContainers:
  - name: "remove-lost-found"
    image: "busybox:1.28.4"
    command: 
      - rm
      - -fr
      - /var/lib/mysql/lost+found
    volumeMounts:
      - name: mysql-storage
        mountPath: /var/lib/mysql
```



