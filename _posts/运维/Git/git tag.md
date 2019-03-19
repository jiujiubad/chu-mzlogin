

```
# 添加标签
git tag -a <tag_name> -m <commit info>

# 查看标签
git tag
git tag -l

# 推送标签到远程仓库
git push --tags
git push --tag

# 删除标签
git tag -d <tag_name>

# 删除远程仓库的标签
git push origin :refs/tags/<tag_name>
```

