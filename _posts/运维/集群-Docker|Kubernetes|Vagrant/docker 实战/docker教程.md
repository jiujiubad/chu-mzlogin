20180717【docker】



# 一、常用命令

Remove all unused containers, volumes, networks and images

```
# 清除所有image、container、volume
docker system prune -a

# 分别删除image、container、volume
docker image prune
docker container prune
docker volume prune
```

To delete all containers including its volumes use

```
docker rm -vf $(docker ps -a -q)
```

To delete all the images

```
docker rmi -f $(docker images -a -q)
```





删除镜像

```
docker rmi <image_id/image_name>
```

删除所有停止的容器

```
docker rm $(docker ps -a -q)
```

删除所有 restart 的容器

```
docker stop $(docker ps -a -q) &
docker update --restart=no $(docker ps -a -q) &
systemctl restart docker
```

