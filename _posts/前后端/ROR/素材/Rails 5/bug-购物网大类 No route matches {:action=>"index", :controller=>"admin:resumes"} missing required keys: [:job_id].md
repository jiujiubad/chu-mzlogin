---
title: >-
  bug-购物网大类 No route matches {/action=>"index", /controller=>"admin/resumes"}
  missing required keys/ [/job_id]
date: '2017-11-29 04:20'
categories:
  - ror知识点
tags:
  - bug
img: 'https://ws1.sinaimg.cn/large/006tNc79gy1fnfw7fgtkoj30dv0dh0sq.jpg'
abbrlink: 3e73ee3b
---

* 201711
* 编程+rails



# ActionController::UrlGenerationError in Admin::Jobs#index

Showing */Users/apple/rails/job-listing1129/app/views/admin/jobs/index.html.erb* where line **#22** raised:

No route matches {:action=>"index", :controller=>"admin/resumes"} missing required keys: [:job_id]

Extracted source (around line **#22**):

| `202122232425              ` | `          <%= link_to(job.title, admin_job_path(job)) %>        </td>        <td><%= link_to(job.resumes.count, admin_job_resumes_path) %></td>        <td><%= job.wage_lower %></td>        <td><%= job.wage_upper %></td>        <td><%= job.contact %></td>` |
| ---------------------------- | ---------------------------------------- |
|                              |                                          |

Rails.root: /Users/apple/rails/job-listing1129



![](https://ws4.sinaimg.cn/large/006tNc79gy1flz0yphnt7j31fo0msn3t.jpg)



## 原因：

### 1、model里没有做关联

### 2、model关联后，所有外键（比如简历resume里有user_id、job_id）要在controlller的create的action里给一个表达式，指明这份简历具体属于哪一个用户、具体属于哪一个职位的。比如

```
  def create
    @job = Job.find(params[:job_id])
    @resume.job = @job
    @resume.user = current_user
  end
```

### 3、views的路径没有给参数，比如admin_job_resumes_path(@job)里的@job