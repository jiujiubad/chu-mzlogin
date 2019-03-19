---
title: ror-system-购物网
date: '2017-11-20 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 218e855f
---

* 201711
* 编程+rails



[TOC]

## atom设置快捷键

lt、ltp、ltd表示，<%= link_to("XXXX", XXXX_path, class:"btn btn-danger btn-lg pull-right", method: :post) %>

tb表示，table.table.table-bordered>(thead>tr>th*3)+(tbody>tr>td*3)

sf表示，<%= simple_form_for @xx do |f| %><% end %>



## 记住：controller中定义action都是按照find_and_do的思路。

## 一再遇到的 bug

1、gem 'carrierwave'加上gem 'mini_magick'后，上传图片的时候报错上传不了。

解决办法：更新`brew upgrade imagemagick`，然后bundle

2、cart.add_product_to_cart(product)在rails c测试时，`product = Product.last`把小写的product写成大写，折腾半天。

3、current_cart的定义，`@current_cart ||= find_cart`错写成`@current_cart || find_cart`，另外`if cart.blank?`错写成`if current_cart.blank?`

4、6-1第四题，update会报错，是因为simple_form_for里要指明url，系统才能知道我们具体要删除哪一个cart_item，因为这里不是show页面。	

5、8-1checkout结算页在chrome浏览器里刷新，会跳出缺少order的show action的bug。换个浏览器就好了。

6、最常出现`No route matches {:action=>"index", :controller=>"admin/resumes"} missing required keys: [:job_id]`。原因如下：

- 1、Model层，model里没有做关联

- 2、Controller层，model关联后，所有外键（比如简历resume里有user_id、job_id）要在controlller的create的action里给一个表达式，指明这份简历具体属于哪一个用户、具体属于哪一个职位的。比如  

  ```
  app/controllers/resumes_controller.rb
    def create
      @job = Job.find(params[:job_id])
      @resume.job = @job
      @resume.user = current_user
    end
  ```

- 3、Views层，路径没有给参数，比如admin_job_resumes_path(@job)里的@job




# 一、提示版

## 4、后台

### 4.1、基础建设

4.1.1 fork、或新建专案

方法一：for专案网址 [https://github.com/quanzhanying/jdstore](https://github.com/quanzhanying/jdstore) 

```
git clone https://github.com/quanzhanying/jdstore.git rails/jdstore004 
cd rails/jdstore004
cp config/database.yml.example config/database.yml
bundle check
bundle install
git checkout -b test
rails s
```

方法二：新建专案

```
rails new rails/jdstore1201
git init
git commit -A 
git commit -m "git init"
rails s
```

4.1.2 gem 'bootstrap-sass'

* css

  * mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss

  * ```
    app/assets/stylesheets/application.scss

    @import "bootstrap-sprockets";
    @import "bootstrap";
    ```

* html

  * rails g controller welcome，新建index并设置为首页

  * footer

    * ```
      <footer class="container" style="margin-top: 100px;">
          <p class="text-center">
            Copyright ©2017 JDStore
            <br>
            Design by yourname       
          </p>
      </footer>
      ```

  * 增加views/common，文件`_navbar.html.erb`、`_footer.html.erb`、`_flashes.html.erb`，设置全局html

    * ```
      app/views/layouts/application.html.erb

          <body>
              <div class="container-fluid">
                  <%= render "common/navbar" %>
                  <%= render "common/flashes" %>
                  <%= yield %>
              </div>
              <%= render "common/footer" %>
          </body>
      ```

* flashes+js

  * js加入`//= require bootstrap/alert`

  * app/views/common/_flashes.html.erb

    ```
    <% if flash.any? %>
      <% user_facing_flashes.each do |key, value| %>
        <div class="alert alert-dismissable alert-<%= flash_class(key) %>">
          <button class="close" data-dismiss="alert">×</button>
          <%= value %>
        </div>
      <% end %>
    <% end %>
    ```

  * app/helpers/flashes_helper.rb

    ```
    module FlashesHelper
      FLASH_CLASSES = { alert: "danger", notice: "success", warning: "warning"}.freeze

      def flash_class(key)
        FLASH_CLASSES.fetch key.to_sym, key
      end

      def user_facing_flashes
        flash.to_hash.slice "alert", "notice","warning" 
      end
    end
    ```

  * 在welcome的index测试flashes

4.1.3 gem 'devise'

* 安装devise

  ```
  gem 'devise'
  rails g devise:install
  rails g devise user
  rake db:migrate
  ```

* 注册、登录、退出

  ```
  app/views/common/_navbar.html.erb
  -                <li> <%= link_to("登入", '#') %>   </li>
  +                <% if !current_user %>
  +                  <li><%= link_to("注册", new_user_registration_path) %> </li>
  +                  <li><%= link_to("登入", new_user_session_path) %></li>
  +                <% else %>
  +                  <li class="dropdown">
  +                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
  +                        Hi!, <%= current_user.email %>
  +                        <b class="caret"></b>
  +                    </a>
  +                    <ul class="dropdown-menu">
  +                        <li> <%= link_to("登出", destroy_user_session_path, method: :delete) %> </li>
  +                    </ul>
  +                  </li>
  +                <% end %>
  ```

* js加入`//= require bootstrap/dropdown`

4.1.4 gem 'simple_form'

* ```
  gem 'simple_form'
  rails generate simple_form:install --bootstrap
  ```

4.1.5 gem 'font-awesome-rails'

* ```
  gem 'font-awesome-rails'
  ```

* ```
  @import "font-awesome";
  ```

* ```
  <%= link_to(content_tag(:i, '登入', class: 'fa fa-sign-in'), new_user_session_path) %>

  <%= link_to(content_tag(:i, '登出', class: 'fa fa-sign-out'), destroy_user_session_path, method: :delete) %>
  ```

### 4.2、上架后台CRUD

* 使用者必须要是 admin 才能登入 [http://localhost:3000/admin/products](http://localhost:3000/admin/products)

* 商品栏位必须要有 title, description, quantity, price

* admin 后台 products 完整的 CRUD

  * 1、R：admin::products

    2、M：想到views里会用到栏位title/description/quantity/price

    ​

    3、C：new和create

    4、V：new页面，最简单的就好

    ​

    5、C：index

    6、V：index页面，最简单一个栏位就好

    ​

    7、C：edit和update，顺便把destroy加上

    8、V：edite页面

### 4.3、admin 可以登录后台

* 管理者（商家）必须先登录网站才能进入（商店）后台

* 管理者必须有 admin 权限才能进入后台

* 后台用layout 'admin'自定义页面样式

  * 1、before_action :authenticate_user!、before_action :admin_required

    2、C：def admin_required

    3、M：def admin?

    4、栏位：add_is_admin_to_user，boolean

    5、

    ```
    db/seeds.rb
    u = User.new
    u.email = "admin@test.com"           # 可以改成自己的 email

    u.password = "111111"                # 最少要六码

    u.password_confirmation = "111111"   # 最少要六码

    u.is_admin = true
    u.save
    ```

    ​

    6、C：layout "admin"

    7、V：app/views/layouts/admin.html.erb

### 4.4、上传图片

* 可以上传图片、且是剪切过的图片（gem 'carrierwave'、gem 'mini_magick'）

* 图片文件夹加入.gitignore中

* 设定 localhost:3000 为商品首页

* 商品index、show展示

* 重构后台各个views，加入图片

  * 1、

    ```
    gem 'carrierwave'
    gem 'mini_magick'
    ```

    rails g uploader image

    2、栏位：add_image_to_product

    3、

    ```
    app/models/product.rb
    class Product < ApplicationRecord
    + mount_uploader :image, ImageUploader
    end
    ```

    4、

    ```
    include CarrierWave::MiniMagick
    + process resize_to_fit: [800, 800]

    + version :thumb do
    +   process resize_to_fill: [200,200]
    + end

    + version :medium do
    +   process resize_to_fill: [400,400]
    + end
    ```

    5、C：params中加入image栏位

    6、V：new表单加入上传图片<%= f.input :image, as: :file %>

    7、V：edit表单加入现有图片<% if @product.image.present? %>，以及上传图片<%= image_tag(@product.image.thumb.url) %>

    8、public/uploads加入.gitignore

    ​

    9、C：product的index

    10、V：index页面，并修改首页路径。页面显示图片、标题、价格，当没有图片是用http://placehold.it/200x200&text=No Pic

    ​

    11、C：show

    12、V：show页面<%= image_tag(@product.image.medium.url) %>，当没有图片是用http://placehold.it/400x400&text=No Pic

    ​

    13、前后台navbar加入product

    14、美化后台product的index页面如下：

    ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fl9hdv3dyhj30m80c3mxx.jpg)

## 5、购物车实做

### 5.2 Step 1 : 建立加入购物车的 action

* 先做按钮和flashes

  * 1、R：路由add_to_cart

    2、V：按钮及路径

    3、C：先做find_and_do的find，直接返回redirect_to :back

### 5.3 Step 2: 购物车设计 Part 1

* cart、cart_item、product

* 实作add_product_to_cart(@product) 

* rails c 下测试功能

  * 效果：current_cart.add_product_to_cart(@product)

  * 1、M：新增cart和cart_item，并设置两者的关联

    2、栏位：cart_item加入cart_id、product_id、quantity, default: 1

    3、M：cart中定义add_product_to_cart(product)

    ```
    +  def add_product_to_cart(product)
    +    ci = cart_items.build
    +    ci.product = product
    +    ci.quantity = 1
    +    ci.save
    +  end
    ```

    4、rails c中测试可否执行add_product_to_cart(product)，如下：

    ```
    Cart.create
    cart = Cart.first
    cart.add_product_to_cart(product)
    cart.cart_items
    exit
    ```

### 5.4 Step 3: 购物车设计 Part 2

* 显示购物车内物品数量

* 实作current_cart

* rails c下测试功能

  * 效果：我们的目的是为了每个进店的客户（不管是否有登入，都准备一台购物车）。然后消费者随时可以察看购物车的产品数量。

  * 1、V：显示车的icon，显示车的数量<%= current_cart.products.count %> 

    2、C：定义current_cart

    ```
    app/controllers/application_controller.rb
    +  helper_method :current_cart

    +  def current_cart
    +    @current_cart ||= find_cart
    +  end

    +  private

    +  def find_cart
    +    cart = Cart.find_by(id: session[:cart_id])
    +    if cart.blank?
    +      cart = Cart.create
    +    end
    +    session[:cart_id] = cart.id
    +    return cart
    +  end
    end
    ```

    3、C：补齐add_to_cart的定义，即current_cart.add_product_to_cart(@product)

### 5.5 Step 4 : 显示购物车明细

* carts的index

  * 1、R：路由加入carts

    2、V：navbar的购物车按钮及链接

    3、V：index页面

    注意：为什么这里不用在controller里定义index？？——因为没有用到@carts，不用拿它来做@carts.each do |cart|。

    ![](https://ws1.sinaimg.cn/large/006tNc79gy1flqys6c6u9j30m809fmxk.jpg)

### 5.6 Step 5 : 计算总价

* 先在views里做，测试ok后重构到helper和model中

  * 1、V：测试运算<% sum = sum + cart_item.quantity * cart_item.product.price %>

    2、helper：把步骤1的逻辑重构helper，测试运算。

    3、M：用def total_price，把步骤2的运算重构到model中

## 6、购物车实做（解答）

### 6.1 购物车练习作业 （解答）

* 请设计一个功能，可以一键清空购物车内所有的商品

  * 1、R：路由collection，clean

    2、V：按钮加入路径

    3、C：定义clean，出现clean！

    4、M：定义clean!，用cart_items**.destroy_all

* 某商品突然不想买了，我可以在购物车内删除它

  * 1、R：路由cart_item

    2、V：按钮加入路径

    3、C：cart_item里定义destroy

* 已经加入购物车的商品，不能重复被加入

  * 1、C：在add_to_cart的action里，用if !current_cart.products**.include?**(@product)判断

* 可以更改购物车内购买的商品数量(原本预设数量都是1)

  * 1、V：加入<%= f.select :quantity, [1,2,3,4,5] %>

    2、C：cart_item的update的action

* 库存为 0 的商品不能购买

  * 1、V：<% if @product.quantity > 0 %>

    2、C：update的action，if @cart_item.product.quantity >= **cart_item_params[:quantity]**.to_i

* 在购物车新增数量时，不能更新超过原有库存的商品数量

  * 1、V：<%= f.select :quantity, 1..cart_item.product.quantity %>

## 8、订单实做

### 8.1 Step 1 : 建立结帐页

* 按下「确认结帐」按钮后，可以显示结帐明细order页，并且可以让消费者输入寄送地址

  * 1、R：路由加入checkout

    2、V：改views里按钮的路径

    3、C：checkout的action里新建一个order表单

    4、V：点击checkout发现页面没变化，console里提示缺少checkout页面。——新建checkout.html.erb（需调用cart_item的商品信息、制作填表用上order栏位）

    5、M：加入order所需栏位total、user_id、billing_name/address、shipping_name/address。并设置与user关系。

    6、R：路由加入order

    7、C：生成订单需要order的create的action。

    ![](https://ws3.sinaimg.cn/large/006tNc79gy1flrt0x20xug30m80dskjp.gif)

### 8.2 Step 2 : 建立购买明细

* 有时候商品会下架、价格会变，新建product_list的model

* 订单create时的购买明细缓存

* 购买明细show页面

  * 效果：用produst_list代替cart_item存储已下单的商品信息，达到订单里的商品信息不随商品更新而改变的目的。

  * 问题、为什么要新建product_list的model ？——order和product_list的model，相当于是把cart和cart_item的商品信息转移过来。在购物车cart里商品会随着管理员产品信息更新而更新，而在订单order里商品的信息不再改变，已经单独储存在product_list中。

  * 1、M：①新建product_list的model；②加入栏位order_id、product_name、product_price、quantity；③设置与order关系

    2、C：订单creat的action中建立product_list的缓存信息

    3、C：订单建立后会进入详情页即show，于是设置show的action

    4、V：show的views，因为要用order和product_list来替代cart和cart_item，所以这里用order和product_list调用信息。

    ![](https://ws2.sinaimg.cn/large/006tKfTcgy1fl9ckubwyvj30m8082q3n.jpg)

    ![](https://ws4.sinaimg.cn/large/006tNc79gy1flahazqdt7j30m80b1aas.jpg)

### 8.3 Step 3 : 将网址改为秘密

* token

  * 效果：订单号乱序显示

  * 1、栏位：新建add_token_to_order

    2、M：定义generate_token的action（SecureRandom.uuid），并加入before_create

    3、C：修改order里的id调用，比如redirect_to order_path(@order)改成redirect_to order_path(@order.token)，find改成find_by_token

## 9、订单实做（解答）

### 9.1 订单练习作业（解答）

* 使用者可以在 /account/orders/ 看到过去所有订单

* 使用者在下拉式选单可以看到过去所有的订单

* 订单排序

  * 1、R：路由加入

    2、C：order的index，并按时间排序

    3、V：index页面，并在navbar中加入链接。token报错，进入rails c，输入Order.where(token: nil).destroy_all

## 10、支付订单与寄信

### 10.1 Step 1 : 消费者可以针对订单付款

* 使用 is_paid（boolean 属性）判断是否已付费

* 使用 payment_method 判断，实际付款渠道为：微信、支付宝

* 已付款过的订单不可以再付

  * 效果：用is_paid判断是否付费，用payment_method判断支付方式。

  * 1、R：路由加入pay_with_alipay、pay_with_wechat

    2、V：加入支付的按钮并链接路径

    3、C：定义pay_with_alipay和pay_with_wechat的action

    4、栏位：add_payment_method_to_order，string

    5、M：定义set_payment_with!(method)、和 pay! ，用到上一步新建的栏位。这里的用法是self.update_columns(栏位: 设定的值 )

    ​

    6、栏位：add_is_paid_to_order，boolean

    7、V：加入if判断显示支付按钮，还是显示“订单已完成付款”

    ![](https://ws3.sinaimg.cn/large/006tKfTcgy1fl9cy13agqj30m80d1aal.jpg)

### 10.2 Step 2 : 寄送订单确认通知信

* 使用者在下单后会收到一封订单确认信，`rails g mailer OrderMailer`

* gem 'letter_opener'，并在console下测试信件预览

* 在订单建立时寄通知信

  * 1、rails g mailer OrderMailer，产生mailer相关文件

    2、app/mailers/application_mailer.rb，设置寄信人邮箱

    3、app/mailers/order_mailer.rb，设置寄信表头内容（完整代码见下面11章）

    ```
       def notify_order_placed(order)
        @user = order.user
        mail(to: @user.email , subject: "xxx")
      end
    ```

    4、V：notify_order_placed.html.erb，生成订单后的寄信内容（如果没有页面会在rails s报错）

    5、

    * `gem 'letter_opener', group: :development`

```
* config/environments/development.rb设置`config.action_mailer.delivery_method = :letter_opener`

6、rails c 中测试自动发送信件，OrderMailer.notify_order_placed(Order.last).deliver!

7、C：在order的create的action中加入清空购物车、发送邮件
```

## 11、后台出货订单操作

### 11.1 情境和 Model 准备

效果：「有限状态机」这个架构去做后台订单切换状态。

* 1、[aasm的github摘抄如下内容](https://github.com/aasm/aasm)

  * gem 'aasm'

    ```
    class Job
      include AASM #载入

      aasm do
        state :sleeping, :initial => true #初始状态
        state :running #状态2
        state :running #状态3

        event :run do #定义run的动作，可以在controller中用run!调用
          transitions :from => :sleeping, :to => :running #状态由sleeping转换为running
        end

        event :clean do
          transitions :from => :running, :to => :cleaning
        end

        event :sleep do
          transitions :from => [:running, :cleaning], :to => :sleeping #当有多种状态时用[]
        end
      end

    end
    ```

    下面这几个用到after_commit

    ```
      event           before_all_transactions
      event           before_transaction
      event           aasm_fire_event (within transaction)
      event           after_commit (if event successful)
      event           after_transaction
      event           after_all_transactions
      
      aasm do
        state :sleeping, :initial => true
        state :running

        event :run, :after_commit => :notify_about_running_job do
          transitions :from => :sleeping, :to => :running
        end
      end
    ```

  * 2、增加栏位：add_aasm_state_to_order， :string, default: "order_placed"，目的是设置初始值

    3、六个状态state注意是状态：

    * 已下订（order_placed）
    * 已付款（paid）
    * 卖家发货中（shipping）
    * 已交货（shipped）
    * 取消订单（order_cancelled）
    * 退货（good_returned）

    4、五种个model里的动作，即五种状态切换

    注意：这里是model的动作，常常会在controller的action行为下调用，因为在后面加!所以可以同名

    * make_payment（付款）
    * **ship卖家发货**（货物离开启运地或者发货人交运给承运人）
    * **deliver交货（货物到达目的地或者交付收货人）**
    * return（退货）
    * cancel（取消订单）

    4、C：`-   @order.pay!`，然后`+   @order.make_payment!`

    5、M：修改有限状态机

    ```
    event :make_payment, after_commit: :pay! do
    ```

    6、测试：重新操作订单新建到付款，rails c，Order.last，看aasm_state是否显示为转换后的状态paid

    ![](https://ws1.sinaimg.cn/large/006tKfTcgy1fl9fdf4i1vj30ez09f0t3.jpg)

### 11.2 订单状态切换

* 建立 admin/orders 可以看到系统内所有订单

* admin 的 order 列表应要能显示订单状态

* 使用者可以“申请取消订单”

* 使用者“申请取消订单”后，管理员应该要收到“申请通知信”

* 后台管理员可以“取消订单”、“出货”

* 后台管理“出货”后，系统应该寄出通知信

* 后台管理员“取消订单”后，系统应该寄出通知信

  * 1、R：路由加入admin::order

    2、C：index，按id排序

    3、V：index页面，用order调用信息：订单号、创建人、创建时间、订单状态

    ​

    4、C：show，显示product_lists

    5、V：show页面，用product_lists和@order调用信息

    ![](https://ws3.sinaimg.cn/large/006tNc79gy1flaorhgrlyg30m80f7kjm.gif)

    6、helper：render_order_paid_state(order)，显示已付款、未付款

    7、V：调用

    ​

    后台操作：

    8、V：app/views/admin/orders/_state_option.html.erb，用case..when语法罗列6种订单状态，然后分别在各种状态下列出需要出现的操作按钮，发现总共需要4种按钮、2种状态：

    * 已下订（order_placed）——申请取消订单cancel
    * 已付款（paid）——申请取消订单cancel+卖家发货ship
    * 卖家发货中（shipping）——交货deliver
    * 已交货（shipped）——退货
    * 取消订单（order_cancelled）——状态：订单已取消
    * 退货（good_returned）——状态：已完成退货

    ```
     app/views/admin/orders/_state_option.html.erb
     
     <% case order.aasm_state %>
      <% when "order_placed" %>
        <%= link_to("取消订单",
                    cancel_admin_order_path(order),
                    class: "btn btn-default btn-sm", method: :post) %>

      <% when "paid" %>
        <%= link_to("取消订单",
                    cancel_admin_order_path(order),
                    class: "btn btn-default btn-sm", method: :post) %>
        <%= link_to("出货",
                    ship_admin_order_path(order),
                    class: "btn btn-default btn-sm", method: :post) %>

      <% when "shipping" %>
        <%= link_to("设为已出货",
                    shipped_admin_order_path(order),
                    class: "btn btn-default btn-sm", method: :post) %>

      <% when "shipped" %>
        <%= link_to("退货",
                    return_admin_order_path(order),
                    class: "btn btn-default btn-sm", method: :post) %>

      <% when "order_cancelled" %>
        <span class="label label-default">订单已取消</span>

      <% when "good_returned" %>
        <span class="label label-default">已退货</span>

      <% end %>
    ```

    9、R：路由加入4种动作ship、shiped、return、cancel

    10、C：设置4种动作的find_and_do，其中do的部分已经在11-1的aasm..do里设置过，可以直接调用

    ```
      def ship
        @order = Order.find(params[:id])
        @order.ship!
        redirect_to :back
      end

      def deliver
        @order = Order.find(params[:id])
        @order.deliver!
        redirect_to :back
      end

      def cancel
        @order = Order.find(params[:id])
        @order.cancel!
        redirect_to :back
      end

      def return
        @order = Order.find(params[:id])
        @order.return!
        redirect_to :back
      end
    ```

    11、V：show里加入刚刚步骤8做的页面 <%= render "state_option", order: @order %>

    ​

    前台用户操作：

    12、R：加入用户取消订单动作apply_to_cancel

    13、V：申请取消订单的按钮附上链接，加条件<% if @order.order_placed? || @order.paid? %>

    14、C：定义apply_to_cancel

    ​

    寄信设置：

    15、C：分别加入寄信OrderMailer.notify_ship(@order).deliver!

    前台用户，apply_to_cancel申请取消订单apply_cancel(@order)

    后台，ship卖家已发货notify_ship(@order)

    后台，cancel订单已取消notify_cancel(@order)

    16、修改OrderMailer的表头

    ```
      app/mailers/order_mailer.rb
      
      def apply_cancel(order)
        @order       = order
        @user        = order.user
        @product_lists = @order.product_lists

        mail(to: "admin@test.com" , subject: "[JDStore] 用户#{order.user.email}申请取消订单 #{order.token}")
      end

    ```

    V：加入寄信页面，几个页面内容一样，可以用partial

    ```
    app/views/order_mailer/apply_cancel.html.erb
    <div class="row">
      <div class="col-md-12">
        <h2>
          订单明细 <br>
          <small>
            <%= link_to("订单连结", order_url(@order.token)) %>
          </small>
        </h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th width="70%">商品明细</th>
              <th>单价</th>
              <th>数量</th>
              <th>小记</th>
            </tr>
          </thead>
          <tbody>

            <% @product_lists.each do |product_list| %>
              <tr>
                <td>
                  <%= product_list.product_name %>
                </td>
                <td>
                  <%= product_list.product_price %>
                </td>
                <td>
                  <%= product_list.quantity %>
                </td>
                <td>
                  <%= product_list.quantity * product_list.product_price %>
                </td>
              </tr>
            <% end %>

          </tbody>
        </table>

        <div class="total group clearfix">
          <h4 class="pull-right">
            总计 <%= @order.total %> CNY
          </h4>
         </div>

         <hr>

         <h2> 寄送资讯 </h2>

         <table class="table table-striped table-bordered">
          <tbody>
            <tr>
              <td> 订购人 </td>
            </tr>
            <tr>
              <td>
                <%= @order.billing_name %> - <%= @order.billing_address %>
              </td>
            </tr>
            <tr>
              <td> 收件者 </td>
            </tr>
            <tr>
              <td>
                <%= @order.shipping_name %> - <%= @order.shipping_address %>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    ```

    17、在rails c中测试，OrderMailer.notify_order_placed(Order.last).deliver!



## 12、部署到 Heroku （七牛云）

### 12.1 本章学习指南

### 12.2 一些安全概念 (本节只需要看，不需要实作)

### 12.3 使用七牛云（用来存储图片）

### 12.4 使用 Figaro 管理密码

### 12.5 将JDStore部署到Heroku

### 12.6 JDStore 商店创意大赛（第二季）参赛指南

### 12.7 使用SendCloud服务发送邮件

### 12.8 Rails 环境架构

### 12.9 如何在 Heroku 上 Debug



## 13-部署到 Heroku (海外用户方案)

### 13.1 本章部属指南

### 13.2 申请AWS S3（用来储存图片）

### 13.3 使用 Figaro 管理密码

### 13.4 将JDStore部署到Heroku

### 13.5 泄漏 S3 密钥的处理方式




# 二、简单版

## 4、后台

### 4.1、基础建设

4.1.1 fork、或新建专案

*  [https://github.com/quanzhanying/jdstore](https://github.com/quanzhanying/jdstore) 

4.1.2 gem 'bootstrap-sass'

* css

* html

* flashes+js

  * app/views/common/_flashes.html.erb

    ```
    <% if flash.any? %>
      <% user_facing_flashes.each do |key, value| %>
        <div class="alert alert-dismissable alert-<%= flash_class(key) %>">
          <button class="close" data-dismiss="alert">×</button>
          <%= value %>
        </div>
      <% end %>
    <% end %>
    ```

  * app/helpers/flashes_helper.rb

    ```
    module FlashesHelper
      FLASH_CLASSES = { alert: "danger", notice: "success", warning: "warning"}.freeze

      def flash_class(key)
        FLASH_CLASSES.fetch key.to_sym, key
      end

      def user_facing_flashes
        flash.to_hash.slice "alert", "notice","warning" 
      end
    end
    ```

4.1.3 gem 'devise'

* 注册、登录、退出

4.1.4 gem 'simple_form'

4.1.5 gem 'font-awesome-rails'

### 4.2、上架后台CRUD

- 使用者必须要是 admin 才能登入 [http://localhost:3000/admin/products](http://localhost:3000/admin/products)
- 商品栏位必须要有 title, description, quantity, price
- admin 后台 products 完整的 CRUD

### 4.3、admin 可以登录后台

- 管理者（商家）必须先登录网站才能进入（商店）后台
- 管理者必须有 admin 权限才能进入后台
- 后台用layout 'admin'自定义页面样式

### 4.4、上传图片

- 可以上传图片、且是剪切过的图片（gem 'carrierwave'、gem 'mini_magick'）
- 图片文件夹加入.gitignore中
- 设定 localhost:3000 为商品首页
- 商品index、show展示
- 重构后台各个views，加入图片



## 5、购物车实做

### 5.2 Step 1 : 建立加入购物车的 action

* 先做按钮和flashes

### 5.3 Step 2: 购物车设计 Part 1

* cart、cart_item、product
* 实作add_product_to_cart(@product) 
* rails c 下测试功能

### 5.4 Step 3: 购物车设计 Part 2

* 显示购物车内物品数量
* 实作current_cart
* rails c下测试功能

### 5.5 Step 4 : 显示购物车明细

* carts的index

### 5.6 Step 5 : 计算总价

* 先在views里做，测试ok后重构到helper和model中



## 6、购物车实做（解答）

### 6.1 购物车练习作业 （解答）

- 请设计一个功能，可以一键清空购物车内所有的商品
- 某商品突然不想买了，我可以在购物车内删除它
- 已经加入购物车的商品，不能重复被加入
- 可以更改购物车内购买的商品数量(原本预设数量都是1)
- 库存为 0 的商品不能购买
- 在购物车新增数量时，不能更新超过原有库存的商品数量



## 8、订单实做

### 8.1 Step 1 : 建立结帐页

* 按下「确认结帐」按钮后，可以显示结帐明细order页，并且可以让消费者输入寄送地址

### 8.2 Step 2 : 建立购买明细

* 有时候商品会下架、价格会变，新建product_list的model
* 订单create时的购买明细缓存
* 购买明细show页面

### 8.3 Step 3 : 将网址改为秘密

* token



## 9、订单实做（解答）

### 9.1 订单练习作业（解答）

- 使用者可以在 /account/orders/ 看到过去所有订单
- 使用者在下拉式选单可以看到过去所有的订单
- 订单排序



## 10、支付订单与寄信

### 10.1 Step 1 : 消费者可以针对订单付款

- 使用 is_paid（boolean 属性）判断是否已付费
- 使用 payment_method 判断，实际付款渠道为：微信、支付宝
- 已付款过的订单不可以再付

### 10.2 Step 2 : 寄送订单确认通知信

- 使用者在下单后会收到一封订单确认信，`rails g mailer OrderMailer`
- gem 'letter_opener'，并在console下测试信件预览
- 在订单建立时寄通知信



## 11、后台出货订单操作

### 11.1 情境和 Model 准备

效果：「有限状态机」这个架构去做后台订单切换状态。

* 已下订（order_placed）

- 已付款（paid）
- 卖家发货中（shipping）
- 已交货（shipped）
- 取消订单（order_cancelled）
- 退货（good_returned）

### 11.2 订单状态切换

- 建立 admin/orders 可以看到系统内所有订单
- admin 的 order 列表应要能显示订单状态
- 使用者可以“申请取消订单”
- 使用者“申请取消订单”后，管理员应该要收到“申请通知信”
- 后台管理员可以“取消订单”、“出货”
- 后台管理“出货”后，系统应该寄出通知信
- 后台管理员“取消订单”后，系统应该寄出通知信



## 12、部署到 Heroku （七牛云）

### 12.1 本章学习指南

### 12.2 一些安全概念 (本节只需要看，不需要实作)

### 12.3 使用七牛云（用来存储图片）

### 12.4 使用 Figaro 管理密码

### 12.5 将JDStore部署到Heroku

### 12.6 JDStore 商店创意大赛（第二季）参赛指南

### 12.7 使用SendCloud服务发送邮件

### 12.8 Rails 环境架构

### 12.9 如何在 Heroku 上 Debug



## 13-部署到 Heroku (海外用户方案)

### 13.1 本章部属指南

### 13.2 申请AWS S3（用来储存图片）

### 13.3 使用 Figaro 管理密码

### 13.4 将JDStore部署到Heroku

### 13.5 泄漏 S3 密钥的处理方式







### 

