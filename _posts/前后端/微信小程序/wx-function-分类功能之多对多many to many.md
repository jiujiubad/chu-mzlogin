---
title: wx-function-分类功能之多对多many to many
date: '2017-12-27 00:10'
categories:
  - ror功能
tags:
  - ror功能
img: 'https://ws3.sinaimg.cn/large/006tNc79gy1fnfvqdlgzej30d608s74i.jpg'
abbrlink: ba21773f
---

* 201712
* 编程+小程序



[一种多对多的分类写法](http://superlei-blog.logdown.com/posts/1744668-a-many-to-many-classification-lines)——99测试在job-listing上直接粘贴代码可行。

https://forum.qzy.camp/t/topic/1381

作品网站https://explorer-xiaofei.herokuapp.com/firsttool

Githubhttps://github.com/kristennn/Explorer/blob/master/app/views/jobs/_search_bar.html.erb

# 一、操作步骤

1）job、character、character_ship

2）设置多对多关系

3）加入edit和new表单中

4） app/views/jobs/index.html.erb搜索框

```
<%= form_tag jobs_path,method: :get do %>
  <%= text_field_tag :name %>
  <%= submit_tag "确定" %>
<% end %>
```

5）app/controllers/jobs_controller.rb搜索框数据加工

```
def index 
  ...
  ...
  if params[:name].present?                                #新增以下六行：
    @character = Character.find_by(:name => params[:name])
    if @character.present?
      @jobs = @character.jobs
    end 
  end 
end 

```

6）admin_jobs_controller设置白名单

```
def job_params
  params.require(:job).permit(:title, :description, :character_ids => [])      
  #在这里加上character_ids
end 
```

搞定！！！添加一些数据，就可以在搜索框里测试了。



# 二、用自己的github案例整理教程

https://github.com/jiujiubad/wx-luccake-api/commit/44d7da93a37c3f203331f8656a3cfff0966d971d