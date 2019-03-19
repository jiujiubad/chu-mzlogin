---
title: ror-system-MVC语法笔记
date: '2017-12-14 00:10'
categories:
  - ror系统
tags:
  - ror系统
img: 'https://ws4.sinaimg.cn/large/006tNc79gy1fnfep1kp2qj30jk0dtwez.jpg'
abbrlink: 7d273add
---

* 201712
* 编程+rails



*【小结】增加controller，就要想要加routes，然后在views里添加路径，然后在controller里把动作补全。
*【小结】增加栏位，修改views和controller，甚至model后，要记得加入params中。

ruby Where is the method 'self' defined in my Rails app



### 现在才懂的MVC：

```
  def index
    @job = Job.find(params[:job_id])
    @resumes = Resume.all
  end
  
    def index
    @job = Job.find(params[:job_id])
    @resumes = @job.resumes.order("created_at DESC")
  end
```

- ①、controller里的右边参数是类（大写开头），所以Resume.all就是捞出Resume这个类里所有的数据。②、@resumes为什么要加s，就是因为右边捞出来的数据是复数的。

  ③、然后看到相应的index的views，`<% @resumes.each do |resume| %>`这里的@resumes就是上面index里的@resumes



## 怎么解读这些需求？

购物车练习作业

- 1、请设计一个功能，可以一键清空购物车内所有的物品
- 2、某样东西突然不想买了，我可以在购物车内删除它
- 3、已经加入购物车的物品，不能重复被加入
- 4、可以更改购物车内购买的数量( 原本预设数量都是1）
- 5、库存为 0 的货品不能购买
- 6、在购物车新增数量时，不能更新超过原有库存的数量

> 1、清空所有物品即要清空格子cart_item，是一个动作，在cart的controller里定义一个新的动作、routes加路径delete :clean，因为清空是针对多个格子所以用collection。
> 2、删除一个cart_item，是一个动作，删除一件是destroy的action，所以添加cart_item的controller和相应的destroy的action。
> 3、商品已加入购物车说明车子id已知。。。加入产品的关键代码是add_products_to_cart。。。
>
> Include?是什么？
>
> 正解：在current_cart.add_product_to_cart(@product)加入判断，当前车子是否包含这件商品if !current_cart.products.include?(@product)。include?在dash上查到ruby和rails都有这样的用法。
> 4、商品数量是current_cart.current_item.product.count。。。
> 正解：更改数量意味着要edit和update数量，商品数量前边有定义cart_item.quantity
> 5、换个说法是如果库存为0则提示商品无库存，是一个if判断，商品数量是cart_item.quantity，要改的位置有product_controller的add_to_cart行为。
> 6、更新为cart_item_controller的update行为增加if条件。



## 怎么解读这些需求？

订单状态切换

- 1、建立 admin/orders 可以看到系统内所有订单
- 2、admin 的 order 列表应要能显示订单状态
- 3、使用者可以“申请取消订单”
- 4、使用者“申请取消订单”后，管理员应该要收到“申请通知信”
- 5、后台管理员可以“取消订单”、“出货”
- 6、后台管理“出货”后，系统应该寄出通知信
- 7、后台管理员“取消订单”后，系统应该寄出通知信





# 其他

```
gem 'letter_opener', group: :development
A：这个gem只在development开发环境下使用

config/environments/development.rb
config.action_mailer.default_url_options = { host: 'localhost:3000' }  #gem官网没有给这条代码，测试发现没有这条也可以运行。
config.action_mailer.delivery_method = :letter_opener
```



>网址https://fullstack.xinshengdaxue.com/posts/661#task中的#task是什么？
>A：#像锚点一样，代表网页中的一个位置，浏览器读取url后会滚动到task所在位置。
>
>![](http://ww3.sinaimg.cn/large/006tNbRwgy1ffhk6uuns5j30jx0fjjsw.jpg)





# Model

观察发现：model的信息是可以在不同名的controller里调用。

> 查找validates相关用法：https://guides.ruby.tw/rails3/active_record_validations_callbacks.html 或https://ruby-china.github.io/rails-guides/active_record_validations.html Active Record 数据验证
>
> ```
> validates_presence_of :name
> A：validates_presence_of 确定属性是存在的，非空非nil非false。
> ```
>
> 

```
rails g migration/model，是否是第一次建立就要model？
A：是 
```

```
admin_job的controller里没有重新增加title和description栏位（即rails g model title:string description:text），是不是意味着增加的栏位每个controller都可以调用？

A：没错，不管是admin下面的jobs_controller 还是controllers目录下面的，打交道的数据都是同一个job model，因为普通用户和管理员都是对同一个job相关的信息进行操作的。
```

```
rails g migration的数据也属于job model吗？或是说，如果我拿新建的admin的controller去调用6-3创建的那些栏位（wage_lower_bound/wage_upper_bound/contact_email）也是可以的？

A：整理自己的理解："看atom的架构图，model里没有admin_job.rb，因为前后台都是用job.rb，而写进db：migrate的数据因为是add_more_detail_to_job，涉及到job，所以model调用的时候是在job中执行，所以db里的数据相当于是在model/job里。"是的，你这样理解基本是对的。那个后面的to_job，job代表的就是model。所谓的rails 约定优于配置，to_job就是其中的一个例子。
```

```
知道11-1，model中只有user和job，不用写关系，但是加入resume就要写，是因为两个就不用多个就要吗？如果resume不写关系会怎样？
A：会提示出错，自己试试，一般model中的rb文件都是要根据所需功能设置关系的。比如，做招聘003的11-2QA，要先找到job，再找相关的resume，如果没有设置相关关系job has_many :resumes，系统就不知道要去哪里找resume。
```



```
-    event :make_payment do
+    event :make_payment, after_commit: :pay! do
       transitions from: :order_placed, to: :paid
     end
     
 1、after_commit是什么？
 A：rails内建callback，after_commit这个callback是在记录被创建，更新或销毁后调用的。
```



> ## .xxx的用法在model，跟controller一样是执行动作
>
> ```
> cart_items.destroy_all
> 1、destroy_all和delete_all的区别？
> A：都用于批量删除表格数据。
>
> delete_all 是一条sql语句删除，它会直接执行删除而不查询数据，优点是网络开销相对少，缺点是如果删除出现问题，回滚起来代价比较大。
>
> destroy_all 则先查出所有的数据，再一条一条的按照主键删除，优点是容易过程出现问题容易终止，缺点是网络开销比较大。
>
> 同样的数据量，delete_all 删除的速度更快，因此在什么情况下选用哪种方法，一是可以根据对执行过程的速度需求决定，二是根据对数据安全的需求决定。
>
> 代码运行过程参考这里http://blog.csdn.net/feigeswjtu/article/details/51581020
> ```
>
> ```
> current_cart.clean!  
> A：有加！的要在model进一步定义
> ```
>
> 



# Controller

观察发现：xxx_params添加的栏位只是那些在new、update有新增、修改的栏位，而栏位的赋值不用加入，比如product_list一节在订单建立后建立购买明细缓存时，调用栏位没有加入params。

观察发现：左边有带@是controller的参数，右边不带@的是views页面传来的参数。

观察发现：controller中的action都是在做同一件事情，就是find_and_do。

观察发现：调用栏位有两种方法，第一种是@xxxs.each do |xxx|，然后xxx.title，第二种是@xxx.title。当栏位xxx是一个复数时用第一种，当xxx是单数时因为@xxx即表示单数所以用第二种。——比如在当前购物车中，购物车就是单数用@cart调用，购物车里的格子就是复数用current_cart.cart_items.each do |cart_item|调用。

观察发现：Routing Error的报错，可能是rails s没有重启、没有新建controller、没有新建model、没有设置routes导致、路径定义了member或collection的动作但是没有在views里声明method是post还是delete。



```
if !current_user.admin?同理的还有Group.where(:is_hidden => true)
A：①、controller无视db值的属性直接决定游戏动作，！代表"修改为不是"直接决定user不是admin，true决定这个group是隐藏的。
②、数据库admin？默认boolean为false，这样新建的user默认不是admin。db里的值是一种属性，可以在rails c里可以任意改，影响新建时的默认值但是不在controller中起作用。
```



> 在index中，params里用:order是因为log日志里有给出参数地址，那么case又是什么意思？
> A.固定用法，类似if。不同的是if适用于罗列两种情况，而case用来罗列多种情况。
>
> ![](https://ws2.sinaimg.cn/large/006tNc79gy1fl2mki5xcoj30qh0953zx.jpg)

> Q.resume_controller的代码要怎么解读，自己写不出来？
> A.第一段，找到要建立resume的那个具体的job（地址栏job/id），在这个job里新建resume页面。
> 第二段，①先找到具体在哪一个job上(即地址栏里的job/id)；②通过筛选的栏位content(在resume_params中过滤)拉到新建立的resume上；③通过`@resume.job = @job`把job的地址给到新建的resume上，使job和新建的resume关联起来，得到一个具体的新resume的路径；④把当前用户设置成resume用户；
>
> ```
> def new
>     @job = Job.find(params[:job_id])
>     @resume = Resume.new
>   end
>   def create
>     @job = Job.find(params[:job_id])
>     @resume = Resume.new(resume_params) #新建resume所以确定了resume的id
>     @resume.job = @job                  #@job的参数传给新建resume，即确定job的id
>     @resume.user = current_user
>     if @resume.save
>       flash[:notice] = "成功提交履历"
>       redirect_to job_path(@job)
>     else
>       render :new
>     end
>   end
> ```

````
CRUD中Group.new和Group.new(group_params)的区别？
A：Group.new没有数据传送，调用new.html.erb即views的页面。而Group.new(group_params)已经进入new的页面，看链接可以发现这里不涉及id，而是要存储title和description的数据，这两个栏位定义在group_params中，所以是用group_params来调用。
````



>```
>  1、购物车的逻辑？ A：见下方。
>  def add_to_cart
>    @product = Product.find(params[:id])
>    current_cart.add_product_to_cart(@product)  #购物车所有动作围绕这句代码在做
>    redirect_to :back
>  end
>  
>  Q：redirect_to :back是什么？如果换成render :back为什么不行？
>  A：
>  
>  2、什么时候要建model，什么时候要建controller，比如在购物车这里rails g model cart、rails g model cart_item？
>  A：①、需要新建表单、填表、使用栏位的时候，第一次要建model，后续增加栏位用rails g migration add_栏位_to_刚刚的model。
>  ②、页面需要执行动作的时候，比如新建表单new、保存表单create、显示出栏位index/show。
>  
>  3、上述建立的model，什么时候要加栏位，要加多少栏位，比如cart_item加了cart_id、product_id、quantity栏位？
>  A：建立model都是因为需要建立数据库表单，表单一定是有想要显示的栏位，可以先加最小必要的栏位，主要功能测试成功后再添加其他次要栏位。
>```
>
>```
>app/models/cart.rb
> def add_product_to_cart(product)  #定义函数add_product_to_cart（引入view的参数product)
>   ci = cart_items.build  #新建格子，build与new区别见下一条
>   ci.product = product  #填上所添加商品的id号	
>   ci.quantity = 1       #填上商品数量，默认加1
>   ci.save
> end
> 
> A：ci仅仅是一个参数而已，我们这里需要新建cart_item,并且向里面添加product和quantity,为便于表示把新建的cart_item赋值给ci。变量名称只是为了阅读方便，对代码执行一般没什么影响。
>```
>
>```
> helper_method :current_cart
>
> def current_cart
>   @current_cart ||= find_cart 
> end
>
> private
>
> def find_cart
>   cart = Cart.find_by(id: session[:cart_id])
>   if cart.blank?
>     cart = Cart.create
>   end
>   session[:cart_id] = cart.id
>   return cart
> end
>end
>
>
>```
>
>1、helper_method是什么？
>A：current_cart 其实原本是一个 controller 内的 method，我们为了要在 view 里面要可以存取它。所以，我们得在 applications_controller.rb 宣告他是 helper_method，才能直接存取。
>
>
>
>2、||=是什么？
>A：或等于，a ||= b 更像是a || a = b，优先取a，如果a为nil或false则取b。
>
>
>
>3、find_by与find的区别？http://jiujiubad-blog.logdown.com/posts/3179266
>A：如果查找不到希望找的元素，find会报ActiveRecord：：RecordNotFound的错误，而find_by不报错，返回nil。看起來是find只能找id或多个id如`product = Product.find(1,2,3)`，find_by 可以找 裡面所有的元素 (title, description, quantity, price)如`product = Product.find_by(title: '快乐')`。ruby搜索ruby week ago。
>
>
>
>4、(id: session[:card_id])前面的id:是什么？session[:card_id]是什么？
>A：前面的id:就是字面上的id，session[:card_id]是现在拿到的购物车的id号码。
>  在每个人进店时，都会有一块电子感应卡，叫做 session，所以你的电子感应卡上面记录了你拿了哪台车 cart_id，每个人「现在的车」 current_cart 就是透过这样的方式去存取的。————万一你的车丢失了没有关系。if cart.blank? 发现你的车不见了，会再给你一台车。重新登记上去。
>
>
>
>5、Cart.create，这里create与build、new、save有什么区别？
>A：①、save：rails中的save其實是create_or_update，新建或修改記錄。
>
>②、new ：只是在內存中新建一個對象，操作數據庫要調用save方法。build和new基本相同，多用於一對多情況。
>
>③、create = new + 执行sql，有跟params里面的栏位信息打交道。
>
>
>
>6、blank?是什么？——空的nil的false的
>A：false is blank；阵列[]；Hash{}；字符（串）''、'   '、"\t\n\r"、nil。以上这些都是blank?
>如上，一个对象如果是false，空的，或者一个空白字符（串），例如：false, '', ' ', 或者nil，[], {}, 都是blank，所以在 rails c 中输入：
>
>```
>nil.blank? # => true
>false.blank? # => true
>true.blank? # => false
>[].blank?      # => true
>[1,2,3].blank? # => false
>{}.blank?                # => true
>{ key: 'value' }.blank?  # => false
>''.blank?       # => true
>'   '.blank?    # => true
>"\t\n\r".blank? # => true
>' blah '.blank? # => false
>"\u00a0".blank? # => true
>1.blank? # => false
>0.blank? # => false
>Time.now.blank? # => false
>```
>
>7、present?是什么？——非空非nil非false
>
>```
>def present?
>  !blank?
>end
>```
>
>商品、格子、车子——格子的信息：商品信息id、车子信息id、商品数量
>
>车有很多格子、有很多商品
>
>商品有很多格子（一种商品就有一个格子）
>
>格子属于商品、格子属于车
>
>```
>  def destroy
>    @cart = current_cart  #拿到cart_id，因为一个用户一辆车所有不用find(params[:id])
>    @cart_item = @cart.cart_items.find_by(product_id: params[:id]) #注意，find_by里的栏位值必须是已知的，所以在html文件里要传进来这个id的具体值所以要传的参数是(cart_item.product_id)。比如传进来的product_id值是3，系统就会对应到3这个产品的cart_item。
>    @product = @cart_item.product  #拿到product_id，为了后面flash可以引用
>    @cart_item.destroy  #删除格子
>
>    flash[:warning] = "成功将 #{@product.title} 从购物车删除!"
>    redirect_to :back   #测试改成redirect_to carts_path，效果一样
>  end
>end
>```
>
>1、params[:id]是什么？
>
>在Rails當中，http request會經過ActionController這個內建的機制來消化，並將可用的變數轉換為**params**這個變數，我們在controller當中撰寫params[:id]時，所指的其實是從前端回傳的:id。
>
>![](https://ws3.sinaimg.cn/large/006tNc79gy1fl87h3jhz2j30u00g2dl4.jpg)
>
>
>
>2、find_by(product_id: params[:id]) 为什么不是find_by(params[:id])，这里params[:id]不是cart_item的id吗？ 
>
>A：测试发现，用find_by(params[:id])后，点击删除第一件商品会随机删除其他商品，即系统不知道要具体删除哪一个cart_item。——分析：如果写find_by(params[:id])，确实这个id是cart_item的id，但是这里的网址是http://localhost:3000/carts，并不知道params[:id]是多少，所以系统会随机删除一个cart_item。——由于网址找不到id，所有要通过find_by（find只能找id而find_by可以从栏位找）从cart_item的栏位（我们定义了3个栏位：product_id、cart_id、quantity）来找到cart_item的id。
>
>
>
>```
><%= form_for cart_item, url: cart_item_path(cart_item.product_id) do |f| %> 这是什么？？
>- <%= f.select :quantity, [1,2,3,4,5] %>
>+ <%= f.select :quantity, 1..cart_item.product.quantity %>
>  <%= f.submit "更新", data: { disable_with: "Submiting..." } %>
><% end %>
>```
>
>### 为什么结账页checkout是在cart_controller里用Order.new，能不能是新建一个order的controller做new的action？
>
>### order新建后有订单编号为什么不储存订单信息，把商品名称、价格、数量栏位加上去不行吗？为什么还要新建一个product_list的model？
>
>A：一般如果订单已生成，那么商家修改商品价格、库存、描述等，是不能改变已拍下的订单信息的。所以已生成的订单里的商品id用product_list记录，商家商城里的商品id还是用product记录。
>
>```
>   在订单建立后建立购买明细缓存：
>   if @order.save
>     current_cart.cart_items.each do |cart_item|
>       product_list = ProductList.new   
>       product_list.order = @order      
>       product_list.product_name = cart_item.product.title
>       product_list.product_price = cart_item.product.price
>       product_list.quantity = cart_item.quantity
>       product_list.save
>   end
>
>1、为什么一定要写成ProductList.new?
>A：注意观察一下，controller中右边的表达式都是大写开头，是因为右边代表的是类，所以product_list按类的写法，就跟model里第一行的声明一样，就是ProductList。
>```
>
>```
> def show
>   @order = Order.find(params[:id])
>   @product_lists = @order.product_lists   
> end
> 
> Q：product_lists为什么这里要加s？？？？
> A：show的页面order是唯一的用单数，而order里可能有一张或多张订单，要把他们全部show出来就要加s。
>```
>
>```
>before_create :generate_token  
>def generate_token
>  self.token = SecureRandom.uuid
>end
> 
>def show
>  @order = Order.find_by_token(params[:id])
>  @product_lists = @order.product_lists
>nd
>
>1、before_create是什么？
>A：before_create 是 Rails model 内建的 callbacks，目的是让资料生成储存前先执行某某动作。
>
>2、SecureRandom.uuid是什么？
>A：SecureRandom.uuid 是 Ruby 内建的随机生成器。
>
>3、find_by_token是什么？
>A：找到元素token
>```
>
>```
>def index
>  @orders = current_user.orders
>end
>
>1、index中，@orders = current_user.orders与@orders = Order.all的区别？
>A：订单order是user的，current_user是一个user，Order.all是指所有user的order。解读成一个user的所有订单、和所有user的所有订单。
>
>
>```
>
>2、@orders =Order.order("id DESC")和@resumes = @job.resumes.order('created_at DESC')，order前的名词什么情况加s？？
>
>A：Order是类，@job.resumes是变量的复数形式。
>
>3、Order.order("id DESC")是什么？
>
>A：写成Order.all.order("id DESC")也得出一样结果，可能是缩写。
>
>
>
>```
>def pay_with_alipay
>    @order = Order.find_by_token(params[:id])
>    @order.set_payment_with!("alipay")
>    @order.pay!
>
>    redirect_to order_path(@order.token), notice: "使用支付宝成功完成付款"
>  end
>```
>
>```
>app/models/order.rb
>def set_payment_with!(method)
>  self.update_columns(payment_method: method )
>end
>
>def pay!
>  self.update_columns(is_paid: true )
>end
>```
>
>1、self.update_columns(payment_method: method )是什么？
>A：dash上查到官方文档定义：
>
>```
>    def update_column(name, value)
>      update_columns(name => value)
>    end
>```
>
>其中，payment_method:相当于是例子中的栏位name，随后的method相当于例子中的value值。
>
>另外一种更新栏位值的写法是：
>
>```
>def pay!
>  self.is_paid = true
>end
>```
>
>
>
>2、self是什么？
>
>A：（不知道）在atom中找不到，dash中rails的没有ruby的有但好像不相关。
>
>
>
>3、self.update_columns(is_paid: true )，如果像之前设置`def admin? is_admin end`那样写行不行？
>A：
>
>解释1：`if !current_user.admin?`这里is_admin是判断状态是不是admin，而pay！的update_columns是把改变状态为已付款。如果把is_admin写成self.update_columns(is_admin: true)，那么所有点击后台的账号都会改变成管理员账号。
>
>解释2：由下面的分析，猜测is_admin是有role_model动态定义，而is_paid没有所以不行（具体用代码测试）。
>
>```
>def define_dynamic_queries(roles)
>  dynamic_module = Module.new do
>    roles.each do |role|
>      ["#{role}?".to_sym, "is_#{role}?".to_sym].each do |method|
>        define_method(method) { is? role }
>      end
>    end
>  end
>  include dynamic_module
>end
>原来，role_model根据分配的角色动态地创建方法 - 所以这就是为什么is_admin不在源代码中显示。
>```
>
>
>
>```
>app/mailers/order_mailer.rb
>def notify_order_placed(order)
>    @order       = order
>    @user        = order.user
>    @product_lists = @order.product_lists
>
>    mail(to: @user.email , subject: "[JDstore] 感谢您完成本次的下单，以下是您这次购物明细 #{order.token}")
>  end
>```
>
>```
>OrderMailer.notify_ship(@order).deliver!
>```
>
>```
>  include AASM  #有限状态机的架构
>
>  aasm do
>    state :order_placed, initial: true  #已下单
>    state :paid      #已付款
>    state :shipping  #出货中
>    state :shipped   #到货
>    state :order_cancelled  #取消订单
>    state :good_returned    #退货
>
>
>    event :make_payment do  #付款阶段
>      transitions from: :order_placed, to: :paid
>    end
>
>    event :ship do  #送货阶段
>      transitions from: :paid,         to: :shipping
>    end
>
>    event :deliver do  #收货阶段
>      transitions from: :shipping,     to: :shipped
>    end
>
>    event :return_good do  #退货阶段
>      transitions from: :shipped,      to: :good_returned
>    end
>
>    event :cancel_order do  #取消订单阶段(已下单、已付款都可以取消)
>      transitions from: [:order_placed, :paid], to: :order_cancelled
>    end
>  end
>```
>
>```
>  def pay_with_wechat
>-   @order.pay!
>+   @order.make_payment!
>    redirect_to order_path(@order.token), notice: "使用微信支付成功完成付款"
>  end
>  
>app/models/order.rb
>event :make_payment, after_commit: :pay! do
>  transitions from: :order_placed, to: :paid
>end
>
>Q：event :make_payment, after_commit: :pay! do是什么？
>```
>
># 第11章还有很多看不明白的地方，查完这些再过一遍
>
>异动状态改变思路：先在views页面用case...when语法摆出6中状态，分别需要管理员操作的动作：取消订单、取消订单/出货、设为已出货、退货、订单已取消、已退货。订单已取消、已退货已是一种状态，不需要设置动作，需要设置的有取消订单、出货、已出货、退货4种。——设置路径，设置controller中的action即find_and_do。
>
>
>
>```
><%= render "admin/orders/state_option", order: @order %>，order: @order是什么？
>```
>
>```
>app/mailers/order_mailer.rb
>  def apply_cancel(order)
>    @order       = order  #不是刚需，只因为下文要引用order.token
>    @user        = order.user  #不是刚需，只因为下文引用@user.email
>    @product_lists = @order.product_lists  #不是刚需，只因为view里要引用这个model打印栏位
>
>    mail(to: @user.email , subject: "[JDStore] 用户#{order.user.email}申请取消订单 #{order.token}")   #to:xxx是一定要的，to后面的内容可以随便
>  end
>```
>
>
>
>
>
>



> ## .xxx的用法在controller
>
> ```
> if !current_cart.products.include?(@product)里的.include?
> ```
>
> ```
> if @cart_item.product.quantity >= cart_item_params[:quantity].to_i
>   @cart_item.update(cart_item_params)
>   flash[:notice] = "成功变更数量"
>   
> 1、cart_item_params[:quantity]是什么？
>
> 2、.to_i是什么？
> A：转换成integer整数。
> ```
>
> ```
> self.update_columns(is_paid: true )，固定用法前面有解释
> ```
>
> ```
> OrderMailer.notify_ship(@order).deliver!
> ```
>
> .destroy_all
>
> .include?
>
> .present?
>
> .blank?
>
> .total_price
>
>  OrderMailer.apply_cancel(@order).deliver!
>
> 



```
+  def create
+    @order = Order.new(order_params)
+    @order.user = current_user
+    @order.total = current_cart.total_price

+    if @order.save
+      redirect_to order_path(@order)
+    else
+      render 'carts/checkout'
+    end
+  end
```

1、render 'carts/checkout' 和 render :new 的区别？

A：

2、这里的user和total两个栏位是拿来做什么的？



# Routes

```
namespace :admin do
```



> resources member do，用于加入/退出群组、是否隐藏、加入购物车、微信支付宝支付
> resources collection do，用于？
> 两者的区别是什么？
>
> ### member do 和 collection do 的区别？
>
> ①、member do自定义对特定元素的action，比如@product。
>
> 特定元素的意思就是：生成的url helper，需要带（@pruduct）参数，@product是特定的单一的商品。
>
> 例如，用于加入/退出群组、是否隐藏、加入购物车、微信支付宝支付。
>
> ②、collection do自定义元素集合的action，比如products。
>
> 元素集合的意思就是：生成的url helper，不需要带（@cart）这样的参数，它是对所有的carts做同一操作，而不是对单一个cart操作。
>
> 例如，用于清空购物车、购物车结账。
>
> ```
> resources :carts do
>   collection do
>     delete :clean
>     post :checkout
>   end
> end
> ```
>
> ```
> resources :orders do
>   member do
>     post :pay_with_alipay
>     post :pay_with_wechat
>     post :apply_to_cancel
>   end
> end
> ```
>
> ```
> resources :orders do
>   member do
>     post :cancel
>     post :ship
>     post :shipped
>     post :return
>   end
> end
> ```
>
> 
>







# Views

观察发现：除了index，原来show的页面也是可以调用`<% @xxxs.each do |xxx| %>`

> views里什么时候用（@group）,什么时候用(group)？views里的路径，括号里的内容好像变幻莫测，比如product_path(cart_item.product)。
> A：①、**通常要帶（）的話，就是因为要知道是哪个东西要被编辑/浏览/删除，那就会是单数的情况**，所以后面基本上就是带 ID 而已。
> ②、@ 是從 controller 傳進來的，你只要記得這個就好，如果該 controller 下的 action 沒有其他的 @，view 就叫不出來。最簡單的測試，比方說controller 裡面的一個 game 的 action，那會變成：
>
> ```
> def game
>  @nic = "handsome" 
> end
> ```
>
> 那你去 game.html.erb 裡面，寫一行 <%= @nic %>，就会看到他把讯息抛出来变成 handsome，你只要写两行就可以测试了。
>
> ③、注意观察一下这里是不是在回圈（循环）内，回圈里面一般不用加@，有 @ 这个符号都是 controller 传进来的。你要看整个档案怎么写，不能只看一句，如果他是包在回圈里，那就是回圈生出来的，如果是有@就是controller传进来的

```
<%= link_to(content_tag(:i, '登入', class: 'fa fa-sign-in'), new_user_session_path) %>
<i class="fa fa-home" ></i>
A：以上都是调用icon的方法，需要安装gem 'font-awesome-rails'。
官网的写法是<i class="fa fa-telegram" aria-hidden="true"></i>，如果要更大可以加上fa-lg、fa-2x、fa-3x等，注意这种写法重构到helper文件里会报错。
万金油的写法是content_tag(:i, '登入', class: 'fa fa-sign-in')，文字部分如果不输入，就只显示图标。
```

```
show和edit表单
<%= simple_form_for [:admin, @product] do |f| %>...<%= f.input :title %>...<% end %>
```

```
index页面
<tr>
  <th>Name</th>
  <th width="100"> Options</th>
</tr>
<tbody>
<tr>
  <% @products.each do |product| %>
     <td><%= product.title %></td>
     <td><%= link_to("Edit", edit_admin_product_path(product)) %></td>
  <% end %>
</tr>
</tbody>
```
```
show页面
<%= @product.title %>
<%= @product.description %>
```

```
<%= simple_form_for [@job, @resume] do |f| %>中的[@job,@resume]是什么意思？<%= simple_form_for [:admin, @job] do |f| %>呢？
A：先去找到一个job，再在job里找到resume。
```

```
在helper中定义def是前端用的，后端用的在model中定义？
A：Model是用来更数据库打交道的，是在Controller中调用的，Helper是Viewer中拿来用的。初步看起来你这个总结是对的。
```

```
views里有时用:method => :delete，有时用method: :delete，那么是不是: xxx =>和：的意思一样(至少debug的时候这些是成对的)？

A：那两种方式意思一样，都可以。
```

```
简历数量的路径admin_job_resumes_path(job)是怎么来的？
A：很简单，创建rails g controller admin::job，创建后rake routes就有了。
```



## simple_form用法

<%= simple_form_for xx do |f| %>

<%= f.select/input/submit :xx %>

```
<% current_cart.cart_items.each do |cart_item| %>
  <%= simple_form_for cart_item, url: cart_item_path(cart_item.product_id) do |f| %>
    <%= f.select :quantity, [1,2,3] %>
    <%= f.submit "更新", data:{disable_with:"正在更新.."} %>
  <% end %>
<% end %>

```

1、为什么写成<%= simple_form_for cart_item do |f| %>会报错？

![](https://ws4.sinaimg.cn/large/006tNc79gy1fl8foae9tyj30x60dewgu.jpg)

```
NoMethodError in CartItemsController#update
undefined method `update' for nil:NilClass

Extracted source (around line #6):
        
    @cart = current_cart
    @cart_item = @cart.cart_items.find_by(product_id: params[:id])
    @cart_item.update(cart_item_params)
    redirect_to :back
  end
```

A：分析*案例在修改前是用<%= cart_item.quantity %>，所以这里的f代表的应该是cart_item。——stackoverflow查到加入的url是表单数据要提交到的url。——猜测：因为当前页面http://localhost:3000/carts，那么购物车是确定的，但是cart_item很多个，而我们要更新的数据<%= cart_item.quantity %>不知道product_id是多少，系统无法得知要更新哪一个cart_item，所以要指定url。所以如果系统能确定要更新的资料的id位置，就不用去指定url。

2、这里cart_item的url要用哪个URL呢？

A：我觉得在cart_item的index页面不能确定，而show页面可以，所以应该是用show的路径cart_item_path(参数)。这里的参数我一开始猜测是cart_item_path(product_id: params[:id])，但在show页面从网址可以知道cart_item的id，于是我写params[:id]，两种都报错。——根据model里设置的cart、cart_item、product的关系，要讲清楚cart_item是什么就要明白它跟cart和product分别是什么关系，即通过cart_id和product_id就能确定cart_item。所以这里的参数要写cart_item.product_id。

3、为什么问题2的参数不能写params[:id]?

A：猜测，是不是有定义product_id和cart_id栏位，所以不能用params[:id]？或是在

网址：localhost:3000/carts/数字a/cart_item/数字b，参数数字a传给了cart_id，参数数字b传给了product_id，因为有自定义的栏位cart_id和product_id，所以不需要rails自带的栏位params[:id]来存储参数？？





> ## 路径类
>
> ```
> <%= form_for cart_item, url: cart_item_path(cart_item.product_id) do |f| %>
> A：url对应一个网址；cart_item_path对应的url是：/cart_items/:id(.:format)；cart_item.product_id就是这个特定的cart_item的product_id。
> ```
>
> 



> ## 图片类
>
> ```
> <% if @product.image.present? %>
>   <span>目前商品图</span> <br>
>   <%= image_tag(@product.image.thumb.url) %>
> <% else %>
>   <%= image_tag("http://placehold.it/200x200&text=No Pic", class: "thumbnail") %>
> <% end %>
>
> 1、.thumb.url是什么？
> A：(对解答质疑)gem 'carrierwave'中有设置uploader.thumb.url # => '/url/to/thumb_my_file.png' # size: 200x200，说明了.thumb.url是在uploader中定义的方法，具体作用就是规定了图片大小。
> 我的理解：image_tage()括号里是放一个网址，@product.image.thumb.url是指@product.image这个栏位在thumb这个class样式下的地址url。
> 2、image_tag是什么？
> A：测试发现，image_tag一定要包在<% if.. %>和<% end %>之间，或<%= link_to xxx do %>..<% end %>，才能用相对网址。或是在括号内写上双引号和绝对网址，如"https://ws1.sinaimg.cn/large/006tNc79gy1fl7g3xdhczj307w0503yj.jpg"
> ```
>
> ```
>               <%= link_to product_path(cart_item.product) do %>
>                 <% if cart_item.product.image.present? %>
>                   <%= image_tag(cart_item.product.image.thumb.url, class: "thumbnail") %>
>                 <% else %>
>                   <%= image_tag("http://placehold.it/200x200&text=No Pic", class: "thumbnail") %>
>                 <% end %>
>               <% end %>
> 1、link_to xxx do 是什么？
> A：把图片就变成链接。
> A：
> ```
>
> 
>
> 



> ## .xxx的用法在views，常表示一种状态而controller中是表示一种动作
>
> ```
> <% if current_user.admin? %>views里的.admin？是调用model的吗？
> ```
>
> ```
> <%= current_cart.products.count %>拿到购物车内的物品数量
> ```
>
> ```
> <%= order.created_at.to_s(:long) %>
> ```
>
> ```
> <% if !@order.is_paid? %>，其中is_paid是db的一个栏位设置了boolean。
> ```
>
> ```
> <%= order.aasm_state %>，其中aasm_state是db的一个栏位。
> ```
>
> 
>
> 

```
app/views/carts/index.html.erb 
<% current_cart.cart_items.each do |cart_item| %>  #已在model中定义helper_method
   <%= cart_item.product.title %>
   <%= cart_item.product.price %>
   <%= cart_item.quantity %>
 <% end %>
```
```
<% if cart_item.product.price.present? %>，其中present？是什么？
```

```
数量选择器quantity的用法：
<%= f.select :quantity, [1,2,3,4,5] %>
<%= f.select :quantity, 1..cart_item.product.quantity %>
```
```
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



Q：已下订单通知信，为什么是用order_url(@order.token)，而不能用order_path(@order.token)？

`<%= link_to("订单连结", order_url(@order.token)) %>`

A：因为发送邮件要用绝对路径，否则收件人打不开邮件。