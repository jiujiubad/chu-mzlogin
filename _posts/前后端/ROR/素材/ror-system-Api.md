---
title: ror-system-Api
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: c0ce8aa
---

* 201712
* 编程+ruby



看第四遍，又看懂了一些东西



# 1、爬虫的关键

安装 [rest-client](https://github.com/rest-client/rest-client) 这个 gem，可以让我们用 Ruby 发送 HTTP 请求：

透过 Nokogiri 这个库可以帮助我们解析 HTML，透过 CSS selector 从文件中比对出想要的资讯。

```
require 'nokogiri'
doc = Nokogiri::HTML.parse(response.body)
doc.css(".today .tem").map{ |x| x.text }  # 得到 ["\n13°C\n", "\n2°C\n", "\n"] 
```

## 重点代码：

```
response = RestClient.get "http://v.juhe.cn/weather/citys", :params => { :key => "你申请的key放这里" }
data = JSON.parse(response.body)
```

第一行用 [rest-client](https://github.com/rest-client/rest-client) 这个 gem，发送http请求，并附带API key可以让系统验证我们分身份让我们有权限抓数据。

第二行是把json字串转回ruby。



# 2、Api key的作用

密钥，提供了这个key，直接就可以相当于通过身份验证，如已经登录了、或是管理员、或是超级会员等身份。

自定义API key，是在model里用`before_create :generate_authentication_token`来调用。

```
app/models/user.rb

  class User < ApplicationRecord
+   before_create :generate_authentication_token
+
+   def generate_authentication_token
+     self.authentication_token = Devise.friendly_token
+   end
```



# 3、controller 常用代码

```
app/controller/api/v1/reservations_controller.rb

+  class Api::V1::ReservationsController < ApiController
+  def index
+    @reservations = current_user.reservations
+
+    render :json => {
+      :data => @reservations.map { |reservation|
+        {
+          :booking_code => reservation.booking_code,
+          :train_number => reservation.train.number,
+          :seat_number => reservation.seat_number,
+          :customer_name => reservation.customer_name,
+          :customer_phone => reservation.customer_phone
+        }
+      }
+    }
+  end
```

第一部分，跟平时的CRUD一样。

第二部分，因为Api省略了views文档，相当于把views要传递的参数放在controller里，并转换成api用的json格式。



#### 用  [JBuilder](https://github.com/rails/jbuilder) 可以重构以上代码，特别是GET这种字段特别多的代码。

```
app/controllers/api/v1/trains_controller.rb

 def show
   @train = Train.find_by_number!( params[:train_number] )
-    render :json => {
-      :number => @train.number,
-      :available_seats => @train.available_seats
-    }
 end
```

新增 `app/views/api/v1/trains/show.json.jbuilder` 档案，这就是 JBuilder 样板，即action.json.jbuilder。

用JBuilder简化后的代码如下：

```
app/views/api/v1/trains/show.json.jbuilder

json.number @train.number
json.available_seats @train.available_seats
json.created_at @train.created_at
```





# 4、routes.rb 常用代码

以下是路由`routes.rb`的写法（这种写法只适用于ruby，常用写法要每个action逐条列出）：

```
namespace :api, :defaults => { :format => :json } do
  namespace :v1 do
    resources :trains, :only => [:index, :show]
    resources :reservations, :only => [:show, :create, :update, :destroy]   
  end
end
```



常用的写法如下：

```
config/routes.rb
 Rails.application.routes.draw do
+ namespace :api, :defaults => { :format => :json } do
+   namespace :v1 do
+     get "/trains"  => "trains#index", :as => :trains
+     get "/trains/:train_number" => "trains#show", :as => :train
+
+     get "/reservations/:booking_code" => "reservations#show", :as => :reservation
+     post "/reservations" => "reservations#create", :as => :create_reservations
+     patch "/reservations/:booking_code" => "reservations#update", :as => :update_reservation
+     delete "/reservations/:booking_code" => "reservations#destroy", :as => :cancel_reservation

+    post "/signup" => "auth#signup"
+    post "/login" => "auth#login"
+    post "/logout" => "auth#logout"
+   end
+ end
```

其中`post "/reservations" => "reservations#create", :as => :create_reservations`的意思是

客户端送出 `POST /api/v1/reservations` 时，会进入 Api::V1::ReservationsController 的 `create` 方法，而 `as` 参数的意思是产生这个地址的路由方法叫做 `api_v1_create_reservations_path`。



最后，`:defaults => { :format => :json }` 意思是默认客户端要求的是 `JSON` 格式，本来的默认值是 `HTML`。如果没有改这个的话，你必须在网址最后面加上 `.json` 来指定客户端要求的格式，例如 `GET /api/v1/trains.json`。



# 4、Api key多用于web端，手机端怎么办？

#### 做注册、登录的api端口（我的理解是一个网址就是一个端口）





# 5、其他

只有 `form-data` 才能上传档案（如图片、pdf），而不是json

进 `rails c` 输入 `100.times { |i| Train.create( :number => "T#{i}" ) }` 就会产生一百笔资料。