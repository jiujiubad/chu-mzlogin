---
title: ror-system-招聘网
date: '2017-12-13 10:25'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: f7a3e9a4
---

* 201712
* 编程+rails



# 用户故事

- 身为管理者，我可以新增职缺需求；
  - 包括「标题」「内容」「薪资上限」「薪资下限」「联系方式」
- 身为管理者，我可以编辑、删除、隐藏职缺需求 （在后台）；
- 身为使用者，我必须「登入」才能发表职缺；
- 身为使用者，我必须要有「admin 身份注记」才能进入后台。



## 5、基础建设与前后台job

rails new，或者是git clone、cp config/database.yml.example config/database.yml、bundle install

①、gem 'bootstrap-sass'，css、html、flashes

②、gem 'devise'，做navbar的login、logout、signup

③、gem 'simple_form'

④、gem 'font-awesome-rails'，加入登录和退出小图标



* 基础建设
* jobs和admin/jobs的CRUD，最小可行界面。
  * admin加入require_is_admin的验证
* 加入其他栏位：wage_upper_bound、wage_lower_bound、contact_emal、is_hidden
  * 薪资不能为空，且大于0，numericality: { greater_than: 0}
  * is_hidden用boolean值，隐藏的职位不可在前台看到，并排序
  * 后台显示public和hidden状态，并把代码搬到helper
* admin/jobs的CRUD，最小可行界面

![](https://ws1.sinaimg.cn/large/006tKfTcgy1flvcx97xurj30m807pjs0.jpg)



## 8、

- 把 admin#jobs（管理员用的）与 jobs（应征者用的）做个区分；
  - 加上 sidebar 设计，即用layout "admin"
- 在 admin 后台的职缺状态，改成图标；
  - 改成 Font Awesome 图标，content_tag(:span, "", :class => "fa fa-lock或fa-globe")
- 把 is_hidden 的操作改成按钮
  - R
  - V
  - C，然后重构到M
  - 注意：这里更新栏位可有两种写法，①、`self.栏位 = 值`；②、self.update_columns(栏位: 值)，更新完栏位的值，记得要self.save保存。
  - jobs#show 被隐藏的工作不可以被查看到




## 11、薪资排序 和上传简历

- 首页可以按照职缺薪资下限排序
  - 因为有多种情况，controller里用case..when的语法
  - 排序order部分用scope重构到model中
- 首页可以按照职缺薪资上限排序
- 首页可以按照职缺发表时间排序
- 应征者可以提交自己的简历
  - 简历的网址应该长成这样：/jobs/1/resumes/new
  - 用户必须要登入才能提交简历
  - 使用 Resume 这个 model 的 attachment 栏位
    - gem "carrierwave"
    - public/uploaders加入.gitignore里

### 11-1

#### 1、网址里带参数的写法？

* 【问题1】①、jobs_path(:order => "by_upper_bound")可不可以写成jobs_path(order : "by_upper_bound")？可以的。注意：这种写法写完后，用chrome的检查，可以看到生成下面②里的网址。
* ②、/jobs?order=by_lower_bound

#### 2、controller里的判断式

```
  def index
    @jobs = case params[:order]
            when 'by_lower_bound'
              Job.where(is_hidden: false).order('wage_lower_bound DESC')
            when 'by_upper_bound'
              Job.where(is_hidden: false).order('wage_upper_bound DESC')
            else
              Job.where(is_hidden: false).order('created_at DESC')
            end
  end
```

### 11-2、上传简历

#### 1、【问题1】：resume的controller里create的写法，需要加入`@resume.job = @job`和`@resume.user = current_user`，是不是根据链接可以看到这里跟job_id和resume_id都有关，所以用于说清楚它们的关系？？

【待完善的解释】：测试发现`@resume.job = @job `放在show里会报错，所以这行代码是不能乱放的。

因为job职位有很多个，用@resume.job = @job指明简历具体投递的是哪个职位；因为user用户有很多个，用@resume.user = current_user来指明这份简历具体是谁投递的。——从7个action来看，只有create和update适合用来记录外键值user_id、job_id，而update只能通过edit来进入，并不是每个resume都会被我们编辑到，所以通过create的action来指明。

```
  def create
    @job = Job.find(params[:job_id])
    @resume = Resume.new(resume_params)
    @resume.job = @job  #这行不加会报错
    @resume.user = current_user #这行不加点击上传简历页面没有反应
    if @resume.save
      redirect_to root_path
    else
      render :new
    end
  end
```



## 12、简历后台

- 管理员在后台可以看到每个职缺有多少使用者投递简历；

  - ```
    job.resumes.count
    ```

- 管理员在后台可以看到每个职缺里面的投递简历内容，并且可以下载附件。

  - ```
    <%= link_to("Download Resume", resume.attachment_url) %>
    ```

  - ```
    <%= render :partial => "resume", :collection => @resumes, :as => :resume %>
    ```



### 12-2、后台看到全部简历

1、【问题1】：<%= link_to(job.resumes.count, admin_job_resumes_path(job)) %>这个就ok，但是<%= link_to(job.resumes.count, admin_job_resume_path(job)) %>这个会报错如下，要怎么改才能查看show页面？

![](https://ws4.sinaimg.cn/large/006tNc79gy1fltkpd27moj30p50gigof.jpg)



* 分析：show的地址如`http://localhost:3000/admin/jobs/12/resume/1`，这里需要知道job_id和resume_id，即要传入两个参数，括号里要怎么写？？——测试发现各种方案都会报错，两个参数的写法应该是(@job, @resume)。

  * 现在的页面是`http://localhost:3000/admin/jobs`即job的index，一般是在`http://localhost:3000/admin/jobs/12/resumes`即resume的index页面里写show，测试发现ok。

      ```
      <% @resumes.each do |resume| %>

        <div class="panel-heading">

      ​```
      <%= link_to("简历详情show", admin_job_resume_path(@job, resume)) %>
      ​```

        <% end %>
      ```


2、

①、carrierwave下载简历的链接用url写`<%= link_to("下载简历", resume.attachment_url) %>`。

②、使用者用`<%= @resume.user.email %>`。

③、外观用bootstrap的panel整合。

3、【拓展问题】：resume的edit的action要怎么写，用下面的写法一直报错。		![](https://ws4.sinaimg.cn/large/006tNc79gy1fltnovmk4gj31440mf124.jpg)



## 13、魔改

1、首页大图，用bootstrap的巨幕

```
background-image:url('http://fullstack-public.oss-cn-qingdao.aliyuncs.com/2017-04-15-542213.png')
```

2、首页小栏目，用bootstrap的缩略图

3、后台按钮样式，用class => "btn btn-xs btn-success"，常用颜色info、danger、success、warning，default、primate

4、表格样式，class:"table table-bordered table-hover"

5、导航栏颜色样式，用bootstrap导航

6、logo和favicon，用font-awesome或img。`<img src='<%= image_url 'logo.png' %>' >`

7、【问题1】`.btn-lg, .btn-group-lg > .btn`是什么意思？

```
+ .btn-lg, .btn-group-lg > .btn {
+     padding: 8px 16px;//通过padding来决定btn的大小
+     font-size: 20px;//btn文字大小
+     letter-spacing: 3px;//调整文字间距
+     border-radius: 3px;//btn圆角
+     width: 200px;//这里用指定宽度把btn拉得更长
+ }
```